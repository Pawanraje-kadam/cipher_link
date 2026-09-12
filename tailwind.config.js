/** @type {import('tailwindcss').Config} */

/* Colour tokens resolve to CSS custom properties (channel triplets declared in
   src/index.css). Two reasons:
   1. `rgb(var(--x) / <alpha-value>)` keeps opacity modifiers (`bone-500/40`)
      working while still letting one media query retune the whole ramp for
      `prefers-contrast: more` — the setting Windows and Android users pick when
      default text is too faint.
   2. The ramp stays a single source of truth instead of hex strings scattered
      through components. */
const ramp = (name) => `rgb(var(--${name}) / <alpha-value>)`;

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        // Deliberate palette. Not the AI indigo/emerald default.
        // A near-black "page" with slightly lighter "paper" surfaces.
        ink: {
          950: ramp("ink-950"), // page
          900: ramp("ink-900"), // well / card
          800: ramp("ink-800"), // raised surface
          700: ramp("ink-700"), // hover surface
        },
        // Contrast floors, measured on ink-950 (#080808):
        //   bone-50 18.4:1 · bone-100 17.0 · bone-200 13.8 · bone-300 9.7
        //   bone-400 7.2:1 · bone-500 3.7:1 (structural only: rules/placeholders)
        bone: {
          50: ramp("bone-50"), // primary text (warm off-white, never #fff)
          100: ramp("bone-100"),
          200: ramp("bone-200"),
          300: ramp("bone-300"),
          400: ramp("bone-400"),
          500: ramp("bone-500"),
        },
        // Terminal green — the only true accent. Used sparingly for success/positive.
        signal: {
          DEFAULT: "#34d399", // mint/terminal — 10.4:1 on the page
          dim: "#0d3b2c",
        },
        // Amber — warnings, cautions, hints.
        warn: { DEFAULT: "#f5b544", dim: "#3d2f0f" },
        // Red — errors/danger.
        danger: { DEFAULT: "#f25c4e", dim: "#3b1310" },
      },
      fontFamily: {
        // Mono is the primary UI type — signals cipher/terminal intent.
        // Each stack is: our self-hosted face → metric-matched fallback alias
        // (see src/index.css) → the OS's best-hinted face → generic.
        //   Windows 11: Cascadia Mono · Windows 10: Consolas
        //   Android  : Roboto Mono (real 700 face, no synthetic bold)
        //   macOS      : Menlo/SFMono · Linux: DejaVu Sans Mono
        mono: [
          '"JetBrains Mono"',
          '"Cipher Mono Fallback"',
          "ui-monospace",
          '"Cascadia Mono"',
          "Consolas",
          '"Roboto Mono"',
          "SFMono-Regular",
          "Menlo",
          "monospace",
        ],
        // Body copy only. system-ui first is wrong here — it resolves to
        // different faces per OS and shifts line-height; the alias pins metrics.
        sans: [
          '"IBM Plex Sans"',
          '"Cipher Sans Fallback"',
          "system-ui",
          '"Segoe UI Variable Text"',
          '"Segoe UI"',
          "Roboto",
          "sans-serif",
        ],
      },
      // rem everywhere on purpose. Android's Settings ▸ Display ▸ Font size and
      // Windows browser zoom both scale the root font size; px-authored type
      // ignores them and leaves the UI frozen at the designer's preference.
      fontSize: {
        xs: ["0.75rem", { lineHeight: "1.35" }],
        sm: ["0.875rem", { lineHeight: "1.4" }],
        base: ["1rem", { lineHeight: "1.5" }],
        lg: ["1.125rem", { lineHeight: "1.5" }],
        xl: ["1.3125rem", { lineHeight: "1.45" }], // field + output text
        "2xl": ["1.5rem", { lineHeight: "1.4" }],
        "3xl": ["1.875rem", { lineHeight: "1.25" }],
      },
      spacing: {
        // Slightly odd step to break the 4/8/16/24/32 "default tailwind" look.
        18: "4.5rem",
      },
      borderRadius: {
        // Sharp by contract; nothing inherits Tailwind's rounded defaults.
        none: "0px",
      },
      borderWidth: {
        1: "1px",
      },
      minHeight: {
        // iOS/Android minimum comfortable tap target (44px, Material asks 48dp).
        tap: "2.75rem",
      },
      boxShadow: {
        // No soft blur glow. Sharp offset shadows feel constructed, not airbrushed.
        hard: "4px 4px 0 0 rgba(52,211,153,0.15)",
        "hard-warn": "4px 4px 0 0 rgba(245,181,68,0.15)",
        "hard-danger": "4px 4px 0 0 rgba(242,92,78,0.15)",
        inset: "inset 2px 2px 0 0 rgba(247,245,240,0.05)",
      },
      animation: {
        "blink": "blink 1.2s steps(2) infinite",
        "scanline": "scanline 6s linear infinite",
        "pulse-subtle": "pulseSubtle 3s ease-in-out infinite",
        // Translate only — no opacity. Fading a block of copy on and off makes
        // Chrome/Edge on Windows swap ClearType for grayscale AA mid-animation,
        // so the text visibly thickens when the animation ends. It also just
        // looks like the bug we are trying to kill.
        "slide-up": "slideUp 0.24s cubic-bezier(0.2, 0.8, 0.2, 1)",
      },
      keyframes: {
        blink: {
          "0%, 49%": { opacity: "1" },
          "50%, 100%": { opacity: "0" },
        },
        scanline: {
          "0%": { transform: "translateY(-100%)" },
          "100%": { transform: "translateY(100%)" },
        },
        pulseSubtle: {
          "0%,100%": { opacity: "0.55" },
          "50%": { opacity: "0.85" },
        },
        slideUp: {
          "0%": { transform: "translateY(10px)" },
          "100%": { transform: "translateY(0)" },
        },
      },
    },
  },
  plugins: [
    // Touch ergonomics without a dependency on Tailwind's newer variants:
    // `touch:` applies on coarse pointers (Android phones, Windows tablets),
    // where 15px labels and 20px-wide controls are both too small to read and
    // too small to hit.
    function touchVariants({ addVariant }) {
      addVariant("touch", "@media (pointer: coarse)");
      addVariant("mouse", "@media (pointer: fine)");
    },
  ],
};
