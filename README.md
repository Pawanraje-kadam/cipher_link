# 🔒 CipherLink

### *Privacy isn't a feature. It's a fundamental right.*



**CipherLink** is a lightweight, zero-knowledge, browser-native cryptographic utility engineered for total communication privacy. It transforms sensitive plaintext into authenticated, untraceable payload strings safe for copy-pasting across any platform (WhatsApp, Discord, SMS, or Slack). 

No backend. No database. No cloud storage. 100% execution happens locally inside your browser's volatile memory.

---

## ✨ Key Architectural Highlights

*   **🛡️ Absolute Zero-Knowledge:** There are no databases, tracking metrics, user accounts, or external API endpoints. Your data and keys never touch a network card.
*   **✈️ Air-Gapped / Offline-First:** Fully compliant PWA architecture. You can load the application, disconnect from the internet completely, execute your encryption or decryption workflows, and close the tab.
*   **💎 Cyberpunk Dashboard Aesthetic:** Built using an Apple-level minimal glassmorphism UI language. Features fluid animations, native system focus states, instant clipboard toasts, and reactive loading panels.
*   **🧹 Anti-Telemetry & Memory Hardening:** Fields explicitly reject OS-level cloud dictionaries and keyboard predictive scrapers. Sensitive fields automatically self-sanitize and scrub themselves from React memory if the browser tab is hidden for more than 30 seconds.
*   **📦 Base64URL Format Compliance:** Employs a custom structure (`v1:salt:iv:ciphertext`) utilizing URL-safe encoding characters (`-` and `_` instead of `+` and `/`), ensuring platforms never corrupt or break string fragments during parsing.

---

## 🔒 Cryptographic Implementation Audit

CipherLink strictly avoids proprietary or experimental cryptography, relying entirely on the low-level, high-performance browser native **Web Crypto API**:

1.  **Key Stretching:** User-chosen keys (even weak strings) are mathematically reinforced using **PBKDF2** (Password-Based Key Derivation Function 2) with **600,000 hashing iterations** via SHA-256 (fully matching current OWASP recommendations).
2.  **Volatile Cryptokeys:** The resulting key is compiled strictly as an un-extractable `CryptoKey` object (`extractable: false`). The browser engine can utilize the key, but raw JavaScript code or unauthorized XSS scripts cannot read or export its binary data.
3.  **Authenticated Encryption:** Encryption runs on **AES-GCM (256-bit)**. This provides symmetric confidentiality alongside built-in AEAD (Authenticated Encryption with Associated Data). If a single bit of the payload string or configuration headers is altered, the underlying engine fails instantly rather than outputting garbage data.
4.  **CSPRNG Foundations:** Unique 16-byte Salts and 12-byte Initialization Vectors (IVs) are re-generated uniquely per-message using a Cryptographically Secure Pseudo-Random Number Generator (`window.crypto.getRandomValues`).

-

