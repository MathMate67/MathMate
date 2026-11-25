import { useMemo, useState } from 'react';
import { Search, MessageSquareText, Sparkles, BookOpen, Lightbulb, Shuffle } from 'lucide-react';
import ModalShell from './ModalShell';

type Props = { open: boolean; onClose: () => void };

type HelpEntry = {
  id: string;
  q: string;
  a: string;
  example?: string;
  tags: string[];
};

const ENTRIES: HelpEntry[] = [
  {
    id: 'percentage',
    q: 'How do I work out a percentage of an amount?',
    a: 'Convert the percentage to a decimal by dividing by 100, then multiply it by the amount. For example, 25% of 800 = 0.25 × 800 = 200.',
    example: '15% of ₹1200 = 1200 × 0.15 = ₹180',
    tags: ['percentage', 'percent', 'discount', 'tax'],
  },
  {
    id: 'discount',
    q: 'How do I calculate a sale price after a discount?',
    a: 'Find the discount amount (original price × discount % ÷ 100), then subtract it from the original price.',
    example: '₹800 at 25% off: discount = ₹200, final price = ₹800 − ₹200 = ₹600',
    tags: ['discount', 'sale', 'shopping', 'percentage'],
  },
  {
    id: 'budget',
    q: 'How do I plan a monthly budget?',
    a: 'List your monthly income, then add up every expense category. Whatever is left after subtracting expenses from income is your remaining balance — ideally positive!',
    example: 'Income ₹50,000 − expenses ₹42,000 = ₹8,000 left to save',
    tags: ['budget', 'income', 'expenses', 'money', 'planning'],
  },
  {
    id: 'fuel',
    q: 'How do I estimate fuel cost for a trip?',
    a: 'Divide the trip distance by your vehicle\'s mileage (km per litre) to get litres needed, then multiply by the fuel price per litre.',
    example: '350 km ÷ 18 km/l = 19.4 litres × ₹105 = ₹2,041',
    tags: ['travel', 'fuel', 'distance', 'mileage', 'cost'],
  },
  {
    id: 'savings',
    q: 'How do I calculate savings over several months?',
    a: 'Multiply your monthly saving by the number of months. This gives your total saved, without interest.',
    example: '₹2,000/month × 12 months = ₹24,000 saved in a year',
    tags: ['savings', 'saving', 'months', 'money'],
  },
  {
    id: 'fractions',
    q: 'How do I add two fractions?',
    a: 'Make the bottom numbers (denominators) the same, then add the top numbers (numerators). Keep the denominator unchanged.',
    example: '1/2 + 1/4 → 2/4 + 1/4 = 3/4',
    tags: ['fractions', 'add', 'students', 'maths'],
  },
  {
    id: 'simple-interest',
    q: 'What is simple interest and how do I calculate it?',
    a: 'Simple interest is a fixed yearly percentage of the amount you save or borrow. Formula: Interest = Principal × Rate × Time ÷ 100.',
    example: '₹1000 at 10% for 2 years = (1000 × 10 × 2) / 100 = ₹200 interest',
    tags: ['interest', 'savings', 'principal', 'rate', 'adults'],
  },
  {
    id: 'ratio',
    q: 'How do I split an amount in a ratio?',
    a: 'Add the ratio parts to find the total, divide the amount by the total to get one part, then multiply by each side of the ratio.',
    example: 'Split ₹500 in 2:3 → total 5 parts → ₹100 each → ₹200 and ₹300',
    tags: ['ratio', 'split', 'proportion', 'adults'],
  },
  {
    id: 'algebra',
    q: 'How do I solve a simple equation like x + 7 = 15?',
    a: 'Do the opposite of what is happening to x. Here, subtract 7 from both sides: x = 15 − 7 = 8.',
    example: '3x = 21 → divide both sides by 3 → x = 7',
    tags: ['algebra', 'equation', 'solve', 'students'],
  },
  {
    id: 'tip',
    q: 'How do I calculate a tip at a restaurant?',
    a: 'Decide on a percentage (often 10%), then find that percentage of the bill. Add it to the bill for the total to pay.',
    example: '10% tip on ₹600 = ₹60 → total ₹660',
    tags: ['tip', 'percentage', 'bill', 'restaurant'],
  },
  {
    id: 'unit-convert',
    q: 'How do I convert between units (km to metres, etc.)?',
    a: 'Multiply or divide by the conversion factor. 1 km = 1000 m, 1 litre = 1000 ml, 1 kg = 1000 g.',
    example: '2.5 km = 2.5 × 1000 = 2500 metres',
    tags: ['convert', 'units', 'metres', 'km', 'litres'],
  },
  {
    id: 'average',
    q: 'How do I find an average (mean)?',
    a: 'Add all the values together, then divide by how many values there are.',
    example: 'Average of 4, 8, 12 = (4 + 8 + 12) ÷ 3 = 8',
    tags: ['average', 'mean', 'statistics'],
  },
];

type Practice = { prompt: string; hint: string; answer: string; steps: string };

function randInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Built-in practice question maker (no AI): percentage, discount and simple interest.
function makePractice(): Practice {
  const kind = randInt(0, 2);
  if (kind === 0) {
    const pct = [5, 10, 15, 20, 25, 50][randInt(0, 5)];
    const amount = randInt(2, 40) * 20;
    const ans = (pct * amount) / 100;
    return {
      prompt: `What is ${pct}% of ₹${amount}?`,
      hint: `Turn ${pct}% into ${pct} ÷ 100, then multiply by ${amount}.`,
      answer: `₹${ans}`,
      steps: `${pct} ÷ 100 × ${amount} = ₹${ans}`,
    };
  }
  if (kind === 1) {
    const pct = [10, 20, 25, 30, 40][randInt(0, 4)];
    const price = randInt(2, 40) * 50;
    const off = (pct * price) / 100;
    return {
      prompt: `A ₹${price} item has ${pct}% off. What is the final price?`,
      hint: 'Find the discount first, then subtract it from the price.',
      answer: `₹${price - off}`,
      steps: `Discount = ${pct} ÷ 100 × ${price} = ₹${off}. Final price = ${price} − ${off} = ₹${price - off}.`,
    };
  }
  const principal = randInt(1, 20) * 1000;
  const rate = randInt(2, 10);
  const years = randInt(1, 5);
  const interest = (principal * rate * years) / 100;
  return {
    prompt: `Simple interest on ₹${principal} at ${rate}% a year for ${years} year${years === 1 ? '' : 's'}?`,
    hint: 'Interest = principal × rate ÷ 100 × years.',
    answer: `₹${interest}`,
    steps: `${principal} × ${rate} ÷ 100 × ${years} = ₹${interest}`,
  };
}

const POPULAR = ['percentage', 'discount', 'budget', 'simple-interest'];

export default function MathMateAssistant({ open, onClose }: Props) {
  const [query, setQuery] = useState('');
  const [activeId, setActiveId] = useState<string | null>(null);
  const [practice, setPractice] = useState<Practice | null>(null);
  const [showHint, setShowHint] = useState(false);
  const [showAnswer, setShowAnswer] = useState(false);

  const newPractice = () => {
    setPractice(makePractice());
    setShowHint(false);
    setShowAnswer(false);
  };

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return ENTRIES;
    return ENTRIES.filter((e) =>
      e.q.toLowerCase().includes(q) ||
      e.a.toLowerCase().includes(q) ||
      e.tags.some((t) => t.includes(q))
    );
  }, [query]);

  const active = ENTRIES.find((e) => e.id === activeId) || null;

  return (
    <ModalShell
      open={open}
      onClose={() => { setQuery(''); setActiveId(null); setPractice(null); onClose(); }}
      title="MathMate Assistant"
      subtitle="Quick, friendly maths help — no AI, just clear answers."
      icon={MessageSquareText}
      iconClass="bg-brand-purple text-white"
      headerGradient="from-violet-50 to-white"
      borderClass="border-violet-200"
      maxWidth="max-w-2xl"
    >
      {/* Search */}
      <div className="relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
        <input
          type="text"
          value={query}
          onChange={(e) => { setQuery(e.target.value); setActiveId(null); }}
          placeholder="Search a maths topic — e.g. percentage, fractions, interest…"
          className="w-full pl-12 pr-4 py-3.5 rounded-2xl border-2 border-slate-200 focus:border-brand-purple focus:ring-2 focus:ring-brand-purple/20 outline-none transition-all font-medium text-slate-800"
        />
      </div>

      {/* Popular tags */}
      {!query && !active && (
        <div className="flex flex-wrap gap-2 items-center">
          <span className="text-xs font-bold text-slate-500 flex items-center gap-1"><Sparkles className="w-3.5 h-3.5" /> Popular:</span>
          {POPULAR.map((id) => {
            const e = ENTRIES.find((x) => x.id === id)!;
            return (
              <button key={id} onClick={() => setActiveId(id)}
                className="px-3 py-1.5 rounded-full bg-violet-50 text-brand-purple text-xs font-bold border border-violet-200 hover:bg-violet-100 transition-colors">
                {e.tags[0]}
              </button>
            );
          })}
        </div>
      )}

      {/* Detail view */}
      {active && (
        <div className="animate-fade-up space-y-4">
          <button onClick={() => setActiveId(null)} className="text-sm font-bold text-brand-purple hover:underline">
            ← Back to all topics
          </button>
          <div className="rounded-3xl bg-violet-50 border border-violet-200 p-5">
            <div className="flex items-center gap-2 mb-2">
              <Lightbulb className="w-5 h-5 text-brand-purple" />
              <h3 className="font-display font-bold text-slate-800">{active.q}</h3>
            </div>
            <p className="text-sm text-slate-700 leading-relaxed">{active.a}</p>
            {active.example && (
              <div className="mt-3 rounded-xl bg-white border border-slate-200 p-3">
                <div className="text-xs font-bold text-slate-500 uppercase tracking-wide mb-1">Example</div>
                <p className="text-sm text-slate-700 font-medium">{active.example}</p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Results list */}
      {!active && (
        <div className="space-y-2.5 max-h-[40vh] overflow-y-auto pr-1">
          {results.length === 0 && (
            <div className="text-center py-8 text-slate-500">
              <BookOpen className="w-8 h-8 mx-auto mb-2 opacity-50" />
              <p className="font-medium">No topics match "{query}". Try a different word.</p>
            </div>
          )}
          {results.map((e) => (
            <button key={e.id} onClick={() => setActiveId(e.id)}
              className="w-full text-left p-4 rounded-2xl bg-white border-2 border-slate-200 hover:border-brand-purple hover:shadow-soft transition-all group">
              <div className="flex items-start gap-3">
                <span className="inline-flex items-center justify-center w-9 h-9 rounded-xl bg-violet-50 text-brand-purple shrink-0">
                  <MessageSquareText className="w-5 h-5" />
                </span>
                <div className="flex-1 min-w-0">
                  <p className="font-display font-bold text-slate-800 text-sm">{e.q}</p>
                  <p className="mt-0.5 text-xs text-slate-500 line-clamp-2">{e.a}</p>
                </div>
              </div>
            </button>
          ))}
        </div>
      )}

      {/* Practice question maker */}
      <div className="rounded-3xl bg-amber-50 border border-amber-200 p-5">
        <div className="flex items-center justify-between gap-3">
          <h3 className="font-display font-bold text-slate-800">Practice question</h3>
          <button
            type="button"
            onClick={newPractice}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-brand-yellow text-slate-900 text-sm font-bold hover:bg-amber-400 active:scale-95 transition-all"
          >
            <Shuffle className="w-4 h-4" /> {practice ? 'Another one' : 'Give me one'}
          </button>
        </div>
        {practice && (
          <div className="mt-3 space-y-2 animate-fade-up">
            <p className="font-display text-lg font-bold text-slate-800">{practice.prompt}</p>
            {showHint ? (
              <p className="text-sm text-amber-800 bg-white rounded-xl border border-amber-200 p-3">Hint: {practice.hint}</p>
            ) : (
              <button type="button" onClick={() => setShowHint(true)} className="text-sm font-bold text-amber-700 hover:underline">Show a hint</button>
            )}
            {showAnswer ? (
              <div className="text-sm text-slate-700 bg-white rounded-xl border border-slate-200 p-3">
                <p className="font-bold text-emerald-700">Answer: {practice.answer}</p>
                <p className="mt-1">{practice.steps}</p>
              </div>
            ) : (
              <button type="button" onClick={() => setShowAnswer(true)} className="block text-sm font-bold text-brand-purple hover:underline">Show the answer and steps</button>
            )}
          </div>
        )}
      </div>

      <p className="text-xs text-slate-400 flex items-center gap-1.5 pt-1">
        <Sparkles className="w-3.5 h-3.5" /> This is a built-in help library, not a live AI service. More help coming soon.
      </p>
    </ModalShell>
  );
}
