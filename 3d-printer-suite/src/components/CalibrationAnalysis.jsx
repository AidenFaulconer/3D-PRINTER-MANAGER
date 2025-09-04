import React, { useState, useRef } from 'react'
import useCalibrationStore from '../stores/calibrationStore'
import usePrintersStore from '../stores/printersStore'

const CalibrationAnalysis = ({ fileId }) => {
  const {
    getCalibrationFile,
    addCalibrationResult,
    analyzeFirstLayerAdhesion,
    analyzeStringingTest,
    analyzeBedLevel
  } = useCalibrationStore()

  const { updatePrinter, getActivePrinter } = usePrintersStore()
  const [analyzing, setAnalyzing] = useState(false)
  const [imagePreview, setImagePreview] = useState(null)
  const fileInputRef = useRef(null)
  const calibrationFile = getCalibrationFile(fileId)

  const handleImageUpload = (e) => {
    const file = e.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => setImagePreview(e.target.result)
      reader.readAsDataURL(file)
    }
  }

  const handleAnalyze = async () => {
    if (!imagePreview || !calibrationFile) return

    setAnalyzing(true)
    try {
      let analysisResult

      // Choose analysis method based on calibration type
      switch (calibrationFile.type) {
        case 'first_layer':
          analysisResult = await analyzeFirstLayerAdhesion(imagePreview)
          break
        case 'stringing':
          analysisResult = await analyzeStringingTest(imagePreview)
          break
        case 'bed_level':
          analysisResult = await analyzeBedLevel(imagePreview)
          break
        default:
          throw new Error('Unsupported calibration type')
      }

      // Save results
      const resultId = addCalibrationResult(fileId, analysisResult)

      // Apply recommended settings if confidence is high
      const printer = getActivePrinter()
      if (printer && analysisResult.recommendations) {
        const highConfidenceSettings = analysisResult.recommendations
          .filter(rec => rec.confidence > 0.8)
          .reduce((acc, rec) => ({
            ...acc,
            [rec.setting]: rec.value
          }), {})

        if (Object.keys(highConfidenceSettings).length > 0) {
          updatePrinter(printer.id, {
            settings: {
              ...printer.settings,
              ...highConfidenceSettings
            }
          })
        }
      }
    } catch (error) {
      console.error('Analysis failed:', error)
    } finally {
      setAnalyzing(false)
    }
  }

  const renderAnalysisTools = () => {
    if (!calibrationFile) return null

    switch (calibrationFile.type) {
      case 'first_layer':
        return (
          <div className="space-y-4">
            <h3 className="font-medium">First Layer Analysis</h3>
            <p className="text-sm text-gray-500">
              Upload a close-up photo of your first layer to analyze adhesion and quality.
              Ensure good lighting and focus on problematic areas.
            </p>
            {/* Measurement guides */}
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <h4 className="font-medium">Check for:</h4>
                <ul className="list-disc pl-4 text-gray-600">
                  <li>Gaps between lines</li>
                  <li>Squishing/elephant foot</li>
                  <li>Corner lifting</li>
                  <li>Surface texture</li>
                </ul>
              </div>
              <div>
                <h4 className="font-medium">Common issues:</h4>
                <ul className="list-disc pl-4 text-gray-600">
                  <li>Bed temperature too low</li>
                  <li>Incorrect Z-offset</li>
                  <li>Flow rate issues</li>
                  <li>Bed leveling problems</li>
                </ul>
              </div>
            </div>
          </div>
        )

      case 'stringing':
        return (
          <div className="space-y-4">
            <h3 className="font-medium">Stringing Test Analysis</h3>
            <p className="text-sm text-gray-500">
              Upload a photo of your completed stringing test towers.
              Position the camera to clearly show any strings between towers.
            </p>
            {/* Measurement tools */}
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <h4 className="font-medium">Measurements:</h4>
                <ul className="list-disc pl-4 text-gray-600">
                  <li>String count</li>
                  <li>String thickness</li>
                  <li>String length</li>
                  <li>Surface quality</li>
                </ul>
              </div>
              <div>
                <h4 className="font-medium">Settings to adjust:</h4>
                <ul className="list-disc pl-4 text-gray-600">
                  <li>Retraction distance</li>
                  <li>Retraction speed</li>
                  <li>Temperature</li>
                  <li>Travel speed</li>
                </ul>
              </div>
            </div>
          </div>
        )

      case 'bed_level':
        return (
          <div className="space-y-4">
            <h3 className="font-medium">Bed Leveling Analysis</h3>
            <p className="text-sm text-gray-500">
              Upload your bed leveling mesh visualization or a photo of the leveling test print.
              The system will analyze bed height variations and suggest adjustments.
            </p>
            {/* Level visualization */}
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <h4 className="font-medium">Analysis points:</h4>
                <ul className="list-disc pl-4 text-gray-600">
                  <li>Corner heights</li>
                  <li>Center deviation</li>
                  <li>Mesh topology</li>
                  <li>High/low spots</li>
                </ul>
              </div>
              <div>
                <h4 className="font-medium">Adjustments:</h4>
                <ul className="list-disc pl-4 text-gray-600">
                  <li>Corner screws</li>
                  <li>Z-offset</li>
                  <li>Bed temperature</li>
                  <li>Mesh points</li>
                </ul>
              </div>
            </div>
          </div>
        )

      default:
        return null
    }
  }

  return (
    <div className="space-y-6">
      {/* File Info */}
      <div className="bg-white rounded-lg shadow p-4">
        <h2 className="text-lg font-semibold mb-2">
          Calibration Analysis: {calibrationFile?.name}
        </h2>
        <p className="text-sm text-gray-500">
          Type: {calibrationFile?.type}
        </p>
      </div>

      {/* Analysis Tools */}
      <div className="bg-white rounded-lg shadow p-4 space-y-4">
        {renderAnalysisTools()}

        {/* Image Upload */}
        <div className="mt-4">
          <div
            className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors
              ${imagePreview ? 'border-green-500' : 'border-gray-300 hover:border-gray-400'}`}
            onClick={() => fileInputRef.current?.click()}
          >
            {imagePreview ? (
              <img
                src={imagePreview}
                alt="Analysis preview"
                className="max-h-64 mx-auto"
              />
            ) : (
              <div className="space-y-2">
                <svg
                  className="w-12 h-12 mx-auto text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
                <p className="text-sm text-gray-500">
                  Click to upload calibration photo
                </p>
              </div>
            )}
          </div>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleImageUpload}
          />
        </div>

        {/* Analysis Button */}
        <div className="flex justify-end">
          <button
            onClick={handleAnalyze}
            disabled={!imagePreview || analyzing}
            className={`px-4 py-2 rounded ${
              analyzing || !imagePreview
                ? 'bg-gray-300 cursor-not-allowed'
                : 'bg-blue-500 hover:bg-blue-600 text-white'
            }`}
          >
            {analyzing ? 'Analyzing...' : 'Analyze Results'}
          </button>
        </div>
      </div>

      {/* Results History */}
      {calibrationFile?.results && (
        <div className="bg-white rounded-lg shadow p-4">
          <h3 className="font-medium mb-4">Previous Results</h3>
          {/* Render previous analysis results */}
        </div>
      )}
    </div>
  )
}

export default CalibrationAnalysis
