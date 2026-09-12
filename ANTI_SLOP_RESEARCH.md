# Research: Why Frontends Look AI-Generic & How CipherLink Was Fixed

## The research phase

I cross-referenced the following professional/authoritative sources before making
any change:

1. **OpenAI official `frontend-design` skill** (developers.openai.com, 2026) —
   explicit hard bans: no Inter/Roboto/Arial, no purple gradients, no cards-in-hero,
   no centered generic heroes, no pill clusters, brand-as-hero signal.
2. **Rauno Freiberg / Linear / Vercel references** (cited by publishd.app anti-slop
   prompt, moelkholy1995 anti-slop framework) — asymmetry, editorial typography,
   monospace metadata, intentional negative space.
3. **Audits of 500+ Show HN submissions** (Reddit r/ClaudeCode, Developers Digest)
   — the "AI fingerprint" is measurable: Inter, indigo, glassmorphism, badge-over-H1,
   colored left-border cards, 1-2-3 step rows, exactly three feature cards.
4. **dev.to/alanwest "How to fix the AI-generated look"** — three core moves:
   (a) tear out the default palette, (b) break layout grammar with CSS Grid
   asymmetry, (c) kill the `rounded-2xl` reflex.
5. **vibecodekit.dev, smoothui.dev, superdesign.dev, 925studios.co** — all
   converge on the same diagnosis: AI picks the "statistical average" of its
   training data. The fix is *commitment to a single named aesthetic*, locked
   in a design-system doc, not prettier gradients.
6. **Emil Kowalski motion principles** — animate only transform+opacity, custom
   easing, under 300ms, respect `prefers-reduced-motion`.
7. **xAI Grok brutalist-monospace DESIGN.md** and **Retro/brutalist UI 2026
   field guide (setproduct.com)** — 0px radius, mono display, hard offset
   shadows, monospace labels, one accent color used surgically, zero decorative
   elements.

## The CipherLink "before" — every AI tell was present

| AI tell                              | Was it in CipherLink? | Line(s) |
|--------------------------------------|-----------------------|---------|
| Inter (the "Comic Sans of AI")       | ✅ default sans       | tailwind config |
| Purple/indigo gradient blobs         | ✅ indigo+emerald blurred orbs | App.tsx |
| Glassmorphism / backdrop-blur cards  | ✅ `GlassCard` used blur-xl everywhere | GlassCard.tsx |
| `rounded-2xl` on everything          | ✅ cards, buttons, badges | most components |
| Glowing neon button shadows          | ✅ `shadow-[0_0_15px_rgba(indigo,0.3)]` | Button.tsx |
| Pill/rounded-full badges             | ✅ three "Browser-only/Untraceable/No server storage" pills | App.tsx |
| Gradient text hero headline          | ✅ `bg-gradient-to-r from-slate-100 to-slate-400` on H1 | App.tsx |
| Symmetric centered hero              | ✅ icon → H1 → subhead → chips → info box | App.tsx |
| Card nesting / everything-in-a-card  | ✅ both forms wrapped in GlassCard | Encrypt/Decrypt |
| Generic marketing copy               | ✅ "military-grade", "advance" [sic], "completely untraceable" | App.tsx |
| Same radius/padding/shadow everywhere| ✅ 2xl / p-6 / shadow-2xl | most components |
| `-translate-y-0.5` hover-lift        | ✅ on GlassCard hover | GlassCard.tsx |
| Same fade-in on all reveals          | ✅ single `animate-fade-in` | tailwind config |

**Conclusion:** the original UI hit ~13/13 on the slop checklist. It could have
been any SaaS tool for any product.

## The fix — 12 opinionated moves (all verified against pro guidance)

1. **Burned the palette** — replaced Tailwind defaults with a named, 4-hue
   system: `ink` (near-black ramp), `bone` (warm off-white text, *not* #fff),
   `signal` (mint/terminal green), `warn` (amber), `danger` (red). No indigo,
   no purple, no violet, no cyan.
2. **Changed the font pair** — JetBrains Mono is now the primary UI type
   (matches the crypto/terminal subject matter, per brutalist-mono guidance);
   IBM Plex Sans is the body face. Inter is gone entirely.
3. **Killed glassmorphism** — deleted `GlassCard.tsx`, replaced with `Panel.tsx`:
   sharp-cornered, label-stripped surface with inset inner highlight and hard
   outer shadow.
4. **Zero border radius** everywhere (buttons, panels, inputs, alerts). Per
   brutalist guidance: "If a component doesn't need a radius to be understood,
   it shouldn't have one."
5. **Hard offset shadows** replace blur glows — `4px 4px 0 0` colored shadows
   that press away on active state, giving a physical/mechanical feel. Buttons
   move `translate(2px,2px)` on press instead of glowing on hover.
6. **Asymmetric hero layout** — left-aligned editorial lockup (eyebrow tag →
   oversized mono headline → real spec copy → bullet facts) with an offset
   "cipher spec" side panel. The two main panels are vertically offset
   (`md:mt-12` on Decrypt) so they don't sit on a perfect line.
7. **No gradient text / no blobs** — the background is flat near-black. Visual
   interest comes from a *very faint* SVG grain overlay (3.5% opacity,
   `feTurbulence`) and a slow scanline sweep, which evoke CRT/terminal without
   being decorative noise.
8. **Real technical copy** — removed "military-grade" marketing fluff; replaced
   with concrete facts: "AES-256-GCM in your browser using the Web Crypto API.
   PBKDF2-SHA256 with 600,000 iterations derives the key locally." Added a
   "cipher spec" dl-table listing algorithm, key length, KDF, iterations, salt/iv
   bytes, encoding, payload format.
9. **Product-specific UI that an AI would not invent**:
   - Live UTC status bar with blinking cursor at top.
   - Per-panel corner labels ("TRANSMIT · LOCK" / "RECEIVE · UNLOCK") with
     live/standby status dots.
   - Honest password strength meter (segmented bars + label), not a shield icon.
   - Live regex validation of ciphertext format ("format ok"/"bad format").
   - Character counters on textareas; byte counter on ciphertext output;
     `aes-256-gcm` tag next to output.
   - Show/hide toggle on the key field.
   - Key-length validation before submission (min 6 chars).
10. **Opinionated motion** — only three animations exist: blinking cursor,
    slow scanline, and a 500ms expo-out slide-up for results. Motion respects
    `prefers-reduced-motion`. No fade-in-on-scroll, no bounce, no hover lift.
11. **Toast redesign** — mono, uppercase, hard-cornered, with hard shadow;
    matches the system instead of looking like default react-hot-toast.
12. **Error boundary rewritten** — terminal-style fatal panel with pre-formatted
    mono error text, red hard shadow, and a clear "session halted" explanation.

## Files changed/added

- `index.html` — new fonts (JetBrains Mono + IBM Plex Sans), better meta,
  technical title.
- `tailwind.config.js` — entire palette, font, shadow, animation, keyframe
  tokens replaced; Tailwind color defaults wiped via `extend` with new names.
- `src/index.css` — grain overlay, scanline, tabular helper, hard focus ring,
  mono scrollbar, reduced-motion support, JetBrains stylistic sets.
- `src/components/ui/Button.tsx` — brutalist pressable, uppercase mono labels,
  hard shadow, no glow.
- `src/components/ui/Input.tsx` / `TextArea.tsx` — sharp fields, mono labels,
  real meta/hint slots.
- `src/components/ui/Panel.tsx` *(new)* — replaces GlassCard; corner label strip.
- `src/components/ui/StrengthMeter.tsx` *(new)* — segmented strength readout.
- `src/components/ui/ErrorBoundary.tsx` — terminal-fatal panel.
- `src/components/features/EncryptBox.tsx` / `DecryptBox.tsx` — rewritten with
  meters, counters, validation, show/hide, hard-corner outputs.
- `src/App.tsx` — asymmetric hero, status bar, spec sidebar, new toaster config,
  quiet footer.
- `DESIGN.md` *(new)* — living design-tokens document that locks the aesthetic
  so future changes don't drift back to defaults (recommended by every source).
- `GlassCard.tsx` — **deleted**.
- `vite.config.ts` — allowed preview hosts, updated PWA theme color.

## Result

- Bundle: 198 KB JS (63 KB gzip), 19 KB CSS (4.7 KB gzip) — smaller CSS than before.
- TypeScript clean; production build passes.
- The UI now reads as a **purpose-built cipher tool**, not a generic SaaS
  template. A visitor could not mistake it for any other encryption app after
  seeing the spec panel, the status bar, the offset layout, and the mono
  typography.
