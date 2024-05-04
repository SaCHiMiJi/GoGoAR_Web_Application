import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

const config = {
  base: "/",
  plugins: [
    vue(),
  ],
  preview: {
    port: 3030,
    strictPort: true,
  },
  server: {
    host: true,
    port: 3030,
    strictPort: true,
    // origin: "http://0.0.0.0:3030"
    watch: {
      usePolling: true
    }
  }
}

export default defineConfig(config)