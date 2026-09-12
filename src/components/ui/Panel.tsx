import React from "react";
import { cn } from "../../lib/utils";

interface PanelProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Short uppercase label shown in the corner (e.g. "ENCRYPT", "DECRYPT"). */
  label?: string;
  /** Optional right-side meta (e.g. status dot + text). */
  meta?: React.ReactNode;
  /** Accent color for the label rule. */
  accent?: "signal" | "warn" | "danger" | "bone";
}

/**
 * Panel — replaces the glassmorphic GlassCard.
 * Hard inset surface with a beveled label strip in the corner, like a piece of
 * rack-mounted gear. No blur, no soft shadow, no rounded corners.
 */
export function Panel({
  children,
  className,
  label,
  meta,
  accent = "signal",
  ...props
}: PanelProps) {
  const accentClass = {
    signal: "text-signal",
    warn: "text-warn",
    danger: "text-danger",
    bone: "text-bone-200",
  }[accent];

  return (
    <div
      className={cn(
        "relative bg-ink-900 border-1 border-bone-500/40",
        "shadow-inset",
        className,
      )}
      {...props}
    >
      {/* Corner label strip — breaks the perfect rectangle, gives the panel
          a specific identity rather than "another rounded card". */}
      {(label || meta) && (
        <div className="flex flex-wrap items-center justify-between gap-x-3 gap-y-1 px-4 py-2.5 border-b-1 border-bone-500/40 bg-ink-950/60">
          <div className="flex items-center gap-2 min-w-0">
            <span className={cn("led bg-current", accentClass)} />
            <span
              className={cn(
                "text-[0.9375rem] font-mono font-bold uppercase tracking-[0.18em]",
                accentClass,
              )}
            >
              {label}
            </span>
          </div>
          {meta && (
            <div className="text-[0.9375rem] touch:text-base font-mono font-bold text-bone-300 tabular">{meta}</div>
          )}
        </div>
      )}
      <div className="p-6">{children}</div>
    </div>
  );
}
