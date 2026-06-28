import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import path from 'path';

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');

  return {
    plugins: [
      react(),
      tailwindcss(),
      // Replace %VITE_*% tokens in index.html with actual env values
      {
        name: 'html-env-replace',
        transformIndexHtml(html: string) {
          return html
            .replace(/%VITE_GA4_MEASUREMENT_ID%/g, env.VITE_GA4_MEASUREMENT_ID ?? 'G-XXXXXXXXXX')
            .replace(/%VITE_CLARITY_PROJECT_ID%/g, env.VITE_CLARITY_PROJECT_ID ?? 'placeholder');
        },
      },
    ],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
      },
    },
    server: {
      port: 3000,
      strictPort: true,
      host: true,
    },
  };
});
