// Generation pipeline. Model calls are injected so validation remains testable
// offline and Firebase AI Logic stays an optional transport.

import {
  cardId,
  enqueueOutbox,
  loadQuarantine,
  saveGeneratedCards,
  saveQuarantine,
} from "./store.js";
import { validateCard } from "./validate.js";

export const PROMPT_VERSION = 1;

const DEFAULT_SCHEMA = {
  type: "ARRAY",
  items: {
    type: "OBJECT",
    properties: {
      n: { type: "STRING" }, r: { type: "STRING" }, e: { type: "STRING" },
    },
    required: ["n", "r", "e"],
  },
};

export function normalizeGeneratedCard(raw, lang, category) {
  const card = { lang, category, n: String(raw?.n || "").trim(), r: String(raw?.r || "").trim(), e: String(raw?.e || "").trim() };
  card.id = cardId(lang, card.n);
  return card;
}

export async function runGeneration({ lang, category, target, knownCards = [], model, judge, backTranslate, persist = true, now = Date.now(), modelId = "unknown" }) {
  if (typeof model !== "function") throw new Error("generation model is required");
  const prompt = {
    version: PROMPT_VERSION, lang, category, difficulty: target?.difficulty || 1,
    knownNative: target?.knownNative || knownCards.map(card => card.n),
    recentFailures: target?.recentFailures || [],
  };
  const rawCards = await model(prompt, DEFAULT_SCHEMA);
  const candidates = Array.isArray(rawCards) ? rawCards : (rawCards?.cards || []);
  const existing = [...knownCards];
  const promoted = [];
  const quarantined = [];
  for (const raw of candidates) {
    const card = normalizeGeneratedCard(raw, lang, category);
    const deterministic = validateCard(card, existing);
    let failures = [...deterministic.failures];
    if (deterministic.ok && typeof backTranslate === "function") {
      const returned = await backTranslate({ lang, native: card.n });
      if (!returned || !gradeEnglishAttempt(card.e, returned)) {
        failures.push({ gate: "back-translation", detail: "blind translation did not match gloss", severity: "reject" });
      }
    }
    if (deterministic.ok && failures.every(failure => failure.severity !== "reject") && typeof judge === "function") {
      const verdict = await judge({ ...card, category });
      if (!verdict || verdict.ok === false) {
        failures.push(...(verdict?.failures || [{ gate: "register", detail: "judge rejected card", severity: "reject" }]));
      }
    }
    const provenance = { modelId, promptVersion: PROMPT_VERSION, validatorVersion: deterministic.validatorVersion, generatedAt: now };
    if (failures.some(failure => failure.severity === "reject")) {
      quarantined.push({ ...card, status: "quarantine", failures, provenance });
    } else {
      const active = { ...card, status: "active", provenance };
      promoted.push(active);
      existing.push(active);
    }
  }
  if (persist) {
    if (promoted.length) {
      saveGeneratedCards([...knownCards, ...promoted]);
      promoted.forEach(card => enqueueOutbox({ kind: "card", id: card.id, value: card }));
    }
    if (quarantined.length) {
      const existingQuarantine = loadQuarantine();
      saveQuarantine([...existingQuarantine, ...quarantined]);
      quarantined.forEach(card => enqueueOutbox({ kind: "quarantine", id: card.id, value: card }));
    }
  }
  return { promoted, quarantined, promptVersion: PROMPT_VERSION };
}

function gradeEnglishAttempt(expected, actual) {
  const expectedWords = expected.toLowerCase().replace(/[^a-z\s]/g, "").split(/\s+/).filter(Boolean);
  const cleanActual = ` ${String(actual).toLowerCase().replace(/[^a-z\s]/g, "")} `;
  if (!expectedWords.length) return false;
  const hits = expectedWords.filter(word => cleanActual.includes(` ${word} `) || cleanActual.includes(word)).length;
  return hits / expectedWords.length >= 0.4;
}

export { DEFAULT_SCHEMA };
