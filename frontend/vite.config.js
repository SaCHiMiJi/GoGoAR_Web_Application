import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

const config = {
  base: "/",
  plugins: [
    vue(),
  ],
  preview: {
    host: "127.0.0.1",
    port: 3030,
  },
  server: {
    host: true,
    port: 3030,
    protocol: 'ws',
    hmr:{
      host: true,
      port: 3030,
      protocol: 'ws',
    }
  },
}

export default defineConfig(config)

