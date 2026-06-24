import { textToBuffer } from './encoding';

const PBKDF2_ITERATIONS = 600000;
const HASH_ALGORITHM = 'SHA-256';

export async function deriveKey(password: string, salt: Uint8Array): Promise<CryptoKey> {
  const normalizedSalt = new Uint8Array(salt.byteLength);
  normalizedSalt.set(salt);

  const keyMaterial = await window.crypto.subtle.importKey(
    'raw',
    textToBuffer(password),
    { name: 'PBKDF2' },
    false,
    ['deriveBits', 'deriveKey']
  );

  return await window.crypto.subtle.deriveKey(
    {
      name: 'PBKDF2',
      salt: normalizedSalt,
      iterations: PBKDF2_ITERATIONS,
      hash: HASH_ALGORITHM,
    },
    keyMaterial,
    { name: 'AES-GCM', length: 256 },
    false,
    ['encrypt', 'decrypt']
  );
}