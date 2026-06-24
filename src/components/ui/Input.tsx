import React from 'react';
import { cn } from '../../lib/utils';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, label, id, ...props }, ref) => {
    const inputId = id || React.useId();
    return (
      <div className="space-y-1.5 w-full">
        {label && <label htmlFor={inputId} className="text-sm font-medium text-slate-300">{label}</label>}
        <input
          id={inputId}
          type={type}
          ref={ref}
          className={cn(
            "flex w-full rounded-lg border border-white/10 bg-black/20 px-3 py-2.5 text-sm text-slate-100 placeholder:text-slate-500 transition-all duration-200 shadow-inner focus:border-indigo-500/50 focus:bg-black/40 focus:outline-none focus:ring-1 focus:ring-indigo-500/50 disabled:cursor-not-allowed disabled:opacity-50 font-mono",
            className
          )}
          {...props}
        />
      </div>
    );
  }
);
Input.displayName = 'Input';