import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { galleryManifestPlugin } from './vite-plugins/galleryManifest';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), galleryManifestPlugin()],
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
});
