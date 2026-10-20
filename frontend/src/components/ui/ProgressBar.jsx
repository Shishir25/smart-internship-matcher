import React from 'react';

export function ProgressBar({ label, score = 0, weightLabel = '', color = 'indigo' }) {
  const clamped = Math.max(0, Math.min(100, Number(score)));
  const barColors = { indigo: 'bg-indigo-600', emerald: 'bg-emerald-600', amber: 'bg-amber-500', slate: 'bg-slate-700' };
  return (
    <div className="space-y-1.5">
      <div className="flex items-center justify-between text-xs">
        <span className="font-semibold text-slate-700">{label}</span>
        <div className="flex items-center gap-2">
          {weightLabel && <span className="text-slate-400">{weightLabel}</span>}
          <span className="font-mono font-bold text-slate-900 tabular-nums">{clamped.toFixed(0)}/100</span>
        </div>
      </div>
      <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden border border-slate-200/60">
        <div className={`h-full rounded-full transition-all duration-500 ${barColors[color] || barColors.indigo}`} style={{ width: `${clamped}%` }} />
      </div>
    </div>
  );
}
