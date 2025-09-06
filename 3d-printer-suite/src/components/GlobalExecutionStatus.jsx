import React from 'react'
import useSerialStore from '../stores/serialStore'
import { Clock, X, CheckCircle, AlertCircle } from 'lucide-react'

const GlobalExecutionStatus = () => {
  const activeExecution = useSerialStore(state => state.activeExecution)
  const abortExecution = useSerialStore(state => state.abortExecution)

  if (!activeExecution || activeExecution.status !== 'running') {
    return null
  }

  const { stepName, progress, startTime } = activeExecution
  const percentage = progress.total > 0 ? Math.round((progress.sent / progress.total) * 100) : 0
  const duration = Math.round((Date.now() - startTime) / 1000)

  const handleAbort = async () => {
    if (confirm('Are you sure you want to abort the current calibration execution? This will send an emergency stop to the printer.')) {
      try {
        await abortExecution()
      } catch (error) {
        console.error('Failed to abort execution:', error)
        alert('Failed to abort execution: ' + error.message)
      }
    }
  }

  return (
    <div className="fixed top-4 right-4 z-50 bg-blue-50 border border-blue-200 rounded-lg shadow-lg p-4 max-w-sm">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <Clock className="w-5 h-5 text-blue-600 animate-spin" />
          <h3 className="font-medium text-blue-900">Calibration Running</h3>
        </div>
        <button
          onClick={handleAbort}
          className="p-1 hover:bg-red-100 rounded text-red-600 hover:text-red-700"
          title="Abort execution (Emergency Stop)"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
      
      <div className="space-y-2">
        <div className="text-sm text-blue-800">
          <div className="font-medium">{stepName}</div>
          <div className="text-xs text-blue-600">
            {progress.sent} / {progress.total} commands • {duration}s elapsed
          </div>
        </div>
        
        <div className="w-full bg-blue-200 rounded-full h-2">
          <div 
            className="bg-blue-600 h-2 rounded-full transition-all duration-300"
            style={{ width: `${percentage}%` }}
          />
        </div>
        
        <div className="text-xs text-blue-600 text-center">
          {percentage}% complete
        </div>
      </div>
      
      <div className="mt-3 text-xs text-blue-600 bg-blue-100 rounded p-2">
        💡 You can navigate to other tabs while this runs. Progress will be tracked globally.
      </div>
    </div>
  )
}

export default GlobalExecutionStatus
