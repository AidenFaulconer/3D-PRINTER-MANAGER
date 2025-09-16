import React, { useState, useRef, useEffect } from 'react'
import { 
  Terminal, 
  Play, 
  Square, 
  Download, 
  Upload, 
  FolderOpen,
  FileText,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Copy,
  Trash2,
  Settings
} from 'lucide-react'

const RemoteTerminal = () => {
  const [isConnected, setIsConnected] = useState(false)
  const [isBuilding, setIsBuilding] = useState(false)
  const [terminalOutput, setTerminalOutput] = useState([])
  const [currentCommand, setCurrentCommand] = useState('')
  const [commandHistory, setCommandHistory] = useState([])
  const [historyIndex, setHistoryIndex] = useState(-1)
  const [projectPath, setProjectPath] = useState('')
  const [configFiles, setConfigFiles] = useState({
    configH: null,
    configAdvH: null,
    configHOld: null,
    configAdvHOld: null
  })
  const [buildStatus, setBuildStatus] = useState('idle') // idle, building, success, error
  const [buildOutput, setBuildOutput] = useState('')
  
  const terminalRef = useRef(null)
  const commandInputRef = useRef(null)

  // Auto-scroll terminal output
  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight
    }
  }, [terminalOutput])

  // Focus command input when terminal is clicked
  const handleTerminalClick = () => {
    if (commandInputRef.current) {
      commandInputRef.current.focus()
    }
  }

  // Handle command execution
  const handleCommandSubmit = (e) => {
    e.preventDefault()
    if (!currentCommand.trim()) return

    const command = currentCommand.trim()
    addToOutput(`$ ${command}`)
    
    // Add to history
    setCommandHistory(prev => [...prev, command])
    setHistoryIndex(-1)
    setCurrentCommand('')

    // Handle specific commands
    if (command === 'connect') {
      handleConnect()
    } else if (command === 'disconnect') {
      handleDisconnect()
    } else if (command.startsWith('cd ')) {
      const newPath = command.substring(3).trim()
      setProjectPath(newPath)
      addToOutput(`Changed directory to: ${newPath}`)
    } else if (command === 'pwd') {
      addToOutput(projectPath || 'No directory set')
    } else if (command === 'ls') {
      addToOutput('Configuration files:')
      addToOutput('  configuration.h')
      addToOutput('  configuration_adv.h')
      addToOutput('  configuration.h_OLD')
      addToOutput('  configuration_adv.h_OLD')
    } else if (command === 'backup') {
      handleBackupConfigs()
    } else if (command === 'build') {
      handleBuildFirmware()
    } else if (command === 'restore') {
      handleRestoreConfigs()
    } else if (command === 'help') {
      showHelp()
    } else {
      addToOutput(`Command not found: ${command}`)
      addToOutput('Type "help" for available commands')
    }
  }

  // Handle command history navigation
  const handleKeyDown = (e) => {
    if (e.key === 'ArrowUp') {
      e.preventDefault()
      if (historyIndex < commandHistory.length - 1) {
        const newIndex = historyIndex + 1
        setHistoryIndex(newIndex)
        setCurrentCommand(commandHistory[commandHistory.length - 1 - newIndex])
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault()
      if (historyIndex > 0) {
        const newIndex = historyIndex - 1
        setHistoryIndex(newIndex)
        setCurrentCommand(commandHistory[commandHistory.length - 1 - newIndex])
      } else if (historyIndex === 0) {
        setHistoryIndex(-1)
        setCurrentCommand('')
      }
    }
  }

  const addToOutput = (text, type = 'normal') => {
    setTerminalOutput(prev => [...prev, { text, type, timestamp: new Date() }])
  }

  const handleConnect = () => {
    setIsConnected(true)
    addToOutput('Connected to remote terminal', 'success')
    addToOutput('Type "help" for available commands')
  }

  const handleDisconnect = () => {
    setIsConnected(false)
    addToOutput('Disconnected from remote terminal', 'warning')
  }

  const handleBackupConfigs = () => {
    addToOutput('Backing up configuration files...')
    addToOutput('Creating configuration.h_OLD...')
    addToOutput('Creating configuration_adv.h_OLD...')
    addToOutput('Backup completed successfully', 'success')
    setConfigFiles(prev => ({
      ...prev,
      configHOld: 'Backed up',
      configAdvHOld: 'Backed up'
    }))
  }

  const handleBuildFirmware = async () => {
    if (!isConnected) {
      addToOutput('Error: Not connected to remote terminal', 'error')
      return
    }

    setIsBuilding(true)
    setBuildStatus('building')
    addToOutput('Starting PIO firmware build...')
    addToOutput('PlatformIO: Processing...')

    // Simulate build process
    const buildSteps = [
      'Checking PlatformIO installation...',
      'Loading project configuration...',
      'Resolving dependencies...',
      'Compiling Marlin firmware...',
      'Linking firmware...',
      'Generating firmware binary...'
    ]

    for (let i = 0; i < buildSteps.length; i++) {
      await new Promise(resolve => setTimeout(resolve, 1000))
      addToOutput(buildSteps[i])
    }

    // Simulate build result
    const success = Math.random() > 0.2 // 80% success rate for demo
    if (success) {
      addToOutput('Build completed successfully!', 'success')
      addToOutput('Firmware binary: .pio/build/STM32F4/firmware.bin')
      setBuildStatus('success')
    } else {
      addToOutput('Build failed! Check configuration errors.', 'error')
      addToOutput('Error: Invalid configuration detected in configuration.h', 'error')
      setBuildStatus('error')
    }

    setIsBuilding(false)
  }

  const handleRestoreConfigs = () => {
    addToOutput('Restoring original configuration files...')
    addToOutput('Restoring configuration.h from _OLD...')
    addToOutput('Restoring configuration_adv.h from _OLD...')
    addToOutput('Configuration restored successfully', 'success')
  }

  const showHelp = () => {
    addToOutput('Available commands:')
    addToOutput('  connect          - Connect to remote terminal')
    addToOutput('  disconnect       - Disconnect from remote terminal')
    addToOutput('  cd <path>        - Change directory')
    addToOutput('  pwd              - Show current directory')
    addToOutput('  ls               - List files')
    addToOutput('  backup           - Backup configuration files')
    addToOutput('  build            - Build firmware with PIO')
    addToOutput('  restore          - Restore original configurations')
    addToOutput('  help             - Show this help')
  }

  const getOutputColor = (type) => {
    switch (type) {
      case 'success': return 'text-green-600'
      case 'error': return 'text-red-600'
      case 'warning': return 'text-yellow-600'
      default: return 'text-gray-900'
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center">
            <Terminal className="h-5 w-5 text-blue-600 mr-2" />
            <h3 className="text-lg font-semibold text-gray-900">Remote Terminal & PIO Build</h3>
          </div>
          <div className="flex items-center space-x-2">
            <div className={`px-3 py-1 rounded-full text-xs font-medium ${
              isConnected 
                ? 'bg-green-100 text-green-800' 
                : 'bg-gray-100 text-gray-800'
            }`}>
              {isConnected ? 'Connected' : 'Disconnected'}
            </div>
            <div className={`px-3 py-1 rounded-full text-xs font-medium ${
              buildStatus === 'building' ? 'bg-yellow-100 text-yellow-800' :
              buildStatus === 'success' ? 'bg-green-100 text-green-800' :
              buildStatus === 'error' ? 'bg-red-100 text-red-800' :
              'bg-gray-100 text-gray-800'
            }`}>
              {buildStatus === 'building' ? 'Building...' :
               buildStatus === 'success' ? 'Build Success' :
               buildStatus === 'error' ? 'Build Failed' :
               'Ready'}
            </div>
          </div>
        </div>
        
        <p className="text-sm text-gray-600 mb-4">
          Connect to a remote terminal to build Marlin firmware with PlatformIO. 
          Configuration files will be automatically backed up before building.
        </p>

        {/* Quick Actions */}
        <div className="flex flex-wrap gap-2 mb-4">
          <button
            onClick={handleConnect}
            disabled={isConnected}
            className="px-3 py-1 bg-green-600 text-white rounded text-sm hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Play className="h-4 w-4 mr-1 inline" />
            Connect
          </button>
          <button
            onClick={handleDisconnect}
            disabled={!isConnected}
            className="px-3 py-1 bg-red-600 text-white rounded text-sm hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Square className="h-4 w-4 mr-1 inline" />
            Disconnect
          </button>
          <button
            onClick={handleBackupConfigs}
            disabled={!isConnected}
            className="px-3 py-1 bg-blue-600 text-white rounded text-sm hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Copy className="h-4 w-4 mr-1 inline" />
            Backup Configs
          </button>
          <button
            onClick={handleBuildFirmware}
            disabled={!isConnected || isBuilding}
            className="px-3 py-1 bg-purple-600 text-white rounded text-sm hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Settings className="h-4 w-4 mr-1 inline" />
            {isBuilding ? 'Building...' : 'Build Firmware'}
          </button>
          <button
            onClick={handleRestoreConfigs}
            disabled={!isConnected}
            className="px-3 py-1 bg-orange-600 text-white rounded text-sm hover:bg-orange-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Trash2 className="h-4 w-4 mr-1 inline" />
            Restore Configs
          </button>
        </div>
      </div>

      {/* Terminal */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-4">
          <h4 className="font-medium text-gray-900">Terminal Output</h4>
          <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-500">Current: {projectPath || 'No directory set'}</span>
            <button
              onClick={() => setTerminalOutput([])}
              className="text-gray-400 hover:text-gray-600"
            >
              <Trash2 className="h-4 w-4" />
            </button>
          </div>
        </div>
        
        <div
          ref={terminalRef}
          onClick={handleTerminalClick}
          className="bg-black text-green-400 font-mono text-sm p-4 rounded-lg h-96 overflow-y-auto cursor-text"
        >
          {terminalOutput.length === 0 ? (
            <div className="text-gray-500">
              Terminal ready. Type "connect" to start or "help" for commands.
            </div>
          ) : (
            terminalOutput.map((line, index) => (
              <div key={index} className={`${getOutputColor(line.type)} mb-1`}>
                {line.text}
              </div>
            ))
          )}
        </div>
        
        <form onSubmit={handleCommandSubmit} className="mt-4">
          <div className="flex items-center">
            <span className="text-green-400 font-mono mr-2">$</span>
            <input
              ref={commandInputRef}
              type="text"
              value={currentCommand}
              onChange={(e) => setCurrentCommand(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Enter command..."
              className="flex-1 bg-transparent text-green-400 font-mono outline-none"
              disabled={!isConnected}
            />
          </div>
        </form>
      </div>

      {/* Configuration Files Status */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h4 className="font-medium text-gray-900 mb-4">Configuration Files Status</h4>
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded">
              <span className="text-sm font-medium">configuration.h</span>
              <div className="flex items-center">
                {configFiles.configH ? (
                  <CheckCircle className="h-4 w-4 text-green-600" />
                ) : (
                  <XCircle className="h-4 w-4 text-gray-400" />
                )}
              </div>
            </div>
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded">
              <span className="text-sm font-medium">configuration_adv.h</span>
              <div className="flex items-center">
                {configFiles.configAdvH ? (
                  <CheckCircle className="h-4 w-4 text-green-600" />
                ) : (
                  <XCircle className="h-4 w-4 text-gray-400" />
                )}
              </div>
            </div>
          </div>
          <div className="space-y-2">
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded">
              <span className="text-sm font-medium">configuration.h_OLD</span>
              <div className="flex items-center">
                {configFiles.configHOld ? (
                  <CheckCircle className="h-4 w-4 text-green-600" />
                ) : (
                  <XCircle className="h-4 w-4 text-gray-400" />
                )}
              </div>
            </div>
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded">
              <span className="text-sm font-medium">configuration_adv.h_OLD</span>
              <div className="flex items-center">
                {configFiles.configAdvHOld ? (
                  <CheckCircle className="h-4 w-4 text-green-600" />
                ) : (
                  <XCircle className="h-4 w-4 text-gray-400" />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Build Instructions */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
        <h4 className="font-medium text-blue-900 mb-3 flex items-center">
          <AlertTriangle className="h-5 w-5 mr-2" />
          Build Instructions
        </h4>
        <div className="text-blue-800 text-sm space-y-2">
          <p><strong>1. Connect:</strong> Click "Connect" to establish remote terminal connection</p>
          <p><strong>2. Set Directory:</strong> Use <code>cd /path/to/marlin</code> to set your Marlin project directory</p>
          <p><strong>3. Backup:</strong> Run "backup" to create _OLD copies of your configuration files</p>
          <p><strong>4. Build:</strong> Run "build" to compile firmware with PlatformIO</p>
          <p><strong>5. Restore:</strong> Use "restore" if you need to revert to original configurations</p>
        </div>
      </div>
    </div>
  )
}

export default RemoteTerminal
