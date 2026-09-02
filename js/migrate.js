// Shift Talk — one-shot migration off positional mastery indices.
//
// The old format stored mastery as indices into the hardcoded word array
// (`mastered: [0, 3, 7]`, index.html:1456). That is what made a growing deck
// impossible: inserting or reordering a single word silently re-points every
// prior index at the wrong card.
//
// This runs once, resolves each index against the still-bundled seed deck — so
// every index resolves exactly as it did when it was written — and emits one
// synthetic event per mastered card. The old localStorage key is deliberately
// LEFT IN PLACE as a rollback path.

import { cardId, recordEvent } from "./store.js";

const LS_OLD = "shifttalk_progress";
const LS_MARKER = "shifttalk_migrated_v1";

function read(key) {
  try { return localStorage.getItem(key); } catch (e) { return null; }
}

export function alreadyMigrated() {
  return !!read(LS_MARKER);
}

// Sentences have no single native form, so the ID derives from the joined
// chunks — stable as long as the sentence itself doesn't change.
export function sentenceId(lang, sentence) {
  return cardId(lang, sentence.chunks.map(c => c.c).join(""));
}

// Returns a report so the caller can assert migrated counts match the old ones
// rather than trusting the migration silently.
export function runMigration(seedVocab, sentences, categoryOrder, events) {
  const report = { ran: false, words: 0, sentences: 0, unresolved: [], meta: null };
  if (alreadyMigrated()) return report;

  const raw = read(LS_OLD);
  if (!raw) {
    try { localStorage.setItem(LS_MARKER, String(Date.now())); } catch (e) { /* best effort */ }
    return report;
  }

  let old;
  try { old = JSON.parse(raw); } catch (e) { return report; }

  // Backdate synthetic events to the learner's real last visit so the scheduler
  // treats migrated cards as genuinely due rather than all just-reviewed.
  const parsed = old.lastVisit ? Date.parse(old.lastVisit) : NaN;
  const ts = Number.isNaN(parsed) ? Date.now() - 86400000 : parsed;

  Object.keys(old.langs || {}).forEach(lang => {
    if (!seedVocab[lang]) return;
    categoryOrder.forEach(category => {
      const cat = seedVocab[lang].categories[category];
      const entry = old.langs[lang][category];
      if (!cat || !entry || !Array.isArray(entry.mastered)) return;

      entry.mastered.forEach(idx => {
        const word = cat.words[idx];
        if (!word) { report.unresolved.push(`${lang}.${category}[${idx}]`); return; }
        recordEvent(events, {
          cardId: cardId(lang, word.n),
          lang, category, mode: "migration", grade: "correct", ts,
          source: "migration",
        });
        report.words++;
      });
    });
  });

  Object.keys(old.sentences || {}).forEach(lang => {
    const list = sentences[lang] || [];
    const entry = old.sentences[lang];
    if (!entry || !Array.isArray(entry.mastered)) return;
    entry.mastered.forEach(idx => {
      const sent = list[idx];
      if (!sent) { report.unresolved.push(`${lang}.sentence[${idx}]`); return; }
      recordEvent(events, {
        cardId: sentenceId(lang, sent),
        lang, category: "__sentence", mode: "migration", grade: "correct", ts,
        source: "migration",
      });
      report.sentences++;
    });
  });

  // Carry over the values that cannot be folded out of an event log.
  const best = {};
  Object.keys(old.langs || {}).forEach(lang => {
    categoryOrder.forEach(category => {
      const entry = old.langs[lang] && old.langs[lang][category];
      if (entry && entry.bestScore) best[`${lang}.${category}`] = entry.bestScore;
    });
  });
  report.meta = { streak: old.streak || 0, lastVisit: old.lastVisit || null, best };

  try { localStorage.setItem(LS_MARKER, String(Date.now())); } catch (e) { /* best effort */ }
  report.ran = true;
  return report;
}
