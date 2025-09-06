import { useState, useMemo, memo } from 'react'
import useSerialConnection from '../hooks/useSerialConnection'
import { ArrowLeft, Settings, Printer, CheckCircle, Circle, Home, Wrench, Thermometer, Ruler, Zap, FileText, AlertTriangle, TerminalSquare, SlidersHorizontal, MonitorPlay } from 'lucide-react'
import { useActivePrinterId, useGetActivePrinter } from '../hooks/useStoreSelectors'
import Logo from './Logo'
import ThemeToggle from './ThemeToggle'
import PrinterConfig from './PrinterConfig'
import FirmwareConfig from './FirmwareConfig'
import CalibrationStep from './CalibrationStep'
import IssueTracker from './IssueTracker'
import ProfileManagement from './ProfileManagement'
import MaterialManagement from './MaterialManagement'
import ProfilesMaterials from './ProfilesMaterials'
import SerialPanel from './SerialPanel'
import PrinterControlPanel from './PrinterControlPanel'
import { calibrationSteps, getCalibrationStep } from '../data/calibrationSteps'

const PrinterLayout = memo(({ onBackToDashboard }) => {
  const [selectedStep, setSelectedStep] = useState('config')
  const activePrinterId = useActivePrinterId()
  const getActivePrinter = useGetActivePrinter()
  const { status: serialStatus, sendCommand } = useSerialConnection()
  
  // Only subscribe to the specific printer data we need for this component
  const printerBasicInfo = getActivePrinter();
  //  usePrintersStore(state => {
  //   const activePrinter = state.printers.find(p => p.id === state.activePrinterId)
  //   if (!activePrinter) return null
  //   return {
  //     name: activePrinter.name,
  //     model: activePrinter.model,
  //     firmware: activePrinter.firmware,
  //     calibrationSteps: activePrinter.calibrationSteps
  //   }
  // })
  
  // Memoize serial props to prevent unnecessary re-renders
  const serialProps = useMemo(() => ({
    serialStatus,
    sendCommand
  }), [serialStatus, sendCommand])

  // Create navigation steps including the new calibration steps
  const navigationSteps = [
    {
      id: 'monitor',
      name: 'Print Monitor',
      icon: MonitorPlay,
      description: 'Monitor and control active prints',
      component: () => window.location.href = '#/control'
    },
    {
      id: 'calibration-workflow',
      name: 'Calibration Workflow',
      icon: Wrench,
      description: 'Guided step-by-step calibration process',
      component: () => window.location.href = '#/calibration'
    },
    {
      id: 'config',
      name: 'Printer Configuration',
      icon: Settings,
      description: 'Basic printer settings and information',
      component: PrinterConfig
    },
    {
      id: 'profilesMaterials',
      name: 'Profiles & Materials',
      icon: FileText,
      description: 'Manage slicer profiles and materials together',
      component: ProfilesMaterials,
      category: 'Profiles'
    },
    {
      id: 'firmwareConfig',
      name: 'Firmware Configuration',
      icon: FileText,
      description: 'Parse and analyze Marlin firmware files',
      component: FirmwareConfig
    },
    {
      id: 'control',
      name: 'Control',
      icon: SlidersHorizontal,
      description: 'Manual control for movement, temperatures, extrusion, and more',
      component: PrinterControlPanel,
      category: 'Diagnostics'
    },
    {
      id: 'serial',
      name: 'Terminal',
      icon: TerminalSquare,
      description: 'USB serial connection and G-code terminal',
      component: SerialPanel,
      category: 'Diagnostics'
    },
    {
      id: 'issueTracker',
      name: 'Issue Tracker',
      icon: AlertTriangle,
      description: 'Track and manage printer issues and diagnostics',
      component: IssueTracker,
      category: 'Diagnostics'
    },
    ...calibrationSteps.map(step => ({
      id: step.id,
      name: step.title,
      icon: step.category === 'Temperature' ? Thermometer :
            step.category === 'Movement' ? Wrench :
            step.category === 'Quality' ? Settings : Zap,
      description: step.description,
      component: () => <CalibrationStep step={step} onComplete={handleCalibrationComplete} {...serialProps} />,
      category: step.category
    }))
  ]

  if (!printerBasicInfo) {
    return (
      <div className="min-h-screen bg-white dark:bg-gray-800 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <Printer className="h-16 w-16 text-gray-300 dark:text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">No Printer Selected</h3>
          <button
            onClick={onBackToDashboard}
            className="bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-white px-4 py-2 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
          >
            Back to Dashboard
          </button>
        </div>
      </div>
    )
  }

  const handleCalibrationComplete = (stepId) => {
    // Optionally refresh the printer data or show a success message
    console.log(`Calibration step ${stepId} completed`)
  }

  const getStepStatus = (stepId) => {
    if (stepId === 'config') return 'available'
    if (stepId === 'firmwareConfig') {
      const step = printerBasicInfo.calibrationSteps?.firmwareConfig
      if (!step) return 'pending'
      return step.completed ? 'completed' : 'in-progress'
    }
    
    const step = printerBasicInfo.calibrationSteps?.[stepId]
    if (!step) return 'pending'
    return step.completed ? 'completed' : 'in-progress'
  }

  const getStepIcon = (stepId) => {
    // Only calibration steps should show status icons
    const isCalibrationStep = calibrationSteps.some(step => step.id === stepId)
    
    if (isCalibrationStep) {
      const status = getStepStatus(stepId)
      if (status === 'completed') return CheckCircle
      if (status === 'in-progress') return Circle
      return Circle
    }
    
    // For non-calibration steps, return their original icon
    const step = navigationSteps.find(s => s.id === stepId)
    return step?.icon || Circle
  }

  const getStepIconColor = (stepId) => {
    // Only calibration steps should show status colors
    const isCalibrationStep = calibrationSteps.some(step => step.id === stepId)
    
    if (isCalibrationStep) {
      const status = getStepStatus(stepId)
      if (status === 'completed') return 'text-green-500'
      if (status === 'in-progress') return 'text-yellow-500'
      return 'text-gray-400 dark:text-gray-500'
    }
    
    // For non-calibration steps, use better contrast colors
    return 'text-gray-600 dark:text-gray-300'
  }

  const SelectedComponent = navigationSteps.find(step => step.id === selectedStep)?.component || PrinterConfig

  // Group steps by category for better organization
  const groupedSteps = navigationSteps.reduce((groups, step) => {
    if (step.id === 'config' || step.id === 'firmwareConfig') {
      if (!groups['Configuration']) groups['Configuration'] = []
      groups['Configuration'].push(step)
    } else {
      const category = step.category || 'Other'
      if (!groups[category]) groups[category] = []
      groups[category].push(step)
    }
    return groups
  }, {})

  return (
    <div className="min-h-screen bg-white dark:bg-gray-800 dark:bg-gray-900 flex">
      {/* Sidebar */}
      <div className="w-64 bg-white dark:bg-gray-800 shadow-lg border-r border-gray-200 dark:border-gray-700 flex flex-col">
        {/* Header */}
        <div className="p-4 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between mb-3">
            <button
              onClick={onBackToDashboard}
              className="text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white p-1 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            >
              <ArrowLeft className="h-5 w-5" />
            </button>
            <div className="flex items-center space-x-2">
              <Logo className="h-6 w-6" />
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white truncate">{printerBasicInfo.name}</h2>
            </div>
            <ThemeToggle />
          </div>
          <p className="text-sm text-gray-600 dark:text-gray-300 truncate">{printerBasicInfo.model}</p>
          <p className="text-xs text-gray-500 dark:text-gray-400 truncate">{printerBasicInfo.firmware}</p>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto p-4">
          <div className="space-y-4">
            {Object.entries(groupedSteps).map(([category, steps]) => (
              <div key={category}>
                <h3 className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2">
                  {category}
                </h3>
                <div className="space-y-2">
                  {steps.map((step) => {
                    const Icon = getStepIcon(step.id)
                    const iconColor = getStepIconColor(step.id)
                    const isSelected = selectedStep === step.id
                    
                    return (
                      <button
                        key={step.id}
                        onClick={() => setSelectedStep(step.id)}
                        className={`w-full flex items-center space-x-3 p-3 rounded-lg text-left transition-colors ${
                          isSelected
                            ? 'bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 text-blue-700 dark:text-blue-300'
                            : 'hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white'
                        }`}
                      >
                        <Icon className={`h-5 w-5 ${iconColor}`} />
                        <div className="flex-1 min-w-0">
                          <div className="font-medium text-sm truncate">{step.name}</div>
                          <div className="text-xs text-gray-500 dark:text-gray-400 truncate">{step.description}</div>
                        </div>
                      </button>
                    )
                  })}
                </div>
              </div>
            ))}
          </div>
        </nav>

        {/* Footer */}
        <div className="p-4 border-t border-gray-200 dark:border-gray-700">
          <div className="text-center">
            <div className="flex items-center justify-center space-x-2 mb-2">
              <Home className="h-4 w-4 text-gray-500 dark:text-gray-400" />
              <span className="text-sm text-gray-600 dark:text-gray-300">3D Printer Suite</span>
            </div>
            <div className="text-xs text-gray-500 dark:text-gray-400">
              {printerBasicInfo.calibrationSteps && 
                `${Object.values(printerBasicInfo.calibrationSteps).filter(step => step?.completed).length}/${Object.keys(printerBasicInfo.calibrationSteps).length} steps completed`
              }
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        <div className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
          <div className="px-6 py-4">
            <h1 className="text-xl font-semibold text-gray-900 dark:text-white">
              {navigationSteps.find(step => step.id === selectedStep)?.name}
            </h1>
            <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
              {navigationSteps.find(step => step.id === selectedStep)?.description}
            </p>
          </div>
        </div>
        
        <div className="p-6">
          <SelectedComponent />
        </div>
      </div>
    </div>
  )
}, (prevProps, nextProps) => {
  // Custom comparison to prevent unnecessary re-renders
  return (
    prevProps.onBackToDashboard === nextProps.onBackToDashboard &&
    prevProps.selectedStep === nextProps.selectedStep
  )
})

export default PrinterLayout
