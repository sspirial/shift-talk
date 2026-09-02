// Shift Talk - local scheduling and generation targeting.
// Pure functions: no DOM, storage, Firebase, or clock reads unless `now` is passed.

const DAY = 86400000;

export function nextIntervalDays(state, grade) {
  const reps = state.reps || 0;
  if (grade === "incorrect") return 0;
  if (reps === 0) return 1;
  if (reps === 1) return 3;
  return Math.max(1, Math.round((state.intervalDays || 1) * (state.ease || 2.5)));
}

export function dueRatio(cards, mastery, now = Date.now()) {
  if (!cards.length) return 0;
  const due = cards.filter(card => {
    const state = mastery.get(card.id);
    return !state || (!state.suppressed && state.due <= now);
  }).length;
  return due / cards.length;
}

export function targetGeneration({ cards, mastery, failures = [], now = Date.now(), minimumDue = 3, masteredRatio = 0.8 }) {
  const active = cards.filter(card => {
    const state = mastery.get(card.id);
    return !state || !state.suppressed;
  });
  const mastered = active.filter(card => {
    const state = mastery.get(card.id);
    return state && state.mastered;
  }).length;
  const ratio = active.length ? mastered / active.length : 0;
  const due = active.filter(card => {
    const state = mastery.get(card.id);
    return !state || state.due <= now;
  }).length;
  return {
    shouldGenerate: active.length > 0 && due < minimumDue && ratio >= masteredRatio,
    knownNative: cards.map(card => card.n),
    recentFailures: failures.slice(-10),
    difficulty: Math.min(5, Math.max(1, Math.floor(ratio * 5) + 1)),
    due,
    masteredRatio: ratio,
  };
}

export function dueDate(state, grade, reviewedAt) {
  return reviewedAt + nextIntervalDays(state, grade) * DAY;
}
