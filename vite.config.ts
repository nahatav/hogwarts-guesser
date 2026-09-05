import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/hogwarts-guesser/',
  server: {
    port: 3000,
    host: true,
  },
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
});
