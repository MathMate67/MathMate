// Progress tracking stored only in this browser (localStorage).
// No account, no server, no personal details. Each point = one correct answer.

export type Source = 'learning' | 'challenge';

export type ProgressData = {
  attempted: number;
  correct: number;
  bySource: Record<Source, { attempted: number; correct: number }>;
  // Learning Zone topics finished: "category/topic" -> best score and size
  topics: Record<string, { best: number; total: number }>;
  bestChallenge: number; // best score in one 5-question round
  rounds: number;
};

const KEY = 'mathmate-progress-v1';

export function emptyProgress(): ProgressData {
  return {
    attempted: 0,
    correct: 0,
    bySource: {
      learning: { attempted: 0, correct: 0 },
      challenge: { attempted: 0, correct: 0 },
    },
    topics: {},
    bestChallenge: 0,
    rounds: 0,
  };
}

function isNum(v: unknown): v is number {
  return typeof v === 'number' && Number.isFinite(v) && v >= 0;
}

// Accepts anything read from storage and returns safe, valid data.
export function sanitize(raw: unknown): ProgressData {
  const base = emptyProgress();
  if (!raw || typeof raw !== 'object') return base;
  const r = raw as Partial<ProgressData>;
  if (isNum(r.attempted)) base.attempted = r.attempted;
  if (isNum(r.correct)) base.correct = Math.min(r.correct, base.attempted);
  if (isNum(r.bestChallenge)) base.bestChallenge = r.bestChallenge;
  if (isNum(r.rounds)) base.rounds = r.rounds;
  for (const s of ['learning', 'challenge'] as Source[]) {
    const v = r.bySource?.[s];
    if (v && isNum(v.attempted) && isNum(v.correct)) {
      base.bySource[s] = { attempted: v.attempted, correct: Math.min(v.correct, v.attempted) };
    }
  }
  if (r.topics && typeof r.topics === 'object') {
    for (const [k, v] of Object.entries(r.topics)) {
      if (v && isNum(v.best) && isNum(v.total) && v.total > 0) {
        base.topics[k] = { best: Math.min(v.best, v.total), total: v.total };
      }
    }
  }
  return base;
}

export function applyAnswer(data: ProgressData, source: Source, isCorrect: boolean): ProgressData {
  const next: ProgressData = JSON.parse(JSON.stringify(data));
  next.attempted += 1;
  next.bySource[source].attempted += 1;
  if (isCorrect) {
    next.correct += 1;
    next.bySource[source].correct += 1;
  }
  return next;
}

export function applyTopicFinished(data: ProgressData, topicKey: string, score: number, total: number): ProgressData {
  const next: ProgressData = JSON.parse(JSON.stringify(data));
  const prev = next.topics[topicKey];
  if (!prev || score > prev.best) next.topics[topicKey] = { best: score, total };
  return next;
}

export function applyRoundFinished(data: ProgressData, score: number): ProgressData {
  const next: ProgressData = JSON.parse(JSON.stringify(data));
  next.rounds += 1;
  if (score > next.bestChallenge) next.bestChallenge = score;
  return next;
}

export function accuracy(data: ProgressData): number {
  return data.attempted === 0 ? 0 : Math.round((data.correct / data.attempted) * 100);
}

// ---- browser storage (wrapped so a blocked/full storage never breaks the app) ----

type Listener = (d: ProgressData) => void;
const listeners = new Set<Listener>();
let cache: ProgressData | null = null;

export function loadProgress(): ProgressData {
  if (cache) return cache;
  try {
    const text = window.localStorage.getItem(KEY);
    cache = sanitize(text ? JSON.parse(text) : null);
  } catch {
    cache = emptyProgress();
  }
  return cache;
}

function commit(next: ProgressData) {
  cache = next;
  try {
    window.localStorage.setItem(KEY, JSON.stringify(next));
  } catch {
    /* storage unavailable: progress lasts for this visit only */
  }
  listeners.forEach((l) => l(next));
}

export function recordAnswer(source: Source, isCorrect: boolean) {
  commit(applyAnswer(loadProgress(), source, isCorrect));
}
export function recordTopicFinished(topicKey: string, score: number, total: number) {
  commit(applyTopicFinished(loadProgress(), topicKey, score, total));
}
export function recordRoundFinished(score: number) {
  commit(applyRoundFinished(loadProgress(), score));
}
export function resetProgress() {
  commit(emptyProgress());
}
export function subscribe(l: Listener): () => void {
  listeners.add(l);
  return () => listeners.delete(l);
}
