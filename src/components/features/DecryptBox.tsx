import { useState } from "react";
import { Copy, Trash2, AlertTriangle, KeyRound, ArrowRight } from "lucide-react";
import { Panel } from "../ui/Panel";
import { TextArea } from "../ui/TextArea";
import { Input } from "../ui/Input";
import { Button } from "../ui/Button";
import { decryptMessage } from "../../crypto/engine";
import { useClipboard } from "../../hooks/useClipboard";
import { useAutoClear } from "../../hooks/useAutoClear";
import toast from "react-hot-toast";

export function DecryptBox() {
  const [encryptedInput, setEncryptedInput] = useState("");
  const [password, setPassword] = useState("");
  const [decryptedOutput, setDecryptedOutput] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [showKey, setShowKey] = useState(false);
  const { copyToClipboard } = useClipboard();

  const handleClear = () => {
    setEncryptedInput("");
    setPassword("");
    setDecryptedOutput("");
    setErrorMsg("");
  };

  useAutoClear(handleClear, 30000);

  const handleDecrypt = async () => {
    if (!encryptedInput || !password) {
      toast.error("Both ciphertext and key are required.");
      return;
    }
    setIsProcessing(true);
    setErrorMsg("");
    setDecryptedOutput("");

    try {
      await new Promise((r) => setTimeout(r, 40));
      const result = await decryptMessage(encryptedInput.trim(), password);
      setDecryptedOutput(result);
      toast.success("Decrypted.");
    } catch (error) {
      setErrorMsg(
        error instanceof Error ? error.message : "Decryption failed.",
      );
    } finally {
      setIsProcessing(false);
    }
  };

  const looksValid = /^v1:[-_A-Za-z0-9]+:[-_A-Za-z0-9]+:[-_A-Za-z0-9]+=*$/.test(
    encryptedInput.trim(),
  );

  return (
    <Panel
      label="receive · unlock"
      accent="warn"
      meta={
        <span className="flex items-center gap-1.5">
          <span className="led bg-warn animate-pulse-subtle" /> standby
        </span>
      }
    >
      <div className="flex flex-col gap-5">
        <TextArea
          label="ciphertext"
          placeholder="Paste v1:salt:iv:ciphertext here…"
          value={encryptedInput}
          onChange={(e) => {
            setEncryptedInput(e.target.value);
            setErrorMsg("");
          }}
          spellCheck={false}
          autoComplete="off"
          autoCorrect="off"
          meta={
            encryptedInput ? (
              <span className={looksValid ? "text-signal" : "text-danger"}>
                {looksValid ? "format ok" : "bad format"}
              </span>
            ) : (
              <span>awaiting input</span>
            )
          }
          className="t-ui leading-relaxed"
        />

        <div>
          <Input
            label="shared key"
            type={showKey ? "text" : "password"}
            placeholder="The key used to encrypt…"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            spellCheck={false}
            autoComplete="new-password"
            hint="Wrong key = garbage output. AES-GCM verifies integrity before returning."
          />
          <div className="mt-2 flex justify-end">
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
            onClick={handleDecrypt}
            isLoading={isProcessing}
            variant="secondary"
            className="flex-1"
          >
            <KeyRound className="ico mr-2" />
            Decrypt
            <ArrowRight className="ico ml-2" />
          </Button>
          <Button variant="ghost" onClick={handleClear} aria-label="Clear">
            <Trash2 className="ico" />
          </Button>
        </div>

        {errorMsg && (
          <div
            role="alert"
            className="border-1 border-danger/60 bg-danger-dim/40 px-4 py-3 animate-slide-up"
          >
            <div className="flex items-start gap-2">
              <AlertTriangle className="ico text-danger mt-1" />
              <pre className="t-body font-mono font-bold text-danger leading-relaxed whitespace-pre-wrap break-words">
                {errorMsg}
              </pre>
            </div>
          </div>
        )}

        {decryptedOutput && (
          <div className="space-y-4 animate-slide-up border-t-1 border-bone-500/40 pt-5">
            <TextArea
              label="plaintext"
              value={decryptedOutput}
              readOnly
              meta={<span>{decryptedOutput.length} chars</span>}
              className="bg-ink-950 text-bone-50 font-bold border-signal/60 min-h-[8.75rem] t-ui leading-relaxed"
            />
            <Button
              variant="secondary"
              className="w-full"
              onClick={() => copyToClipboard(decryptedOutput, "Message copied.")}
            >
              <Copy className="ico mr-2" /> copy plaintext
            </Button>
          </div>
        )}
      </div>
    </Panel>
  );
}
