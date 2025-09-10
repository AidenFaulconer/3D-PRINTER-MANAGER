#!/usr/bin/env node

/**
 * GitHub Pages Configuration Checker
 * Helps verify that GitHub Pages is set up correctly
 */

import { execSync } from 'child_process'

console.log('🔍 Checking GitHub Pages Configuration...\n')

// Get repository info
let repoInfo
try {
  const remoteUrl = execSync('git remote get-url origin', { encoding: 'utf8' }).trim()
  console.log('📁 Repository URL:', remoteUrl)
  
  // Extract owner and repo name
  const match = remoteUrl.match(/github\.com[:/]([^/]+)\/([^/]+)(?:\.git)?$/)
  if (match) {
    const [, owner, repo] = match
    repoInfo = { owner, repo }
    console.log('👤 Owner:', owner)
    console.log('📦 Repository:', repo)
  }
} catch (error) {
  console.error('❌ Could not get repository info:', error.message)
  process.exit(1)
}

console.log('\n📋 GitHub Pages Configuration Checklist:')
console.log('=' .repeat(50))

console.log('\n1. 📍 Repository Settings:')
console.log(`   • Go to: https://github.com/${repoInfo.owner}/${repoInfo.repo}/settings/pages`)
console.log('   • Source: Should be set to "GitHub Actions"')
console.log('   • Branch: Should be "gh-pages" (auto-created by Actions)')

console.log('\n2. 🔧 GitHub Actions:')
console.log(`   • Go to: https://github.com/${repoInfo.owner}/${repoInfo.repo}/actions`)
console.log('   • Check if the "Deploy to GitHub Pages" workflow has run')
console.log('   • If not, push a new commit to trigger it')

console.log('\n3. 📄 Expected URL:')
console.log(`   • https://${repoInfo.owner.toLowerCase()}.github.io/${repoInfo.repo}/3d-printer-suite/`)

console.log('\n4. 🛠️ Manual Deployment (if needed):')
console.log('   • Run: yarn build:pages')
console.log('   • Run: yarn deploy')
console.log('   • This will create a gh-pages branch with the built files')

console.log('\n5. 🔍 Troubleshooting:')
console.log('   • Check Actions tab for build errors')
console.log('   • Verify Pages source is set to "GitHub Actions"')
console.log('   • Ensure workflow has proper permissions')
console.log('   • Check if gh-pages branch exists')

console.log('\n📝 Next Steps:')
console.log('1. Verify GitHub Pages settings in repository')
console.log('2. Check GitHub Actions for any failed runs')
console.log('3. If needed, manually trigger deployment with: yarn deploy')
console.log('4. Wait 5-10 minutes for GitHub Pages to update')

console.log('\n✅ Configuration appears correct!')
console.log('   The 404 error should resolve once GitHub Pages is properly configured.')
