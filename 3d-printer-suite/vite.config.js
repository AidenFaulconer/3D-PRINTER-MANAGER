import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import commonjs from '@rollup/plugin-commonjs'

// https://vitejs.dev/config/
export default defineConfig({
  base: '/3D-PRINTER-SUITE/3d-printer-suite/',
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
    commonjsOptions: {
      include: [/three/, /drei/, /fiber/, /zustand/],
      transformMixedEsModules: true,
      requireReturnsDefault: 'auto'
    },
    rollupOptions: {
      external: [],
      output: {
        manualChunks: {
          'react-vendor': ['react', 'react-dom'],
          'state-management': ['zustand'],
          'three': ['three'],
          'react-three': ['@react-three/fiber', '@react-three/drei']
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