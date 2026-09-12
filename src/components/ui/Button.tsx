import React from "react";
import { cn } from "../../lib/utils";
import { Loader2 } from "lucide-react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost" | "danger";
  isLoading?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", isLoading, children, disabled, ...props }, ref) => {
    const variants = {
      // Primary: hard black + signal border + hard shadow. No gradient, no glow.
      primary:
        "bg-bone-50 text-ink-950 border-1 border-bone-50 font-bold hover:bg-bone-100 active:translate-x-[2px] active:translate-y-[2px] active:shadow-none shadow-hard",
      secondary:
        "bg-ink-800 text-bone-50 border-1 border-bone-500/60 font-bold hover:border-bone-100 hover:bg-ink-700 active:bg-ink-900",
      ghost:
        "bg-transparent text-bone-200 font-bold hover:text-bone-50 hover:bg-ink-800 border-1 border-transparent",
      danger:
        "bg-danger text-ink-950 border-1 border-danger hover:brightness-110 active:translate-x-[2px] active:translate-y-[2px] active:shadow-none shadow-hard-danger",
    };

    return (
      <button
        ref={ref}
        disabled={disabled || isLoading}
        className={cn(
          // Square (sharp) corners. Uppercase mono letters to read as "control panel",
          // not "saas button". Custom physical-feeling press (translate+shadow drop).
          "inline-flex items-center justify-center px-5 py-3",
          "text-[18px] font-mono font-bold uppercase tracking-[0.12em]",
          "transition-all duration-150",
          "focus:outline-none focus-visible:ring-2 focus-visible:ring-signal focus-visible:ring-offset-2 focus-visible:ring-offset-ink-950",
          "disabled:opacity-60 disabled:cursor-not-allowed disabled:active:translate-x-0 disabled:active:translate-y-0",
          variants[variant],
          className,
        )}
        {...props}
      >
        {isLoading && <Loader2 className="mr-2 h-[18px] w-[18px] animate-spin" />}
        {children}
      </button>
    );
  },
);
Button.displayName = "Button";
