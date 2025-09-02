import React, { useState } from 'react'
import { X, Clock, RotateCcw, GitBranch, Eye, Download, User, Bot, Zap } from 'lucide-react'
import usePrintersStore from '../stores/printersStore'

const ProfileHistory = ({ isOpen, onClose, profile }) => {
  const { revertProfileToVersion } = usePrintersStore()
  const [selectedVersion, setSelectedVersion] = useState(null)
  const [showComparison, setShowComparison] = useState(false)

  if (!isOpen || !profile) return null

  const history = profile.history || []
  const sortedHistory = [...history].sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))

  const handleRevert = (historyId) => {
    if (confirm('Are you sure you want to revert to this version? This will create a new history entry.')) {
      revertProfileToVersion(profile.printerId || '', profile.id, historyId)
      onClose()
    }
  }

  const getSourceIcon = (source) => {
    switch (source) {
      case 'template':
        return <Bot className="h-4 w-4 text-blue-600" />
      case 'preset':
        return <Zap className="h-4 w-4 text-yellow-600" />
      case 'wizard':
        return <GitBranch className="h-4 w-4 text-purple-600" />
      case 'import':
        return <Download className="h-4 w-4 text-green-600" />
      case 'revert':
        return <RotateCcw className="h-4 w-4 text-orange-600" />
      default:
        return <User className="h-4 w-4 text-gray-600" />
    }
  }

  const getSourceLabel = (source) => {
    switch (source) {
      case 'template': return 'Template Applied'
      case 'preset': return 'Preset Applied'
      case 'wizard': return 'Wizard Optimization'
      case 'import': return 'Import'
      case 'revert': return 'Reverted'
      default: return 'Manual Edit'
    }
  }

  const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp)
    const now = new Date()
    const diffMs = now - date
    const diffMins = Math.floor(diffMs / 60000)
    const diffHours = Math.floor(diffMs / 3600000)
    const diffDays = Math.floor(diffMs / 86400000)

    if (diffMins < 1) return 'Just now'
    if (diffMins < 60) return `${diffMins} minutes ago`
    if (diffHours < 24) return `${diffHours} hours ago`
    if (diffDays < 7) return `${diffDays} days ago`
    
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  const compareVersions = (versionA, versionB) => {
    const changedSettings = []
    const allKeys = new Set([
      ...Object.keys(versionA.snapshot || {}),
      ...Object.keys(versionB.snapshot || {})
    ])

    allKeys.forEach(key => {
      const valueA = versionA.snapshot?.[key]
      const valueB = versionB.snapshot?.[key]
      if (JSON.stringify(valueA) !== JSON.stringify(valueB)) {
        changedSettings.push({
          key,
          oldValue: valueA,
          newValue: valueB,
          label: key.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())
        })
      }
    })

    return changedSettings
  }

  const renderComparison = () => {
    if (!selectedVersion || sortedHistory.length < 2) return null

    const currentIndex = sortedHistory.findIndex(h => h.id === selectedVersion.id)
    const previousVersion = sortedHistory[currentIndex + 1]
    
    if (!previousVersion) return null

    const changes = compareVersions(previousVersion, selectedVersion)

    return (
      <div className="mt-6 border-t pt-6">
        <h4 className="font-medium text-gray-900 mb-4">
          Changes from {formatTimestamp(previousVersion.timestamp)}
        </h4>
        
        {changes.length === 0 ? (
          <p className="text-sm text-gray-500">No setting changes detected</p>
        ) : (
          <div className="bg-gray-50 border border-gray-200 rounded overflow-hidden">
            <div className="divide-y">
              {changes.map(change => (
                <div key={change.key} className="px-4 py-3 flex items-center justify-between">
                  <span className="font-medium text-gray-900">{change.label}</span>
                  <div className="flex items-center space-x-2 text-sm">
                    <span className="text-red-600">{String(change.oldValue)}</span>
                    <span className="text-gray-400">→</span>
                    <span className="text-green-600">{String(change.newValue)}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    )
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
      <div className="bg-white rounded-lg w-full max-w-3xl max-h-[90vh] overflow-hidden">
        <div className="flex items-center justify-between px-6 py-4 border-b">
          <div>
            <h2 className="text-xl font-semibold text-gray-900">Profile History</h2>
            <p className="text-sm text-gray-600">{profile.name} - Version Timeline</p>
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <X className="h-6 w-6" />
          </button>
        </div>

        <div className="p-6 overflow-y-auto max-h-[70vh]">
          {history.length === 0 ? (
            <div className="text-center py-12">
              <Clock className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-500 mb-2">No history available</p>
              <p className="text-sm text-gray-400">Changes will be tracked here as you modify the profile</p>
            </div>
          ) : (
            <div className="space-y-4">
              {/* Current Version */}
              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    <div>
                      <div className="font-medium text-green-900">Current Version</div>
                      <div className="text-sm text-green-700">
                        Last updated: {formatTimestamp(profile.updatedAt)}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="px-2 py-1 bg-green-100 text-green-800 text-xs font-medium rounded">
                      Active
                    </span>
                  </div>
                </div>
              </div>

              {/* History Timeline */}
              <div className="relative">
                <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-gray-200"></div>
                
                <div className="space-y-6">
                  {sortedHistory.map((entry, index) => (
                    <div key={entry.id} className="relative">
                      <div className="absolute left-4 w-4 h-4 bg-white border-2 border-gray-300 rounded-full"></div>
                      
                      <div className="ml-12 bg-white border border-gray-200 rounded-lg p-4 hover:shadow-sm transition-shadow">
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center space-x-2">
                            {getSourceIcon(entry.source)}
                            <span className="font-medium text-gray-900">
                              {getSourceLabel(entry.source)}
                            </span>
                            {entry.revertedFrom && (
                              <span className="text-xs text-gray-500">
                                (from version {formatTimestamp(
                                  history.find(h => h.id === entry.revertedFrom)?.timestamp
                                )})
                              </span>
                            )}
                          </div>
                          <div className="flex items-center space-x-2">
                            <button
                              onClick={() => {
                                setSelectedVersion(selectedVersion?.id === entry.id ? null : entry)
                                setShowComparison(!showComparison || selectedVersion?.id !== entry.id)
                              }}
                              className="text-gray-400 hover:text-gray-600 p-1"
                              title="View details"
                            >
                              <Eye className="h-4 w-4" />
                            </button>
                            <button
                              onClick={() => handleRevert(entry.id)}
                              className="text-blue-600 hover:text-blue-700 p-1"
                              title="Revert to this version"
                            >
                              <RotateCcw className="h-4 w-4" />
                            </button>
                          </div>
                        </div>
                        
                        <div className="text-sm text-gray-600 mb-2">
                          {formatTimestamp(entry.timestamp)}
                        </div>
                        
                        {entry.changes && entry.changes.length > 0 && (
                          <div className="text-sm text-gray-700">
                            <span className="font-medium">Changes:</span>{' '}
                            {entry.changes.includes('reverted') 
                              ? 'Reverted to previous version'
                              : entry.changes.slice(0, 3).map(change => 
                                  change.replace(/_/g, ' ')
                                ).join(', ')
                            }
                            {entry.changes.length > 3 && (
                              <span className="text-gray-500"> +{entry.changes.length - 3} more</span>
                            )}
                          </div>
                        )}

                        {selectedVersion?.id === entry.id && showComparison && renderComparison()}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="flex items-center justify-between px-6 py-4 border-t bg-gray-50">
          <div className="text-sm text-gray-600">
            {history.length > 0 
              ? `${history.length} version${history.length !== 1 ? 's' : ''} in history`
              : 'No versions in history'
            }
          </div>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700 transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  )
}

export default ProfileHistory
