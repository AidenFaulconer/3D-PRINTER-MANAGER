import React, { useState, useEffect } from 'react'
import useAdvancedQueueStore from '../stores/advancedQueueStore'
import useGcodeFilesStore from '../stores/gcodeFilesStore'

const PrintScheduler = () => {
  const {
    queueItems,
    updateQueueItem,
    addNotification,
    templates,
    folders
  } = useAdvancedQueueStore()

  const { getFile } = useGcodeFilesStore()
  const [selectedItem, setSelectedItem] = useState(null)
  const [showScheduleModal, setShowScheduleModal] = useState(false)

  // Group queue items by day
  const groupedItems = queueItems.reduce((groups, item) => {
    const date = item.scheduledTime
      ? new Date(item.scheduledTime).toLocaleDateString()
      : 'Unscheduled'
    
    if (!groups[date]) {
      groups[date] = []
    }
    groups[date].push(item)
    return groups
  }, {})

  const handleScheduleChange = (itemId, scheduledTime) => {
    updateQueueItem(itemId, { scheduledTime })
    addNotification({
      type: 'info',
      message: `Print rescheduled for ${new Date(scheduledTime).toLocaleString()}`
    })
  }

  const formatDuration = (seconds) => {
    const hours = Math.floor(seconds / 3600)
    const minutes = Math.floor((seconds % 3600) / 60)
    return `${hours}h ${minutes}m`
  }

  return (
    <div className="space-y-6">
      {/* Schedule Timeline */}
      <div className="bg-white rounded-lg shadow">
        <div className="p-4 border-b">
          <h2 className="text-lg font-semibold">Print Schedule</h2>
        </div>

        <div className="divide-y">
          {Object.entries(groupedItems).map(([date, items]) => (
            <div key={date} className="p-4">
              <h3 className="font-medium text-gray-900 mb-4">{date}</h3>
              
              <div className="space-y-4">
                {items.map(item => {
                  const file = getFile(item.fileId)
                  if (!file) return null

                  return (
                    <div
                      key={item.id}
                      className="flex items-center justify-between bg-gray-50 p-4 rounded-lg"
                    >
                      <div className="flex-1">
                        <div className="flex items-center space-x-2">
                          <span className="font-medium">{file.name}</span>
                          {item.priority > 1 && (
                            <span className="px-2 py-1 bg-red-100 text-red-800 text-xs rounded">
                              Priority {item.priority}
                            </span>
                          )}
                        </div>

                        <div className="mt-1 text-sm text-gray-500 space-x-4">
                          {item.scheduledTime && (
                            <span>
                              Scheduled: {new Date(item.scheduledTime).toLocaleTimeString()}
                            </span>
                          )}
                          {item.estimatedDuration && (
                            <span>
                              Duration: {formatDuration(item.estimatedDuration)}
                            </span>
                          )}
                          {item.copies > 1 && (
                            <span>
                              Copies: {item.copies}
                            </span>
                          )}
                        </div>

                        {/* Dependencies */}
                        {item.dependencies.length > 0 && (
                          <div className="mt-2 text-sm">
                            <span className="text-gray-500">Depends on: </span>
                            {item.dependencies.map(depId => {
                              const depItem = queueItems.find(i => i.id === depId)
                              const depFile = depItem ? getFile(depItem.fileId) : null
                              return (
                                <span
                                  key={depId}
                                  className="inline-flex items-center px-2 py-1 mx-1 bg-blue-100 text-blue-800 text-xs rounded"
                                >
                                  {depFile?.name || 'Unknown'}
                                </span>
                              )
                            })}
                          </div>
                        )}

                        {/* Conditional Execution */}
                        {item.conditionalExecution && (
                          <div className="mt-2 text-sm">
                            <span className="text-gray-500">Executes only if: </span>
                            <span className="text-yellow-600">
                              {queueItems.find(i => i.id === item.conditionalExecution.dependsOn)?.name}
                              {' '}{item.conditionalExecution.requiredStatus}
                            </span>
                          </div>
                        )}
                      </div>

                      {/* Actions */}
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => {
                            setSelectedItem(item)
                            setShowScheduleModal(true)
                          }}
                          className="p-2 text-blue-600 hover:bg-blue-50 rounded"
                        >
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                        </button>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Schedule Modal */}
      {showScheduleModal && selectedItem && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-lg w-full p-6">
            <h3 className="text-lg font-semibold mb-4">Schedule Print</h3>

            <div className="space-y-4">
              {/* Date/Time Picker */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Schedule Time
                </label>
                <input
                  type="datetime-local"
                  value={selectedItem.scheduledTime || ''}
                  onChange={(e) => handleScheduleChange(selectedItem.id, e.target.value)}
                  className="w-full p-2 border rounded"
                />
              </div>

              {/* Dependencies */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Dependencies
                </label>
                <select
                  multiple
                  value={selectedItem.dependencies}
                  onChange={(e) => {
                    const values = Array.from(e.target.selectedOptions, option => option.value)
                    updateQueueItem(selectedItem.id, { dependencies: values })
                  }}
                  className="w-full p-2 border rounded"
                >
                  {queueItems
                    .filter(item => item.id !== selectedItem.id)
                    .map(item => (
                      <option key={item.id} value={item.id}>
                        {getFile(item.fileId)?.name}
                      </option>
                    ))}
                </select>
              </div>

              {/* Conditional Execution */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Conditional Execution
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <select
                    value={selectedItem.conditionalExecution?.dependsOn || ''}
                    onChange={(e) => {
                      updateQueueItem(selectedItem.id, {
                        conditionalExecution: e.target.value
                          ? {
                              dependsOn: e.target.value,
                              requiredStatus: 'completed'
                            }
                          : null
                      })
                    }}
                    className="p-2 border rounded"
                  >
                    <option value="">None</option>
                    {queueItems
                      .filter(item => item.id !== selectedItem.id)
                      .map(item => (
                        <option key={item.id} value={item.id}>
                          {getFile(item.fileId)?.name}
                        </option>
                      ))}
                  </select>
                  {selectedItem.conditionalExecution && (
                    <select
                      value={selectedItem.conditionalExecution.requiredStatus}
                      onChange={(e) => {
                        updateQueueItem(selectedItem.id, {
                          conditionalExecution: {
                            ...selectedItem.conditionalExecution,
                            requiredStatus: e.target.value
                          }
                        })
                      }}
                      className="p-2 border rounded"
                    >
                      <option value="completed">Completed</option>
                      <option value="failed">Failed</option>
                    </select>
                  )}
                </div>
              </div>

              {/* Actions */}
              <div className="flex justify-end space-x-2 mt-6">
                <button
                  onClick={() => setShowScheduleModal(false)}
                  className="px-4 py-2 border rounded hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  onClick={() => setShowScheduleModal(false)}
                  className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default PrintScheduler
