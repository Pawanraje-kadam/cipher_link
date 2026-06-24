import { Toaster } from 'react-hot-toast';
import { ShieldAlert } from 'lucide-react';
import { EncryptBox } from './components/features/EncryptBox';
import { DecryptBox } from './components/features/DecryptBox';

function App() {
  return (
    <div className="min-h-screen bg-background relative selection:bg-indigo-500/30">
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-indigo-600/10 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-emerald-600/10 blur-[120px] pointer-events-none" />

      <main className="container mx-auto px-4 py-12 relative z-10 max-w-6xl">
        <div className="flex flex-col items-center justify-center text-center mb-12 space-y-4">
          <div className="inline-flex items-center justify-center p-3 bg-white/5 rounded-2xl border border-white/10 shadow-xl mb-2">
            <ShieldAlert className="w-8 h-8 text-indigo-400" />
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-slate-100 to-slate-400">
            CipherLink
          </h1>
          <p className="text-slate-400 max-w-lg text-sm md:text-base">
             AES-256 Encryption (milletry grade)  
             Advanced cryptography
             Secret-key protected 
          </p>

          <div className="flex flex-wrap items-center justify-center gap-2 text-xs sm:text-sm text-slate-400">
            <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1">Browser-only</span>
            <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1">Zero-knowledge</span>
            <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1">No server storage</span>
          </div>

          <div className="w-full max-w-3xl rounded-2xl border border-white/10 bg-slate-900/40 p-4 text-sm text-slate-300 shadow-lg backdrop-blur">
          
            <p className="mt-1 text-slate-400">Your content stays in this browser session, and the same secret key works for both steps.</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
          <EncryptBox />
          <DecryptBox />
        </div>
      </main>

      <Toaster position="bottom-center" toastOptions={{ duration: 3000 }} />
    </div>
  );
}

export default App;
