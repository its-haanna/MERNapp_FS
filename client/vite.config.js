import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import dns from 'dns'

dns.setDefaultResultOrder('verbatim')

// https://vitejs.dev/config/
export default defineConfig({
  server: {
  port: 3000,
  // proxy: {
  //     "/api": {
  //       target: "0.0.0.0:$PORT",
  //       changeOrigin: true,
  //       secure: false,
  //     },
  //   },
},
  plugins: [react()],
})

