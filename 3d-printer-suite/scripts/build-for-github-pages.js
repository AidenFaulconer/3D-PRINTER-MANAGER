#!/usr/bin/env node

/**
 * Build script for GitHub Pages deployment
 * Ensures proper configuration and creates necessary files
 */

import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const projectRoot = path.join(__dirname, '..')

console.log('🔧 Building for GitHub Pages...')

// Ensure .nojekyll file exists
const nojekyllPath = path.join(projectRoot, '.nojekyll')
if (!fs.existsSync(nojekyllPath)) {
  fs.writeFileSync(nojekyllPath, '')
  console.log('✅ Created .nojekyll file')
}

// Ensure dist directory exists
const distPath = path.join(projectRoot, 'dist')
if (!fs.existsSync(distPath)) {
  fs.mkdirSync(distPath, { recursive: true })
  console.log('✅ Created dist directory')
}

// Create .nojekyll in dist directory
const distNojekyllPath = path.join(distPath, '.nojekyll')
fs.writeFileSync(distNojekyllPath, '')
console.log('✅ Created .nojekyll in dist directory')

// Verify vite.config.js has correct base path
const viteConfigPath = path.join(projectRoot, 'vite.config.js')
if (fs.existsSync(viteConfigPath)) {
  const viteConfig = fs.readFileSync(viteConfigPath, 'utf8')
  if (viteConfig.includes("base: '/3D-PRINTER-MANAGER/3d-printer-suite/'")) {
    console.log('✅ Vite config has correct base path')
  } else {
    console.log('⚠️  Vite config base path may need updating')
    console.log('   Expected: base: \'/3D-PRINTER-MANAGER/3d-printer-suite/\'')
  }
}

console.log('🎉 Build preparation complete!')
console.log('📝 Next steps:')
console.log('   1. Run: yarn build')
console.log('   2. Commit and push changes')
console.log('   3. GitHub Actions will deploy automatically')
console.log('   4. Visit: https://aidenfaulconer.github.io/3D-PRINTER-MANAGER/3d-printer-suite/')
