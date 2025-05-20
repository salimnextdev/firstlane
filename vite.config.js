import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'
import svgr from '@svgr/rollup';
import path from 'path'

export default defineConfig({
  plugins: [
    tailwindcss(),
    svgr(),
  ],
  // server: {
  //   host: '192.168.30.164'
  // },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    }
  },
})