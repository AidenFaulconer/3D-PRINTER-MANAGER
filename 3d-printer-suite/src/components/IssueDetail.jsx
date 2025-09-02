import { useState, useEffect } from 'react'
import {
  ArrowLeft,
  Edit,
  Save,
  X,
  Plus,
  Check,
  Clock,
  Calendar,
  Tag,
  User,
  AlertTriangle,
  CheckCircle,
  Lightbulb,
  Target,
  Trash2
} from 'lucide-react'
import usePrintersStore from '../stores/printersStore'
import {
  ISSUE_CATEGORIES,
  getCategoryInfo,
  getStatusInfo,
  formatTimestamp,
  analyzeIssue
} from '../utils/issueAnalysis'

const IssueDetail = ({ issue, onBack }) => {
  const [isEditing, setIsEditing] = useState(false)
  const [editedIssue, setEditedIssue] = useState({
    title: issue.title,
    description: issue.description,
    category: issue.category,
    status: issue.status
  })
  const [newActionText, setNewActionText] = useState('')
  const [showAnalysis, setShowAnalysis] = useState(false)
  const [analysisResults, setAnalysisResults] = useState([])

  const { 
    getActivePrinter, 
    updateIssue, 
    deleteIssue,
    addFollowUpAction, 
    updateFollowUpAction 
  } = usePrintersStore()
  
  const activePrinter = getActivePrinter()

  useEffect(() => {
    // Update local state if issue prop changes
    setEditedIssue({
      title: issue.title,
      description: issue.description,
      category: issue.category,
      status: issue.status
    })
  }, [issue])

  if (!activePrinter) {
    return (
      <div className="text-center py-8 text-gray-500">
        <AlertTriangle className="h-12 w-12 mx-auto mb-4 text-gray-400" />
        <p>No active printer selected</p>
      </div>
    )
  }

  const handleSave = () => {
    updateIssue(activePrinter.id, issue.id, editedIssue)
    setIsEditing(false)
  }

  const handleCancel = () => {
    setEditedIssue({
      title: issue.title,
      description: issue.description,
      category: issue.category,
      status: issue.status
    })
    setIsEditing(false)
  }

  const handleAddAction = () => {
    if (!newActionText.trim()) return
    
    addFollowUpAction(activePrinter.id, issue.id, newActionText.trim())
    setNewActionText('')
  }

  const handleActionToggle = (actionId, completed) => {
    updateFollowUpAction(activePrinter.id, issue.id, actionId, completed)
  }

  const handleAnalyzeIssue = () => {
    const suggestions = analyzeIssue(issue.title, issue.description)
    setAnalysisResults(suggestions)
    setShowAnalysis(true)
  }

  const handleAddSuggestionAsAction = (suggestion) => {
    addFollowUpAction(activePrinter.id, issue.id, suggestion)
  }

  const handleDeleteIssue = () => {
    if (window.confirm('Are you sure you want to delete this issue? This action cannot be undone.')) {
      deleteIssue(activePrinter.id, issue.id)
      onBack()
    }
  }

  const getStatusIcon = (status) => {
    switch (status) {
      case 'open':
        return <AlertTriangle className="h-5 w-5" />
      case 'in-progress':
        return <Clock className="h-5 w-5" />
      case 'resolved':
        return <CheckCircle className="h-5 w-5" />
      default:
        return <AlertTriangle className="h-5 w-5" />
    }
  }

  const getStatusBadgeClass = (status) => {
    const statusInfo = getStatusInfo(status)
    const baseClass = "inline-flex items-center px-3 py-1 rounded-full text-sm font-medium"
    
    switch (statusInfo.color) {
      case 'red':
        return `${baseClass} bg-red-100 text-red-800`
      case 'yellow':
        return `${baseClass} bg-yellow-100 text-yellow-800`
      case 'green':
        return `${baseClass} bg-green-100 text-green-800`
      default:
        return `${baseClass} bg-gray-100 text-gray-800`
    }
  }

  const getCategoryBadgeClass = (category) => {
    const categoryInfo = getCategoryInfo(category)
    const baseClass = "inline-flex items-center px-3 py-1 rounded text-sm font-medium"
    
    switch (categoryInfo.color) {
      case 'blue':
        return `${baseClass} bg-blue-100 text-blue-800`
      case 'yellow':
        return `${baseClass} bg-yellow-100 text-yellow-800`
      case 'purple':
        return `${baseClass} bg-purple-100 text-purple-800`
      default:
        return `${baseClass} bg-gray-100 text-gray-800`
    }
  }

  const completedActions = issue.followUpActions?.filter(action => action.completed).length || 0
  const totalActions = issue.followUpActions?.length || 0

  return (
    <div className="max-w-4xl mx-auto">
      {/* Header */}
      <div className="mb-6">
        <button
          onClick={onBack}
          className="flex items-center text-gray-600 hover:text-gray-900 mb-4 transition-colors"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Issue Log
        </button>
        
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div className="flex items-center space-x-3 mb-3">
              <span className={getCategoryBadgeClass(issue.category)}>
                <Tag className="h-4 w-4 mr-1" />
                {getCategoryInfo(issue.category).label}
              </span>
              <span className={getStatusBadgeClass(issue.status)}>
                {getStatusIcon(issue.status)}
                <span className="ml-2">{getStatusInfo(issue.status).label}</span>
              </span>
            </div>
            
            {isEditing ? (
              <input
                type="text"
                value={editedIssue.title}
                onChange={(e) => setEditedIssue(prev => ({ ...prev, title: e.target.value }))}
                className="text-2xl font-bold text-gray-900 border-b-2 border-blue-500 bg-transparent w-full focus:outline-none"
              />
            ) : (
              <h1 className="text-2xl font-bold text-gray-900">{issue.title}</h1>
            )}
          </div>
          
          <div className="flex items-center space-x-2">
            {!isEditing && (
              <>
                <button
                  onClick={handleAnalyzeIssue}
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
                >
                  <Lightbulb className="h-4 w-4" />
                  <span>Analyze Issue</span>
                </button>
                <button
                  onClick={() => setIsEditing(true)}
                  className="bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors flex items-center space-x-2"
                >
                  <Edit className="h-4 w-4" />
                  <span>Edit</span>
                </button>
                <button
                  onClick={handleDeleteIssue}
                  className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors flex items-center space-x-2"
                >
                  <Trash2 className="h-4 w-4" />
                  <span>Delete</span>
                </button>
              </>
            )}
            
            {isEditing && (
              <>
                <button
                  onClick={handleSave}
                  className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors flex items-center space-x-2"
                >
                  <Save className="h-4 w-4" />
                  <span>Save</span>
                </button>
                <button
                  onClick={handleCancel}
                  className="bg-gray-400 text-white px-4 py-2 rounded-lg hover:bg-gray-500 transition-colors flex items-center space-x-2"
                >
                  <X className="h-4 w-4" />
                  <span>Cancel</span>
                </button>
              </>
            )}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Issue Details */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Issue Details</h2>
            
            {isEditing ? (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                  <select
                    value={editedIssue.category}
                    onChange={(e) => setEditedIssue(prev => ({ ...prev, category: e.target.value }))}
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    {Object.entries(ISSUE_CATEGORIES).map(([key, category]) => (
                      <option key={key} value={key}>{category.label}</option>
                    ))}
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
                  <select
                    value={editedIssue.status}
                    onChange={(e) => setEditedIssue(prev => ({ ...prev, status: e.target.value }))}
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="open">Open</option>
                    <option value="in-progress">In Progress</option>
                    <option value="resolved">Resolved</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                  <textarea
                    value={editedIssue.description}
                    onChange={(e) => setEditedIssue(prev => ({ ...prev, description: e.target.value }))}
                    rows={6}
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <div>
                  <h3 className="text-sm font-medium text-gray-700 mb-2">Description</h3>
                  {issue.description ? (
                    <p className="text-gray-900 whitespace-pre-wrap">{issue.description}</p>
                  ) : (
                    <p className="text-gray-500 italic">No description provided</p>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Follow-up Actions */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-900">Follow-up Actions</h2>
              {totalActions > 0 && (
                <span className="text-sm text-gray-500">
                  {completedActions}/{totalActions} completed
                </span>
              )}
            </div>
            
            {/* Add new action */}
            <div className="flex space-x-2 mb-4">
              <input
                type="text"
                value={newActionText}
                onChange={(e) => setNewActionText(e.target.value)}
                placeholder="Add a follow-up action..."
                className="flex-1 border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                onKeyPress={(e) => e.key === 'Enter' && handleAddAction()}
              />
              <button
                onClick={handleAddAction}
                disabled={!newActionText.trim()}
                className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
              >
                <Plus className="h-4 w-4" />
              </button>
            </div>

            {/* Actions list */}
            {issue.followUpActions && issue.followUpActions.length > 0 ? (
              <div className="space-y-2">
                {issue.followUpActions.map((action) => (
                  <div
                    key={action.id}
                    className={`flex items-start space-x-3 p-3 rounded-lg border ${
                      action.completed 
                        ? 'bg-green-50 border-green-200' 
                        : 'bg-gray-50 border-gray-200'
                    }`}
                  >
                    <button
                      onClick={() => handleActionToggle(action.id, !action.completed)}
                      className={`mt-0.5 ${
                        action.completed 
                          ? 'text-green-600 hover:text-green-700' 
                          : 'text-gray-400 hover:text-gray-600'
                      }`}
                    >
                      {action.completed ? (
                        <CheckCircle className="h-5 w-5" />
                      ) : (
                        <div className="h-5 w-5 border-2 border-gray-300 rounded-full" />
                      )}
                    </button>
                    <div className="flex-1">
                      <p className={`text-sm ${action.completed ? 'line-through text-gray-500' : 'text-gray-900'}`}>
                        {action.description}
                      </p>
                      <p className="text-xs text-gray-500 mt-1">
                        Added {formatTimestamp(action.timestamp)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-6 text-gray-500">
                <Target className="h-8 w-8 mx-auto mb-2 text-gray-400" />
                <p>No follow-up actions yet</p>
                <p className="text-sm">Add actions to track your progress on this issue</p>
              </div>
            )}
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Issue Metadata */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Issue Information</h3>
            
            <div className="space-y-3">
              <div className="flex items-center text-sm">
                <Calendar className="h-4 w-4 text-gray-400 mr-2" />
                <span className="text-gray-600">Created:</span>
                <span className="ml-2 text-gray-900">{formatTimestamp(issue.timestamp)}</span>
              </div>
              
              {issue.resolvedTimestamp && (
                <div className="flex items-center text-sm">
                  <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                  <span className="text-gray-600">Resolved:</span>
                  <span className="ml-2 text-gray-900">{formatTimestamp(issue.resolvedTimestamp)}</span>
                </div>
              )}
              
              <div className="flex items-center text-sm">
                <User className="h-4 w-4 text-gray-400 mr-2" />
                <span className="text-gray-600">Printer:</span>
                <span className="ml-2 text-gray-900">{activePrinter.name}</span>
              </div>
            </div>
          </div>

          {/* Progress */}
          {totalActions > 0 && (
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Progress</h3>
              
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Actions Completed</span>
                  <span className="text-gray-900">{completedActions}/{totalActions}</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${totalActions > 0 ? (completedActions / totalActions) * 100 : 0}%` }}
                  />
                </div>
                <p className="text-xs text-gray-500">
                  {completedActions === totalActions && totalActions > 0
                    ? 'All actions completed!'
                    : `${totalActions - completedActions} actions remaining`
                  }
                </p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Analysis Results Modal */}
      {showAnalysis && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-96 overflow-y-auto">
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <h2 className="text-xl font-semibold text-gray-900 flex items-center">
                <Lightbulb className="h-5 w-5 mr-2 text-yellow-500" />
                Issue Analysis Results
              </h2>
              <button
                onClick={() => setShowAnalysis(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="h-6 w-6" />
              </button>
            </div>
            
            <div className="p-6">
              <p className="text-gray-600 mb-4">
                Based on your issue description, here are some suggested solutions:
              </p>
              
              <div className="space-y-2">
                {analysisResults.map((suggestion, index) => (
                  <div key={index} className="flex items-start justify-between p-3 bg-blue-50 rounded-lg">
                    <p className="text-sm text-gray-900 flex-1">{suggestion}</p>
                    <button
                      onClick={() => handleAddSuggestionAsAction(suggestion)}
                      className="ml-3 text-blue-600 hover:text-blue-800 text-sm font-medium"
                    >
                      Add as Action
                    </button>
                  </div>
                ))}
              </div>
              
              {analysisResults.length === 0 && (
                <div className="text-center py-6 text-gray-500">
                  <Lightbulb className="h-8 w-8 mx-auto mb-2 text-gray-400" />
                  <p>No specific suggestions found for this issue type</p>
                  <p className="text-sm">Try adding more details to the description for better analysis</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default IssueDetail

