// Shift Talk — local-first card store and append-only event log.
//
// Why an event log instead of a mutable `mastered: []` array:
// Firestore resolves concurrent writes as last-write-wins per document with no
// merge reconciliation. A mutable array would silently LOSE progress whenever
// two devices practise offline and reconnect. One immutable document per event
// makes merge a set union — commutative, associative, idempotent — so
// last-write-wins on a doc that is never rewritten is a no-op. That gets
// conflict-free sync with no CRDT library, because both cards and events are
// naturally grow-only.
//
// Mastery is DERIVED by folding the log, never stored. The same fold drives
// practice ordering and decides what to generate next.
//
// Storage note: Phase 1 uses localStorage (the app already depends on it, and a
// single learner's log is small — see EVENT_SOFT_CAP). Reads and writes go
// through the tiny adapter at the bottom so Firestore's IndexedDB cache can take
// over in Phase 3 without touching callers.

// ---------------- keys ----------------
const LS_EVENTS = "shifttalk_events";
const LS_DEVICE = "shifttalk_device";
const LS_CARDS = "shifttalk_cards"; // generated cards only; seed deck stays bundled
const LS_QUARANTINE = "shifttalk_quarantine";
const LS_OUTBOX = "shifttalk_outbox";

// A year of heavy practice is roughly 18k events at ~120 bytes each (~2MB), well
// inside the 5MB localStorage budget. Past this we compact (see compactEvents).
const EVENT_SOFT_CAP = 20000;

// ---------------- normalization ----------------
// Must stay byte-identical to normalizeNative() in index.html:1336 — card IDs
// are derived from it, so any drift silently orphans existing progress.
export function normalizeNative(s) {
  return (s || "").replace(/[\s,.!?、。！？，·・]/g, "").toLowerCase();
}

// Deterministic, content-derived, and human-readable in the Firestore console.
// Generating the same word twice collides into one document, so a duplicate
// write is an idempotent no-op rather than a second card.
// encodeURIComponent guarantees a legal Firestore document ID (escapes "/").
export function cardId(lang, native) {
  return `${lang}_${encodeURIComponent(normalizeNative(native))}`;
}

// ---------------- deck ----------------
// Takes the bundled VOCAB literal and returns the same shape with a stable `id`
// on every word. The seed deck is NOT copied into this file: retyping 190+
// tone-marked entries by hand risks a corrupted diacritic in exactly the data
// that matters most, and there is no shell here to diff a copy against.
export function buildDeck(seedVocab, generatedCards = []) {
  const deck = {};
  Object.keys(seedVocab).forEach(lang => {
    const src = seedVocab[lang];
    const cats = {};
    Object.keys(src.categories).forEach(cid => {
      const cat = src.categories[cid];
      cats[cid] = {
        ...cat,
        words: cat.words.map(w => ({ ...w, id: cardId(lang, w.n), origin: "seed" })),
      };
    });
    deck[lang] = { ...src, categories: cats };
  });

  // Generated cards append to their category. Skipping IDs already present keeps
  // this idempotent when a card is both cached locally and pulled from Firestore.
  generatedCards.forEach(c => {
    const cat = deck[c.lang] && deck[c.lang].categories[c.category];
    if (!cat) return;
    if (cat.words.some(w => w.id === c.id)) return;
    cat.words.push({ id: c.id, n: c.n, r: c.r, e: c.e, origin: "generated" });
  });

  return deck;
}

export function allCards(deck) {
  const out = [];
  Object.keys(deck).forEach(lang => {
    const cats = deck[lang].categories;
    Object.keys(cats).forEach(cid => {
      cats[cid].words.forEach(w => out.push({ ...w, lang, category: cid }));
    });
  });
  return out;
}

export function findCard(deck, id) {
  return allCards(deck).find(c => c.id === id) || null;
}

// ---------------- device identity ----------------
// Namespaces event IDs so two devices practising offline never collide.
export function deviceId() {
  let id = read(LS_DEVICE);
  if (!id) {
    id = "d" + Math.random().toString(36).slice(2, 10);
    write(LS_DEVICE, id);
  }
  return id;
}

// ---------------- event log ----------------
let eventSeq = 0;

export function loadEvents() {
  const raw = read(LS_EVENTS);
  if (!raw) return [];
  try {
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch (e) {
    return []; // a corrupt log must not brick practice
  }
}

// Appends one immutable event. `ts` is injectable so migration can backdate
// synthetic events to the learner's real last-visit date.
export function recordEvent(events, { cardId: cid, lang, category, mode, grade, ts, source }) {
  const when = ts || Date.now();
  const ev = {
    id: `${deviceId()}_${when}_${eventSeq++}`,
    cardId: cid,
    lang,
    category,
    mode,   // "quiz" | "speak" | "listen" | "sentence" | "flag"
    grade,  // "correct" | "close" | "incorrect" | "flag"
    ts: when,
  };
  if (source) ev.source = source;
  events.push(ev);
  saveEvents(events);
  enqueueOutbox({ kind: "event", id: ev.id, value: ev });
  return ev;
}

export function saveEvents(events) {
  const list = events.length > EVENT_SOFT_CAP ? compactEvents(events) : events;
  write(LS_EVENTS, JSON.stringify(list));
}

// Drops the oldest events per card while preserving the fold's inputs: the
// derived state depends on counts and the most recent grades, so keeping the
// last MAX_PER_CARD attempts per card leaves scheduling unchanged in practice.
function compactEvents(events, MAX_PER_CARD = 40) {
  const byCard = new Map();
  events.forEach(e => {
    if (!byCard.has(e.cardId)) byCard.set(e.cardId, []);
    byCard.get(e.cardId).push(e);
  });
  const kept = [];
  byCard.forEach(list => {
    list.sort((a, b) => a.ts - b.ts);
    kept.push(...list.slice(-MAX_PER_CARD));
  });
  return kept.sort((a, b) => a.ts - b.ts);
}

// Set-union merge. Events are immutable and IDs are globally unique, so this is
// commutative, associative and idempotent — replaying a sync twice is safe.
export function mergeEvents(a, b) {
  const seen = new Set();
  const out = [];
  [...a, ...b].forEach(e => {
    if (!e || !e.id || seen.has(e.id)) return;
    seen.add(e.id);
    out.push(e);
  });
  return out.sort((x, y) => x.ts - y.ts);
}

// ---------------- mastery fold (SM-2 lite) ----------------
const DAY = 86400000;
const FLAG_THRESHOLD = 2; // flags before a card drops out of rotation

// Folds the log into per-card scheduling state. Pure: same events in, same
// state out, no clock reads except the `now` you pass.
export function foldMastery(events, now = Date.now()) {
  const state = new Map();

  [...events].sort((a, b) => a.ts - b.ts).forEach(e => {
    let s = state.get(e.cardId);
    if (!s) {
      s = { cardId: e.cardId, reps: 0, lapses: 0, ease: 2.5, intervalDays: 0, due: e.ts, lastSeen: 0, flags: 0, mastered: false };
      state.set(e.cardId, s);
    }
    s.lastSeen = e.ts;

    if (e.grade === "flag") { s.flags++; return; }

    if (e.grade === "incorrect") {
      s.lapses++;
      s.reps = 0;
      s.ease = Math.max(1.3, s.ease - 0.2);
      s.intervalDays = 0;
      s.due = e.ts; // resurface in the same session
      return;
    }

    // "correct" and "close" both count as progress — this mirrors the existing
    // `graded.grade !== "incorrect"` rule at index.html:2125 and :2163, so
    // migrating the old progress format cannot change anyone's mastered count.
    s.reps++;
    s.ease = e.grade === "correct"
      ? Math.min(2.8, s.ease + 0.05)
      : Math.max(1.3, s.ease - 0.1);
    if (s.reps === 1) s.intervalDays = 1;
    else if (s.reps === 2) s.intervalDays = 3;
    else s.intervalDays = Math.round(s.intervalDays * s.ease);
    s.due = e.ts + s.intervalDays * DAY;
    s.mastered = true;
  });

  state.forEach(s => { s.suppressed = s.flags >= FLAG_THRESHOLD; });
  return state;
}

export function isMastered(mastery, id) {
  const s = mastery.get(id);
  return !!(s && s.mastered && !s.suppressed);
}

// Cards due for review, soonest first. Never-seen cards count as due so a fresh
// deck still has something to practise.
export function dueCards(deck, mastery, lang, category, now = Date.now()) {
  return allCards(deck)
    .filter(c => c.lang === lang && (!category || c.category === category))
    .filter(c => {
      const s = mastery.get(c.id);
      if (s && s.suppressed) return false;
      return !s || s.due <= now;
    })
    .sort((a, b) => {
      const sa = mastery.get(a.id), sb = mastery.get(b.id);
      return (sa ? sa.due : 0) - (sb ? sb.due : 0);
    });
}

export function categoryStats(deck, mastery, lang, category) {
  const words = deck[lang].categories[category].words;
  const mastered = words.filter(w => isMastered(mastery, w.id)).length;
  return { total: words.length, mastered, ratio: words.length ? mastered / words.length : 0 };
}

// ---------------- meta ----------------
// Streak, last visit and best quiz scores are not per-card facts, so they can't
// be folded out of the event log. They stay in a small mutable blob — safe,
// because they are device-local display state, not progress that a bad merge
// could destroy.
const LS_META = "shifttalk_meta";

export function loadMeta() {
  const raw = read(LS_META);
  const base = { streak: 0, lastVisit: null, best: {} };
  if (!raw) return base;
  try { return { ...base, ...JSON.parse(raw) }; } catch (e) { return base; }
}

export function saveMeta(meta) {
  write(LS_META, JSON.stringify(meta));
}

// ---------------- generated card cache ----------------
export function loadGeneratedCards() {
  const raw = read(LS_CARDS);
  if (!raw) return [];
  try {
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch (e) {
    return [];
  }
}

export function saveGeneratedCards(cards) {
  const seen = new Set();
  const unique = cards.filter(c => {
    if (!c || !c.id || seen.has(c.id)) return false;
    seen.add(c.id);
    return true;
  });
  write(LS_CARDS, JSON.stringify(unique));
}

export function loadQuarantine() { return loadList(LS_QUARANTINE); }
export function saveQuarantine(cards) { saveList(LS_QUARANTINE, cards); }
export function loadOutbox() { return loadList(LS_OUTBOX); }
export function enqueueOutbox(item) {
  const outbox = loadOutbox();
  if (item && item.id && !outbox.some(entry => entry.id === item.id)) outbox.push(item);
  saveList(LS_OUTBOX, outbox);
  return outbox;
}
export function removeOutbox(ids) {
  const rejected = new Set(ids);
  saveList(LS_OUTBOX, loadOutbox().filter(item => !rejected.has(item.id)));
}

function loadList(key) {
  const raw = read(key);
  if (!raw) return [];
  try { const parsed = JSON.parse(raw); return Array.isArray(parsed) ? parsed : []; } catch (e) { return []; }
}

function saveList(key, list) { write(key, JSON.stringify(list)); }

// ---------------- storage adapter ----------------
// Single choke point so Phase 3 can swap in Firestore's IndexedDB cache without
// changing any caller. Failures are swallowed: practice must survive a full or
// disabled localStorage.
function read(key) {
  try { return localStorage.getItem(key); } catch (e) { return null; }
}

function write(key, value) {
  try { localStorage.setItem(key, value); return true; } catch (e) { return false; }
}
