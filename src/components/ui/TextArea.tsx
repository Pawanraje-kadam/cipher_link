import React from 'react';
import { cn } from '../../lib/utils';

export interface TextAreaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
}

export const TextArea = React.forwardRef<HTMLTextAreaElement, TextAreaProps>(
  ({ className, label, id, ...props }, ref) => {
    const textareaId = id || React.useId();
    return (
      <div className="space-y-1.5 w-full">
        {label && <label htmlFor={textareaId} className="flex justify-between text-sm font-medium text-slate-300"><span>{label}</span></label>}
        <textarea
          id={textareaId}
          ref={ref}
          className={cn(
            "flex min-h-[120px] w-full rounded-lg border border-white/10 bg-black/20 px-3 py-3 text-sm text-slate-100 placeholder:text-slate-500 transition-all duration-200 shadow-inner resize-y focus:border-indigo-500/50 focus:bg-black/40 focus:outline-none focus:ring-1 focus:ring-indigo-500/50 disabled:cursor-not-allowed disabled:opacity-50 scrollbar-thin scrollbar-track-transparent scrollbar-thumb-white/10 hover:scrollbar-thumb-white/20",
            className
          )}
          {...props}
        />
      </div>
    );
  }
);
TextArea.displayName = 'TextArea';