import { useEffect, useState } from "react";
import { Toaster } from "react-hot-toast";
import { EncryptBox } from "./components/features/EncryptBox";
import { DecryptBox } from "./components/features/DecryptBox";

function App() {
  return (
    <div className="min-h-page bg-ink-950 text-bone-100 relative">
      {/* Top status bar — thin technical strip, like an appliance or editor chrome.
          Not a nav. Not a hero badge. Just system info. */}
      <StatusBar />

      <main className="max-w-6xl mx-auto px-5 md:px-8 pt-12 md:pt-20 pb-24 safe-x safe-b">
        {/* Asymmetric hero block — NOT centered icon -> H1 -> chips -> 2-col grid.
            Left-aligned editorial lockup with a monospace eyebrow and a
            "spec" sidebar on desktop. Deliberate, opinionated. */}
        <header className="grid grid-cols-1 md:grid-cols-12 gap-x-10 gap-y-8 mb-16 md:mb-20">
          <div className="md:col-span-8">
            <div className="flex items-center gap-2 mb-6">
              <span className="led bg-signal" />
              <span className="text-[0.9375rem] font-mono font-bold uppercase tracking-[0.22em] text-signal">
                cipherlink v1.0
              </span>
              <span className="text-bone-400">/</span>
              <span className="text-[0.9375rem] font-mono font-bold uppercase tracking-[0.22em] text-bone-300">
                in-browser only
              </span>
            </div>

            {/* Big display headline: mono, tight, uppercase, no gradient text.
                The brand mark is a raw string, not a gradient logo. */}
            <h1 className="font-mono font-bold tracking-tight text-bone-50 text-5xl md:text-7xl lg:text-8xl leading-[0.9] uppercase mb-6">
              Lock a message.<br />
              <span className="text-signal">Keep the key.</span>
            </h1>

            <p className="font-sans text-bone-100 font-bold text-2xl md:text-[1.6875rem] leading-relaxed max-w-2xl mb-6">
              CipherLink runs AES-256-GCM in your browser using the Web Crypto
              API. Your plaintext and key are never sent to a server —
              PBKDF2-SHA256 with 600,000 iterations derives the key locally,
              and ciphertext never leaves your clipboard unless you paste it.
            </p>

            <div className="flex flex-wrap gap-x-6 gap-y-2 font-mono font-bold text-base uppercase tracking-[0.12em] text-bone-200">
              <Bullet>AES-256-GCM</Bullet>
              <Bullet>PBKDF2 · 600k iter</Bullet>
              <Bullet>zero network</Bullet>
              <Bullet>ephemeral · 30s auto-clear</Bullet>
            </div>
          </div>

          {/* Spec panel — sits offset to the right on desktop, adds asymmetric
              weight. Real data (key-size, iterations, IV, salt) not marketing. */}
          <aside className="md:col-span-4 md:pt-8">
            <div className="border-1 border-bone-500/40 bg-ink-900 shadow-inset">
              <div className="px-4 py-2.5 border-b-1 border-bone-500/40 bg-ink-950/60 flex items-center gap-2">
                <span className="led bg-bone-100" />
                <span className="text-[0.9375rem] font-mono font-bold uppercase tracking-[0.18em] text-bone-100">
                  cipher spec
                </span>
              </div>
              <dl className="p-4 text-base font-mono font-bold space-y-2.5 tabular">
                <Spec k="algorithm" v="AES-GCM" />
                <Spec k="key length" v="256 bits" />
                <Spec k="kdf" v="PBKDF2-HMAC-SHA256" />
                <Spec k="iterations" v="600,000" />
                <Spec k="salt" v="16 bytes (random)" />
                <Spec k="iv" v="12 bytes (random)" />
                <Spec k="encoding" v="base64url" />
                <Spec k="payload" v="v1:salt:iv:ct" />
              </dl>
            </div>
          </aside>
        </header>

        {/* The two panels sit in an offset grid: Encrypt slightly above Decrypt
            on desktop to break symmetry. Mobile they stack. */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 md:items-start">
          <div className="md:mt-0">
            <EncryptBox />
          </div>
          <div className="md:mt-12">
            <DecryptBox />
          </div>
        </section>

        {/* A single quiet footer. No social icons, no "made with love" —
            just a fact: the tool doesn't phone home. */}
        <footer className="mt-20 pt-6 border-t-1 border-bone-500/40 flex flex-col md:flex-row justify-between items-start md:items-center gap-2 font-mono font-bold text-[0.9375rem] uppercase tracking-[0.14em] text-bone-300">
          <span>// client-side only · no cookies · no tracking</span>
          <span className="tabular">build 2026.09 · webcrypto</span>
        </footer>
      </main>

      <Toaster
        position="bottom-right"
        toastOptions={{
          duration: 2600,
          style: {
            background: "#0d0d0d",
            color: "#f7f5f0",
            fontWeight: 700,
            border: "1px solid rgba(219,214,203,0.45)",
            fontFamily: '"JetBrains Mono", ui-monospace, monospace',
            fontSize: "1rem",
            lineHeight: 1.4,
            maxWidth: "min(26rem, 88vw)",
            textTransform: "uppercase",
            letterSpacing: "0.08em",
            borderRadius: "0",
            padding: "14px 18px",
            boxShadow: "4px 4px 0 0 rgba(52,211,153,0.15)",
          },
          success: {
            iconTheme: { primary: "#34d399", secondary: "#080808" },
          },
          error: {
            iconTheme: { primary: "#f25c4e", secondary: "#080808" },
          },
        }}
      />
    </div>
  );
}

/* ---------- small helpers (local, no generic 'chip' abstraction) ---------- */

function Bullet({ children }: { children: React.ReactNode }) {
  return (
    <span className="flex items-center gap-2">
      <span className="led bg-signal" />
      {children}
    </span>
  );
}

function Spec({ k, v }: { k: string; v: string }) {
  return (
    <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-0.5">
      <dt className="text-bone-300 font-bold uppercase tracking-[0.1em]">{k}</dt>
      <dd className="text-bone-50 text-right min-w-0 break-words">{v}</dd>
    </div>
  );
}

function StatusBar() {
  const [now, setNow] = useState(() => new Date());
  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(id);
  }, []);
  const time = now.toISOString().replace("T", " ").slice(0, 19) + " UTC";
  return (
    <div className="border-b-1 border-bone-500/40 bg-ink-950">
      <div className="max-w-6xl mx-auto px-5 md:px-8 min-h-10 flex flex-wrap items-center justify-between gap-y-1 py-1 font-mono font-bold text-[0.9375rem] uppercase tracking-[0.14em] text-bone-300 tabular">
        <div className="flex items-center gap-3">
          <span className="flex items-center gap-1.5">
            <span className="led bg-signal" /> session: secure
          </span>
          <span className="hidden sm:inline text-bone-500">·</span>
          <span className="hidden sm:inline">context: isolated</span>
        </div>
        <div className="flex items-center gap-3">
          <span className="hidden sm:inline">crypto.subtle: ready</span>
          <span className="text-bone-500">·</span>
          <span>{time}</span>
          <span className="text-bone-50">_</span>
          <span className="inline-block w-1.5 h-3 bg-signal animate-blink align-middle" />
        </div>
      </div>
    </div>
  );
}

export default App;
