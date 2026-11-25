import { useEffect, useMemo, useState } from 'react';
import { CheckCircle2, XCircle, RotateCcw, ArrowRight, Lightbulb, HelpCircle, Trophy, Dumbbell } from 'lucide-react';
import ModalShell from './ModalShell';
import { recordAnswer, recordTopicFinished } from '@/lib/progress';

type Choice = number | string;

type Question = {
  prompt: string;
  choices: Choice[];
  answer: Choice;
  hint: string;
  steps: string[];
};

type Topic = {
  id: string;
  title: string;
  explain: string;
  questions: Question[];
};

type Category = {
  id: string;
  title: string;
  badge: string;
  topics: Topic[];
};

const CATEGORIES: Category[] = [
  {
    id: 'kids',
    title: 'Kids',
    badge: 'Ages 5-10',
    topics: [
      {
        id: 'counting',
        title: 'Counting',
        explain: 'Counting tells us how many things there are. Start from 1 and point at each item as you count: 1, 2, 3, 4...',
        questions: [
          { prompt: 'How many fingers are on one hand?', choices: [3, 5, 7, 10], answer: 5, hint: 'Count each finger one by one.', steps: ['1, 2, 3, 4, 5 — that is 5 fingers on one hand.'] },
          { prompt: 'Count: 🍎 🍎 🍎 🍎. How many apples?', choices: [3, 4, 5, 6], answer: 4, hint: 'Point at each apple and count aloud.', steps: ['1, 2, 3, 4 — there are 4 apples.'] },
        ],
      },
      {
        id: 'addition',
        title: 'Addition',
        explain: 'Addition means putting things together. 2 + 3 means you have 2, then get 3 more, so you have 5 in total.',
        questions: [
          { prompt: 'What is 4 + 3?', choices: [6, 7, 8, 5], answer: 7, hint: 'Start at 4 and count up 3 more: 5, 6, 7.', steps: ['4 + 3 = 7'] },
          { prompt: 'What is 6 + 5?', choices: [10, 11, 12, 9], answer: 11, hint: 'Count up from 6 five times.', steps: ['6, 7, 8, 9, 10, 11 — so 6 + 5 = 11.'] },
        ],
      },
      {
        id: 'subtraction',
        title: 'Subtraction',
        explain: 'Subtraction means taking away. 8 − 3 means you have 8 and remove 3, leaving 5.',
        questions: [
          { prompt: 'What is 9 − 4?', choices: [4, 5, 6, 3], answer: 5, hint: 'Count down from 9 four times.', steps: ['9, 8, 7, 6, 5 — so 9 − 4 = 5.'] },
          { prompt: 'What is 10 − 7?', choices: [2, 4, 3, 5], answer: 3, hint: 'Take 7 away from 10.', steps: ['10 − 7 = 3'] },
        ],
      },
      {
        id: 'multiplication',
        title: 'Multiplication basics',
        explain: 'Multiplication is repeated addition. 3 × 2 means 3 added twice: 3 + 3 = 6.',
        questions: [
          { prompt: 'What is 2 × 3?', choices: [5, 6, 8, 4], answer: 6, hint: '2 added three times: 2 + 2 + 2.', steps: ['2 + 2 + 2 = 6, so 2 × 3 = 6.'] },
          { prompt: 'What is 5 × 2?', choices: [10, 7, 12, 8], answer: 10, hint: '5 added twice.', steps: ['5 + 5 = 10, so 5 × 2 = 10.'] },
        ],
      },
      {
        id: 'shapes',
        title: 'Shapes',
        explain: 'Shapes are all around us. A circle is round, a triangle has 3 sides, a square has 4 equal sides, and a rectangle has 4 sides with two long and two short.',
        questions: [
          { prompt: 'How many sides does a triangle have?', choices: [2, 3, 4, 5], answer: 3, hint: 'Tri means three.', steps: ['A triangle has 3 sides.'] },
          { prompt: 'Which shape has 4 equal sides?', choices: ['Circle', 'Triangle', 'Square', 'Oval'], answer: 'Square', hint: 'Think of a window or a chess board square.', steps: ['A square has 4 sides, all the same length.'] },
          { prompt: 'Which shape has no corners?', choices: ['Square', 'Circle', 'Triangle', 'Rectangle'], answer: 'Circle', hint: 'It is perfectly round.', steps: ['A circle is curved all the way round, so it has no corners.'] },
        ],
      },
    ],
  },
  {
    id: 'students',
    title: 'Students',
    badge: 'School & college',
    topics: [
      {
        id: 'fractions',
        title: 'Fractions',
        explain: 'A fraction shows a part of a whole. In 3/4, the top (3) is how many parts you have and the bottom (4) is how many equal parts the whole is split into.',
        questions: [
          { prompt: 'What is 1/2 + 1/4?', choices: ['3/4', '2/6', '1/6', '1/3'], answer: '3/4', hint: 'Make the bottoms the same first. 1/2 = 2/4.', steps: ['1/2 = 2/4', '2/4 + 1/4 = 3/4'] },
          { prompt: 'Simplify 6/8.', choices: ['3/4', '2/4', '1/2', '6/4'], answer: '3/4', hint: 'Divide top and bottom by the same number.', steps: ['Divide both by 2: 6 ÷ 2 = 3, 8 ÷ 2 = 4.', 'So 6/8 = 3/4.'] },
        ],
      },
      {
        id: 'percentages',
        title: 'Percentages',
        explain: 'A percentage is a number out of 100. 25% means 25 out of 100, which is the same as 1/4 or 0.25.',
        questions: [
          { prompt: 'What is 20% of 50?', choices: [5, 10, 15, 20], answer: 10, hint: '20% = 0.2. Multiply 50 by 0.2.', steps: ['20% = 20/100 = 0.2', '50 × 0.2 = 10'] },
          { prompt: 'Express 0.75 as a percentage.', choices: ['7.5%', '75%', '0.75%', '750%'], answer: '75%', hint: 'Multiply by 100 and add the % sign.', steps: ['0.75 × 100 = 75, so 75%.'] },
        ],
      },
      {
        id: 'algebra',
        title: 'Algebra',
        explain: 'Algebra uses letters for unknown numbers. If x + 5 = 12, we solve by finding what number plus 5 gives 12 — that is 7.',
        questions: [
          { prompt: 'Solve: x + 7 = 15', choices: [6, 7, 8, 9], answer: 8, hint: 'What number plus 7 equals 15?', steps: ['x = 15 − 7', 'x = 8'] },
          { prompt: 'Solve: 3x = 21', choices: [6, 7, 8, 9], answer: 7, hint: 'Divide both sides by 3.', steps: ['x = 21 ÷ 3', 'x = 7'] },
        ],
      },
      {
        id: 'geometry',
        title: 'Geometry',
        explain: 'Geometry is about shapes and angles. A triangle has 3 sides, a rectangle has 4 right angles, and angles in a triangle always add up to 180°.',
        questions: [
          { prompt: 'Angles in a triangle add up to…', choices: ['90°', '180°', '270°', '360°'], answer: '180°', hint: 'Think about a flat line.', steps: ['The three inside angles of any triangle always total 180°.'] },
          { prompt: 'How many sides does a hexagon have?', choices: [5, 6, 7, 8], answer: 6, hint: '"Hex" means six.', steps: ['A hexagon has 6 sides.'] },
        ],
      },
    ],
  },
  {
    id: 'adults',
    title: 'Adults',
    badge: 'Everyday life',
    topics: [
      {
        id: 'percentages',
        title: 'Percentages',
        explain: 'Percentages pop up in discounts, taxes and tips. To find p% of an amount, multiply the amount by p ÷ 100.',
        questions: [
          { prompt: 'A ₹1000 bill has 18% tax. How much is the tax?', choices: [80, 180, 18, 1180], answer: 180, hint: '1000 × 18 ÷ 100.', steps: ['1000 × 0.18 = 180'] },
          { prompt: 'A ₹400 item is 25% off. How much do you save?', choices: [50, 75, 100, 25], answer: 100, hint: '25% of 400.', steps: ['400 × 0.25 = 100'] },
        ],
      },
      {
        id: 'ratios',
        title: 'Ratios',
        explain: 'A ratio compares quantities. A 2:3 ratio of sugar to flour means for every 2 cups of sugar you use 3 cups of flour.',
        questions: [
          { prompt: 'Split ₹500 in a 2:3 ratio. Smaller share is…', choices: [100, 150, 200, 250], answer: 200, hint: 'Total parts = 2 + 3 = 5. Each part = ₹100.', steps: ['Total parts = 5', '500 ÷ 5 = 100 per part', 'Smaller share = 2 × 100 = 200'] },
          { prompt: 'A recipe needs 3 eggs for 2 people. For 4 people you need…', choices: [4, 5, 6, 8], answer: 6, hint: 'Double the people, double the eggs.', steps: ['4 people = 2 × 2 people', '3 × 2 = 6 eggs'] },
        ],
      },
      {
        id: 'interest',
        title: 'Simple interest',
        explain: 'Simple interest is a fixed yearly percentage of the money you save or borrow. Interest = Principal × Rate × Time ÷ 100.',
        questions: [
          { prompt: 'Interest on ₹1000 at 10% for 1 year is…', choices: [10, 100, 1000, 1100], answer: 100, hint: '1000 × 10 × 1 ÷ 100.', steps: ['I = (P × R × T) / 100', 'I = (1000 × 10 × 1) / 100 = 100'] },
          { prompt: '₹2000 at 5% for 2 years. Interest = ?', choices: [100, 200, 400, 50], answer: 200, hint: '2000 × 5 × 2 ÷ 100.', steps: ['I = (2000 × 5 × 2) / 100 = 200'] },
        ],
      },
      {
        id: 'practical',
        title: 'Practical calculations',
        explain: 'Everyday maths: split a bill, convert units, work out cost per item. Always check your answer makes sense.',
        questions: [
          { prompt: 'A ₹1200 bill split among 4 people is… each.', choices: [200, 300, 400, 350], answer: 300, hint: 'Divide 1200 by 4.', steps: ['1200 ÷ 4 = 300'] },
          { prompt: '5 km in litres: if mileage is 20 km/l, fuel used is…', choices: ['0.25 l', '0.5 l', '1 l', '4 l'], answer: '0.25 l', hint: 'Distance ÷ mileage.', steps: ['5 ÷ 20 = 0.25 litres'] },
        ],
      },
    ],
  },
];

type Props = { open: boolean; onClose: () => void; initialCategory?: string | null };

export default function LearningZone({ open, onClose, initialCategory = null }: Props) {
  const [catId, setCatId] = useState<string | null>(null);
  const [topicId, setTopicId] = useState<string | null>(null);
  const [selected, setSelected] = useState<Choice | null>(null);
  const [revealed, setRevealed] = useState(false);
  const [hintOpen, setHintOpen] = useState(false);
  const [score, setScore] = useState(0);
  const [qIndex, setQIndex] = useState(0);

  // When opened from a card (Kids / Students / Adults), jump straight to that category.
  useEffect(() => {
    if (!open) return;
    setCatId(initialCategory && CATEGORIES.some((c) => c.id === initialCategory) ? initialCategory : null);
    setTopicId(null);
    setSelected(null);
    setRevealed(false);
    setHintOpen(false);
    setScore(0);
    setQIndex(0);
  }, [open, initialCategory]);

  const category = CATEGORIES.find((c) => c.id === catId) || null;
  const topic = category?.topics.find((t) => t.id === topicId) || null;
  const question = useMemo(() => topic?.questions[qIndex] || null, [topic, qIndex]);

  const pickCategory = (id: string) => {
    setCatId(id);
    setTopicId(null);
    setSelected(null);
    setRevealed(false);
    setHintOpen(false);
    setScore(0);
    setQIndex(0);
  };

  const pickTopic = (id: string) => {
    setTopicId(id);
    setSelected(null);
    setRevealed(false);
    setHintOpen(false);
    setScore(0);
    setQIndex(0);
  };

  const choose = (val: Choice) => {
    if (revealed || !question) return;
    const isCorrect = val === question.answer;
    setSelected(val);
    setRevealed(true);
    if (isCorrect) setScore((s) => s + 1);
    recordAnswer('learning', isCorrect);
  };

  const next = () => {
    if (!topic) return;
    if (qIndex < topic.questions.length - 1) {
      setQIndex((i) => i + 1);
      setSelected(null);
      setRevealed(false);
      setHintOpen(false);
    } else {
      setQIndex(topic.questions.length); // triggers finished state
      if (category) recordTopicFinished(`${category.title} · ${topic.title}`, score, topic.questions.length);
    }
  };

  const restartTopic = () => {
    setQIndex(0);
    setSelected(null);
    setRevealed(false);
    setHintOpen(false);
    setScore(0);
  };

  const finished = topic !== null && qIndex >= topic.questions.length;
  const iconColor = category?.id === 'kids' ? 'bg-brand-yellow text-amber-700'
    : category?.id === 'students' ? 'bg-brand-blue text-white'
    : category?.id === 'adults' ? 'bg-brand-purple text-white'
    : 'bg-brand-blue text-white';

  return (
    <ModalShell
      open={open}
      onClose={() => { setCatId(null); setTopicId(null); onClose(); }}
      title="Learning Zone"
      subtitle="Pick a category, learn the basics, and practice as you go."
      icon={HelpCircle}
      iconClass={iconColor}
      headerGradient="from-blue-50 to-white"
      borderClass="border-blue-200"
      maxWidth="max-w-xl"
    >
      {/* Category selection */}
      {!category && (
        <div className="grid gap-3">
          {CATEGORIES.map((c) => (
            <button key={c.id} onClick={() => pickCategory(c.id)}
              className="flex items-center gap-4 p-4 rounded-2xl bg-white border-2 border-slate-200 hover:border-brand-blue hover:shadow-soft transition-all text-left group">
              <span className={`flex items-center justify-center w-11 h-11 rounded-2xl ${
                c.id === 'kids' ? 'bg-brand-sand text-amber-700' : c.id === 'students' ? 'bg-blue-50 text-brand-blue' : 'bg-violet-50 text-brand-purple'
              } font-display font-extrabold`}>
                {c.title[0]}
              </span>
              <div className="flex-1">
                <div className="font-display font-bold text-slate-800">{c.title}</div>
                <div className="text-xs text-slate-500 font-medium">{c.badge} · {c.topics.length} topics</div>
              </div>
              <ArrowRight className="w-5 h-5 text-slate-300 group-hover:text-brand-blue group-hover:translate-x-1 transition-all" />
            </button>
          ))}
        </div>
      )}

      {/* Topic selection */}
      {category && !topic && (
        <>
          <button onClick={() => setCatId(null)} className="text-sm font-bold text-brand-blue hover:underline mb-1">
            ← Back to categories
          </button>
          <div className="grid gap-3">
            {category.topics.map((t) => (
              <button key={t.id} onClick={() => pickTopic(t.id)}
                className="flex items-center gap-4 p-4 rounded-2xl bg-white border-2 border-slate-200 hover:border-brand-blue hover:shadow-soft transition-all text-left group">
                <span className="flex items-center justify-center w-10 h-10 rounded-xl bg-slate-100 text-slate-600 font-display font-bold text-sm">
                  {t.title[0]}
                </span>
                <div className="flex-1">
                  <div className="font-display font-bold text-slate-800">{t.title}</div>
                  <div className="text-xs text-slate-500 font-medium">{t.questions.length} practice questions</div>
                </div>
                <ArrowRight className="w-5 h-5 text-slate-300 group-hover:text-brand-blue group-hover:translate-x-1 transition-all" />
              </button>
            ))}
          </div>
        </>
      )}

      {/* Question view */}
      {category && topic && question && (
        <>
          <div className="flex items-center justify-between gap-3">
            <button onClick={() => setTopicId(null)} className="text-sm font-bold text-brand-blue hover:underline">
              ← Back to {category.title} topics
            </button>
            <span className="text-sm font-bold text-slate-500">
              Question {qIndex + 1} of {topic.questions.length} · Score {score}
            </span>
          </div>

          {/* Explanation */}
          <div className="rounded-2xl bg-blue-50 border border-blue-200 p-4">
            <div className="flex items-center gap-2 mb-1.5">
              <Lightbulb className="w-4 h-4 text-brand-blue" />
              <h3 className="font-display font-bold text-brand-blue text-sm">{topic.title} — the basics</h3>
            </div>
            <p className="text-sm text-slate-700 leading-relaxed">{topic.explain}</p>
          </div>

          {/* Question */}
          <div className="rounded-3xl bg-slate-50 border border-slate-200 p-5">
            <p className="font-display text-lg font-bold text-slate-800">{question.prompt}</p>
            <div className="mt-4 grid sm:grid-cols-2 gap-2.5">
              {question.choices.map((choice, i) => {
                const isAnswer = choice === question.answer;
                const isChosen = selected === choice;
                let cls = 'bg-white border-slate-200 hover:border-brand-blue hover:bg-blue-50/40';
                if (revealed && isAnswer) cls = 'bg-emerald-50 border-emerald-300 text-emerald-800';
                else if (revealed && isChosen && !isAnswer) cls = 'bg-red-50 border-red-300 text-red-700';
                else if (revealed) cls = 'bg-white border-slate-200 opacity-60';
                return (
                  <button key={i} onClick={() => choose(choice)} disabled={revealed}
                    className={`text-left px-4 py-3 rounded-2xl border-2 font-semibold transition-all ${cls} disabled:cursor-default`}>
                    <span className="flex items-center gap-2">
                      {revealed && isAnswer && <CheckCircle2 className="w-4 h-4 text-emerald-500" />}
                      {revealed && isChosen && !isAnswer && <XCircle className="w-4 h-4 text-red-500" />}
                      {choice}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Hint */}
            <div className="mt-4">
              {!hintOpen && !revealed && (
                <button onClick={() => setHintOpen(true)}
                  className="inline-flex items-center gap-1.5 text-sm font-bold text-amber-600 hover:underline">
                  <Lightbulb className="w-4 h-4" /> Need a hint?
                </button>
              )}
              {hintOpen && (
                <div className="rounded-xl bg-amber-50 border border-amber-200 p-3 text-sm text-amber-800 animate-fade-up">
                  <Lightbulb className="w-4 h-4 inline mr-1" /> {question.hint}
                </div>
              )}
            </div>

            {/* Steps after answer */}
            {revealed && (
              <div className="mt-4 rounded-xl bg-white border border-slate-200 p-3 animate-fade-up">
                <div className="text-xs font-bold text-slate-500 uppercase tracking-wide mb-1.5">How to solve it</div>
                <ol className="space-y-1 text-sm text-slate-700">
                  {question.steps.map((s, i) => (
                    <li key={i} className="flex gap-2">
                      <span className="font-bold text-brand-blue">{i + 1}.</span> {s}
                    </li>
                  ))}
                </ol>
              </div>
            )}

            {revealed && (
              <button onClick={next}
                className="mt-4 w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full bg-brand-blue text-white font-bold hover:bg-blue-600 active:scale-95 transition-all">
                {qIndex < topic.questions.length - 1 ? 'Next question' : 'See results'} <ArrowRight className="w-4 h-4" />
              </button>
            )}
          </div>
        </>
      )}

      {/* Finished view */}
      {category && topic && finished && (
        <div className="text-center py-6 animate-fade-up">
          <div className={`mx-auto w-16 h-16 rounded-full flex items-center justify-center mb-4 ${score >= topic.questions.length / 2 ? 'bg-emerald-100' : 'bg-amber-100'}`}>
            {score >= topic.questions.length / 2
              ? <Trophy className="w-8 h-8 text-emerald-600" />
              : <Dumbbell className="w-8 h-8 text-amber-600" />}
          </div>
          <h3 className="font-display text-2xl font-extrabold text-slate-800">
            You scored {score} / {topic.questions.length}
          </h3>
          <p className="mt-2 text-slate-600">
            {score === topic.questions.length ? 'Perfect! You nailed every question.' : score >= topic.questions.length / 2 ? 'Great work — keep practising to get them all.' : 'Good start. Review the explanation and try again!'}
          </p>
          <div className="mt-6 flex flex-col sm:flex-row gap-3 justify-center">
            <button onClick={restartTopic}
              className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full bg-brand-blue text-white font-bold hover:bg-blue-600 active:scale-95 transition-all">
              <RotateCcw className="w-4 h-4" /> Try again
            </button>
            <button onClick={() => setTopicId(null)}
              className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full bg-white border-2 border-slate-200 text-slate-600 font-bold hover:bg-slate-50 active:scale-95 transition-all">
              Back to topics
            </button>
          </div>
        </div>
      )}
    </ModalShell>
  );
}
