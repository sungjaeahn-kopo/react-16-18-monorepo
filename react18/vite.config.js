import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'node:path'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
      '@shared/lib': path.resolve(__dirname, '../packages/shared/src'),
    },
  },
  css: {
    postcss: '../../postcss.config.js',
  },
})
