import { cn } from "../../lib/utils";

interface StrengthMeterProps {
  password: string;
}

/**
 * A compact, honest password-strength readout.
 * Renders a segmented bar + a short mono label. Real security UX —
 * not a generic "Security Shield" icon.
 */
export function StrengthMeter({ password }: StrengthMeterProps) {
  const { score, label } = evaluateStrength(password);

  const segments = [0, 1, 2, 3];
  const colors = [
    "bg-bone-500/30",
    "bg-danger",
    "bg-warn",
    "bg-signal",
  ];

  return (
    <div className="flex items-center gap-3">
      <div className="flex gap-1 flex-1">
        {segments.map((i) => (
          <div
            key={i}
            className={cn(
              "h-1.5 flex-1 border-1 border-bone-500/40",
              i < score ? colors[score] : "bg-ink-950",
            )}
          />
        ))}
      </div>
      <span
        className={cn(
          "text-[15px] font-mono font-bold uppercase tracking-[0.12em] tabular w-32 text-right",
          score === 0 && "text-bone-300",
          score === 1 && "text-danger",
          score === 2 && "text-warn",
          score >= 3 && "text-signal",
        )}
      >
        {label}
      </span>
    </div>
  );
}

function evaluateStrength(pw: string): { score: number; label: string } {
  if (!pw) return { score: 0, label: "— idle" };
  let score = 0;
  if (pw.length >= 8) score++;
  if (pw.length >= 12) score++;
  const classes =
    Number(/[a-z]/.test(pw)) +
    Number(/[A-Z]/.test(pw)) +
    Number(/\d/.test(pw)) +
    Number(/[^a-zA-Z0-9]/.test(pw));
  if (classes >= 3) score++;
  if (classes >= 4 && pw.length >= 16) score = Math.min(3, score + 1);
  const labels = ["too short", "weak", "fair", "strong"];
  return { score: Math.min(3, score), label: labels[Math.min(3, score)] };
}
