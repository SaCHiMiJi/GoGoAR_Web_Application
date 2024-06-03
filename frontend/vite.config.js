import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

const config = {
  base: "/",
  plugins: [
    vue(),
  ],
  preview: {
        host: true,
        port: 3030,
  },
  server: {
    hmr: {
            host: true,
    },
    port: 3030,
    watch: {
        usePolling: true
    }
  },
}

export default defineConfig(config)

