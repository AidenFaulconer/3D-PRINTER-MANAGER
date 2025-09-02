import React, { useMemo } from 'react'

const CalibrationReportModal = ({ isOpen, onClose, step, stepData, printer }) => {
  if (!isOpen) return null

  const textReport = useMemo(() => {
    const lines = []
    lines.push(`# Calibration Report: ${step.title}`)
    lines.push(`Printer: ${printer?.name || ''}`)
    lines.push(`Date: ${new Date(stepData?.lastUpdated || Date.now()).toLocaleString()}`)
    lines.push('')
    lines.push('Inputs:')
    Object.entries(stepData?.inputValues || {}).forEach(([k,v]) => lines.push(`- ${k}: ${v}`))
    lines.push('')
    if (stepData?.results) {
      lines.push('Results:')
      Object.entries(stepData.results.measurements || {}).forEach(([k,v]) => lines.push(`- ${k}: ${v}`))
      if (stepData.results.notes) lines.push(`Notes: ${stepData.results.notes}`)
    }
    lines.push('')
    lines.push('Recommendations:')
    lines.push(step.expectedOutcomes || 'See notes above.')
    return lines.join('\n')
  }, [step, stepData, printer])

  const exportTxt = () => {
    const blob = new Blob([textReport], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `${step.id}-calibration-report.txt`
    a.click()
    URL.revokeObjectURL(url)
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
      <div className="bg-white rounded-lg w-full max-w-2xl overflow-hidden">
        <div className="flex items-center justify-between px-4 py-2 border-b">
          <div className="font-semibold">Calibration Report</div>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">Close</button>
        </div>
        <div className="p-4">
          <pre className="text-sm whitespace-pre-wrap bg-gray-50 border border-gray-200 rounded p-3">{textReport}</pre>
        </div>
        <div className="px-4 py-2 border-t flex justify-end">
          <button onClick={exportTxt} className="px-3 py-1.5 bg-blue-600 text-white rounded">Export TXT</button>
        </div>
      </div>
    </div>
  )
}

export default CalibrationReportModal
