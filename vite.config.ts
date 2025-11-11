import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  plugins: [react()],
  root: 'example',
  resolve: {
    alias: {
      'react-filter-group': path.resolve(__dirname, './src'),
    },
  },
});
