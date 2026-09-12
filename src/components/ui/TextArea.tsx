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
          <div className="flex items-baseline justify-between mb-1.5">
            {label && (
              <label
                htmlFor={textareaId}
                className="text-[10px] font-mono font-semibold uppercase tracking-[0.18em] text-bone-400"
              >
                {label}
              </label>
            )}
            {meta && <div className="text-[10px] font-mono text-bone-500 tabular">{meta}</div>}
          </div>
        )}
        <textarea
          id={textareaId}
          ref={ref}
          className={cn(
            "w-full min-h-[120px] bg-ink-900 text-bone-100 px-3 py-3",
            "border-1 border-bone-500/30",
            "font-mono text-sm leading-relaxed tabular resize-y",
            "placeholder:text-bone-500",
            "transition-colors duration-150",
            "focus:outline-none focus:border-signal focus:bg-ink-950",
            "disabled:opacity-40 disabled:cursor-not-allowed",
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
