import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/mvp/GAVEL/',
  server: {
    port: 4010,
    host: '0.0.0.0',
    proxy: {
      '/mvp/GAVEL/api': {
        target: 'http://localhost:8200',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/mvp\/GAVEL/, '')
      }
    }
  },
  build: {
    outDir: 'dist',
    assetsDir: 'assets'
  }
})
