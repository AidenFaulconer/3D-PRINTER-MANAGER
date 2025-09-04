import React, { useState } from 'react'
import usePrintHistoryStore from '../stores/printHistoryStore'

const PrintHistory = () => {
  const { printHistory, statistics, addPrintNote, updatePrintRating } = usePrintHistoryStore()
  const [selectedRecord, setSelectedRecord] = useState(null)
  const [newNote, setNewNote] = useState('')
  const [filter, setFilter] = useState('all') // all, completed, failed

  const formatDate = (isoString) => {
    return new Date(isoString).toLocaleString()
  }

  const formatDuration = (seconds) => {
    const hours = Math.floor(seconds / 3600)
    const minutes = Math.floor((seconds % 3600) / 60)
    return `${hours}h ${minutes}m`
  }

  const formatFilament = (mm) => {
    return `${(mm / 1000).toFixed(2)}m`
  }

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed': return 'text-green-500'
      case 'failed': return 'text-red-500'
      case 'cancelled': return 'text-yellow-500'
      default: return 'text-gray-500'
    }
  }

  const filteredHistory = printHistory.filter(record => {
    if (filter === 'all') return true
    return record.status === filter
  })

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
      {/* Print History List */}
      <div className="lg:col-span-2 bg-white rounded-lg shadow">
        <div className="p-4 border-b">
          <h2 className="text-lg font-semibold">Print History</h2>
          
          {/* Filters */}
          <div className="mt-2 flex space-x-2">
            <button
              onClick={() => setFilter('all')}
              className={`px-3 py-1 rounded ${
                filter === 'all'
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-100 hover:bg-gray-200'
              }`}
            >
              All
            </button>
            <button
              onClick={() => setFilter('completed')}
              className={`px-3 py-1 rounded ${
                filter === 'completed'
                  ? 'bg-green-500 text-white'
                  : 'bg-gray-100 hover:bg-gray-200'
              }`}
            >
              Completed
            </button>
            <button
              onClick={() => setFilter('failed')}
              className={`px-3 py-1 rounded ${
                filter === 'failed'
                  ? 'bg-red-500 text-white'
                  : 'bg-gray-100 hover:bg-gray-200'
              }`}
            >
              Failed
            </button>
          </div>
        </div>

        <div className="divide-y">
          {filteredHistory.map(record => (
            <div
              key={record.id}
              className={`p-4 hover:bg-gray-50 cursor-pointer ${
                selectedRecord?.id === record.id ? 'bg-blue-50' : ''
              }`}
              onClick={() => setSelectedRecord(record)}
            >
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-medium">{record.fileName}</h3>
                  <p className="text-sm text-gray-500">{formatDate(record.timestamp)}</p>
                </div>
                <span className={`px-2 py-1 rounded text-sm ${getStatusColor(record.status)}`}>
                  {record.status}
                </span>
              </div>
              
              <div className="mt-2 grid grid-cols-3 gap-4 text-sm">
                <div>
                  <p className="text-gray-500">Duration</p>
                  <p className="font-medium">{formatDuration(record.duration)}</p>
                </div>
                <div>
                  <p className="text-gray-500">Filament</p>
                  <p className="font-medium">{formatFilament(record.filamentUsed)}</p>
                </div>
                <div>
                  <p className="text-gray-500">Rating</p>
                  <div className="flex space-x-1">
                    {[1, 2, 3, 4, 5].map(star => (
                      <button
                        key={star}
                        onClick={(e) => {
                          e.stopPropagation()
                          updatePrintRating(record.id, star)
                        }}
                        className={`text-xl ${
                          star <= (record.rating || 0)
                            ? 'text-yellow-400'
                            : 'text-gray-300'
                        }`}
                      >
                        ★
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}

          {filteredHistory.length === 0 && (
            <div className="p-8 text-center text-gray-500">
              No print history found
            </div>
          )}
        </div>
      </div>

      {/* Statistics and Details Panel */}
      <div className="space-y-4">
        {/* Statistics */}
        <div className="bg-white rounded-lg shadow p-4">
          <h2 className="text-lg font-semibold mb-4">Statistics</h2>
          
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-500">Total Prints</p>
                <p className="font-medium">{statistics.totalPrints}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Success Rate</p>
                <p className="font-medium">
                  {statistics.totalPrints > 0
                    ? `${Math.round((statistics.successfulPrints / statistics.totalPrints) * 100)}%`
                    : '0%'}
                </p>
              </div>
            </div>

            <div>
              <p className="text-sm text-gray-500">Average Print Time</p>
              <p className="font-medium">{formatDuration(statistics.averagePrintTime)}</p>
            </div>

            <div>
              <p className="text-sm text-gray-500">Total Filament Used</p>
              <p className="font-medium">{formatFilament(statistics.filamentUsed)}</p>
            </div>
          </div>
        </div>

        {/* Selected Print Details */}
        {selectedRecord && (
          <div className="bg-white rounded-lg shadow p-4">
            <h2 className="text-lg font-semibold mb-4">Print Details</h2>
            
            <div className="space-y-4">
              {/* Notes */}
              <div>
                <h3 className="font-medium mb-2">Notes</h3>
                <div className="space-y-2">
                  {selectedRecord.notes?.map(note => (
                    <div key={note.id} className="bg-gray-50 p-2 rounded text-sm">
                      <p>{note.text}</p>
                      <p className="text-xs text-gray-500 mt-1">
                        {formatDate(note.timestamp)}
                      </p>
                    </div>
                  ))}
                </div>

                {/* Add Note */}
                <div className="mt-4">
                  <textarea
                    value={newNote}
                    onChange={(e) => setNewNote(e.target.value)}
                    placeholder="Add a note..."
                    className="w-full p-2 border rounded"
                    rows={3}
                  />
                  <button
                    onClick={() => {
                      if (newNote.trim()) {
                        addPrintNote(selectedRecord.id, newNote.trim())
                        setNewNote('')
                      }
                    }}
                    className="mt-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                  >
                    Add Note
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default PrintHistory
