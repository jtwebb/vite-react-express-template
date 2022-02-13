import dotenv from 'dotenv';
dotenv.config();
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import svgr from '@svgr/rollup';
import autoprefixer from 'autoprefixer';
import cssnano from 'cssnano';
import fs from 'fs';
import path from 'path';

export default ({ mode }) => {
  const { PORT = 3001 } = process.env;

  return defineConfig({
    plugins: [react(), svgr()],
    clearScreen: false,
    publicDir: 'src/app/public',
    css: {
      preprocessorOptions: {
        scss: {}
      },
      postcss: {
        plugins: [autoprefixer(), mode === 'production' ? cssnano() : false].filter(Boolean)
      }
    },
    server: {
      https: {
        key: fs.readFileSync(path.resolve(__dirname, './.cert/key.pem'), 'utf8'),
        cert: fs.readFileSync(path.resolve(__dirname, './.cert/cert.pem'), 'utf8')
      },
      proxy: {
        '/api': {
          target: `https://localhost:${PORT}`,
          changeOrigin: true,
          secure: false
        }
      }
    },
    build: {
      outDir: 'dist/app'
    }
  });
};
