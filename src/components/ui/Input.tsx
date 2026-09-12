import React from "react";
import { cn } from "../../lib/utils";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  hint?: string;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, label, hint, id, ...props }, ref) => {
    const inputId = id || React.useId();
    return (
      <div className="w-full">
        {label && (
          <label
            htmlFor={inputId}
            className="block t-meta font-mono font-bold uppercase tracking-[0.14em] text-bone-200 mb-2"
          >
            {label}
          </label>
        )}
        <input
          id={inputId}
          type={type}
          ref={ref}
          className={cn(
            // Inset terminal field. No rounded corners, no blue focus glow.
            "w-full bg-ink-900 text-bone-50 px-4 py-3",
            "border-1 border-bone-500/50",
            "font-mono t-field font-bold tabular",
            "placeholder:text-bone-400 placeholder:font-bold",
            "transition-colors duration-150",
            "focus:outline-none focus:border-signal focus:bg-ink-950",
            "disabled:opacity-60 disabled:cursor-not-allowed",
            "selection:bg-signal/30",
            className,
          )}
          {...props}
        />
        {hint && <p className="mt-1.5 t-meta font-mono font-bold leading-snug text-bone-300">{hint}</p>}
      </div>
    );
  },
);
Input.displayName = "Input";
