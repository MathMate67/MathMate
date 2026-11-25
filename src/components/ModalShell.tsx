import { useEffect, type ReactNode } from 'react';
import { X, type LucideIcon } from 'lucide-react';

type Props = {
  open: boolean;
  onClose: () => void;
  title: string;
  subtitle?: string;
  icon: LucideIcon;
  iconClass?: string;
  headerGradient?: string;
  borderClass?: string;
  maxWidth?: string;
  titleId?: string;
  children: ReactNode;
};

export default function ModalShell({
  open,
  onClose,
  title,
  subtitle,
  icon: Icon,
  iconClass = 'bg-brand-blue text-white',
  headerGradient = 'from-blue-50 to-white',
  borderClass = 'border-blue-200',
  maxWidth = 'max-w-lg',
  titleId,
  children,
}: Props) {
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, onClose]);

  if (!open) return null;

  const id = titleId || `modal-${title.toLowerCase().replace(/[^a-z0-9]/g, '-')}`;

  return (
    <div
      className="fixed inset-0 z-[60] flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby={id}
    >
      <div className="absolute inset-0 bg-slate-900/50 backdrop-blur-sm animate-fade-up" onClick={onClose} />
      <div className={`relative w-full ${maxWidth} bg-white rounded-4xl shadow-card border-2 ${borderClass} overflow-hidden animate-pop max-h-[90vh] flex flex-col`}>
        <div className={`flex items-start justify-between gap-4 p-6 md:p-8 bg-gradient-to-br ${headerGradient} shrink-0`}>
          <div className="flex items-center gap-3">
            <span className={`inline-flex items-center justify-center w-11 h-11 rounded-2xl ${iconClass} shadow-sm`}>
              <Icon className="w-6 h-6" />
            </span>
            <div>
              <h2 id={id} className="font-display text-xl font-extrabold text-slate-800">{title}</h2>
              {subtitle && <p className="text-sm text-slate-500 font-medium">{subtitle}</p>}
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-500 hover:bg-white/70 hover:text-slate-800 transition-colors shrink-0"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        <div className="p-6 md:p-8 space-y-5 overflow-y-auto">{children}</div>
      </div>
    </div>
  );
}
