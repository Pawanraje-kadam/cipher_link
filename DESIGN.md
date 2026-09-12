# CipherLink · Design System

This file is the single source of truth for CipherLink's visual language. It exists
to stop the UI from drifting back into the statistical-average "AI slop" defaults
(Inter + indigo gradient + glassmorphism + rounded-2xl + centered hero).

Reference aesthetic: **terminal-brutalist cipher machine.** Think rack-mounted crypto
gear, CRT terminals, Vercel's mono black, xAI's brutalist monospace, and 90s PGP tooling
— not SaaS landing pages.

---

## 1. Hard bans (never do these)

- No `backdrop-blur` glassmorphism. Ever.
- No indigo / purple / violet / cyan accents.
- No glowing neon shadows (`shadow-[0_0_15px_...]`).
- No gradient text or gradient backgrounds.
- No blurred blobs ("aurora/mesh gradients") behind content.
- No `rounded-2xl` / `rounded-xl` on components. Panels and buttons are **sharp**
  (0 radius). Small controls may use `rounded-sm` only for affordance.
- No centered-hero → 3-card grid layouts.
- No "pill" chips (`rounded-full bg-white/5`) as decorative badges.
- No marketing fluff: "military-grade", "cutting-edge", "seamless", "empower",
  "unlock", "revolutionize", "next level".
- No Lucide icons larger than the surrounding text — icons are punctuation, not hero art.

## 2. Typography

- **Primary UI type:** JetBrains Mono (300–700). Used for headlines, buttons, labels,
  inputs, metadata, and error text. Mono is the brand signal — it reads as
  *cipher/terminal* to the target audience.
- **Body copy (only where long-form is needed):** IBM Plex Sans.
- Headlines are **uppercase**, tight tracking, `leading-[0.9]`, no gradient.
- **Weight floor: 700.** Every piece of copy — labels, metadata, hints, inputs,
  outputs, toasts, status strip, footer — is `font-bold`. Nothing renders at 400.
- **Type scale (legibility pass, ~+50% on the old sizes).** Labels/eyebrows/metadata
  `15px`, spec rows + bullets + error copy `16px`, buttons `18px`, outputs and decrypted
  text `18–21px`, body copy `24px` (mobile) / `27px` (desktop), hero display unchanged
  (`48/72/96px`) — it was never the legibility problem.
- Because size went up, tracking came **down** so uppercase mono doesn't turn into
  picket fence: `[0.3em]→[0.22em]` for eyebrows, `[0.22em]→[0.18em]` for panel strips,
  `[0.18em]→[0.14em]` for field labels, `tracking-widest→[0.12em]` for inline controls.
- `-webkit-font-smoothing: antialiased` is **banned**: on a near-black canvas it thins
  glyph strokes and reads as washed out.
- Numbers/metrics/bytes/sizes/timestamps: `tabular-nums`.
- Text-bearing tokens must clear **AA (4.5:1)**; `bone-500` and below are structural
  (rules, placeholders) only. The grain overlay stays ≤ 2% opacity for the same reason.
- Stylistic sets enabled for JetBrains Mono (`ss01`, `cv02–04`, `cv11`) for the
  stylized zero and slashed-look.

## 3. Color

Palette is intentionally tiny — three accents + a warm neutral ramp. **No Tailwind
default colors** are used anywhere in components.

| Token         | Hex       | Role                                       | Contrast on `ink-950` |
|---------------|-----------|--------------------------------------------|-----------------------|
| `ink-950`     | `#080808` | Page background                            | —                     |
| `ink-900`     | `#0d0d0d` | Panel surface                              | —                     |
| `ink-800`     | `#141414` | Raised / hover surfaces                    | —                     |
| `ink-700`     | `#1c1c1c` | Pressed / active                           | —                     |
| `bone-50`     | `#f7f5f0` | Primary text (warm off-white, never #fff)  | 18.4:1                |
| `bone-100`    | `#efece4` | Body copy                                  | 17.0:1                |
| `bone-200`    | `#dbd6cb` | Field labels, emphasis                     | 13.8:1                |
| `bone-300`    | `#bab4a7` | Secondary text                             | 9.7:1                 |
| `bone-400`    | `#a09a8d` | Muted labels                               | 7.2:1                 |
| `bone-500`    | `#6f6a61` | Dividers / placeholders **only** — never copy| 3.7:1               |
| `signal`      | `#34d399` | Positive action / success / live indicator |
| `warn`        | `#f5b544` | Caution / decrypt side                     |
| `danger`      | `#f25c4e` | Errors / destructive / fatal               |

## 4. Shape & depth

- **Border radius: 0** everywhere. Sharp corners read as constructed, engineered.
- Borders are 1px solid, `bone-500/40` on panels (`/25` was invisible against the
  near-black surfaces), never colored glows.
- Depth comes from **hard offset shadows** (`4px 4px 0 0 rgba(...)`) that feel
  like printed ink or stamped plates — not soft Gaussian blurs.
- Buttons physically "press" on active: `translate-x-[2px] translate-y-[2px]` with
  the shadow removed, giving a tactile hardware feel.
- Panels use an *inset* inner highlight (`shadow-inset`) instead of outer glow.

## 5. Layout

- Asymmetric by default. The hero is left-aligned; the cipher-spec sidebar sits
  to the right and lower, creating editorial weight.
- The two main panels are **offset vertically** on desktop (Decrypt is `mt-12`
  relative to Encrypt) to break perfect symmetry.
- Generous vertical rhythm (`pt-12 md:pt-20`, `mb-16 md:mb-20`) — not the
  uniform `py-12` Tailwind default.
- No container-padding that centers everything into a bland rectangle — content
  uses the 12-column grid to place elements with intention.

## 6. Motion

- Custom easing: `cubic-bezier(0.16, 1, 0.3, 1)` (expo-out) for entrances.
- Only three types of motion are allowed:
  1. **Blinking cursor** in the status bar (terminal feel).
  2. **Slow scanline** sweep — one subtle moving element, never distracting.
  3. **Slide-up reveal** (8px, 500ms) for result panels and errors.
- No fade-in-on-everything, no bounce, no hover lift (`-translate-y-0.5`).
- Buttons press, they don't glow.
- All motion respects `prefers-reduced-motion`.

## 7. Texture

- A **very faint** (3.5% opacity) SVG grain overlay on `body` using `feTurbulence`
  and `mix-blend-mode: overlay`. This breaks the digital-flat feel without
  adding load cost.
- The scanline gradient is layered on top via `body::after`.
- No external images, no stock illustrations, no decorative icons.

## 8. Copy rules

- Write like an engineer's README, not a marketing page.
- State facts (algorithm, key length, iteration count) — don't make claims
  ("military-grade", "unbreakable").
- Labels are lowercase mono (`plaintext`, `ciphertext`) to read as code.
- Button text is **uppercase, mono, `tracking-widest`** — short verb phrases:
  "Encrypt", "Decrypt", "Copy ciphertext", "Reload".
- Errors are pre-formatted mono text, not friendly paragraphs.

## 9. Product-specific details (these are what make it NOT generic)

- Top status bar with live UTC clock and a blinking cursor.
- "Cipher spec" side panel listing concrete algorithm parameters (AES-GCM,
  256-bit, PBKDF2, 600,000 iters, salt/iv sizes, encoding, payload format).
- Live character counters on text areas; byte counter on ciphertext.
- Password strength meter with segmented bars + honest label
  ("weak / fair / strong"), not a shield icon.
- Show/hide toggle on the key field.
- Live regex validation of the ciphertext format ("format ok" / "bad format")
  before the user clicks decrypt.
- Panel corner labels ("TRANSMIT · LOCK" / "RECEIVE · UNLOCK") with a colored
  status dot + "live"/"standby" readout.
- Footer is a quiet single line stating the no-tracking property, not a full
  sitemap.

## 10. Sources / references this system draws from

- OpenAI `frontend-design` skill — anti-slop hard rules (OpenAI dev blog, 2026).
- Emil Kowalski — motion principles (only transform+opacity, custom easing, <300ms).
- Rauno Freiberg (rauno.me) — asymmetry, monospace details, scroll choreography.
- Vercel / Linear — editorial restraint + bold mono moments.
- xAI's Grok UI — brutalist monospace terminal aesthetic.
- `vibecodekit.dev` anti-slop rules: commit to a direction, cap the palette, ban defaults.
- `dev.to/alanwest` "fix the AI look": wipe the palette, break layout grammar,
  kill rounded-2xl reflex.
