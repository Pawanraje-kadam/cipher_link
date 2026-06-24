import { useState } from 'react';
import { Unlock, Copy, Trash2, AlertCircle } from 'lucide-react';
import { GlassCard } from '../ui/GlassCard';
import { TextArea } from '../ui/TextArea';
import { Input } from '../ui/Input';
import { Button } from '../ui/Button';
import { decryptMessage } from '../../crypto/engine';
import { useClipboard } from '../../hooks/useClipboard';
import { useAutoClear } from '../../hooks/useAutoClear';
import toast from 'react-hot-toast';

export function DecryptBox() {
  const [encryptedInput, setEncryptedInput] = useState('');
  const [password, setPassword] = useState('');
  const [decryptedOutput, setDecryptedOutput] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const { copyToClipboard } = useClipboard();

  const handleClear = () => {
    setEncryptedInput('');
    setPassword('');
    setDecryptedOutput('');
    setErrorMsg('');
  };

  useAutoClear(handleClear, 30000);

  const handleDecrypt = async () => {
    if (!encryptedInput || !password) {
      toast.error('Please provide both the encrypted message and the secret key.');
      return;
    }
    setIsProcessing(true);
    setErrorMsg('');
    setDecryptedOutput('');

    try {
      await new Promise(resolve => setTimeout(resolve, 50));
      const result = await decryptMessage(encryptedInput.trim(), password);
      setDecryptedOutput(result);
      toast.success('Message decrypted!');
    } catch (error) {
      setErrorMsg(error instanceof Error ? error.message : 'Decryption failed.');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <GlassCard className="flex flex-col space-y-4">
      <div className="flex items-center space-x-2 text-emerald-400 mb-2">
        <Unlock className="w-5 h-5" />
        <h2 className="text-xl font-semibold text-slate-100">Decrypt Message</h2>
      </div>

      <TextArea
        label="Encrypted Message"
        placeholder="Paste the v1:salt:iv:ciphertext string here..."
        value={encryptedInput}
        onChange={(e) => setEncryptedInput(e.target.value)}
        spellCheck={false}
        autoComplete="off"
        autoCorrect="off"
        className="font-mono text-xs"
      />

      <Input
        label="Shared Secret Key"
        type="password"
        placeholder="Enter the key..."
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        spellCheck={false}
        autoComplete="new-password"
      />
      <p className="text-xs text-slate-500">Use the same secret key that was used to encrypt the message.</p>

      <Button onClick={handleDecrypt} isLoading={isProcessing} className="w-full bg-emerald-600 hover:bg-emerald-700 shadow-[0_0_15px_rgba(16,185,129,0.3)] border-emerald-500/50">
        Decrypt
      </Button>

      {errorMsg && (
        <div className="flex items-center p-3 mt-4 text-sm text-rose-200 bg-rose-950/50 border border-rose-500/30 rounded-lg animate-fade-in">
          <AlertCircle className="w-4 h-4 mr-2 flex-shrink-0" /> {errorMsg}
        </div>
      )}

      {decryptedOutput && (
        <div className="mt-4 space-y-2 animate-fade-in">
          <TextArea label="Original Message" value={decryptedOutput} readOnly className="text-emerald-100 bg-emerald-950/30 border-emerald-500/30 min-h-[100px]" />
          <div className="flex space-x-2">
            <Button variant="secondary" className="flex-1" onClick={() => copyToClipboard(decryptedOutput, 'Secret message copied!')}>
              <Copy className="w-4 h-4 mr-2" /> Copy Message
            </Button>
            <Button variant="ghost" onClick={handleClear} aria-label="Clear all fields">
              <Trash2 className="w-4 h-4 text-rose-400 hover:text-rose-300" />
            </Button>
          </div>
        </div>
      )}
    </GlassCard>
  );
}
