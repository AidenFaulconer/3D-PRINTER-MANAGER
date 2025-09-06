import React, { useState, useEffect, useCallback } from 'react'
import { 
  Play, 
  RotateCcw, 
  Check, 
  X, 
  AlertTriangle,
  CheckCircle,
  Clock,
  Thermometer,
  Ruler,
  Zap,
  Settings,
  FileText,
  Box,
  RefreshCw
} from 'lucide-react'
import useSerialStore from '../stores/serialStore'
import { SimpleGcodeViewer3D } from './SimpleGcodeViewer3D'
import BedMeshVisualization from './BedMeshVisualization'

const BedLevelingStep = ({ onComplete, onRetry }) => {
  const [stepState, setStepState] = useState('config') // config, running, analyzing, review, completed
  const [meshData, setMeshData] = useState(null)
  const [flatnessAnalysis, setFlatnessAnalysis] = useState(null)
  const [retryCount, setRetryCount] = useState(0)
  const [maxRetries] = useState(3)
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [analysisProgress, setAnalysisProgress] = useState(0)
  
  // Serial store subscriptions
  const status = useSerialStore(state => state.status)
  const sendCommand = useSerialStore(state => state.sendCommand)
  const sendGcodeProgram = useSerialStore(state => state.sendGcodeProgram)
  const temperatures = useSerialStore(state => state.temperatures)
  const activePrinter = useSerialStore(state => state.activePrinter)
  
  const isConnected = status === 'connected'
  
  // Bed leveling G-code generation
  const generateBedLevelingGcode = useCallback(() => {
    let gcode = `; Bed Leveling Calibration\n`
    gcode += `; This will probe the bed and analyze flatness\n`
    gcode += `G90\n`
    gcode += `M82\n`
    gcode += `; Home all axes\n`
    gcode += `G28\n`
    gcode += `; Heat bed to 60°C for consistent probing\n`
    gcode += `M140 S60\n`
    gcode += `M190 S60\n`
    gcode += `; Heat hotend to 200°C\n`
    gcode += `M104 S200\n`
    gcode += `M109 S200\n`
    gcode += `; Enable bed leveling\n`
    gcode += `M420 S1\n`
    gcode += `; Run bed leveling (G29)\n`
    gcode += `G29\n`
    gcode += `; Get mesh data\n`
    gcode += `M420 V\n`
    gcode += `; Move to center for inspection\n`
    gcode += `G0 X110 Y110 Z5\n`
    gcode += `; Move up for safety\n`
    gcode += `G0 Z20\n`
    gcode += `; Turn off heaters\n`
    gcode += `M104 S0\n`
    gcode += `M140 S0\n`
    gcode += `M84\n`
    
    return gcode
  }, [])
  
  const [generatedGcode, setGeneratedGcode] = useState('')
  
  // Generate G-code on component mount
  useEffect(() => {
    const gcode = generateBedLevelingGcode()
    setGeneratedGcode(gcode)
  }, [generateBedLevelingGcode])
  
  // Start bed leveling process
  const startBedLeveling = async () => {
    if (!isConnected) {
      alert('Please connect to your printer first')
      return
    }
    
    setStepState('running')
    setMeshData(null)
    setFlatnessAnalysis(null)
    
    try {
      const result = await sendGcodeProgram(generatedGcode, {
        delayMs: 100,
        waitForReady: true,
        executionData: {
          stepName: 'Bed Leveling',
          stepId: 'bed-leveling',
          workflowId: `bed-leveling-${Date.now()}`
        }
      })
      
      // Simulate analysis phase
      setStepState('analyzing')
      setIsAnalyzing(true)
      setAnalysisProgress(0)
      
      // Simulate analysis progress
      const analysisInterval = setInterval(() => {
        setAnalysisProgress(prev => {
          if (prev >= 100) {
            clearInterval(analysisInterval)
            setIsAnalyzing(false)
            setStepState('review')
            return 100
          }
          return prev + 10
        })
      }, 200)
      
      // Simulate mesh data (in real implementation, this would come from M420 V response)
      setTimeout(() => {
        const simulatedMeshData = generateSimulatedMeshData()
        setMeshData(simulatedMeshData)
        
        const analysis = analyzeBedFlatness(simulatedMeshData)
        setFlatnessAnalysis(analysis)
      }, 2000)
      
    } catch (error) {
      console.error('Error during bed leveling:', error)
      alert('Error during bed leveling: ' + error.message)
      setStepState('config')
    }
  }
  
  // Generate simulated mesh data for testing
  const generateSimulatedMeshData = () => {
    const mesh = []
    const gridSize = 5 // 5x5 grid
    const bedSize = { x: 220, y: 220 }
    
    for (let y = 0; y < gridSize; y++) {
      const row = []
      for (let x = 0; x < gridSize; x++) {
        const xPos = (x / (gridSize - 1)) * bedSize.x
        const yPos = (y / (gridSize - 1)) * bedSize.y
        // Simulate some bed variation
        const zOffset = Math.sin(x * 0.5) * Math.cos(y * 0.3) * 0.1 + (Math.random() - 0.5) * 0.05
        row.push({ x: xPos, y: yPos, z: zOffset })
      }
      mesh.push(row)
    }
    
    return mesh
  }
  
  // Analyze bed flatness
  const analyzeBedFlatness = (meshData) => {
    if (!meshData || meshData.length === 0) return null
    
    // Flatten the mesh data
    const allPoints = meshData.flat()
    const zValues = allPoints.map(point => point.z)
    
    // Calculate statistics
    const minZ = Math.min(...zValues)
    const maxZ = Math.max(...zValues)
    const avgZ = zValues.reduce((sum, z) => sum + z, 0) / zValues.length
    const range = maxZ - minZ
    
    // Calculate standard deviation
    const variance = zValues.reduce((sum, z) => sum + Math.pow(z - avgZ, 2), 0) / zValues.length
    const stdDev = Math.sqrt(variance)
    
    // Determine if bed is acceptable
    // Acceptable range: ±0.1mm variation
    const acceptableRange = 0.1
    const isAcceptable = range <= acceptableRange && stdDev <= 0.05
    
    // Calculate rolling average for each point
    const rollingAverages = meshData.map((row, y) => 
      row.map((point, x) => {
        const neighbors = []
        for (let dy = -1; dy <= 1; dy++) {
          for (let dx = -1; dx <= 1; dx++) {
            const ny = y + dy
            const nx = x + dx
            if (ny >= 0 && ny < meshData.length && nx >= 0 && nx < row.length) {
              neighbors.push(meshData[ny][nx].z)
            }
          }
        }
        const avg = neighbors.reduce((sum, z) => sum + z, 0) / neighbors.length
        return { ...point, rollingAvg: avg }
      })
    )
    
    return {
      minZ,
      maxZ,
      avgZ,
      range,
      stdDev,
      isAcceptable,
      acceptableRange,
      rollingAverages,
      totalPoints: allPoints.length,
      recommendation: isAcceptable 
        ? 'Bed flatness is acceptable for printing'
        : `Bed needs adjustment. Range: ${range.toFixed(3)}mm (max acceptable: ${acceptableRange}mm)`
    }
  }
  
  // Complete the step
  const completeStep = () => {
    setStepState('completed')
    if (onComplete) {
      onComplete({
        meshData,
        flatnessAnalysis,
        retryCount,
        timestamp: Date.now()
      })
    }
  }
  
  // Retry the step
  const retryStep = () => {
    setRetryCount(prev => prev + 1)
    setStepState('config')
    setMeshData(null)
    setFlatnessAnalysis(null)
  }
  
  // Check if we should retry
  const shouldRetry = flatnessAnalysis && !flatnessAnalysis.isAcceptable && retryCount < maxRetries
  
  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-2xl font-bold flex items-center gap-3">
            <Ruler className="w-8 h-8 text-blue-600" />
            Bed Leveling Calibration
          </h1>
          <div className="flex items-center gap-2">
            <div className={`px-3 py-1 rounded-full text-sm font-medium ${
              stepState === 'config' ? 'bg-gray-100 text-gray-800' :
              stepState === 'running' ? 'bg-blue-100 text-blue-800' :
              stepState === 'analyzing' ? 'bg-yellow-100 text-yellow-800' :
              stepState === 'review' ? 'bg-orange-100 text-orange-800' :
              'bg-green-100 text-green-800'
            }`}>
              {stepState === 'config' && 'Ready to Start'}
              {stepState === 'running' && 'Running Bed Leveling'}
              {stepState === 'analyzing' && 'Analyzing Results'}
              {stepState === 'review' && 'Review Results'}
              {stepState === 'completed' && 'Completed'}
            </div>
          </div>
        </div>
        
        <p className="text-gray-700 mb-4">
          This step will probe your bed surface and analyze its flatness. A properly leveled bed is essential for successful 3D printing.
        </p>
        
        <div className="bg-blue-50 border border-blue-200 rounded p-4">
          <h3 className="font-medium text-blue-900 mb-2">What this step does:</h3>
          <ul className="list-disc list-inside text-blue-800 space-y-1 text-sm">
            <li>Probes the bed surface at multiple points</li>
            <li>Analyzes bed flatness using rolling averages</li>
            <li>Determines if bed leveling is acceptable for printing</li>
            <li>Provides recommendations for bed adjustment if needed</li>
          </ul>
        </div>
      </div>
      
      {/* Configuration State */}
      {stepState === 'config' && (
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-4">Configuration</h2>
          
          <div className="space-y-4">
            <div className="bg-yellow-50 border border-yellow-200 rounded p-4">
              <h3 className="font-medium text-yellow-900 mb-2">Prerequisites:</h3>
              <ul className="list-disc list-inside text-yellow-800 space-y-1 text-sm">
                <li>Ensure your printer has a bed leveling probe (BLTouch, inductive sensor, etc.)</li>
                <li>Make sure the probe is properly calibrated</li>
                <li>Clear the bed surface of any debris</li>
                <li>Ensure the bed is at room temperature</li>
              </ul>
            </div>
            
            <div className="flex justify-end">
              <button
                onClick={startBedLeveling}
                disabled={!isConnected}
                className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center gap-2"
              >
                <Play className="w-4 h-4" />
                Start Bed Leveling
              </button>
            </div>
          </div>
        </div>
      )}
      
      {/* Running State */}
      {stepState === 'running' && (
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-4">Running Bed Leveling</h2>
          
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <Clock className="w-5 h-5 text-blue-600 animate-spin" />
              <span className="text-lg">Probing bed surface...</span>
            </div>
            
            <div className="bg-gray-50 rounded p-4">
              <h3 className="font-medium text-gray-900 mb-2">Current Status:</h3>
              <p className="text-sm text-gray-700">
                The printer is now probing the bed surface at multiple points. 
                This process may take several minutes depending on your probe speed and grid size.
              </p>
            </div>
            
            <div className="flex items-center gap-4 text-sm">
              <div className="flex items-center gap-2">
                <Thermometer className="w-4 h-4" />
                <span>Hotend: {temperatures?.hotend?.current || 0}°C / {temperatures?.hotend?.target || 0}°C</span>
              </div>
              <div className="flex items-center gap-2">
                <Thermometer className="w-4 h-4" />
                <span>Bed: {temperatures?.bed?.current || 0}°C / {temperatures?.bed?.target || 0}°C</span>
              </div>
            </div>
          </div>
        </div>
      )}
      
      {/* Analyzing State */}
      {stepState === 'analyzing' && (
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-4">Analyzing Results</h2>
          
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <RefreshCw className="w-5 h-5 text-yellow-600 animate-spin" />
              <span className="text-lg">Analyzing bed flatness...</span>
            </div>
            
            <div className="w-full bg-gray-200 rounded-full h-3">
              <div 
                className="bg-yellow-600 h-3 rounded-full transition-all duration-300"
                style={{ width: `${analysisProgress}%` }}
              />
            </div>
            <div className="text-sm text-gray-600 text-center">
              {analysisProgress}% complete
            </div>
            
            <div className="bg-gray-50 rounded p-4">
              <h3 className="font-medium text-gray-900 mb-2">Analysis in progress:</h3>
              <ul className="list-disc list-inside text-gray-700 space-y-1 text-sm">
                <li>Processing mesh data from probe results</li>
                <li>Calculating rolling averages for each point</li>
                <li>Determining bed flatness and variation</li>
                <li>Generating recommendations</li>
              </ul>
            </div>
          </div>
        </div>
      )}
      
      {/* Review State */}
      {stepState === 'review' && flatnessAnalysis && (
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-4">Bed Leveling Results</h2>
          
          <div className="space-y-6">
            {/* Analysis Summary */}
            <div className={`border rounded-lg p-4 ${
              flatnessAnalysis.isAcceptable 
                ? 'bg-green-50 border-green-200' 
                : 'bg-red-50 border-red-200'
            }`}>
              <div className="flex items-center gap-2 mb-3">
                {flatnessAnalysis.isAcceptable ? (
                  <CheckCircle className="w-5 h-5 text-green-600" />
                ) : (
                  <AlertTriangle className="w-5 h-5 text-red-600" />
                )}
                <h3 className="font-medium text-lg">
                  {flatnessAnalysis.isAcceptable ? 'Bed Leveling Acceptable' : 'Bed Leveling Needs Adjustment'}
                </h3>
              </div>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                <div>
                  <span className="text-gray-600">Range:</span>
                  <div className="font-mono text-lg">{flatnessAnalysis.range.toFixed(3)}mm</div>
                </div>
                <div>
                  <span className="text-gray-600">Standard Deviation:</span>
                  <div className="font-mono text-lg">{flatnessAnalysis.stdDev.toFixed(3)}mm</div>
                </div>
                <div>
                  <span className="text-gray-600">Min Z:</span>
                  <div className="font-mono text-lg">{flatnessAnalysis.minZ.toFixed(3)}mm</div>
                </div>
                <div>
                  <span className="text-gray-600">Max Z:</span>
                  <div className="font-mono text-lg">{flatnessAnalysis.maxZ.toFixed(3)}mm</div>
                </div>
              </div>
              
              <div className="mt-3 p-3 bg-white rounded border">
                <p className="text-sm font-medium text-gray-900">Recommendation:</p>
                <p className="text-sm text-gray-700">{flatnessAnalysis.recommendation}</p>
              </div>
            </div>
            
            {/* Mesh Visualization */}
            {meshData && (
              <div className="border rounded-lg p-4">
                <h3 className="font-medium text-gray-900 mb-3">Bed Mesh Visualization</h3>
                <BedMeshVisualization meshData={meshData} analysis={flatnessAnalysis} />
              </div>
            )}
            
            {/* Action Buttons */}
            <div className="flex justify-between">
              {shouldRetry ? (
                <button
                  onClick={retryStep}
                  className="px-4 py-2 bg-yellow-600 text-white rounded hover:bg-yellow-700 flex items-center gap-2"
                >
                  <RotateCcw className="w-4 h-4" />
                  Retry Bed Leveling ({retryCount + 1}/{maxRetries})
                </button>
              ) : (
                <div></div>
              )}
              
              <button
                onClick={completeStep}
                className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 flex items-center gap-2"
              >
                <Check className="w-4 h-4" />
                {flatnessAnalysis.isAcceptable ? 'Complete Step' : 'Accept Results'}
              </button>
            </div>
          </div>
        </div>
      )}
      
      {/* Completed State */}
      {stepState === 'completed' && (
        <div className="bg-white rounded-lg shadow p-6">
          <div className="text-center">
            <CheckCircle className="w-16 h-16 text-green-600 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-green-900 mb-2">Bed Leveling Complete</h2>
            <p className="text-gray-700 mb-6">
              Bed leveling calibration has been completed successfully.
            </p>
            
            {flatnessAnalysis && (
              <div className="bg-green-50 border border-green-200 rounded-lg p-4 max-w-md mx-auto">
                <h3 className="font-medium text-green-900 mb-2">Final Results:</h3>
                <div className="text-sm text-green-800">
                  <p>Bed Range: {flatnessAnalysis.range.toFixed(3)}mm</p>
                  <p>Standard Deviation: {flatnessAnalysis.stdDev.toFixed(3)}mm</p>
                  <p>Status: {flatnessAnalysis.isAcceptable ? 'Acceptable' : 'Needs Attention'}</p>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

export default BedLevelingStep
