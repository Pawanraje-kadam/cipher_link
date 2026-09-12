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
            className="block text-[10px] font-mono font-semibold uppercase tracking-[0.18em] text-bone-400 mb-1.5"
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
            "w-full bg-ink-900 text-bone-100 px-3 py-2.5",
            "border-1 border-bone-500/30",
            "font-mono text-sm tabular",
            "placeholder:text-bone-500 placeholder:font-normal",
            "transition-colors duration-150",
            "focus:outline-none focus:border-signal focus:bg-ink-950",
            "disabled:opacity-40 disabled:cursor-not-allowed",
            "selection:bg-signal/30",
            className,
          )}
          {...props}
        />
        {hint && <p className="mt-1 text-[10px] font-mono text-bone-400">{hint}</p>}
      </div>
    );
  },
);
Input.displayName = "Input";
