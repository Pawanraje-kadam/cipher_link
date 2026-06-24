import { useCallback } from 'react';
import toast from 'react-hot-toast';

export function useClipboard() {
  const copyToClipboard = useCallback(async (text: string, successMessage: string = 'Copied to clipboard!') => {
    if (!text) {
      toast.error('Nothing to copy.');
      return;
    }
    try {
      await navigator.clipboard.writeText(text);
      toast.success(successMessage, {
        style: { background: '#333', color: '#fff', border: '1px solid rgba(255,255,255,0.1)' },
      });
    } catch (err) {
      toast.error('Failed to copy. Please copy manually.');
    }
  }, []);

  return { copyToClipboard };
}