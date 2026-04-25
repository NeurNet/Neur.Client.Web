import { defineConfig } from 'vite';
import react, { reactCompilerPreset } from '@vitejs/plugin-react';
import babel from '@rolldown/plugin-babel';
import path from 'path';

// https://vite.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      '@': path.join(__dirname, './src'),
    },
  },
  plugins: [react(), babel({ presets: [reactCompilerPreset()] })],
});
