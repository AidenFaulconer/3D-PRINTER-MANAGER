import React from 'react'
import useSerialStore from '../stores/serialStore'
import { Clock, X, AlertTriangle, Megaphone } from 'lucide-react'

const GlobalExecutionStatus = () => {
  const activeExecution = useSerialStore(state => state.activeExecution)
  const abortExecution = useSerialStore(state => state.abortExecution)
  const alerts = useSerialStore(state => state.alerts || [])

  const stepName = activeExecution?.stepName || ''
  const progress = activeExecution?.progress || { sent: 0, total: 0 }
  const startTime = activeExecution?.startTime || Date.now()
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
    <>
      {/* Toasts */}
      <div className="fixed top-4 right-4 z-50 space-y-2 max-w-sm">
        {alerts.slice(-3).map(a => {
          const isBusy = a.kind === 'busy'
          const bg = isBusy ? 'bg-amber-50 border-amber-300 text-amber-900' : 'bg-indigo-50 border-indigo-300 text-indigo-900'
          const Icon = isBusy ? AlertTriangle : Megaphone
          return (
            <div key={a.id} className={`rounded-lg shadow border p-3 text-sm ${bg}`}>
              <div className="flex items-start gap-2">
                <Icon className={`w-4 h-4 mt-0.5 ${isBusy ? 'text-amber-600' : 'text-indigo-600'}`} />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <div className="font-semibold tracking-wide text-xs uppercase opacity-90">{isBusy ? 'Printer Busy' : 'Printer Echo'}</div>
                    <button onClick={() => useSerialStore.setState(s => ({ alerts: (s.alerts || []).filter(x => x.id !== a.id) }))} className={`${isBusy ? 'text-amber-700 hover:text-amber-900' : 'text-indigo-700 hover:text-indigo-900'} text-xs`}>Dismiss</button>
                  </div>
                  <div className="mt-1 font-mono text-xs whitespace-pre-wrap break-words leading-relaxed">{a.message}</div>
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {!activeExecution || activeExecution.status !== 'running' ? null : (
    <div className="fixed top-4 right-4 z-40 bg-blue-50 border border-blue-200 rounded-lg shadow-lg p-4 max-w-sm">
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
      )}
    </>
  )
}

export default GlobalExecutionStatus
