/// <reference types="vitest" />

import legacy from '@vitejs/plugin-legacy'
import vue from '@vitejs/plugin-vue'
import path from 'path'
import { defineConfig } from 'vite'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    legacy()
  ],
  esbuild: {
    supported: {
      'top-level-await': true //browsers can handle top-level-await features
    },
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  test: {
    globals: true,
    environment: 'jsdom'
  },
  css: {
    preprocessorOptions: {
      scss: {
        api: 'modern',
        additionalData: `
          @use "@/theme/scss/fonts.scss" as *;
          @use "@/theme/scss/variables.scss" as v;
        `,
      },
    },
  },  
})
