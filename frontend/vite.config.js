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
    watch: {
      usePolling: true
    },
    proxy: {
    	'/api': {
		target: 'http:/localhost:3000',
		changeOrigin: true,
		rewrite: (path) => path.replace(/^\/api/, ''),
	}
    }
  }
}

export default defineConfig(config)
