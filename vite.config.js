import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  base: '/browser-extensions-manager-ui/',  // <- debe coincidir con el nombre de tu repo
  plugins: [react()],
});
