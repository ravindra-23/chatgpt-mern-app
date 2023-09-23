import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    target: 'es2015',
    chunkSizeWarningLimit: 1000, // Increase the warning limit to 1MB
    rollupOptions: {
      output: {
        manualChunks: {
          'react': ['react', 'react-dom'], // Example of manual chunking
        },
      },
    },
  },
})
