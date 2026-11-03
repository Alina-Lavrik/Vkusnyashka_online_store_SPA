import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import { qrcode } from 'vite-plugin-qrcode'
import { vitePages } from '@kingironman2011/vite-pages'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), qrcode(), vitePages()],
  base: '/Vkusnyashka_online_store_SPA/', 
  server: {
    port: 3000,
    open: true,
  },
  build: {
    outDir: 'dist',
    sourcemap: false,
  },
})
