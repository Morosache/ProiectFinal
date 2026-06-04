import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'
import tailwindcss from '@tailwindcss/vite'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  base: './',
  plugins: [
    VitePWA({
      registerType: 'autoUpdate', devOptions: {
        enabled: true
      },
      includeAssets: ['icons/logo.png'],
      manifest: {
        name: "MoneyTrack",
        short_name: "MoneyTrack",
        theme_color: "#56d788",
        background_color: "#fafafa",
        display: "standalone",
        scope: "./",
        start_url: "./",
      }
    }),
    vue(),
    vueDevTools(),
    tailwindcss(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    },
  },
})
