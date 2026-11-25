import { useEffect, useMemo, useState } from 'react';
import { X, RotateCcw, Calculator, ShoppingBag, Tag, CheckCircle2, AlertCircle } from 'lucide-react';

type Props = {
  open: boolean;
  onClose: () => void;
};

type Result = {
  original: number;
  discountPct: number;
  discountAmount: number;
  final: number;
};

export default function ShoppingDiscountCalculator({ open, onClose }: Props) {
  const [price, setPrice] = useState('');
  const [discount, setDiscount] = useState('');
  const [result, setResult] = useState<Result | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Lock background scroll while the modal is open
  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  // Close on Escape
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, onClose]);

  const canSubmit = useMemo(
    () => price.trim() !== '' && discount.trim() !== '',
    [price, discount]
  );

  const reset = () => {
    setPrice('');
    setDiscount('');
    setResult(null);
    setError(null);
  };

  const calculate = () => {
    const original = Number(price);
    const discountPct = Number(discount);

    if (price.trim() === '' || discount.trim() === '' || Number.isNaN(original) || Number.isNaN(discountPct)) {
      setError('Please enter a number for both the original price and the discount percentage.');
      setResult(null);
      return;
    }
    if (original < 0) {
      setError('Original price cannot be negative. Please enter a value of zero or more.');
      setResult(null);
      return;
    }
    if (discountPct < 0 || discountPct > 100) {
      setError('Discount percentage must be between 0 and 100.');
      setResult(null);
      return;
    }

    const discountAmount = (original * discountPct) / 100;
    const final = original - discountAmount;
    setError(null);
    setResult({ original, discountPct, discountAmount, final });
  };

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[60] flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="sdc-title"
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-slate-900/50 backdrop-blur-sm animate-fade-up"
        onClick={onClose}
      />

      {/* Panel */}
      <div className="relative w-full max-w-lg bg-white rounded-4xl shadow-card border-2 border-amber-200 overflow-hidden animate-pop">
        {/* Header */}
        <div className="flex items-start justify-between gap-4 p-6 md:p-8 bg-gradient-to-br from-brand-sand to-amber-50">
          <div className="flex items-center gap-3">
            <span className="inline-flex items-center justify-center w-11 h-11 rounded-2xl bg-brand-yellow text-amber-700 shadow-sm">
              <ShoppingBag className="w-6 h-6" />
            </span>
            <div>
              <h2 id="sdc-title" className="font-display text-xl font-extrabold text-slate-800">
                Shopping & Discounts
              </h2>
              <p className="text-sm text-amber-700/80 font-medium">Work out the real sale price in seconds.</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-500 hover:bg-white/70 hover:text-slate-800 transition-colors"
            aria-label="Close calculator"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 md:p-8 space-y-5">
          {/* Inputs */}
          <div className="grid sm:grid-cols-2 gap-4">
            <label className="block">
              <span className="flex items-center gap-1.5 text-sm font-bold text-slate-700">
                <Tag className="w-4 h-4 text-amber-600" /> Original price
              </span>
              <div className="mt-1.5 relative">
                <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 font-bold">₹</span>
                <input
                  type="number"
                  inputMode="decimal"
                  min="0"
                  step="any"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  placeholder="800"
                  className="w-full pl-8 pr-4 py-3 rounded-2xl border-2 border-slate-200 focus:border-brand-blue focus:ring-2 focus:ring-brand-blue/20 outline-none transition-all font-semibold text-slate-800"
                />
              </div>
            </label>

            <label className="block">
              <span className="flex items-center gap-1.5 text-sm font-bold text-slate-700">
                <Calculator className="w-4 h-4 text-brand-blue" /> Discount (%)
              </span>
              <div className="mt-1.5 relative">
                <input
                  type="number"
                  inputMode="decimal"
                  min="0"
                  max="100"
                  step="any"
                  value={discount}
                  onChange={(e) => setDiscount(e.target.value)}
                  placeholder="25"
                  className="w-full pl-4 pr-8 py-3 rounded-2xl border-2 border-slate-200 focus:border-brand-blue focus:ring-2 focus:ring-brand-blue/20 outline-none transition-all font-semibold text-slate-800"
                />
                <span className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 font-bold">%</span>
              </div>
            </label>
          </div>

          {/* Error */}
          {error && (
            <div className="flex items-start gap-2.5 p-3.5 rounded-2xl bg-red-50 border border-red-200 text-red-700 text-sm animate-fade-up">
              <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
              <span className="font-medium">{error}</span>
            </div>
          )}

          {/* Buttons */}
          <div className="flex gap-3">
            <button
              onClick={calculate}
              disabled={!canSubmit}
              className="flex-1 inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-full bg-brand-blue text-white font-bold shadow-soft hover:bg-blue-600 hover:scale-[1.02] active:scale-95 transition-all disabled:opacity-40 disabled:hover:scale-100 disabled:cursor-not-allowed"
            >
              <Calculator className="w-5 h-5" /> Calculate
            </button>
            <button
              onClick={reset}
              className="inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-full bg-white border-2 border-slate-200 text-slate-600 font-bold hover:bg-slate-50 hover:border-slate-300 active:scale-95 transition-all"
            >
              <RotateCcw className="w-5 h-5" /> Reset
            </button>
          </div>

          {/* Result + steps */}
          {result && (
            <div className="animate-fade-up space-y-4">
              {/* Summary cards */}
              <div className="grid grid-cols-2 gap-3">
                <div className="rounded-2xl bg-amber-50 border border-amber-200 p-4">
                  <div className="text-xs font-bold text-amber-600 uppercase tracking-wide">You save</div>
                  <div className="mt-1 font-display text-2xl font-extrabold text-amber-700">
                    ₹{result.discountAmount.toFixed(2)}
                  </div>
                </div>
                <div className="rounded-2xl bg-emerald-50 border border-emerald-200 p-4">
                  <div className="text-xs font-bold text-emerald-600 uppercase tracking-wide">Final price</div>
                  <div className="mt-1 font-display text-2xl font-extrabold text-emerald-700">
                    ₹{result.final.toFixed(2)}
                  </div>
                </div>
              </div>

              {/* Step-by-step explanation */}
              <div className="rounded-3xl bg-slate-50 border border-slate-200 p-5">
                <div className="flex items-center gap-2 mb-3">
                  <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                  <h3 className="font-display font-bold text-slate-800">How it's calculated</h3>
                </div>
                <ol className="space-y-2.5 text-sm text-slate-700">
                  <li className="flex gap-3">
                    <span className="flex items-center justify-center w-6 h-6 shrink-0 rounded-full bg-brand-sand text-amber-700 font-bold text-xs">1</span>
                    <span>
                      Start with the original price:{' '}
                      <strong className="text-slate-900">₹{result.original.toFixed(2)}</strong>
                    </span>
                  </li>
                  <li className="flex gap-3">
                    <span className="flex items-center justify-center w-6 h-6 shrink-0 rounded-full bg-blue-100 text-brand-blue font-bold text-xs">2</span>
                    <span>
                      The discount is{' '}
                      <strong className="text-slate-900">{result.discountPct}%</strong> of the price.
                    </span>
                  </li>
                  <li className="flex gap-3">
                    <span className="flex items-center justify-center w-6 h-6 shrink-0 rounded-full bg-violet-100 text-brand-purple font-bold text-xs">3</span>
                    <span>
                      Discount amount = ₹{result.original.toFixed(2)} × {result.discountPct}% ={' '}
                      <strong className="text-slate-900">₹{result.discountAmount.toFixed(2)}</strong>
                    </span>
                  </li>
                  <li className="flex gap-3">
                    <span className="flex items-center justify-center w-6 h-6 shrink-0 rounded-full bg-emerald-100 text-emerald-600 font-bold text-xs">4</span>
                    <span>
                      Final price = ₹{result.original.toFixed(2)} − ₹{result.discountAmount.toFixed(2)} ={' '}
                      <strong className="text-emerald-700">₹{result.final.toFixed(2)}</strong>
                    </span>
                  </li>
                </ol>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
