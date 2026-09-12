import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
  server: {
    allowedHosts: true,
  },
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      injectRegister: 'auto',
      workbox: {
        globPatterns: ['**/*.{js,css,html,ico,png,svg,woff2,woff,ttf}'],
        cleanupOutdatedCaches: true,
        clientsClaim: true,
      },
      manifest: {
        name: 'CipherLink',
        short_name: 'CipherLink',
        description: 'Browser-only AES-256-GCM message encryption.',
        // Android reads these on install: dark system bar so there is no white
        // flash before first paint, and the splash matches the page surface.
        theme_color: '#080808',
        background_color: '#080808',
        display: 'standalone',
        orientation: 'portrait'
      }
    })
  ],
});
