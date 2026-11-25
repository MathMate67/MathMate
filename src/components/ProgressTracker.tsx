import { useEffect, useState } from 'react';
import { BarChart3, Trash2, Target, CheckCircle2, Trophy, BookOpen } from 'lucide-react';
import ModalShell from './ModalShell';
import { accuracy, loadProgress, resetProgress, subscribe, type ProgressData } from '@/lib/progress';

type Props = { open: boolean; onClose: () => void };

function summary(d: ProgressData): string {
  if (d.attempted === 0) return 'Nothing yet. Answer a few questions in the Learning Zone or Challenge Zone and your progress will show up here.';
  const a = accuracy(d);
  if (a >= 80) return `Strong work. You have answered ${d.correct} of ${d.attempted} correctly (${a}%).`;
  if (a >= 50) return `Good progress. ${d.correct} of ${d.attempted} correct (${a}%). Keep practising and use the hints.`;
  return `You have answered ${d.correct} of ${d.attempted} correctly (${a}%). Every attempt helps. Try the Learning Zone lessons, then come back to the challenges.`;
}

export default function ProgressTracker({ open, onClose }: Props) {
  const [data, setData] = useState<ProgressData>(() => loadProgress());
  const [confirming, setConfirming] = useState(false);

  useEffect(() => {
    setData(loadProgress());
    return subscribe(setData);
  }, []);

  useEffect(() => {
    if (!open) setConfirming(false);
  }, [open]);

  const topics = Object.entries(data.topics);
  const stat = 'rounded-2xl bg-white border-2 border-slate-200 p-4 text-center';

  return (
    <ModalShell
      open={open}
      onClose={onClose}
      title="My Progress"
      subtitle="Saved only on this device. No account needed."
      icon={BarChart3}
      iconClass="bg-emerald-500 text-white"
      headerGradient="from-emerald-50 to-white"
      borderClass="border-emerald-200"
      maxWidth="max-w-xl"
    >
      <div className="grid grid-cols-3 gap-3">
        <div className={stat}>
          <Target className="w-5 h-5 mx-auto text-brand-blue" />
          <div className="mt-1 font-display text-2xl font-extrabold text-slate-800">{data.attempted}</div>
          <div className="text-xs font-semibold text-slate-500">Questions attempted</div>
        </div>
        <div className={stat}>
          <CheckCircle2 className="w-5 h-5 mx-auto text-emerald-500" />
          <div className="mt-1 font-display text-2xl font-extrabold text-slate-800">{data.correct}</div>
          <div className="text-xs font-semibold text-slate-500">Correct answers</div>
        </div>
        <div className={stat}>
          <Trophy className="w-5 h-5 mx-auto text-amber-500" />
          <div className="mt-1 font-display text-2xl font-extrabold text-slate-800">{data.correct}</div>
          <div className="text-xs font-semibold text-slate-500">Total points</div>
        </div>
      </div>
      <p className="text-xs text-slate-500 -mt-2">Each correct answer earns 1 point.</p>

      <div>
        <div className="flex items-center justify-between text-sm font-bold text-slate-700">
          <span>Accuracy</span>
          <span>{accuracy(data)}%</span>
        </div>
        <div
          className="mt-1.5 h-3 rounded-full bg-slate-100 overflow-hidden"
          role="progressbar"
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={accuracy(data)}
          aria-label="Accuracy"
        >
          <div className="h-full rounded-full bg-gradient-to-r from-brand-blue to-brand-purple transition-all" style={{ width: `${accuracy(data)}%` }} />
        </div>
      </div>

      <div className="rounded-2xl bg-emerald-50 border border-emerald-200 p-4 text-sm text-slate-700">{summary(data)}</div>

      <div className="grid sm:grid-cols-2 gap-3 text-sm">
        <div className="rounded-2xl bg-blue-50 border border-blue-200 p-4">
          <div className="flex items-center gap-1.5 font-display font-bold text-brand-blue"><BookOpen className="w-4 h-4" /> Learning Zone</div>
          <p className="mt-1 text-slate-700">{data.bySource.learning.correct} of {data.bySource.learning.attempted} correct</p>
          <p className="text-slate-700">{topics.length} topic{topics.length === 1 ? '' : 's'} finished</p>
        </div>
        <div className="rounded-2xl bg-violet-50 border border-violet-200 p-4">
          <div className="flex items-center gap-1.5 font-display font-bold text-brand-purple"><Trophy className="w-4 h-4" /> Challenge Zone</div>
          <p className="mt-1 text-slate-700">{data.bySource.challenge.correct} of {data.bySource.challenge.attempted} correct</p>
          <p className="text-slate-700">{data.rounds} round{data.rounds === 1 ? '' : 's'} played · best {data.bestChallenge} / 5</p>
        </div>
      </div>

      {topics.length > 0 && (
        <div>
          <h3 className="font-display font-bold text-slate-800 mb-2">Finished topics</h3>
          <ul className="space-y-1.5 text-sm">
            {topics.map(([key, t]) => (
              <li key={key} className="flex items-center justify-between rounded-xl bg-slate-50 px-3 py-2">
                <span className="font-semibold text-slate-700">{key}</span>
                <span className="font-bold text-slate-500">best {t.best} / {t.total}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className="pt-2 border-t border-slate-100">
        {!confirming ? (
          <button
            type="button"
            onClick={() => setConfirming(true)}
            className="inline-flex items-center gap-2 text-sm font-bold text-slate-500 hover:text-red-600 transition-colors"
          >
            <Trash2 className="w-4 h-4" /> Clear my progress
          </button>
        ) : (
          <div className="flex flex-wrap items-center gap-3 text-sm">
            <span className="font-semibold text-slate-700">Clear all progress on this device?</span>
            <button
              type="button"
              onClick={() => { resetProgress(); setConfirming(false); }}
              className="px-4 py-2 rounded-full bg-red-500 text-white font-bold hover:bg-red-600 active:scale-95 transition-all"
            >
              Yes, clear it
            </button>
            <button
              type="button"
              onClick={() => setConfirming(false)}
              className="px-4 py-2 rounded-full bg-white border-2 border-slate-200 text-slate-600 font-bold hover:bg-slate-50 active:scale-95 transition-all"
            >
              Keep it
            </button>
          </div>
        )}
      </div>
    </ModalShell>
  );
}
