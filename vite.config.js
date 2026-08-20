import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// GitHub Pages serves this repository from https://andmalina.github.io/lending/,
// so production builds must be prefixed with /lending/. Local dev uses '/'.
const isBuild = process.argv.includes('build');

export default defineConfig({
  base: isBuild ? '/lending/' : '/',
  plugins: [react()],
  build: {
    // GitHub Pages is configured to serve from the /docs folder on main.
    outDir: 'docs',
    emptyOutDir: true,
  },
  server: {
    host: '0.0.0.0',
    allowedHosts: true,
  },
});
