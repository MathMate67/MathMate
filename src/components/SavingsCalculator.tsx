import { useMemo, useState } from 'react';
import { RotateCcw, Calculator, Percent, PiggyBank, CheckCircle2, AlertCircle } from 'lucide-react';
import ModalShell from './ModalShell';
import { money } from '@/lib/format';

type Props = { open: boolean; onClose: () => void };
type Mode = 'percentage' | 'savings';

export default function SavingsCalculator({ open, onClose }: Props) {
  const [mode, setMode] = useState<Mode>('percentage');

  // Percentage mode
  const [amount, setAmount] = useState('');
  const [pct, setPct] = useState('');
  const [pctResult, setPctResult] = useState<{ amount: number; pct: number; value: number } | null>(null);
  const [pctError, setPctError] = useState<string | null>(null);

  // Savings mode
  const [monthly, setMonthly] = useState('');
  const [months, setMonths] = useState('');
  const [savResult, setSavResult] = useState<{ monthly: number; months: number; total: number } | null>(null);
  const [savError, setSavError] = useState<string | null>(null);

  const canCalcPct = useMemo(() => amount.trim() !== '' && pct.trim() !== '', [amount, pct]);
  const canCalcSav = useMemo(() => monthly.trim() !== '' && months.trim() !== '', [monthly, months]);

  const calcPct = () => {
    const a = Number(amount);
    const p = Number(pct);
    if (amount.trim() === '' || pct.trim() === '' || Number.isNaN(a) || Number.isNaN(p)) {
      setPctError('Please enter a number for both the amount and the percentage.');
      setPctResult(null);
      return;
    }
    if (a < 0) {
      setPctError('Amount cannot be negative.');
      setPctResult(null);
      return;
    }
    if (p < 0 || p > 100) {
      setPctError('Percentage must be between 0 and 100.');
      setPctResult(null);
      return;
    }
    setPctError(null);
    setPctResult({ amount: a, pct: p, value: (a * p) / 100 });
  };

  const calcSavings = () => {
    const m = Number(monthly);
    const n = Number(months);
    if (monthly.trim() === '' || months.trim() === '' || Number.isNaN(m) || Number.isNaN(n)) {
      setSavError('Please enter a number for both the monthly saving and the period.');
      setSavResult(null);
      return;
    }
    if (m < 0) {
      setSavError('Monthly saving cannot be negative.');
      setSavResult(null);
      return;
    }
    if (n < 0 || !Number.isInteger(n)) {
      setSavError('Number of months must be a whole, non-negative number.');
      setSavResult(null);
      return;
    }
    setSavError(null);
    setSavResult({ monthly: m, months: n, total: m * n });
  };

  const reset = () => {
    if (mode === 'percentage') {
      setAmount('');
      setPct('');
      setPctResult(null);
      setPctError(null);
    } else {
      setMonthly('');
      setMonths('');
      setSavResult(null);
      setSavError(null);
    }
  };

  const resetAll = () => {
    setAmount(''); setPct(''); setPctResult(null); setPctError(null);
    setMonthly(''); setMonths(''); setSavResult(null); setSavError(null);
  };

  return (
    <ModalShell
      open={open}
      onClose={() => { resetAll(); onClose(); }}
      title="Savings & Percentages"
      subtitle="Work out percentages and plan your savings over time."
      icon={PiggyBank}
      iconClass="bg-emerald-500 text-white"
      headerGradient="from-emerald-50 to-white"
      borderClass="border-emerald-200"
    >
      {/* Mode tabs */}
      <div className="flex gap-2 p-1 rounded-2xl bg-slate-100">
        <button
          onClick={() => { resetAll(); setMode('percentage'); }}
          className={`flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-sm font-bold transition-all ${
            mode === 'percentage' ? 'bg-white text-emerald-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'
          }`}
        >
          <Percent className="w-4 h-4" /> Percentage of amount
        </button>
        <button
          onClick={() => { resetAll(); setMode('savings'); }}
          className={`flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-sm font-bold transition-all ${
            mode === 'savings' ? 'bg-white text-emerald-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'
          }`}
        >
          <PiggyBank className="w-4 h-4" /> Savings over time
        </button>
      </div>

      {mode === 'percentage' ? (
        <>
          <div className="grid sm:grid-cols-2 gap-4">
            <label className="block">
              <span className="flex items-center gap-1.5 text-sm font-bold text-slate-700">
                <PiggyBank className="w-4 h-4 text-emerald-600" /> Amount
              </span>
              <div className="mt-1.5 relative">
                <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 font-bold">₹</span>
                <input
                  type="number" inputMode="decimal" min="0" step="any"
                  value={amount} onChange={(e) => setAmount(e.target.value)}
                  placeholder="2000"
                  className="w-full pl-8 pr-4 py-3 rounded-2xl border-2 border-slate-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 outline-none transition-all font-semibold text-slate-800"
                />
              </div>
            </label>
            <label className="block">
              <span className="flex items-center gap-1.5 text-sm font-bold text-slate-700">
                <Percent className="w-4 h-4 text-brand-blue" /> Percentage
              </span>
              <div className="mt-1.5 relative">
                <input
                  type="number" inputMode="decimal" min="0" max="100" step="any"
                  value={pct} onChange={(e) => setPct(e.target.value)}
                  placeholder="15"
                  className="w-full pl-4 pr-8 py-3 rounded-2xl border-2 border-slate-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 outline-none transition-all font-semibold text-slate-800"
                />
                <span className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 font-bold">%</span>
              </div>
            </label>
          </div>

          {pctError && (
            <div className="flex items-start gap-2.5 p-3.5 rounded-2xl bg-red-50 border border-red-200 text-red-700 text-sm animate-fade-up">
              <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
              <span className="font-medium">{pctError}</span>
            </div>
          )}

          <div className="flex gap-3">
            <button onClick={calcPct} disabled={!canCalcPct}
              className="flex-1 inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-full bg-emerald-500 text-white font-bold shadow-soft hover:bg-emerald-600 hover:scale-[1.02] active:scale-95 transition-all disabled:opacity-40 disabled:hover:scale-100 disabled:cursor-not-allowed">
              <Calculator className="w-5 h-5" /> Calculate
            </button>
            <button onClick={reset}
              className="inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-full bg-white border-2 border-slate-200 text-slate-600 font-bold hover:bg-slate-50 active:scale-95 transition-all">
              <RotateCcw className="w-5 h-5" /> Reset
            </button>
          </div>

          {pctResult && (
            <div className="animate-fade-up space-y-4">
              <div className="rounded-2xl bg-emerald-50 border border-emerald-200 p-4 text-center">
                <div className="text-xs font-bold text-emerald-600 uppercase tracking-wide">{pctResult.pct}% of ₹{money(pctResult.amount)}</div>
                <div className="mt-1 font-display text-3xl font-extrabold text-emerald-700">₹{money(pctResult.value)}</div>
              </div>
              <div className="rounded-3xl bg-slate-50 border border-slate-200 p-5">
                <div className="flex items-center gap-2 mb-3">
                  <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                  <h3 className="font-display font-bold text-slate-800">How it's calculated</h3>
                </div>
                <ol className="space-y-2.5 text-sm text-slate-700">
                  <li className="flex gap-3">
                    <span className="flex items-center justify-center w-6 h-6 shrink-0 rounded-full bg-emerald-100 text-emerald-600 font-bold text-xs">1</span>
                    <span>Start with the amount: <strong className="text-slate-900">₹{money(pctResult.amount)}</strong></span>
                  </li>
                  <li className="flex gap-3">
                    <span className="flex items-center justify-center w-6 h-6 shrink-0 rounded-full bg-blue-100 text-brand-blue font-bold text-xs">2</span>
                    <span>Convert the percentage to a decimal: <strong className="text-slate-900">{pctResult.pct}% = {pctResult.pct / 100}</strong></span>
                  </li>
                  <li className="flex gap-3">
                    <span className="flex items-center justify-center w-6 h-6 shrink-0 rounded-full bg-violet-100 text-brand-purple font-bold text-xs">3</span>
                    <span>Multiply: ₹{money(pctResult.amount)} × {pctResult.pct / 100} = <strong className="text-emerald-700">₹{money(pctResult.value)}</strong></span>
                  </li>
                </ol>
              </div>
            </div>
          )}
        </>
      ) : (
        <>
          <div className="grid sm:grid-cols-2 gap-4">
            <label className="block">
              <span className="flex items-center gap-1.5 text-sm font-bold text-slate-700">
                <PiggyBank className="w-4 h-4 text-emerald-600" /> Monthly saving
              </span>
              <div className="mt-1.5 relative">
                <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 font-bold">₹</span>
                <input
                  type="number" inputMode="decimal" min="0" step="any"
                  value={monthly} onChange={(e) => setMonthly(e.target.value)}
                  placeholder="2000"
                  className="w-full pl-8 pr-4 py-3 rounded-2xl border-2 border-slate-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 outline-none transition-all font-semibold text-slate-800"
                />
              </div>
            </label>
            <label className="block">
              <span className="flex items-center gap-1.5 text-sm font-bold text-slate-700">
                <Percent className="w-4 h-4 text-brand-blue" /> Number of months
              </span>
              <div className="mt-1.5 relative">
                <input
                  type="number" inputMode="numeric" min="0" step="1"
                  value={months} onChange={(e) => setMonths(e.target.value)}
                  placeholder="12"
                  className="w-full pl-4 pr-16 py-3 rounded-2xl border-2 border-slate-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 outline-none transition-all font-semibold text-slate-800"
                />
                <span className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 font-bold text-sm">months</span>
              </div>
            </label>
          </div>

          {savError && (
            <div className="flex items-start gap-2.5 p-3.5 rounded-2xl bg-red-50 border border-red-200 text-red-700 text-sm animate-fade-up">
              <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
              <span className="font-medium">{savError}</span>
            </div>
          )}

          <div className="flex gap-3">
            <button onClick={calcSavings} disabled={!canCalcSav}
              className="flex-1 inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-full bg-emerald-500 text-white font-bold shadow-soft hover:bg-emerald-600 hover:scale-[1.02] active:scale-95 transition-all disabled:opacity-40 disabled:hover:scale-100 disabled:cursor-not-allowed">
              <Calculator className="w-5 h-5" /> Calculate
            </button>
            <button onClick={reset}
              className="inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-full bg-white border-2 border-slate-200 text-slate-600 font-bold hover:bg-slate-50 active:scale-95 transition-all">
              <RotateCcw className="w-5 h-5" /> Reset
            </button>
          </div>

          {savResult && (
            <div className="animate-fade-up space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div className="rounded-2xl bg-blue-50 border border-blue-200 p-4 text-center">
                  <div className="text-xs font-bold text-brand-blue uppercase tracking-wide">Saving monthly</div>
                  <div className="mt-1 font-display text-xl font-extrabold text-brand-blue">₹{money(savResult.monthly)}</div>
                </div>
                <div className="rounded-2xl bg-emerald-50 border border-emerald-200 p-4 text-center">
                  <div className="text-xs font-bold text-emerald-600 uppercase tracking-wide">Total saved</div>
                  <div className="mt-1 font-display text-2xl font-extrabold text-emerald-700">₹{money(savResult.total)}</div>
                </div>
              </div>
              <div className="rounded-3xl bg-slate-50 border border-slate-200 p-5">
                <div className="flex items-center gap-2 mb-3">
                  <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                  <h3 className="font-display font-bold text-slate-800">How it's calculated</h3>
                </div>
                <ol className="space-y-2.5 text-sm text-slate-700">
                  <li className="flex gap-3">
                    <span className="flex items-center justify-center w-6 h-6 shrink-0 rounded-full bg-emerald-100 text-emerald-600 font-bold text-xs">1</span>
                    <span>You save <strong className="text-slate-900">₹{money(savResult.monthly)}</strong> each month.</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="flex items-center justify-center w-6 h-6 shrink-0 rounded-full bg-blue-100 text-brand-blue font-bold text-xs">2</span>
                    <span>You save for <strong className="text-slate-900">{savResult.months} months</strong>.</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="flex items-center justify-center w-6 h-6 shrink-0 rounded-full bg-violet-100 text-brand-purple font-bold text-xs">3</span>
                    <span>Total = ₹{money(savResult.monthly)} × {savResult.months} = <strong className="text-emerald-700">₹{money(savResult.total)}</strong></span>
                  </li>
                </ol>
              </div>
            </div>
          )}
        </>
      )}
    </ModalShell>
  );
}
