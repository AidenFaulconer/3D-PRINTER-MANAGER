import React, { useEffect, useState } from 'react'
import GcodeParser from '../utils/GcodeParser'
import GcodeValidator from '../utils/GcodeValidator'
import GcodePreview from './GcodePreview'
import useGcodeFilesStore from '../stores/gcodeFilesStore'
import usePrintersStore from '../stores/printersStore'

const FileDetailsPanel = ({ fileId }) => {
  const [metadata, setMetadata] = useState(null)
  const [validationResult, setValidationResult] = useState(null)
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const { getFile } = useGcodeFilesStore()
  const { getActivePrinter } = usePrintersStore()

  useEffect(() => {
    const analyzeFile = async () => {
      const file = getFile(fileId)
      if (!file) return

      setIsAnalyzing(true)
      try {
        const printer = getActivePrinter()
        const parser = new GcodeParser({
          maxBedTemp: printer?.bedTemp || 120,
          maxHotendTemp: printer?.hotendTemp || 260,
          bedSize: printer?.bedSize || { x: 220, y: 220, z: 250 },
          maxFeedrate: printer?.maxFeedrate || { x: 500, y: 500, z: 10, e: 25 }
        })

        // Parse G-code metadata
        const result = await parser.parse(file.content)
        setMetadata(result)

        // Validate G-code
        const validator = new GcodeValidator({
          maxBedTemp: printer?.bedTemp || 120,
          maxHotendTemp: printer?.hotendTemp || 260,
          bedSize: printer?.bedSize || { x: 220, y: 220, z: 250 },
          maxFeedrate: printer?.maxFeedrate || { x: 500, y: 500, z: 10, e: 25 }
        })
        const validation = await validator.validate(file.content)
        setValidationResult(validation)
      } catch (error) {
        console.error('Error analyzing G-code:', error)
      } finally {
        setIsAnalyzing(false)
      }
    }

    analyzeFile()
  }, [fileId, getFile, getActivePrinter])

  const formatTime = (seconds) => {
    if (!seconds) return 'Unknown'
    const hours = Math.floor(seconds / 3600)
    const minutes = Math.floor((seconds % 3600) / 60)
    return `${hours}h ${minutes}m`
  }

  const formatDistance = (mm) => {
    if (mm >= 1000) {
      return `${(mm / 1000).toFixed(2)}m`
    }
    return `${mm.toFixed(2)}mm`
  }

  if (isAnalyzing) {
    return (
      <div className="p-4 bg-white rounded-lg shadow">
        <div className="flex items-center justify-center space-x-2">
          <svg className="animate-spin h-5 w-5 text-blue-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          <span>Analyzing G-code...</span>
        </div>
      </div>
    )
  }

  if (!metadata) {
    return null
  }

  return (
    <div className="bg-white rounded-lg shadow divide-y">
      {/* Basic Info */}
      <div className="p-4">
        <h3 className="text-lg font-semibold mb-4">Print Details</h3>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-sm text-gray-500">Print Time</p>
            <p className="font-medium">{formatTime(metadata.estimatedPrintTime)}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Material</p>
            <p className="font-medium">{metadata.materialType || 'Unknown'}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Filament Used</p>
            <p className="font-medium">{metadata.filamentLength ? formatDistance(metadata.filamentLength) : 'Unknown'}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Layer Count</p>
            <p className="font-medium">{metadata.layerCount}</p>
          </div>
        </div>
      </div>

      {/* Print Settings */}
      <div className="p-4">
        <h3 className="text-lg font-semibold mb-4">Print Settings</h3>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-sm text-gray-500">Layer Height</p>
            <p className="font-medium">{metadata.layerHeight ? `${metadata.layerHeight}mm` : 'Unknown'}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Infill Density</p>
            <p className="font-medium">{metadata.infillDensity ? `${metadata.infillDensity}%` : 'Unknown'}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Hotend Temperature</p>
            <p className="font-medium">{metadata.temperatures.hotend}°C</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Bed Temperature</p>
            <p className="font-medium">{metadata.temperatures.bed}°C</p>
          </div>
        </div>
      </div>

      {/* Model Dimensions */}
      <div className="p-4">
        <h3 className="text-lg font-semibold mb-4">Model Dimensions</h3>
        <div className="grid grid-cols-3 gap-4">
          <div>
            <p className="text-sm text-gray-500">Width (X)</p>
            <p className="font-medium">{formatDistance(metadata.dimensions.x)}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Depth (Y)</p>
            <p className="font-medium">{formatDistance(metadata.dimensions.y)}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Height (Z)</p>
            <p className="font-medium">{formatDistance(metadata.dimensions.z)}</p>
          </div>
        </div>
      </div>

      {/* Print Statistics */}
      <div className="p-4">
        <h3 className="text-lg font-semibold mb-4">Print Statistics</h3>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-sm text-gray-500">Total Distance</p>
            <p className="font-medium">{formatDistance(metadata.stats.totalDistance)}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Total Extrusion</p>
            <p className="font-medium">{formatDistance(metadata.stats.totalExtrusion)}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Move Commands</p>
            <p className="font-medium">{metadata.stats.moveCount}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Retractions</p>
            <p className="font-medium">{metadata.stats.retractionCount}</p>
          </div>
        </div>
      </div>

      {/* G-code Preview */}
      <div className="p-4">
        <h3 className="text-lg font-semibold mb-4">Preview</h3>
        <GcodePreview content={getFile(fileId)?.content} width={400} height={300} />
      </div>

      {/* Validation Results */}
      {validationResult && (
        <div className="p-4">
          <h3 className="text-lg font-semibold mb-4">
            Validation Results
            {validationResult.isValid ? (
              <span className="ml-2 text-green-500 text-sm">✓ Valid</span>
            ) : (
              <span className="ml-2 text-red-500 text-sm">⚠ Issues Found</span>
            )}
          </h3>
          
          {validationResult.issues.length > 0 && (
            <div className="space-y-4">
              {/* Errors */}
              {validationResult.issues.filter(i => i.type === 'error').length > 0 && (
                <div>
                  <h4 className="font-medium text-red-600 mb-2">Errors</h4>
                  <ul className="space-y-2">
                    {validationResult.issues
                      .filter(issue => issue.type === 'error')
                      .map((issue, index) => (
                        <li key={index} className="flex items-start space-x-2 text-red-600">
                          <svg className="h-5 w-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          <div>
                            <span>{issue.message}</span>
                            {issue.command && (
                              <div className="mt-1 text-sm font-mono bg-red-50 p-1 rounded">
                                Line {issue.line}: {issue.command}
                              </div>
                            )}
                          </div>
                        </li>
                      ))}
                  </ul>
                </div>
              )}

              {/* Warnings */}
              {validationResult.issues.filter(i => i.type === 'warning').length > 0 && (
                <div>
                  <h4 className="font-medium text-yellow-600 mb-2">Warnings</h4>
                  <ul className="space-y-2">
                    {validationResult.issues
                      .filter(issue => issue.type === 'warning')
                      .map((issue, index) => (
                        <li key={index} className="flex items-start space-x-2 text-yellow-600">
                          <svg className="h-5 w-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                          </svg>
                          <div>
                            <span>{issue.message}</span>
                            {issue.command && (
                              <div className="mt-1 text-sm font-mono bg-yellow-50 p-1 rounded">
                                Line {issue.line}: {issue.command}
                              </div>
                            )}
                          </div>
                        </li>
                      ))}
                  </ul>
                </div>
              )}
            </div>
          )}
        </div>
      )}

      {/* Parser Warnings */}
      {metadata.warnings.length > 0 && (
        <div className="p-4">
          <h3 className="text-lg font-semibold mb-4 text-yellow-600">Parser Warnings</h3>
          <ul className="space-y-2">
            {metadata.warnings.map((warning, index) => (
              <li key={index} className="flex items-start space-x-2 text-yellow-600">
                <svg className="h-5 w-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
                <span>{warning}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}

export default FileDetailsPanel
