import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

const config = {
  base: "/",
  plugins: [
    vue(),
  ],
  preview: {
    port: 50364,
    strictPort: true,
  },
  server: {
    host: true,
    port: 50364,
    strictPort: true,
    // origin: "http://0.0.0.0:50364"
    watch: {
      usePolling: true
    }
  }
}

export default defineConfig(config)