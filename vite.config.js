// vite.config.js (in root)
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: '/srl_homefoods/', // 👈 GitHub repo name
  build: {
    outDir: 'dist',
    emptyOutDir: true,
  },
});
