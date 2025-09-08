/**
 * Firmware Builder Utility
 * Handles file operations, diff generation, and build processes for Marlin firmware
 */

import { spawn } from 'child_process'
import fs from 'fs'
import path from 'path'

/**
 * Write modified configuration files to the Marlin repository
 */
export async function writeConfigFiles(repoPath, modifiedContent) {
  const results = []
  
  for (const [fileType, content] of Object.entries(modifiedContent)) {
    const fileName = fileType === 'basic' ? 'Configuration.h' : 'Configuration_adv.h'
    const filePath = path.join(repoPath, 'Marlin', fileName)
    
    try {
      // Create backup
      const backupPath = `${filePath}.backup.${Date.now()}`
      if (fs.existsSync(filePath)) {
        fs.copyFileSync(filePath, backupPath)
      }
      
      // Write new content
      fs.writeFileSync(filePath, content, 'utf8')
      
      results.push({
        file: fileName,
        path: filePath,
        backup: backupPath,
        success: true
      })
    } catch (error) {
      results.push({
        file: fileName,
        path: filePath,
        success: false,
        error: error.message
      })
    }
  }
  
  return results
}

/**
 * Generate a detailed diff between original and modified content
 */
export function generateDetailedDiff(originalContent, modifiedContent) {
  const diffs = {}
  
  for (const [fileType, original] of Object.entries(originalContent)) {
    const modified = modifiedContent[fileType]
    if (!modified) continue
    
    const originalLines = original.split('\n')
    const modifiedLines = modified.split('\n')
    
    diffs[fileType] = {
      fileName: fileType === 'basic' ? 'Configuration.h' : 'Configuration_adv.h',
      changes: [],
      stats: {
        added: 0,
        removed: 0,
        modified: 0
      }
    }
    
    // Use a simple line-by-line diff algorithm
    const maxLines = Math.max(originalLines.length, modifiedLines.length)
    
    for (let i = 0; i < maxLines; i++) {
      const originalLine = originalLines[i] || ''
      const modifiedLine = modifiedLines[i] || ''
      
      if (originalLine !== modifiedLine) {
        let changeType
        if (originalLine === '') {
          changeType = 'added'
          diffs[fileType].stats.added++
        } else if (modifiedLine === '') {
          changeType = 'removed'
          diffs[fileType].stats.removed++
        } else {
          changeType = 'modified'
          diffs[fileType].stats.modified++
        }
        
        diffs[fileType].changes.push({
          line: i + 1,
          type: changeType,
          original: originalLine,
          modified: modifiedLine,
          context: {
            before: originalLines.slice(Math.max(0, i - 2), i),
            after: modifiedLines.slice(i + 1, Math.min(modifiedLines.length, i + 3))
          }
        })
      }
    }
  }
  
  return diffs
}

/**
 * Apply configuration changes to file content
 */
export function applyConfigChanges(originalContent, configs) {
  const modified = { ...originalContent }
  
  for (const [fileType, content] of Object.entries(originalContent)) {
    let newContent = content
    
    // Find configs for this file type
    const fileConfigs = configs.filter(config => 
      (fileType === 'basic' && config.fileType === 'basic') ||
      (fileType === 'advanced' && config.fileType === 'advanced')
    )
    
    fileConfigs.forEach(config => {
      // Handle different types of defines
      const patterns = [
        // Simple define: #define NAME value
        new RegExp(`^(\\s*)(#define\\s+${config.name}\\s+)(.*)$`, 'gm'),
        // Commented define: // #define NAME value
        new RegExp(`^(\\s*)(//\\s*#define\\s+${config.name}\\s+)(.*)$`, 'gm'),
        // Define with comment: #define NAME value // comment
        new RegExp(`^(\\s*)(#define\\s+${config.name}\\s+)([^/]*?)(\\s*//.*)?$`, 'gm')
      ]
      
      patterns.forEach(pattern => {
        if (config.enabled) {
          // Enable the setting
          newContent = newContent.replace(pattern, (match, indent, define, value, comment = '') => {
            return `${indent}#define ${config.name} ${config.value}${comment}`
          })
        } else {
          // Disable the setting
          newContent = newContent.replace(pattern, (match, indent, define, value, comment = '') => {
            return `${indent}// #define ${config.name} ${config.value}${comment}`
          })
        }
      })
    })
    
    modified[fileType] = newContent
  }
  
  return modified
}

/**
 * Check if PlatformIO is available and configured
 */
export async function checkPlatformIO(repoPath) {
  return new Promise((resolve) => {
    const pio = spawn('pio', ['--version'], { cwd: repoPath })
    
    let output = ''
    let error = ''
    
    pio.stdout.on('data', (data) => {
      output += data.toString()
    })
    
    pio.stderr.on('data', (data) => {
      error += data.toString()
    })
    
    pio.on('close', (code) => {
      resolve({
        available: code === 0,
        version: output.trim(),
        error: error.trim()
      })
    })
    
    pio.on('error', (error) => {
      resolve({
        available: false,
        error: error.message
      })
    })
  })
}

/**
 * Build Marlin firmware using PlatformIO
 */
export async function buildMarlinFirmware(repoPath, onProgress) {
  return new Promise((resolve, reject) => {
    const build = spawn('pio', ['run'], { 
      cwd: repoPath,
      stdio: ['pipe', 'pipe', 'pipe']
    })
    
    let output = ''
    let error = ''
    
    build.stdout.on('data', (data) => {
      const text = data.toString()
      output += text
      if (onProgress) {
        onProgress(text)
      }
    })
    
    build.stderr.on('data', (data) => {
      const text = data.toString()
      error += text
      if (onProgress) {
        onProgress(text)
      }
    })
    
    build.on('close', (code) => {
      if (code === 0) {
        resolve({
          success: true,
          output: output,
          firmwarePath: findFirmwareFile(repoPath)
        })
      } else {
        reject({
          success: false,
          error: error || output,
          code: code
        })
      }
    })
    
    build.on('error', (error) => {
      reject({
        success: false,
        error: error.message
      })
    })
  })
}

/**
 * Find the compiled firmware file
 */
function findFirmwareFile(repoPath) {
  const possiblePaths = [
    path.join(repoPath, '.pio', 'build', 'mega2560', 'firmware.hex'),
    path.join(repoPath, '.pio', 'build', 'mega2560', 'firmware.bin'),
    path.join(repoPath, '.pio', 'build', 'STM32F4', 'firmware.bin'),
    path.join(repoPath, '.pio', 'build', 'STM32F4', 'firmware.hex')
  ]
  
  for (const firmwarePath of possiblePaths) {
    if (fs.existsSync(firmwarePath)) {
      return firmwarePath
    }
  }
  
  return null
}

/**
 * Validate Marlin repository structure
 */
export function validateMarlinRepo(repoPath) {
  const requiredFiles = [
    'Marlin/Configuration.h',
    'platformio.ini',
    'Marlin/Marlin.ino'
  ]
  
  const missing = []
  const present = []
  
  requiredFiles.forEach(file => {
    const fullPath = path.join(repoPath, file)
    if (fs.existsSync(fullPath)) {
      present.push(file)
    } else {
      missing.push(file)
    }
  })
  
  return {
    valid: missing.length === 0,
    present,
    missing,
    path: repoPath
  }
}

/**
 * Get build environment information
 */
export async function getBuildEnvironment(repoPath) {
  const validation = validateMarlinRepo(repoPath)
  const pioCheck = await checkPlatformIO(repoPath)
  
  return {
    repo: validation,
    platformio: pioCheck,
    ready: validation.valid && pioCheck.available
  }
}

/**
 * Create a change summary for tracking
 */
export function createChangeSummary(changes, configs) {
  const summary = {
    timestamp: new Date().toISOString(),
    totalChanges: 0,
    files: {},
    settings: {
      enabled: 0,
      disabled: 0,
      modified: 0
    }
  }
  
  // Count file changes
  Object.entries(changes).forEach(([fileType, diff]) => {
    summary.files[fileType] = {
      fileName: diff.fileName,
      changes: diff.changes.length,
      stats: diff.stats
    }
    summary.totalChanges += diff.changes.length
  })
  
  // Count setting changes
  configs.forEach(config => {
    if (config.enabled) {
      summary.settings.enabled++
    } else {
      summary.settings.disabled++
    }
    summary.settings.modified++
  })
  
  return summary
}

/**
 * Save change history to file
 */
export function saveChangeHistory(repoPath, history) {
  const historyPath = path.join(repoPath, '.marlin-config-history.json')
  
  try {
    fs.writeFileSync(historyPath, JSON.stringify(history, null, 2), 'utf8')
    return { success: true, path: historyPath }
  } catch (error) {
    return { success: false, error: error.message }
  }
}

/**
 * Load change history from file
 */
export function loadChangeHistory(repoPath) {
  const historyPath = path.join(repoPath, '.marlin-config-history.json')
  
  try {
    if (fs.existsSync(historyPath)) {
      const content = fs.readFileSync(historyPath, 'utf8')
      return { success: true, history: JSON.parse(content) }
    } else {
      return { success: true, history: [] }
    }
  } catch (error) {
    return { success: false, error: error.message }
  }
}
