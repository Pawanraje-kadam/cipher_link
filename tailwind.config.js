/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        // Deliberate palette. Not the AI indigo/emerald default.
        // A near-black "page" with slightly lighter "paper" surfaces.
        ink: {
          950: "#080808", // page
          900: "#0d0d0d", // well / card
          800: "#141414", // raised surface
          700: "#1c1c1c", // hover surface
        },
        bone: {
          50: "#f5f3ee",  // primary text (warm off-white, not harsh #fff)
          100: "#e8e4dc",
          200: "#c9c4b8",
          300: "#8f8a7f",
          400: "#5f5b53",
          500: "#3a3833",
        },
        // Terminal green — the only true accent. Used sparingly for success/positive.
        signal: {
          DEFAULT: "#34d399", // mint/terminal
          dim: "#0d3b2c",
        },
        // Amber — warnings, cautions, hints.
        warn: { DEFAULT: "#f5b544", dim: "#3d2f0f" },
        // Red — errors/danger.
        danger: { DEFAULT: "#f25c4e", dim: "#3b1310" },
      },
      fontFamily: {
        // Mono is the primary UI type — signals cipher/terminal intent.
        mono: ['"JetBrains Mono"', "ui-monospace", "SFMono-Regular", "Menlo", "monospace"],
        sans: ['"IBM Plex Sans"', "system-ui", "-apple-system", "sans-serif"],
      },
      spacing: {
        // Slightly odd step to break the 4/8/16/24/32 "default tailwind" look.
        18: "4.5rem",
      },
      borderWidth: {
        1: "1px",
      },
      boxShadow: {
        // No soft blur glow. Sharp offset shadows feel constructed, not airbrushed.
        hard: "4px 4px 0 0 rgba(52,211,153,0.15)",
        "hard-warn": "4px 4px 0 0 rgba(245,181,68,0.15)",
        "hard-danger": "4px 4px 0 0 rgba(242,92,78,0.15)",
        inset: "inset 2px 2px 0 0 rgba(245,243,238,0.04)",
      },
      animation: {
        "blink": "blink 1.2s steps(2) infinite",
        "scanline": "scanline 6s linear infinite",
        "pulse-subtle": "pulseSubtle 3s ease-in-out infinite",
        "slide-up": "slideUp 0.5s cubic-bezier(0.2, 0.8, 0.2, 1)",
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
          "0%,100%": { opacity: "0.4" },
          "50%": { opacity: "0.7" },
        },
        slideUp: {
          "0%": { opacity: "0", transform: "translateY(8px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
    },
  },
  plugins: [],
};
