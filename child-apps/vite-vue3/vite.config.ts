import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vite.dev/config/
export default defineConfig({
  server: {
    port: 5173,
    open: true,
    cors: true, // 允许跨域
    headers: {
      'Access-Control-Allow-Origin': '*' // 允许所有来源访问
    }
  },
  plugins: [vue()]
})
