import React from 'react';

export function Card({ children, hover = false, className = '', ...props }) {
  return (
    <div className={`bg-white border border-slate-200/90 rounded-2xl shadow-sm ${hover ? 'transition-all duration-200 hover:shadow-md hover:border-slate-300' : ''} ${className}`} {...props}>
      {children}
    </div>
  );
}
