import { useState } from 'react';
import { RotateCcw, Calculator, Plus, Trash2, Wallet, TrendingUp, TrendingDown, CheckCircle2 } from 'lucide-react';
import ModalShell from './ModalShell';
import { money, percentOf } from '@/lib/format';

type Props = { open: boolean; onClose: () => void };
type Expense = { id: number; name: string; amount: number };

export default function BudgetCalculator({ open, onClose }: Props) {
  const [income, setIncome] = useState('');
  const [expName, setExpName] = useState('');
  const [expAmount, setExpAmount] = useState('');
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [nextId, setNextId] = useState(1);

  const totalExpenses = expenses.reduce((s, e) => s + e.amount, 0);
  const incomeNum = Number(income) || 0;
  const remaining = incomeNum - totalExpenses;
  const hasResult = income.trim() !== '' && incomeNum >= 0;

  const addExpense = () => {
    const amt = Number(expAmount);
    if (expName.trim() === '') {
      setError('Please enter a category name.');
      return;
    }
    if (expAmount.trim() === '' || Number.isNaN(amt)) {
      setError('Please enter a valid amount for the expense.');
      return;
    }
    if (amt < 0) {
      setError('Expense amount cannot be negative.');
      return;
    }
    setError(null);
    setExpenses((prev) => [...prev, { id: nextId, name: expName.trim(), amount: amt }]);
    setNextId((n) => n + 1);
    setExpName('');
    setExpAmount('');
  };

  const removeExpense = (id: number) => {
    setExpenses((prev) => prev.filter((e) => e.id !== id));
  };

  const reset = () => {
    setIncome('');
    setExpName('');
    setExpAmount('');
    setExpenses([]);
    setError(null);
    setNextId(1);
  };

  const maxExpense = expenses.length > 0 ? Math.max(...expenses.map((e) => e.amount)) : 0;

  return (
    <ModalShell
      open={open}
      onClose={onClose}
      title="Budget Planning"
      subtitle="Track income and spending to see where your money goes."
      icon={Wallet}
      iconClass="bg-brand-blue text-white"
      headerGradient="from-blue-50 to-white"
      borderClass="border-blue-200"
      maxWidth="max-w-xl"
    >
      {/* Income input */}
      <label className="block">
        <span className="flex items-center gap-1.5 text-sm font-bold text-slate-700">
          <TrendingUp className="w-4 h-4 text-brand-blue" /> Monthly income
        </span>
        <div className="mt-1.5 relative">
          <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 font-bold">₹</span>
          <input
            type="number"
            inputMode="decimal"
            min="0"
            step="any"
            value={income}
            onChange={(e) => setIncome(e.target.value)}
            placeholder="50000"
            className="w-full pl-8 pr-4 py-3 rounded-2xl border-2 border-slate-200 focus:border-brand-blue focus:ring-2 focus:ring-brand-blue/20 outline-none transition-all font-semibold text-slate-800"
          />
        </div>
      </label>

      {/* Add expense */}
      <div className="rounded-2xl bg-slate-50 border border-slate-200 p-4 space-y-3">
        <span className="flex items-center gap-1.5 text-sm font-bold text-slate-700">
          <Plus className="w-4 h-4 text-brand-purple" /> Add an expense category
        </span>
        <div className="flex flex-wrap gap-2" aria-label="Quick categories">
          {['Food', 'Transport', 'Education', 'Shopping', 'Other'].map((n) => (
            <button
              key={n}
              type="button"
              onClick={() => setExpName(n)}
              className={`px-3 py-1.5 rounded-full text-xs font-bold border transition-colors ${
                expName === n ? 'bg-brand-blue text-white border-brand-blue' : 'bg-white text-slate-600 border-slate-200 hover:border-brand-blue'
              }`}
            >
              {n}
            </button>
          ))}
        </div>
        <div className="grid sm:grid-cols-[1fr_auto] gap-2.5">
          <input
            type="text"
            value={expName}
            onChange={(e) => setExpName(e.target.value)}
            placeholder="e.g. Rent, Groceries, Transport"
            className="px-4 py-2.5 rounded-xl border-2 border-slate-200 focus:border-brand-blue focus:ring-2 focus:ring-brand-blue/20 outline-none transition-all font-medium text-slate-800 text-sm"
          />
          <div className="flex gap-2">
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 font-bold text-sm">₹</span>
              <input
                type="number"
                inputMode="decimal"
                min="0"
                step="any"
                value={expAmount}
                onChange={(e) => setExpAmount(e.target.value)}
                placeholder="Amount"
                className="w-32 pl-7 pr-3 py-2.5 rounded-xl border-2 border-slate-200 focus:border-brand-blue focus:ring-2 focus:ring-brand-blue/20 outline-none transition-all font-medium text-slate-800 text-sm"
              />
            </div>
            <button
              onClick={addExpense}
              className="inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl bg-brand-purple text-white text-sm font-bold hover:bg-violet-600 active:scale-95 transition-all shrink-0"
            >
              <Plus className="w-4 h-4" /> Add
            </button>
          </div>
        </div>
        {error && (
          <p className="text-sm text-red-600 font-medium flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-red-500" /> {error}
          </p>
        )}
      </div>

      {/* Expense list + breakdown */}
      {expenses.length > 0 && (
        <div className="space-y-2.5">
        <h3 className="font-display font-bold text-slate-800 text-sm flex items-center gap-1.5">
          <TrendingDown className="w-4 h-4 text-amber-600" /> Expense breakdown
        </h3>
        {expenses.map((e) => {
          const pct = incomeNum > 0 ? (e.amount / incomeNum) * 100 : 0;
          const barPct = maxExpense > 0 ? (e.amount / maxExpense) * 100 : 0;
          return (
            <div key={e.id} className="flex items-center gap-3 p-3 rounded-2xl bg-white border border-slate-200">
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-2">
                  <span className="font-semibold text-slate-800 text-sm truncate">{e.name}</span>
                  <span className="font-bold text-slate-800 text-sm shrink-0">₹{money(e.amount)}</span>
                </div>
                <div className="mt-1.5 h-2 rounded-full bg-slate-100 overflow-hidden">
                  <div className="h-full rounded-full bg-gradient-to-r from-brand-blue to-brand-purple transition-all" style={{ width: `${barPct}%` }} />
                </div>
                {incomeNum > 0 && (
                  <span className="text-xs text-slate-400 font-medium">{pct.toFixed(1)}% of income</span>
                )}
              </div>
              <button
                onClick={() => removeExpense(e.id)}
                className="p-2 rounded-lg text-slate-400 hover:text-red-500 hover:bg-red-50 transition-colors shrink-0"
                aria-label={`Remove ${e.name}`}
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          );
        })}
        </div>
      )}

      {/* Summary */}
      {hasResult && (
        <div className="grid grid-cols-3 gap-3 animate-fade-up">
          <div className="rounded-2xl bg-blue-50 border border-blue-200 p-4 text-center">
            <div className="text-xs font-bold text-brand-blue uppercase tracking-wide">Income</div>
            <div className="mt-1 font-display text-lg font-extrabold text-brand-blue">₹{money(incomeNum)}</div>
          </div>
          <div className="rounded-2xl bg-amber-50 border border-amber-200 p-4 text-center">
            <div className="text-xs font-bold text-amber-600 uppercase tracking-wide">Expenses</div>
            <div className="mt-1 font-display text-lg font-extrabold text-amber-600">₹{money(totalExpenses)}</div>
          </div>
          <div className={`rounded-2xl border p-4 text-center ${remaining >= 0 ? 'bg-emerald-50 border-emerald-200' : 'bg-red-50 border-red-200'}`}>
            <div className={`text-xs font-bold uppercase tracking-wide ${remaining >= 0 ? 'text-emerald-600' : 'text-red-600'}`}>
              {remaining >= 0 ? 'Left' : 'Over'}
            </div>
            <div className={`mt-1 font-display text-lg font-extrabold ${remaining >= 0 ? 'text-emerald-700' : 'text-red-700'}`}>
              ₹{money(Math.abs(remaining))}
            </div>
          </div>
        </div>
      )}

      {hasResult && remaining < 0 && (
        <div className="flex items-start gap-2.5 p-3.5 rounded-2xl bg-red-50 border border-red-200 text-red-700 text-sm animate-fade-up">
          <TrendingDown className="w-5 h-5 shrink-0 mt-0.5" />
          <span className="font-medium">Your expenses exceed your income by ₹{money(Math.abs(remaining))}. Consider reducing some categories.</span>
        </div>
      )}

      {hasResult && remaining >= 0 && expenses.length > 0 && (
        <div className="flex items-start gap-2.5 p-3.5 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-700 text-sm animate-fade-up">
          <CheckCircle2 className="w-5 h-5 shrink-0 mt-0.5" />
          <span className="font-medium">You have ₹{money(remaining)} left after expenses.{incomeNum > 0 ? ` That's ${percentOf(remaining, incomeNum).toFixed(0)}% of your income.` : ''}</span>
        </div>
      )}

      {/* Reset */}
      <div className="flex justify-end">
        <button
          onClick={reset}
          className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full bg-white border-2 border-slate-200 text-slate-600 font-bold hover:bg-slate-50 hover:border-slate-300 active:scale-95 transition-all"
        >
          <RotateCcw className="w-5 h-5" /> Reset
        </button>
      </div>
    </ModalShell>
  );
}
