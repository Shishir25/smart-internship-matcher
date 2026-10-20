import React from 'react';

export function MatchScoreRing({ score = 0, size = 128, showDisclaimer = false }) {
  const normalizedScore = Math.max(0, Math.min(100, Number(score)));
  const strokeWidth = 10;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (normalizedScore / 100) * circumference;

  const getColor = (val) => (val >= 75 ? '#059669' : val >= 50 ? '#4F46E5' : '#D97706');
  const getLabel = (val) => (val >= 75 ? 'Strong Alignment' : val >= 50 ? 'Moderate Alignment' : 'Developing Alignment');

  return (
    <div className="flex flex-col items-center">
      <div className="relative flex items-center justify-center" style={{ width: size, height: size }}>
        <svg className="w-full h-full -rotate-90" viewBox={`0 0 ${size} ${size}`}>
          <circle cx={size / 2} cy={size / 2} r={radius} fill="none" stroke="#E2E8F0" strokeWidth={strokeWidth} />
          <circle cx={size / 2} cy={size / 2} r={radius} fill="none" stroke={getColor(normalizedScore)} strokeWidth={strokeWidth} strokeLinecap="round" strokeDasharray={circumference} strokeDashoffset={strokeDashoffset} className="transition-all duration-700 ease-out" />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
          <span className="font-mono text-2xl font-extrabold text-slate-900 tabular-nums">{normalizedScore.toFixed(0)}%</span>
          <span className="text-[10px] font-semibold uppercase tracking-wider text-slate-500 mt-0.5">{getLabel(normalizedScore)}</span>
        </div>
      </div>
      {showDisclaimer && (
        <p className="text-[11px] text-slate-500 text-center max-w-xs mt-2 leading-relaxed">
          Your match score measures profile-to-requirement alignment. It is not a probability of being selected.
        </p>
      )}
    </div>
  );
}
