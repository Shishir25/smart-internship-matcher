import React from 'react';
import { CheckCircle2, AlertCircle, XCircle, Info } from 'lucide-react';

export function Badge({ children, variant = 'neutral', showIcon = false, className = '' }) {
  const styles = {
    success: 'bg-emerald-50 text-emerald-800 border-emerald-200',
    warning: 'bg-amber-50 text-amber-800 border-amber-200',
    danger: 'bg-rose-50 text-rose-800 border-rose-200',
    indigo: 'bg-indigo-50 text-indigo-800 border-indigo-200',
    neutral: 'bg-slate-100 text-slate-700 border-slate-200',
  };
  const icons = { success: CheckCircle2, warning: AlertCircle, danger: XCircle, indigo: Info, neutral: Info };
  const IconComponent = icons[variant];
  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold border ${styles[variant]} ${className}`}>
      {showIcon && IconComponent && <IconComponent className="w-3.5 h-3.5 shrink-0" />}
      <span>{children}</span>
    </span>
  );
}
