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

- **Primary UI type:** JetBrains Mono — **only 400 and 700 ship**. Mono is the brand
  signal; it reads as *cipher/terminal* to this audience. Every other weight is dropped
  on purpose: nothing for 300/500/600 to do here, and each unused weight is bytes plus
  a font-swap risk.
- **Body copy (only where long-form is needed):** IBM Plex Sans (400/700).
- Headlines are **uppercase**, tight tracking, `leading-[0.9]`, no gradient.
- **Weight floor: 700.** Every piece of copy — labels, metadata, hints, inputs,
  outputs, toasts, status strip, footer — is `font-bold`. Nothing renders at 400.
  A real 700 face ships so Android never has to *synthesize* bold (a smeared 400 face
  is the ugliest text state on phones).
- **One fluid scale, seven tokens, zero px.** `--t-micro` (14→16px, status strip),
  `--t-meta` (15→17, labels / eyebrow / panel meta), `--t-body` (16→18, spec rows,
  bullets, hints, errors), `--t-ui` (17→19, buttons + outputs), `--t-field` (17→21,
  inputs + textareas), `--t-lead` (17→27, hero copy), `--t-display` (28→76, h1). Each is
  a `clamp(rem, rem + vw, rem)` consumed through `.t-*` classes, declared once in
  `src/index.css` — components name a *role*, never a size.
  - `rem` floors/ceilings so Android's *Settings ▸ Display ▸ Font size* and Windows
    browser zoom still multiply the whole UI; `px` for type is banned because it ignores
    both.
  - The bounds are arithmetic, not taste: JetBrains Mono advances 0.6em and `body` adds
    0.01em, so a line of *n* characters is `n × 0.61em`. `--t-display`'s ceiling is
    pinned by the widest column the headline occupies (8/12 of `max-w-6xl` ≈ 685px):
    `LOCK A MESSAGE.` = 15 chars × 0.585em ⇒ 76px. The old `text-5xl md:text-7xl
    lg:text-8xl` broke at *both* ends — 48px overflowed a 375px phone, 96px wrapped the
    two-line lockup into three at `lg`.
  - `.ico` sizes every inline icon at `1em`, so glyph and copy can never drift apart
    when the OS scale changes.
- **No size is tied to a breakpoint.** `md:`/`lg:` type steps made copy jump and left
  485px and 350px columns holding 21–27px text. `lg:` now only chooses *structure* —
  the 12-column hero and the two-up panels, because a 350px column genuinely is too
  narrow for a 21px mono field. Everything else is fluid, with `flex-wrap` + `min-w-0`
  on every row that could otherwise clip.
- Because size went up, tracking came **down** so uppercase mono doesn't turn into
  picket fence: `[0.3em]→[0.22em]` for eyebrows, `[0.22em]→[0.18em]` for panel strips,
  `[0.18em]→[0.14em]` for field labels, `tracking-widest→[0.12em]` for inline controls.
- `body` carries `letter-spacing: 0.01em` — ClearType on Windows packs mono stems
  together at small sizes; a hundredth of an em separates them without looking tracked.
- **Banned on copy:** `-webkit-font-smoothing: antialiased` (thins glyphs on dark),
  `text-rendering: optimizeLegibility` (global kerning pass, and WebKit goes soft),
  `mix-blend-mode` / `filter` / `opacity` on any ancestor of text (see §2a), and
  ligatures inside fields (`font-variant-ligatures: none` — base64 must never merge).
- Numbers/metrics/bytes/timestamps: `tabular-nums` via `.tabular`.
- Text-bearing tokens must clear **AA (4.5:1)**; `bone-500` and below are structural
  (rules, placeholders) only.

### 2a. Cross-platform text engine (Windows + Android)

Fonts are **self-hosted** (`public/fonts`, latin subset, OFL 1.1, ~84KB, precached by
the service worker). No third-party font request, no CSP exception, identical output
offline — and a blocked CDN can no longer quietly downgrade the UI to system `monospace`.

| Platform | What it does to the text | What the engine answers with |
|---|---|---|
| **Windows** — ClearType / DirectWrite | Light-on-dark renders **thinner** than on any other platform; subpixel AA is dropped to grayscale for glyphs on a composited layer or during an opacity animation, so text fades then snaps back | No blend modes / filters above content (grain lives in the page *background*); reveal animations translate only; 700 weight + `0.01em` tracking; `color-scheme: dark` and autofill pinning so Chrome/Edge never paints a white field; `forced-colors` restores real borders |
| **Android** — FreeType, grayscale AA only | The system **Font size** slider and page zoom only move `rem`; no subpixel AA, so small text is fragile; bold gets synthesized when a family has no 700 face; <44dp targets are missable; `vh` breaks when the URL bar collapses | `rem` throughout; real 700 face; `touch:` variants (labels → `1rem`, `min-h-tap` 44px, roomier fields); `.min-h-page` = `100dvh` with `vh` fallback; `env(safe-area-inset-*)` gutters (`.safe-t` on the status strip, `.safe-x` / `.safe-b` on
  the page body); `touch-action: manipulation` + transparent tap highlight; `text-size-adjust: 100%` and `viewport-fit=cover` with **no** `maximum-scale` — never block zoom to stop iOS autofit, size the field at ≥1rem instead |

Fallback chain, metric-matched so the swap reflows nothing: `JetBrains Mono` →
`"Cipher Mono Fallback"` (`local()` Cascadia Mono / Consolas / Roboto Mono / DejaVu /
Menlo, with `ascent-override: 102.35%`, `descent-override: 30.1%`,
`line-gap-override: 0%`, `size-adjust: 99.66%`) → `ui-monospace` → `monospace`.
Those numbers were **measured from the shipped files** with fontTools (upm 1000, hhea
1020 / -300 / 0, advance 0.600em) against the generic `monospace` (0.6021em) — so
size-adjust is ~100% because the advances genuinely match, not because it was guessed.

User-triggered escape hatches, all honoured: `prefers-contrast: more` (retunes the whole
bone ramp through custom properties — tokens are declared as
`rgb(var(--bone-N) / <alpha-value>)` exactly so one media query moves every muted string
while opacity modifiers keep working), `prefers-reduced-motion`,
`prefers-reduced-transparency`, `forced-colors: active`, and `text-wrap: pretty` /
`balance` where the engine supports it.

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
| `signal`      | `#34d399` | Positive action / success / live indicator | 10.4:1                |
| `warn`        | `#f5b544` | Caution / decrypt side                     | 11.0:1                |
| `danger`      | `#f25c4e` | Errors / destructive / fatal               | 6.1:1                 |

Tokens resolve to channel triplets — `rgb(var(--bone-300) / <alpha-value>)` — so a single
media query can retune the ramp for `prefers-contrast: more` while `bone-500/40`-style
opacity modifiers keep working.

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
  3. **Slide-up reveal** (10px, 240ms) for result panels and errors — **translate
     only, never an opacity fade over copy**: compositing text for an opacity animation
     makes Chrome/Edge on Windows switch ClearType off mid-animation, so the text thins
     and then snaps back. That is the "faded text" bug, invited back in.
- No fade-in-on-everything, no bounce, no hover lift (`-translate-y-0.5`).
- Buttons press, they don't glow.
- All motion respects `prefers-reduced-motion`.

## 7. Texture

- A **very faint** (3.5% alpha, baked into the SVG) `feTurbulence` grain painted into
  the **`body` background** rather than floating above the content: it breaks the
  digital-flat feel for free, hides behind the opaque panels, and — critically — needs
  no `mix-blend-mode`, which would push the document onto a composited layer and cost
  every glyph its subpixel AA on Windows.
- The scanline rides `body::after` at `z-index: 10` — its own layer, no text inside it —
  at a 4.5% peak tint.
- Both drop out under `prefers-reduced-motion` and `prefers-reduced-transparency`.
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
- Cross-platform type research, 2026-09: ClearType/DirectWrite hinting vs Quartz and why
  composited layers (`mix-blend-mode`, `filter`, opacity animations) disable subpixel AA;
  Chrome-on-Android font boosting (it ignores `text-size-adjust`; `rem` is what the OS
  font-size slider actually scales); the 16px input threshold that stops iOS auto-zoom on
  focus; `forced-colors` + system-colour keywords for Windows High Contrast; and
  metric-matched fallbacks (`size-adjust` / `ascent-override`) for zero-CLS font swaps.
