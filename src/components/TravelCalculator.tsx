import { useMemo, useState } from 'react';
import { RotateCcw, Calculator, Fuel, MapPin, Gauge, CheckCircle2, AlertCircle } from 'lucide-react';
import ModalShell from './ModalShell';

type Props = { open: boolean; onClose: () => void };
type Result = { distance: number; mileage: number; price: number; fuel: number; cost: number };

export default function TravelCalculator({ open, onClose }: Props) {
  const [distance, setDistance] = useState('');
  const [mileage, setMileage] = useState('');
  const [price, setPrice] = useState('');
  const [result, setResult] = useState<Result | null>(null);
  const [error, setError] = useState<string | null>(null);

  const canSubmit = useMemo(
    () => distance.trim() !== '' && mileage.trim() !== '' && price.trim() !== '',
    [distance, mileage, price]
  );

  const calculate = () => {
    const d = Number(distance);
    const m = Number(mileage);
    const p = Number(price);

    if (distance.trim() === '' || mileage.trim() === '' || price.trim() === '' ||
        Number.isNaN(d) || Number.isNaN(m) || Number.isNaN(p)) {
      setError('Please enter a number for all three fields.');
      setResult(null);
      return;
    }
    if (d < 0 || m < 0 || p < 0) {
      setError('All values must be zero or more — no negative numbers.');
      setResult(null);
      return;
    }
    if (m === 0) {
      setError('Mileage cannot be zero — we need it to divide the distance.');
      setResult(null);
      return;
    }
    setError(null);
    const fuel = d / m;
    const cost = fuel * p;
    setResult({ distance: d, mileage: m, price: p, fuel, cost });
  };

  const reset = () => {
    setDistance('');
    setMileage('');
    setPrice('');
    setResult(null);
    setError(null);
  };

  return (
    <ModalShell
      open={open}
      onClose={onClose}
      title="Travel Expense Calculator"
      subtitle="Estimate fuel needed and total cost for any trip."
      icon={Fuel}
      iconClass="bg-brand-purple text-white"
      headerGradient="from-violet-50 to-white"
      borderClass="border-violet-200"
    >
      <div className="space-y-4">
        <label className="block">
          <span className="flex items-center gap-1.5 text-sm font-bold text-slate-700">
            <MapPin className="w-4 h-4 text-brand-purple" /> Travel distance
          </span>
          <div className="mt-1.5 relative">
            <input
              type="number"
              inputMode="decimal"
              min="0"
              step="any"
              value={distance}
              onChange={(e) => setDistance(e.target.value)}
              placeholder="350"
              className="w-full pl-4 pr-12 py-3 rounded-2xl border-2 border-slate-200 focus:border-brand-blue focus:ring-2 focus:ring-brand-blue/20 outline-none transition-all font-semibold text-slate-800"
            />
            <span className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 font-bold text-sm">km</span>
          </div>
        </label>

        <label className="block">
          <span className="flex items-center gap-1.5 text-sm font-bold text-slate-700">
            <Gauge className="w-4 h-4 text-brand-blue" /> Vehicle mileage
          </span>
          <div className="mt-1.5 relative">
            <input
              type="number"
              inputMode="decimal"
              min="0"
              step="any"
              value={mileage}
              onChange={(e) => setMileage(e.target.value)}
              placeholder="18"
              className="w-full pl-4 pr-20 py-3 rounded-2xl border-2 border-slate-200 focus:border-brand-blue focus:ring-2 focus:ring-brand-blue/20 outline-none transition-all font-semibold text-slate-800"
            />
            <span className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 font-bold text-sm">km/l</span>
          </div>
        </label>

        <label className="block">
          <span className="flex items-center gap-1.5 text-sm font-bold text-slate-700">
            <Fuel className="w-4 h-4 text-amber-600" /> Fuel price per litre
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
              placeholder="105"
              className="w-full pl-8 pr-4 py-3 rounded-2xl border-2 border-slate-200 focus:border-brand-blue focus:ring-2 focus:ring-brand-blue/20 outline-none transition-all font-semibold text-slate-800"
            />
          </div>
        </label>
      </div>

      {error && (
        <div className="flex items-start gap-2.5 p-3.5 rounded-2xl bg-red-50 border border-red-200 text-red-700 text-sm animate-fade-up">
          <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
          <span className="font-medium">{error}</span>
        </div>
      )}

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

      {result && (
        <div className="animate-fade-up space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <div className="rounded-2xl bg-violet-50 border border-violet-200 p-4">
              <div className="text-xs font-bold text-brand-purple uppercase tracking-wide">Fuel needed</div>
              <div className="mt-1 font-display text-2xl font-extrabold text-brand-purple">
                {result.fuel.toFixed(2)} <span className="text-base font-bold">litres</span>
              </div>
            </div>
            <div className="rounded-2xl bg-emerald-50 border border-emerald-200 p-4">
              <div className="text-xs font-bold text-emerald-600 uppercase tracking-wide">Total cost</div>
              <div className="mt-1 font-display text-2xl font-extrabold text-emerald-700">
                ₹{result.cost.toFixed(2)}
              </div>
            </div>
          </div>

          <div className="rounded-3xl bg-slate-50 border border-slate-200 p-5">
            <div className="flex items-center gap-2 mb-3">
              <CheckCircle2 className="w-5 h-5 text-emerald-500" />
              <h3 className="font-display font-bold text-slate-800">How it's calculated</h3>
            </div>
            <ol className="space-y-2.5 text-sm text-slate-700">
              <li className="flex gap-3">
                <span className="flex items-center justify-center w-6 h-6 shrink-0 rounded-full bg-violet-100 text-brand-purple font-bold text-xs">1</span>
                <span>Trip distance: <strong className="text-slate-900">{result.distance} km</strong></span>
              </li>
              <li className="flex gap-3">
                <span className="flex items-center justify-center w-6 h-6 shrink-0 rounded-full bg-blue-100 text-brand-blue font-bold text-xs">2</span>
                <span>Vehicle mileage: <strong className="text-slate-900">{result.mileage} km per litre</strong></span>
              </li>
              <li className="flex gap-3">
                <span className="flex items-center justify-center w-6 h-6 shrink-0 rounded-full bg-amber-100 text-amber-700 font-bold text-xs">3</span>
                <span>Fuel needed = {result.distance} ÷ {result.mileage} = <strong className="text-slate-900">{result.fuel.toFixed(2)} litres</strong></span>
              </li>
              <li className="flex gap-3">
                <span className="flex items-center justify-center w-6 h-6 shrink-0 rounded-full bg-emerald-100 text-emerald-600 font-bold text-xs">4</span>
                <span>Total cost = {result.fuel.toFixed(2)} × ₹{result.price} = <strong className="text-emerald-700">₹{result.cost.toFixed(2)}</strong></span>
              </li>
            </ol>
          </div>
        </div>
      )}
    </ModalShell>
  );
}
