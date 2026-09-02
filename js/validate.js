// Shift Talk — deterministic validation gates for generated vocabulary.
//
// These run offline, cost nothing, and reject most bad cards before any second
// model call. They exist because structured output guarantees only that JSON is
// SYNTACTICALLY valid — Google's own docs warn you must "validate values
// yourself and handle schema-compliant yet semantically wrong results."
//
// Pure functions, no DOM and no network, so tests/golden.html can exercise every
// gate with no API cost and the whole module lifts into a Cloud Function later.
//
// Severity: "reject" quarantines the card outright; "flag" records a concern but
// lets the later stages decide.

import { normalizeNative } from "./store.js";

export const VALIDATOR_VERSION = 1;

// ---------------- script ranges ----------------
const IDEOGRAPH = "\\u4E00-\\u9FFF\\u3400-\\u4DBF\\uF900-\\uFAFF";
const KANA = "\\u3040-\\u309F\\u30A0-\\u30FF\\u31F0-\\u31FF\\uFF66-\\uFF9D";
const HANGUL = "\\uAC00-\\uD7A3\\u1100-\\u11FF\\u3130-\\u318F";

const RE_IDEOGRAPH_ONLY = new RegExp(`^[${IDEOGRAPH}]+$`);
const RE_HAS_KANA = new RegExp(`[${KANA}]`);
const RE_HAS_HANGUL = new RegExp(`[${HANGUL}]`);
const RE_HAS_IDEOGRAPH = new RegExp(`[${IDEOGRAPH}]`);
// Japanese mixes kana, kanji, the prolonged mark ー and the iteration mark 々.
const RE_JA_ALLOWED = new RegExp(`^[${KANA}${IDEOGRAPH}\\u3005]+$`);
const RE_KO_ONLY = new RegExp(`^[${HANGUL}]+$`);

// ---------------- romanization charsets ----------------
// Every Mandarin syllable carries exactly one vowel nucleus, so counting
// maximal vowel runs counts syllables. ń/ň/ǹ are the syllabic nasals (嗯).
const PINYIN_VOWELS = "aeiouüêāáǎàēéěèīíǐìōóǒòūúǔùǖǘǚǜńňǹ";
const RE_PINYIN_VOWEL_RUN = new RegExp(`[${PINYIN_VOWELS}]+`, "g");
const RE_PINYIN_CHARSET = new RegExp(`^[a-z${PINYIN_VOWELS}\\s'\\-]+$`, "i");
// Rōmaji and Revised Romanization: ASCII plus macrons for long vowels.
const RE_LATIN_ROMAN = /^[a-zāēīōūâêîôû\s'\-]+$/i;

// Tourist-phrasebook vocabulary has no place on a production line. Stage 4's
// model judge handles register properly; this only catches the blatant cases.
const TOURIST_TERMS = [
  "hotel", "restaurant", "menu", "sightseeing", "souvenir", "beach", "museum",
  "tour", "ticket", "passport", "airport", "taxi", "shopping", "postcard",
];

// ---------------- helpers ----------------
// Mirrors levenshtein() at index.html:1340. Lives here so the validators stay
// importable on their own; index.html switches to this copy during wiring so the
// two implementations cannot drift apart.
export function levenshtein(a, b) {
  const m = a.length, n = b.length;
  if (m === 0) return n;
  if (n === 0) return m;
  const dp = Array.from({ length: m + 1 }, () => new Array(n + 1).fill(0));
  for (let i = 0; i <= m; i++) dp[i][0] = i;
  for (let j = 0; j <= n; j++) dp[0][j] = j;
  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      const cost = a[i - 1] === b[j - 1] ? 0 : 1;
      dp[i][j] = Math.min(dp[i - 1][j] + 1, dp[i][j - 1] + 1, dp[i - 1][j - 1] + cost);
    }
  }
  return dp[m][n];
}

export function countPinyinSyllables(roman) {
  const runs = (roman || "").toLowerCase().match(RE_PINYIN_VOWEL_RUN);
  return runs ? runs.length : 0;
}

function fail(gate, detail, severity = "reject") {
  return { gate, detail, severity };
}

// ---------------- individual gates ----------------
export function checkScript(card) {
  const n = (card.n || "").trim();
  if (!n) return [fail("script", "native form is empty")];

  if (card.lang === "zh") {
    if (RE_HAS_HANGUL.test(n)) return [fail("script", "Hangul in a Mandarin card")];
    if (RE_HAS_KANA.test(n)) return [fail("script", "kana in a Mandarin card")];
    if (!RE_IDEOGRAPH_ONLY.test(n)) return [fail("script", "expected Han characters only")];
    return [];
  }

  if (card.lang === "ja") {
    if (RE_HAS_HANGUL.test(n)) return [fail("script", "Hangul in a Japanese card")];
    if (!RE_HAS_KANA.test(n) && !RE_HAS_IDEOGRAPH.test(n)) {
      return [fail("script", "expected kana or kanji")];
    }
    if (!RE_JA_ALLOWED.test(n)) return [fail("script", "unexpected characters for Japanese")];
    return [];
  }

  if (card.lang === "ko") {
    if (RE_HAS_IDEOGRAPH.test(n)) return [fail("script", "Han characters in a Korean card")];
    if (RE_HAS_KANA.test(n)) return [fail("script", "kana in a Korean card")];
    if (!RE_KO_ONLY.test(n)) return [fail("script", "expected Hangul only")];
    return [];
  }

  return [fail("script", `unknown language "${card.lang}"`)];
}

export function checkRomanization(card) {
  const r = (card.r || "").trim();
  if (!r) return [fail("romanization", "romanization is empty")];

  if (card.lang === "zh") {
    if (!RE_PINYIN_CHARSET.test(r)) return [fail("romanization", "not valid pinyin characters")];
    // Highest-yield gate: catches truncated and hallucinated pinyin that passes
    // a charset check. Han characters are one syllable each, so the counts must
    // agree exactly. Verified against all 64 seed Mandarin entries.
    const syllables = countPinyinSyllables(r);
    const chars = (card.n || "").replace(new RegExp(`[^${IDEOGRAPH}]`, "g"), "").length;
    if (syllables !== chars) {
      return [fail("romanization", `${syllables} pinyin syllables for ${chars} characters`)];
    }
    return [];
  }

  if (!RE_LATIN_ROMAN.test(r)) return [fail("romanization", "not valid romanization characters")];
  return [];
}

export function checkGloss(card) {
  const e = (card.e || "").trim();
  const out = [];
  if (!e) return [fail("gloss", "english gloss is empty")];
  if (e.length > 60) out.push(fail("gloss", `gloss is ${e.length} chars (max 60)`));
  // eslint-disable-next-line no-control-regex
  if (!/^[\x20-\x7E]+$/.test(e)) out.push(fail("gloss", "gloss must be printable ASCII"));
  if (normalizeNative(e) === normalizeNative(card.n)) {
    out.push(fail("gloss", "gloss is identical to the native form"));
  }
  return out;
}

// `existing` is the list of cards already in the deck for this language.
export function checkDuplicate(card, existing = []) {
  const norm = normalizeNative(card.n);
  if (!norm) return [fail("duplicate", "native form normalizes to empty")];

  for (const other of existing) {
    const otherNorm = normalizeNative(other.n);
    if (otherNorm === norm) {
      return [fail("duplicate", `exact duplicate of "${other.n}"`)];
    }
  }
  for (const other of existing) {
    const otherNorm = normalizeNative(other.n);
    // Distance 1 on short CJK strings is usually a real minimal pair (人/入),
    // so this flags for review rather than rejecting.
    if (Math.abs(otherNorm.length - norm.length) <= 1 && levenshtein(norm, otherNorm) <= 1) {
      return [fail("duplicate", `near-duplicate of "${other.n}"`, "flag")];
    }
  }
  return [];
}

export function checkRegister(card) {
  if (card.category !== "safety" && card.category !== "machines") return [];
  const gloss = (card.e || "").toLowerCase();
  const hit = TOURIST_TERMS.find(t => new RegExp(`\\b${t}\\b`).test(gloss));
  return hit ? [fail("register", `tourist term "${hit}" in the ${card.category} category`)] : [];
}

// ---------------- pipeline stage 2 ----------------
// Runs every gate and returns the full failure set rather than short-circuiting,
// so quarantined cards record every reason at once and a prompt can be fixed in
// one pass instead of one gate at a time.
export function validateCard(card, existing = []) {
  const failures = [
    ...checkScript(card),
    ...checkRomanization(card),
    ...checkGloss(card),
    ...checkDuplicate(card, existing),
    ...checkRegister(card),
  ];
  return {
    ok: failures.every(f => f.severity !== "reject"),
    failures,
    validatorVersion: VALIDATOR_VERSION,
  };
}
