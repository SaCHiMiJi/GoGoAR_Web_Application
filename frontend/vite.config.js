import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

const config = {
  base: "/",
  plugins: [
    vue(),
  ],
  preview: {
    port: 57329,
    strictPort: true,
  },
  server: {
    host: true,
    port: 57329,
    strictPort: true,
    // origin: "http://0.0.0.0:57329"
  }
}

export default defineConfig(config)