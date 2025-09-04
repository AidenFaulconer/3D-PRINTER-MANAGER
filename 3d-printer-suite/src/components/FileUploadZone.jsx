import React, { useCallback, useState } from 'react'
import useGcodeFilesStore from '../stores/gcodeFilesStore'

const FileUploadZone = () => {
  const [isDragging, setIsDragging] = useState(false)
  const [uploadProgress, setUploadProgress] = useState({})
  const { addFile } = useGcodeFilesStore()

  const handleDragEnter = useCallback((e) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragging(true)
  }, [])

  const handleDragLeave = useCallback((e) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragging(false)
  }, [])

  const handleDragOver = useCallback((e) => {
    e.preventDefault()
    e.stopPropagation()
  }, [])

  const processFile = useCallback(async (file) => {
    // Validate file extension
    if (!file.name.toLowerCase().endsWith('.gcode')) {
      throw new Error('Invalid file type. Only .gcode files are supported.')
    }

    // Read file content
    const content = await new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.onload = () => resolve(reader.result)
      reader.onerror = () => reject(reader.error)
      reader.readAsText(file)
    })

    // Calculate estimated print time (basic implementation)
    const estimatedPrintTime = calculateEstimatedPrintTime(content)

    return {
      name: file.name,
      size: file.size,
      content,
      estimatedPrintTime
    }
  }, [])

  const calculateEstimatedPrintTime = (content) => {
    // Basic implementation - count G1 moves and multiply by average time
    const moveCount = (content.match(/G1/g) || []).length
    const avgTimePerMove = 0.5 // seconds
    return moveCount * avgTimePerMove
  }

  const handleDrop = useCallback(async (e) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragging(false)

    const files = Array.from(e.dataTransfer.files)
    
    for (const file of files) {
      try {
        setUploadProgress(prev => ({ ...prev, [file.name]: 0 }))
        
        const processedFile = await processFile(file)
        addFile(processedFile)
        
        setUploadProgress(prev => ({ ...prev, [file.name]: 100 }))
        
        // Clear progress after a delay
        setTimeout(() => {
          setUploadProgress(prev => {
            const newProgress = { ...prev }
            delete newProgress[file.name]
            return newProgress
          })
        }, 2000)
      } catch (error) {
        console.error(`Error uploading ${file.name}:`, error)
        // Show error in UI
        setUploadProgress(prev => ({ 
          ...prev, 
          [file.name]: { error: error.message } 
        }))
      }
    }
  }, [addFile, processFile])

  const handleFileSelect = useCallback(async (e) => {
    const files = Array.from(e.target.files)
    for (const file of files) {
      try {
        setUploadProgress(prev => ({ ...prev, [file.name]: 0 }))
        
        const processedFile = await processFile(file)
        addFile(processedFile)
        
        setUploadProgress(prev => ({ ...prev, [file.name]: 100 }))
        
        setTimeout(() => {
          setUploadProgress(prev => {
            const newProgress = { ...prev }
            delete newProgress[file.name]
            return newProgress
          })
        }, 2000)
      } catch (error) {
        console.error(`Error uploading ${file.name}:`, error)
        setUploadProgress(prev => ({ 
          ...prev, 
          [file.name]: { error: error.message } 
        }))
      }
    }
    // Reset input
    e.target.value = ''
  }, [addFile, processFile])

  return (
    <div className="w-full">
      {/* Drop zone */}
      <div
        className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors
          ${isDragging 
            ? 'border-blue-500 bg-blue-50' 
            : 'border-gray-300 hover:border-gray-400'
          }`}
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        onClick={() => document.getElementById('file-input').click()}
      >
        <div className="flex flex-col items-center justify-center">
          <svg
            className={`w-12 h-12 mb-4 ${isDragging ? 'text-blue-500' : 'text-gray-400'}`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
            />
          </svg>
          <p className="mb-2 text-sm text-gray-500">
            <span className="font-semibold">Click to upload</span> or drag and drop
          </p>
          <p className="text-xs text-gray-500">.gcode files only</p>
        </div>
      </div>

      {/* Hidden file input */}
      <input
        id="file-input"
        type="file"
        className="hidden"
        accept=".gcode"
        multiple
        onChange={handleFileSelect}
      />

      {/* Upload progress */}
      {Object.entries(uploadProgress).length > 0 && (
        <div className="mt-4 space-y-2">
          {Object.entries(uploadProgress).map(([fileName, progress]) => (
            <div key={fileName} className="flex items-center">
              <span className="flex-1 truncate text-sm">{fileName}</span>
              {typeof progress === 'number' ? (
                <div className="w-24 h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-blue-500 transition-all duration-300"
                    style={{ width: `${progress}%` }}
                  />
                </div>
              ) : (
                <span className="text-sm text-red-500">{progress.error}</span>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default FileUploadZone
