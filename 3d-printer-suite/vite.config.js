import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  worker: {
    format: 'es',
    plugins: [react()],
    rollupOptions: {
      output: {
        format: 'es',
        inlineDynamicImports: true
      }
    }
  },
  resolve: {
    dedupe: ['three', '@react-three/fiber', '@react-three/drei'],
    alias: {
      'react': 'react',
      'react-dom': 'react-dom'
    }
  },
  optimizeDeps: {
    include: [
      'three',
      '@react-three/fiber',
      '@react-three/drei/core/OrbitControls',
      '@react-three/drei/core/Line',
      '@react-three/drei/core/Grid',
      '@react-three/drei/core/PerspectiveCamera',
      '@react-three/drei/core/Stats'
    ],
    exclude: ['@react-three/fiber']
  },
  build: {
    commonjsOptions: {
      include: [/three/, /drei/, /fiber/]
    },
    rollupOptions: {
      external: [],
      output: {
        manualChunks: {
          three: ['three'],
          'react-three': ['@react-three/fiber', '@react-three/drei']
        }
      }
    }
  },
  define: {
    'process.env.NODE_ENV': '"production"'
  },
  server: {
    watch: {
      usePolling: true
    },
    force: true
  }
})