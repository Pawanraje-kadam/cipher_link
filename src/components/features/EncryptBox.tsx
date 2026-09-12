import { useState, useMemo } from "react";
import { Lock, Copy, Trash2, ArrowRight } from "lucide-react";
import { Panel } from "../ui/Panel";
import { TextArea } from "../ui/TextArea";
import { Input } from "../ui/Input";
import { Button } from "../ui/Button";
import { StrengthMeter } from "../ui/StrengthMeter";
import { encryptMessage } from "../../crypto/engine";
import { useClipboard } from "../../hooks/useClipboard";
import { useAutoClear } from "../../hooks/useAutoClear";
import toast from "react-hot-toast";

export function EncryptBox() {
  const [message, setMessage] = useState("");
  const [password, setPassword] = useState("");
  const [encryptedOutput, setEncryptedOutput] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [showKey, setShowKey] = useState(false);
  const { copyToClipboard } = useClipboard();

  const handleClear = () => {
    setMessage("");
    setPassword("");
    setEncryptedOutput("");
  };

  useAutoClear(handleClear, 30000);

  const handleEncrypt = async () => {
    if (!message || !password) {
      toast.error("Both plaintext and key are required.");
      return;
    }
    if (password.length < 6) {
      toast.error("Key must be at least 6 characters.");
      return;
    }
    setIsProcessing(true);
    try {
      // brief yield so the UI can show the processing state
      await new Promise((r) => setTimeout(r, 40));
      const result = await encryptMessage(message, password);
      setEncryptedOutput(result);
      toast.success("Encrypted.");
    } catch {
      toast.error("Encryption failed.");
    } finally {
      setIsProcessing(false);
    }
  };

  const charCount = message.length;
  const outBytes = useMemo(
    () => (encryptedOutput ? new Blob([encryptedOutput]).size : 0),
    [encryptedOutput],
  );

  return (
    <Panel
      label="transmit · lock"
      accent="signal"
      meta={
        <span className="flex items-center gap-1.5">
          <span className="led bg-signal animate-pulse-subtle" /> live
        </span>
      }
    >
      <div className="flex flex-col gap-5">
        <TextArea
          label="plaintext"
          placeholder="Type or paste the message you want to lock…"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          spellCheck={false}
          autoComplete="off"
          autoCorrect="off"
          meta={<span>{charCount} chars</span>}
        />

        <div>
          <Input
            label="shared key"
            type={showKey ? "text" : "password"}
            placeholder="Passphrase — longer = stronger"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            spellCheck={false}
            autoComplete="new-password"
            hint="Same key required on the other side. Never send it with the ciphertext."
          />
          <div className="mt-2 flex flex-wrap items-center justify-between gap-x-3 gap-y-1">
            <StrengthMeter password={password} />
            <button
              type="button"
              onClick={() => setShowKey((s) => !s)}
              className="px-1.5 py-1 touch:min-h-tap t-meta font-mono font-bold uppercase tracking-[0.12em] text-bone-300 hover:text-bone-50 transition-colors"
            >
              {showKey ? "hide" : "show"}
            </button>
          </div>
        </div>

        <div className="flex flex-wrap gap-2 pt-1">
          <Button
            onClick={handleEncrypt}
            isLoading={isProcessing}
            className="flex-1"
          >
            <Lock className="ico mr-2" />
            Encrypt
            <ArrowRight className="ico ml-2" />
          </Button>
          <Button variant="ghost" onClick={handleClear} aria-label="Clear">
            <Trash2 className="ico" />
          </Button>
        </div>

        {encryptedOutput && (
          <div className="space-y-4 animate-slide-up border-t-1 border-bone-500/40 pt-5">
            <TextArea
              label="ciphertext"
              value={encryptedOutput}
              readOnly
              onClick={(e) => (e.target as HTMLTextAreaElement).select()}
              meta={<span>{outBytes} bytes · aes-256-gcm</span>}
              className="bg-ink-950 text-signal font-bold border-signal/60 min-h-[8.75rem] t-ui leading-relaxed"
            />
            <Button
              variant="secondary"
              className="w-full"
              onClick={() =>
                copyToClipboard(encryptedOutput, "Ciphertext copied.")
              }
            >
              <Copy className="ico mr-2" /> copy ciphertext
            </Button>
          </div>
        )}
      </div>
    </Panel>
  );
}
