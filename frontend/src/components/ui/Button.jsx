import React from 'react';
import { Loader2 } from 'lucide-react';

export function Button({ children, variant = 'primary', size = 'md', loading = false, disabled = false, icon: Icon, className = '', ...props }) {
  const baseStyles = 'inline-flex items-center justify-center font-semibold rounded-xl transition-all duration-150 active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none';
  const variants = {
    primary: 'bg-indigo-600 hover:bg-indigo-700 text-white shadow-sm shadow-indigo-600/20 focus:ring-indigo-600',
    secondary: 'bg-slate-900 hover:bg-slate-800 text-white shadow-sm focus:ring-slate-900',
    outline: 'bg-white hover:bg-slate-50 text-slate-700 border border-slate-300 shadow-sm focus:ring-indigo-600',
    ghost: 'bg-transparent hover:bg-slate-100 text-slate-600 hover:text-slate-900 focus:ring-slate-400',
    danger: 'bg-rose-600 hover:bg-rose-700 text-white shadow-sm focus:ring-rose-600',
  };
  const sizes = {
    sm: 'text-xs px-3 py-1.5 gap-1.5',
    md: 'text-sm px-4 py-2.5 gap-2',
    lg: 'text-base px-6 py-3 gap-2.5',
  };
  return (
    <button disabled={disabled || loading} className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`} {...props}>
      {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : Icon && <Icon className="w-4 h-4 shrink-0" />}
      <span>{children}</span>
    </button>
  );
}
