
import path from 'path';
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, '.', '');
  return {
    server: {
      port: 3000,
      host: '0.0.0.0',
    },
    plugins: [react()],
    // Set base URL depending on deployment platform
    base: process.env.DEPLOY_TARGET === 'github' ? '/My_Portfolio/' : '/',
    define: {
      // API Key injection removed to prevent Netlify Secret Scanning errors.
      // The frontend will now communicate via the backend proxy.
    },
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      }
    }
  };
});
