import { useState } from 'react';
import { Lock, Copy, Trash2 } from 'lucide-react';
import { GlassCard } from '../ui/GlassCard';
import { TextArea } from '../ui/TextArea';
import { Input } from '../ui/Input';
import { Button } from '../ui/Button';
import { encryptMessage } from '../../crypto/engine';
import { useClipboard } from '../../hooks/useClipboard';
import { useAutoClear } from '../../hooks/useAutoClear';
import toast from 'react-hot-toast';

export function EncryptBox() {
  const [message, setMessage] = useState('');
  const [password, setPassword] = useState('');
  const [encryptedOutput, setEncryptedOutput] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const { copyToClipboard } = useClipboard();

  const handleClear = () => {
    setMessage('');
    setPassword('');
    setEncryptedOutput('');
  };

  useAutoClear(handleClear, 30000);

  const handleEncrypt = async () => {
    if (!message || !password) {
      toast.error('Please provide both a message and a secret key.');
      return;
    }
    setIsProcessing(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 50)); 
      const result = await encryptMessage(message, password);
      setEncryptedOutput(result);
      toast.success('Message encrypted securely.');
    } catch (error) {
      toast.error('Encryption failed.');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <GlassCard className="flex flex-col space-y-4">
      <div className="flex items-center space-x-2 text-indigo-400 mb-2">
        <Lock className="w-5 h-5" />
        <h2 className="text-xl font-semibold text-slate-100">Encrypt Message</h2>
      </div>

      <TextArea
        label="Secret Message"
        placeholder="Type the message you want to hide..."
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        spellCheck={false}
        autoComplete="off"
        autoCorrect="off"
      />

      <Input
        label="Shared Secret Key"
        type="password"
        placeholder="e.g. ghost842"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        spellCheck={false}
        autoComplete="new-password"
      />
      <p className="text-xs text-slate-500">Use the same secret key when decrypting the message later.</p>

      <Button onClick={handleEncrypt} isLoading={isProcessing} className="w-full">
        Encrypt
      </Button>

      {encryptedOutput && (
        <div className="mt-4 space-y-2 animate-fade-in">
          <TextArea
            label="Encrypted Output"
            value={encryptedOutput}
            readOnly
            className="font-mono text-xs text-indigo-200 bg-indigo-950/30 border-indigo-500/30 min-h-[100px]"
            onClick={(e) => (e.target as HTMLTextAreaElement).select()}
          />
          <div className="flex space-x-2">
            <Button variant="secondary" className="flex-1" onClick={() => copyToClipboard(encryptedOutput, 'Encrypted message copied!')}>
              <Copy className="w-4 h-4 mr-2" /> Copy Output
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