import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import commonjs from '@rollup/plugin-commonjs'

// https://vitejs.dev/config/
export default defineConfig({
  base: '/',
  plugins: [
    commonjs({
      requireReturnsDefault: 'auto',
      include: ['node_modules/**'],
      transformMixedEsModules: true
    }),
    react(),
  ],
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
    dedupe: ['three', '@react-three/fiber', '@react-three/drei', 'react', 'react-dom'],
    alias: {
      'react': 'react',
      'react-dom': 'react-dom'
    }
  },
  esbuild: {
    jsx: 'automatic'
  },
  optimizeDeps: {
    include: [
      'react',
      'react-dom',
      'zustand',
      'three',
      '@react-three/fiber',
      '@react-three/drei/core/OrbitControls',
      '@react-three/drei/core/Line',
      '@react-three/drei/core/Grid',
      '@react-three/drei/core/PerspectiveCamera',
      '@react-three/drei/core/Stats',
      'comlink'
    ]
  },
  build: {
    chunkSizeWarningLimit: 1000, // Increase limit to 1MB to suppress warnings for Three.js
    commonjsOptions: {
      include: [/three/, /drei/, /fiber/, /zustand/],
      transformMixedEsModules: true,
      requireReturnsDefault: 'auto'
    },
    rollupOptions: {
      external: [],
      output: {
        manualChunks: (id) => {
          // Separate Three.js into its own chunk
          if (id.includes('three') || id.includes('@react-three')) {
            return 'three-3d'
          }
          // Separate React libraries
          if (id.includes('react') || id.includes('react-dom')) {
            return 'react-vendor'
          }
          // Separate state management
          if (id.includes('zustand')) {
            return 'state-management'
          }
          // Separate other large libraries
          if (id.includes('lucide-react')) {
            return 'icons'
          }
          // Default chunk for other modules
          return 'vendor'
        }
      }
    }
  },
  define: {
    'process.env.NODE_ENV': '"production"',
    'global': 'globalThis'
  },
  server: {
    watch: {
      usePolling: true
    },
    force: true
  }
})