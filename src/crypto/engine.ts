import { deriveKey } from './keys';
import { textToBuffer, bufferToText, arrayBufferToBase64Url, base64UrlToArrayBuffer } from './encoding';

const VERSION = 'v1';

export async function encryptMessage(plaintext: string, password: string): Promise<string> {
  const salt = window.crypto.getRandomValues(new Uint8Array(16));
  const iv = window.crypto.getRandomValues(new Uint8Array(12));
  const key = await deriveKey(password, salt);
  const encodedText = textToBuffer(plaintext);
  
  const ciphertextBuffer = await window.crypto.subtle.encrypt(
    { name: 'AES-GCM', iv: iv },
    key,
    encodedText
  );

  const b64Salt = arrayBufferToBase64Url(salt.buffer);
  const b64Iv = arrayBufferToBase64Url(iv.buffer);
  const b64Ciphertext = arrayBufferToBase64Url(ciphertextBuffer);

  return `${VERSION}:${b64Salt}:${b64Iv}:${b64Ciphertext}`;
}

export async function decryptMessage(encryptedPayload: string, password: string): Promise<string> {
  const parts = encryptedPayload.split(':');
  if (parts.length !== 4) throw new Error('Invalid message format. The message appears to be corrupted or incomplete.');

  const [version, b64Salt, b64Iv, b64Ciphertext] = parts;
  if (version !== VERSION) throw new Error(`Unsupported message version: ${version}.`);

  try {
    const saltBuffer = base64UrlToArrayBuffer(b64Salt);
    const ivBuffer = base64UrlToArrayBuffer(b64Iv);
    const ciphertextBuffer = base64UrlToArrayBuffer(b64Ciphertext);

    const key = await deriveKey(password, new Uint8Array(saltBuffer));
    const decryptedBuffer = await window.crypto.subtle.decrypt(
      { name: 'AES-GCM', iv: new Uint8Array(ivBuffer) },
      key,
      ciphertextBuffer
    );

    return bufferToText(decryptedBuffer);
  } catch (error) {
    throw new Error('Invalid key or corrupted message.');
  }
}