import react from '@vitejs/plugin-react';
import autoprefixer from 'autoprefixer';
import path from 'node:path';
import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';
import * as packageJson from './package.json';

export default defineConfig({
  // Define aliases for folders to avoid relative import paths
  resolve: {
    alias: {
      '@assets': path.resolve(__dirname, './assets'),
    },
  },
  plugins: [
    react(),
    dts({
      include: ['src/components'],
    }),
  ],
  css: {
    modules: {
      localsConvention: "camelCase",
      generateScopedName: '[local]_[hash:base64:5]',
    },
    postcss: {
      map: true,
      plugins: [
        autoprefixer(),
      ],
    },
  },
  build: {
    cssCodeSplit: true,
    lib: {
      entry: path.resolve(__dirname, 'src', 'components/index.ts'),
      name: 'ReactLibraryVite',
      formats: ['es', 'umd'],
      fileName: (format) => `react-library-vite.${format}.js`,
    },
    rollupOptions: {
      external: [...Object.keys(packageJson.peerDependencies)],
    },
  },
});
