import React from "react";
import { cn } from "../../lib/utils";

export interface TextAreaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  meta?: React.ReactNode;
}

export const TextArea = React.forwardRef<HTMLTextAreaElement, TextAreaProps>(
  ({ className, label, meta, id, ...props }, ref) => {
    const textareaId = id || React.useId();
    return (
      <div className="w-full">
        {(label || meta) && (
          <div className="flex items-baseline justify-between mb-2">
            {label && (
              <label
                htmlFor={textareaId}
                className="text-[0.9375rem] touch:text-base font-mono font-bold uppercase tracking-[0.14em] text-bone-200"
              >
                {label}
              </label>
            )}
            {meta && <div className="text-[0.9375rem] touch:text-base font-mono font-bold text-bone-300 tabular">{meta}</div>}
          </div>
        )}
        <textarea
          id={textareaId}
          ref={ref}
          className={cn(
            "w-full min-h-[8.75rem] bg-ink-900 text-bone-50 px-4 py-3.5 touch:py-4",
            "border-1 border-bone-500/50",
            "font-mono text-xl font-bold leading-relaxed tabular resize-y",
            "placeholder:text-bone-400 placeholder:font-bold",
            "transition-colors duration-150",
            "focus:outline-none focus:border-signal focus:bg-ink-950",
            "disabled:opacity-60 disabled:cursor-not-allowed",
            "selection:bg-signal/30",
            className,
          )}
          {...props}
        />
      </div>
    );
  },
);
TextArea.displayName = "TextArea";
