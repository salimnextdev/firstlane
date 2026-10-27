import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'
import svgr from '@svgr/rollup';
import path from 'path'

export default defineConfig({
  plugins: [
    tailwindcss(),
    svgr(),
  ],
  server: {
    host: true,
    port: "5175"
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    }
  },
  test: {
    globals: true,
    environment: 'jsdom',
  },
})