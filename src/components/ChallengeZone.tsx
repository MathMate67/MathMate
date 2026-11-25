import { useCallback, useEffect, useMemo, useState } from 'react';
import { RotateCcw, ArrowRight, Lightbulb, Trophy, CheckCircle2, XCircle, AlertCircle, Swords } from 'lucide-react';
import ModalShell from './ModalShell';
import { recordAnswer, recordRoundFinished } from '@/lib/progress';

type Props = { open: boolean; onClose: () => void };
type Op = '+' | '-' | '×' | '÷';

type QuizQ = {
  text: string;
  answer: number;
  choices: number[];
  hint: string;
  steps: string[];
};

const ROUND_SIZE = 5;

function randInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function makeQuestion(): QuizQ {
  const ops: Op[] = ['+', '-', '×', '÷'];
  const op = ops[randInt(0, ops.length - 1)];
  let a: number, b: number, answer: number;
  let text: string;
  let hint: string;
  let steps: string[];

  switch (op) {
    case '+': {
      a = randInt(5, 99);
      b = randInt(5, 99);
      answer = a + b;
      text = `${a} + ${b}`;
      hint = `Start at ${a} and count up ${b}.`;
      steps = [`${a} + ${b} = ${answer}`];
      break;
    }
    case '-': {
      a = randInt(20, 99);
      b = randInt(1, a - 1);
      answer = a - b;
      text = `${a} − ${b}`;
      hint = `Start at ${a} and count down ${b}.`;
      steps = [`${a} − ${b} = ${answer}`];
      break;
    }
    case '×': {
      a = randInt(2, 12);
      b = randInt(2, 12);
      answer = a * b;
      text = `${a} × ${b}`;
      hint = `Think of it as adding ${a} to itself ${b} times.`;
      steps = [`${a} + ${a}${b > 2 ? ` + … (${b} times)` : ''} = ${answer}`, `${a} × ${b} = ${answer}`];
      break;
    }
    case '÷': {
      b = randInt(2, 12);
      answer = randInt(2, 12);
      a = b * answer;
      text = `${a} ÷ ${b}`;
      hint = `How many ${b}s fit into ${a}? Try counting up in ${b}s.`;
      steps = [`${b} × ${answer} = ${a}`, `So ${a} ÷ ${b} = ${answer}`];
      break;
    }
  }

  // Build 4 unique choices
  const choiceSet = new Set<number>([answer]);
  let guard = 0;
  while (choiceSet.size < 4 && guard < 50) {
    guard++;
    const delta = randInt(1, 12) * (Math.random() < 0.5 ? 1 : -1);
    const cand = answer + delta;
    if (cand >= 0 && cand !== answer) choiceSet.add(cand);
  }
  while (choiceSet.size < 4) choiceSet.add(answer + choiceSet.size);

  return { text, answer, choices: shuffle([...choiceSet]), hint, steps };
}

type Status = 'playing' | 'answered';

export default function ChallengeZone({ open, onClose }: Props) {
  const [questions, setQuestions] = useState<QuizQ[]>([]);
  const [index, setIndex] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [status, setStatus] = useState<Status>('playing');
  const [score, setScore] = useState(0);
  const [hintOpen, setHintOpen] = useState(false);
  const [finished, setFinished] = useState(false);

  const startRound = useCallback(() => {
    setQuestions(Array.from({ length: ROUND_SIZE }, makeQuestion));
    setIndex(0);
    setSelected(null);
    setStatus('playing');
    setScore(0);
    setHintOpen(false);
    setFinished(false);
  }, []);

  // Auto-start a round when first opened
  useEffect(() => {
    if (open && questions.length === 0) startRound();
  }, [open, questions.length, startRound]);

  const current = questions[index];

  const choose = (val: number) => {
    if (status !== 'playing' || !current) return;
    const isCorrect = val === current.answer;
    setSelected(val);
    setStatus('answered');
    if (isCorrect) setScore((s) => s + 1);
    recordAnswer('challenge', isCorrect);
  };

  const next = () => {
    if (index < questions.length - 1) {
      setIndex((i) => i + 1);
      setSelected(null);
      setStatus('playing');
      setHintOpen(false);
    } else {
      setFinished(true);
      recordRoundFinished(score);
    }
  };

  const progress = useMemo(() => `${Math.min(index + (status === 'answered' ? 1 : 0), questions.length)} / ${questions.length}`, [index, status, questions.length]);

  const iconColor = 'bg-brand-purple text-white';

  return (
    <ModalShell
      open={open}
      onClose={() => { setQuestions([]); onClose(); }}
      title="Challenge Zone"
      subtitle="5 random questions. Beat your best score!"
      icon={Swords}
      iconClass={iconColor}
      headerGradient="from-violet-50 to-white"
      borderClass="border-violet-200"
      maxWidth="max-w-lg"
    >
      {finished ? (
        <div className="text-center py-6 animate-fade-up">
          <div className={`mx-auto w-16 h-16 rounded-full flex items-center justify-center mb-4 ${score >= 4 ? 'bg-emerald-100' : score >= 3 ? 'bg-amber-100' : 'bg-violet-100'}`}>
            {score >= 4 ? <Trophy className="w-8 h-8 text-emerald-600" /> : <Swords className="w-8 h-8 text-brand-purple" />}
          </div>
          <h3 className="font-display text-2xl font-extrabold text-slate-800">
            You scored {score} / {questions.length}
          </h3>
          <p className="mt-2 text-slate-600">
            {score === questions.length ? 'Flawless! Every answer correct.' :
             score >= 3 ? 'Strong effort — nearly there!' :
             'Good practice. Give it another go!'}
          </p>
          <button onClick={startRound}
            className="mt-6 inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-brand-purple text-white font-bold shadow-soft hover:bg-violet-600 active:scale-95 transition-all">
            <RotateCcw className="w-5 h-5" /> Play again
          </button>
        </div>
      ) : current ? (
        <>
          {/* Score + progress */}
          <div className="flex items-center justify-between gap-3">
            <span className="inline-flex items-center gap-1.5 text-sm font-bold text-brand-purple">
              <Trophy className="w-4 h-4" /> {score} points
            </span>
            <span className="text-sm font-bold text-slate-500">{progress}</span>
          </div>
          {/* Progress bar */}
          <div className="h-2 rounded-full bg-slate-100 overflow-hidden">
            <div className="h-full rounded-full bg-gradient-to-r from-brand-blue to-brand-purple transition-all"
              style={{ width: `${((index + (status === 'answered' ? 1 : 0)) / questions.length) * 100}%` }} />
          </div>

          {/* Question */}
          <div className="rounded-3xl bg-slate-50 border border-slate-200 p-5">
            <p className="text-sm font-bold text-slate-500 uppercase tracking-wide">What is</p>
            <p className="font-display text-3xl font-extrabold text-slate-800 mt-1">{current.text} = ?</p>

            <div className="mt-5 grid sm:grid-cols-2 gap-2.5">
              {current.choices.map((c, i) => {
                const isAnswer = c === current.answer;
                const isChosen = selected === c;
                let cls = 'bg-white border-slate-200 hover:border-brand-blue hover:bg-blue-50/40';
                if (status === 'answered' && isAnswer) cls = 'bg-emerald-50 border-emerald-300 text-emerald-800';
                else if (status === 'answered' && isChosen && !isAnswer) cls = 'bg-red-50 border-red-300 text-red-700';
                else if (status === 'answered') cls = 'bg-white border-slate-200 opacity-60';
                return (
                  <button key={i} onClick={() => choose(c)} disabled={status === 'answered'}
                    className={`px-4 py-3.5 rounded-2xl border-2 font-bold text-lg transition-all ${cls} disabled:cursor-default`}>
                    <span className="flex items-center gap-2">
                      {status === 'answered' && isAnswer && <CheckCircle2 className="w-5 h-5 text-emerald-500" />}
                      {status === 'answered' && isChosen && !isAnswer && <XCircle className="w-5 h-5 text-red-500" />}
                      {c}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Hint */}
            <div className="mt-4">
              {!hintOpen && status === 'playing' && (
                <button onClick={() => setHintOpen(true)}
                  className="inline-flex items-center gap-1.5 text-sm font-bold text-amber-600 hover:underline">
                  <Lightbulb className="w-4 h-4" /> Show a hint
                </button>
              )}
              {hintOpen && (
                <div className="rounded-xl bg-amber-50 border border-amber-200 p-3 text-sm text-amber-800 animate-fade-up">
                  <Lightbulb className="w-4 h-4 inline mr-1" /> {current.hint}
                </div>
              )}
            </div>

            {/* Result + steps */}
            {status === 'answered' && (
              <div className="mt-4 animate-fade-up space-y-3">
                <div className={`flex items-center gap-2 p-3 rounded-xl ${selected === current.answer ? 'bg-emerald-50 text-emerald-700' : 'bg-red-50 text-red-700'}`}>
                  {selected === current.answer ? <CheckCircle2 className="w-5 h-5" /> : <XCircle className="w-5 h-5" />}
                  <span className="font-bold text-sm">
                    {selected === current.answer ? 'Correct! +1 point' : `Not quite. The answer is ${current.answer}.`}
                  </span>
                </div>
                <div className="rounded-xl bg-white border border-slate-200 p-3">
                  <div className="text-xs font-bold text-slate-500 uppercase tracking-wide mb-1.5">How to solve it</div>
                  <ol className="space-y-1 text-sm text-slate-700">
                    {current.steps.map((s, i) => (
                      <li key={i} className="flex gap-2"><span className="font-bold text-brand-blue">{i + 1}.</span> {s}</li>
                    ))}
                  </ol>
                </div>
                <button onClick={next}
                  className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full bg-brand-blue text-white font-bold hover:bg-blue-600 active:scale-95 transition-all">
                  {index < questions.length - 1 ? 'Next question' : 'See results'} <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>

          <div className="flex items-center gap-2 text-xs text-slate-400">
            <AlertCircle className="w-3.5 h-3.5" />
            <span>Hints don't reveal the answer — just a nudge in the right direction.</span>
          </div>
        </>
      ) : (
        <div className="text-center py-8">
          <p className="text-slate-600">Get ready for your challenge.</p>
          <button onClick={startRound}
            className="mt-4 inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-brand-purple text-white font-bold hover:bg-violet-600 active:scale-95 transition-all">
            <Swords className="w-5 h-5" /> Start challenge
          </button>
        </div>
      )}
    </ModalShell>
  );
}
