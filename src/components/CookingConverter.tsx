import { useMemo, useState } from 'react';
import { RotateCcw, ChefHat, ArrowRight, AlertCircle, CheckCircle2 } from 'lucide-react';
import ModalShell from './ModalShell';
import { UNITS, convert, fmt, mlPer, scaleRecipe, unitName, type Unit } from '@/lib/cooking';

type Props = { open: boolean; onClose: () => void };

export default function CookingConverter({ open, onClose }: Props) {
  const [amount, setAmount] = useState('');
  const [from, setFrom] = useState<Unit>('cup');
  const [to, setTo] = useState<Unit>('ml');
  const [tried, setTried] = useState(false);

  const [orig, setOrig] = useState('');
  const [want, setWant] = useState('');
  const [recipeAmount, setRecipeAmount] = useState('');
  const [recipeTried, setRecipeTried] = useState(false);

  const amt = Number(amount);
  const amountError = useMemo(() => {
    if (!tried) return null;
    if (amount.trim() === '' || Number.isNaN(amt)) return 'Enter a number, for example 2 or 0.5.';
    if (amt < 0) return 'The amount cannot be negative.';
    return null;
  }, [amount, amt, tried]);

  const valid = tried && amountError === null;
  const answer = valid ? convert(amt, from, to) : null;

  const o = Number(orig);
  const w = Number(want);
  const ra = Number(recipeAmount);
  const recipeError = useMemo(() => {
    if (!recipeTried) return null;
    if (orig.trim() === '' || want.trim() === '' || recipeAmount.trim() === '') return 'Fill in all three boxes.';
    if ([o, w, ra].some((n) => Number.isNaN(n))) return 'Use numbers only.';
    if (o <= 0 || w <= 0) return 'Servings must be more than zero.';
    if (ra < 0) return 'The amount cannot be negative.';
    return null;
  }, [orig, want, recipeAmount, o, w, ra, recipeTried]);
  const scaled = recipeTried && recipeError === null ? scaleRecipe(ra, o, w) : null;

  const swap = () => {
    setFrom(to);
    setTo(from);
  };

  const reset = () => {
    setAmount('');
    setFrom('cup');
    setTo('ml');
    setTried(false);
    setOrig('');
    setWant('');
    setRecipeAmount('');
    setRecipeTried(false);
  };

  const field =
    'w-full px-4 py-3 rounded-2xl border-2 border-slate-200 focus:border-brand-blue focus:ring-2 focus:ring-brand-blue/20 outline-none transition-all font-semibold text-slate-800';

  return (
    <ModalShell
      open={open}
      onClose={onClose}
      title="Cooking Measurements"
      subtitle="Convert cups, spoons and millilitres. Scale a recipe too."
      icon={ChefHat}
      iconClass="bg-brand-yellow text-amber-700"
      headerGradient="from-amber-50 to-white"
      borderClass="border-amber-200"
      maxWidth="max-w-xl"
    >
      {/* Converter */}
      <div className="space-y-3">
        <label className="block">
          <span className="text-sm font-bold text-slate-700">Amount</span>
          <input
            type="number"
            inputMode="decimal"
            min="0"
            step="any"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="2"
            className={`mt-1.5 ${field}`}
          />
        </label>

        <div className="grid grid-cols-[1fr_auto_1fr] items-end gap-2">
          <label className="block">
            <span className="text-sm font-bold text-slate-700">From</span>
            <select value={from} onChange={(e) => setFrom(e.target.value as Unit)} className={`mt-1.5 ${field}`}>
              {UNITS.map((u) => (
                <option key={u.id} value={u.id}>{u.plural}</option>
              ))}
            </select>
          </label>
          <button
            type="button"
            onClick={swap}
            aria-label="Swap units"
            className="mb-0.5 p-3 rounded-2xl bg-amber-50 text-amber-700 hover:bg-amber-100 active:scale-95 transition-all"
          >
            <ArrowRight className="w-5 h-5" />
          </button>
          <label className="block">
            <span className="text-sm font-bold text-slate-700">To</span>
            <select value={to} onChange={(e) => setTo(e.target.value as Unit)} className={`mt-1.5 ${field}`}>
              {UNITS.map((u) => (
                <option key={u.id} value={u.id}>{u.plural}</option>
              ))}
            </select>
          </label>
        </div>

        <div className="flex gap-3">
          <button
            type="button"
            onClick={() => setTried(true)}
            className="flex-1 inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full bg-brand-blue text-white font-bold hover:bg-blue-600 active:scale-95 transition-all"
          >
            Convert
          </button>
          <button
            type="button"
            onClick={reset}
            className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full bg-white border-2 border-slate-200 text-slate-600 font-bold hover:bg-slate-50 active:scale-95 transition-all"
          >
            <RotateCcw className="w-4 h-4" /> Reset
          </button>
        </div>
      </div>

      {amountError && (
        <div role="alert" className="flex items-start gap-2 p-3 rounded-xl bg-red-50 text-red-700 text-sm font-semibold">
          <AlertCircle className="w-5 h-5 shrink-0" /> {amountError}
        </div>
      )}

      {answer !== null && (
        <div className="rounded-3xl bg-emerald-50 border border-emerald-200 p-5 animate-fade-up">
          <div className="flex items-center gap-2 text-emerald-700 font-bold text-sm">
            <CheckCircle2 className="w-5 h-5" /> Answer
          </div>
          <p className="mt-1 font-display text-2xl font-extrabold text-slate-800">
            {fmt(amt)} {unitName(from, amt)} = {fmt(answer)} {unitName(to, answer)}
          </p>
          <div className="mt-3 text-sm text-slate-700 space-y-1">
            <div className="text-xs font-bold text-slate-500 uppercase tracking-wide">How it works</div>
            <p>1. Turn it into millilitres: {fmt(amt)} × {mlPer(from)} ml = {fmt(amt * mlPer(from))} ml</p>
            <p>2. Turn millilitres into {UNITS.find((u) => u.id === to)!.plural}: {fmt(amt * mlPer(from))} ÷ {mlPer(to)} = {fmt(answer)}</p>
          </div>
        </div>
      )}

      {/* Quick reference */}
      <div className="rounded-2xl bg-slate-50 border border-slate-200 p-4 text-sm text-slate-700">
        <div className="font-display font-bold text-slate-800 mb-1">Handy facts</div>
        <p>1 teaspoon = 5 ml · 1 tablespoon = 15 ml · 1 cup = 240 ml</p>
        <p>1 tablespoon = 3 teaspoons · 1 cup = 16 tablespoons</p>
        <p className="mt-1 text-xs text-slate-500">Measuring cups and spoons differ a little between countries. These are standard metric values.</p>
      </div>

      {/* Recipe scaler */}
      <div className="rounded-3xl border-2 border-amber-200 p-5 space-y-3">
        <h3 className="font-display font-bold text-slate-800">Scale a recipe</h3>
        <p className="text-sm text-slate-600">New amount = amount × (servings you want ÷ servings in the recipe).</p>
        <div className="grid grid-cols-3 gap-2">
          <label className="block">
            <span className="text-xs font-bold text-slate-600">Recipe serves</span>
            <input type="number" inputMode="decimal" min="0" step="any" value={orig} onChange={(e) => setOrig(e.target.value)} placeholder="4" className={`mt-1 ${field}`} />
          </label>
          <label className="block">
            <span className="text-xs font-bold text-slate-600">You want</span>
            <input type="number" inputMode="decimal" min="0" step="any" value={want} onChange={(e) => setWant(e.target.value)} placeholder="6" className={`mt-1 ${field}`} />
          </label>
          <label className="block">
            <span className="text-xs font-bold text-slate-600">Ingredient amount</span>
            <input type="number" inputMode="decimal" min="0" step="any" value={recipeAmount} onChange={(e) => setRecipeAmount(e.target.value)} placeholder="2" className={`mt-1 ${field}`} />
          </label>
        </div>
        <button
          type="button"
          onClick={() => setRecipeTried(true)}
          className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full bg-brand-yellow text-slate-900 font-bold hover:bg-amber-400 active:scale-95 transition-all"
        >
          Scale it
        </button>
        {recipeError && (
          <div role="alert" className="flex items-start gap-2 p-3 rounded-xl bg-red-50 text-red-700 text-sm font-semibold">
            <AlertCircle className="w-5 h-5 shrink-0" /> {recipeError}
          </div>
        )}
        {scaled !== null && (
          <div className="rounded-2xl bg-amber-50 p-4 text-sm text-slate-700 animate-fade-up">
            <p className="font-display text-lg font-extrabold text-slate-800">New amount: {fmt(scaled)}</p>
            <p className="mt-1">{fmt(ra)} × ({fmt(w)} ÷ {fmt(o)}) = {fmt(scaled)}</p>
          </div>
        )}
      </div>
    </ModalShell>
  );
}
