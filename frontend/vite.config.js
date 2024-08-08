import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

const config = {
  base: "/",
  plugins: [
    vue(),
  ],
  server: {
    host: true,
    port: 3030,
  },
}

export default defineConfig(config)

