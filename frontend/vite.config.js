import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

const config = {
  plugins: [
    vue(),
  ],
  server: {
    host: true,
    port: 8080,
    watch: {
      usePolling: true
    }
  }
}

export default defineConfig(config)