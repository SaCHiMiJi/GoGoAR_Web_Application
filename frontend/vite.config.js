import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

const config = {
  base: "/",
  plugins: [
    vue(),
  ],
  preview: {
        host: '0.0.0.0',
        port: 3030,
  },
  server: {
    hmr: {
            host: '0.0.0.0',
    },
    port: 3030,
    watch: {
        usePolling: true
    }
  },
}

export default defineConfig(config)

