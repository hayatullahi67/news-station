import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import path from 'node:path';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');

  return {
    define: {
      __CLOUDINARY_PUBLIC_CONFIG__: JSON.stringify({
        cloudName: env.CLOUDINARY_CLOUD_NAME,
        collectionName: env.CLOUDINARY_COLLECTION,
        uploadPreset: env.CLOUDINARY_UPLOAD_PRESET,
      }),
    },
    plugins: [react(), tailwindcss()],
    resolve: {
      alias: { '@': path.resolve(__dirname, './src') },
    },
    server: { host: '0.0.0.0', port: 8443, strictPort: true },
    preview: { host: '0.0.0.0', port: 8443 },
  };
});
