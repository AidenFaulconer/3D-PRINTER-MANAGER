import { useState } from 'react'
import {
  Plus,
  AlertTriangle,
  CheckCircle,
  Clock,
  Calendar,
  Tag,
  X,
  Search,
  Filter,
  TrendingUp,
  BarChart3
} from 'lucide-react'
import usePrintersStore from '../stores/printersStore'
import {
  ISSUE_CATEGORIES,
  getCategoryInfo,
  getStatusInfo,
  formatTimestamp,
  getIssueStats
} from '../utils/issueAnalysis'

const IssueLog = ({ onIssueSelect }) => {
  const [showAddModal, setShowAddModal] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const [filterCategory, setFilterCategory] = useState('')
  const [filterStatus, setFilterStatus] = useState('')
  const [newIssue, setNewIssue] = useState({
    category: '',
    title: '',
    description: ''
  })

  const { getActivePrinter, addIssue } = usePrintersStore()
  const activePrinter = getActivePrinter()

  if (!activePrinter) {
    return (
      <div className="text-center py-8 text-gray-500">
        <AlertTriangle className="h-12 w-12 mx-auto mb-4 text-gray-400" />
        <p>No active printer selected</p>
      </div>
    )
  }

  const issues = activePrinter.issues || []
  const stats = getIssueStats(issues)

  // Filter and search issues
  const filteredIssues = issues.filter(issue => {
    const matchesSearch = !searchTerm || 
      issue.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      issue.description.toLowerCase().includes(searchTerm.toLowerCase())
    
    const matchesCategory = !filterCategory || issue.category === filterCategory
    const matchesStatus = !filterStatus || issue.status === filterStatus
    
    return matchesSearch && matchesCategory && matchesStatus
  })

  // Sort by timestamp (newest first)
  const sortedIssues = filteredIssues.sort((a, b) => 
    new Date(b.timestamp) - new Date(a.timestamp)
  )

  const handleAddIssue = () => {
    if (!newIssue.category || !newIssue.title.trim()) {
      alert('Please fill in all required fields')
      return
    }

    addIssue(activePrinter.id, {
      category: newIssue.category,
      title: newIssue.title.trim(),
      description: newIssue.description.trim()
    })

    // Reset form and close modal
    setNewIssue({ category: '', title: '', description: '' })
    setShowAddModal(false)
  }

  const getStatusIcon = (status) => {
    switch (status) {
      case 'open':
        return <AlertTriangle className="h-4 w-4" />
      case 'in-progress':
        return <Clock className="h-4 w-4" />
      case 'resolved':
        return <CheckCircle className="h-4 w-4" />
      default:
        return <AlertTriangle className="h-4 w-4" />
    }
  }

  const getStatusBadgeClass = (status) => {
    const statusInfo = getStatusInfo(status)
    const baseClass = "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium"
    
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
    const baseClass = "inline-flex items-center px-2 py-1 rounded text-xs font-medium"
    
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

  return (
    <div className="max-w-6xl mx-auto">
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Issue Log</h1>
            <p className="text-gray-600">Track and manage printer issues for {activePrinter.name}</p>
          </div>
          <button
            onClick={() => setShowAddModal(true)}
            className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors flex items-center space-x-2"
          >
            <Plus className="h-4 w-4" />
            <span>Log New Issue</span>
          </button>
        </div>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
          <div className="flex items-center">
            <BarChart3 className="h-8 w-8 text-gray-500" />
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-500">Total Issues</p>
              <p className="text-2xl font-semibold text-gray-900">{stats.total}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
          <div className="flex items-center">
            <AlertTriangle className="h-8 w-8 text-red-500" />
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-500">Open</p>
              <p className="text-2xl font-semibold text-red-600">{stats.open}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
          <div className="flex items-center">
            <Clock className="h-8 w-8 text-yellow-500" />
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-500">In Progress</p>
              <p className="text-2xl font-semibold text-yellow-600">{stats.inProgress}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
          <div className="flex items-center">
            <CheckCircle className="h-8 w-8 text-green-500" />
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-500">Resolved</p>
              <p className="text-2xl font-semibold text-green-600">{stats.resolved}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-6">
        <div className="flex flex-wrap gap-4">
          <div className="flex-1 min-w-64">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search issues..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-500 focus:border-red-500"
              />
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <Filter className="h-4 w-4 text-gray-500" />
            <select
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
              className="border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-red-500 focus:border-red-500"
            >
              <option value="">All Categories</option>
              {Object.entries(ISSUE_CATEGORIES).map(([key, category]) => (
                <option key={key} value={key}>{category.label}</option>
              ))}
            </select>
          </div>

          <div>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-red-500 focus:border-red-500"
            >
              <option value="">All Status</option>
              <option value="open">Open</option>
              <option value="in-progress">In Progress</option>
              <option value="resolved">Resolved</option>
            </select>
          </div>
        </div>
      </div>

      {/* Issues List */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        {sortedIssues.length === 0 ? (
          <div className="text-center py-12">
            {issues.length === 0 ? (
              <>
                <AlertTriangle className="h-12 w-12 mx-auto mb-4 text-gray-400" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No issues logged yet</h3>
                <p className="text-gray-500 mb-4">Start tracking printer issues to improve your printing experience</p>
                <button
                  onClick={() => setShowAddModal(true)}
                  className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors"
                >
                  Log Your First Issue
                </button>
              </>
            ) : (
              <>
                <Search className="h-12 w-12 mx-auto mb-4 text-gray-400" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No issues match your filters</h3>
                <p className="text-gray-500">Try adjusting your search or filter criteria</p>
              </>
            )}
          </div>
        ) : (
          <div className="divide-y divide-gray-200">
            {sortedIssues.map((issue) => (
              <div
                key={issue.id}
                onClick={() => onIssueSelect && onIssueSelect(issue)}
                className="p-6 hover:bg-gray-50 cursor-pointer transition-colors"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <span className={getCategoryBadgeClass(issue.category)}>
                        <Tag className="h-3 w-3 mr-1" />
                        {getCategoryInfo(issue.category).label}
                      </span>
                      <span className={getStatusBadgeClass(issue.status)}>
                        {getStatusIcon(issue.status)}
                        <span className="ml-1">{getStatusInfo(issue.status).label}</span>
                      </span>
                    </div>
                    
                    <h3 className="text-lg font-medium text-gray-900 mb-2">{issue.title}</h3>
                    
                    {issue.description && (
                      <p className="text-gray-600 text-sm mb-3 line-clamp-2">{issue.description}</p>
                    )}
                    
                    <div className="flex items-center space-x-4 text-sm text-gray-500">
                      <div className="flex items-center">
                        <Calendar className="h-4 w-4 mr-1" />
                        {formatTimestamp(issue.timestamp)}
                      </div>
                      {issue.followUpActions && issue.followUpActions.length > 0 && (
                        <div className="flex items-center">
                          <CheckCircle className="h-4 w-4 mr-1" />
                          {issue.followUpActions.filter(action => action.completed).length}/{issue.followUpActions.length} actions completed
                        </div>
                      )}
                    </div>
                  </div>
                  
                  <div className="flex items-center">
                    <TrendingUp className="h-5 w-5 text-gray-400" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Add Issue Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full">
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <h2 className="text-xl font-semibold text-gray-900">Log New Issue</h2>
              <button
                onClick={() => setShowAddModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="h-6 w-6" />
              </button>
            </div>
            
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Category <span className="text-red-500">*</span>
                </label>
                <select
                  value={newIssue.category}
                  onChange={(e) => setNewIssue(prev => ({ ...prev, category: e.target.value }))}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-red-500 focus:border-red-500"
                  required
                >
                  <option value="">Select Category</option>
                  {Object.entries(ISSUE_CATEGORIES).map(([key, category]) => (
                    <option key={key} value={key}>{category.label}</option>
                  ))}
                </select>
                {newIssue.category && (
                  <p className="mt-1 text-xs text-gray-500">
                    {getCategoryInfo(newIssue.category).description}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Title <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={newIssue.title}
                  onChange={(e) => setNewIssue(prev => ({ ...prev, title: e.target.value }))}
                  placeholder="Brief description of the issue"
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-red-500 focus:border-red-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Description
                </label>
                <textarea
                  value={newIssue.description}
                  onChange={(e) => setNewIssue(prev => ({ ...prev, description: e.target.value }))}
                  placeholder="Detailed description of the issue, what you were printing, settings used, etc."
                  rows={4}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-red-500 focus:border-red-500"
                />
              </div>
            </div>

            <div className="flex items-center justify-end space-x-3 p-6 border-t border-gray-200">
              <button
                onClick={() => setShowAddModal(false)}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleAddIssue}
                className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-md hover:bg-red-700 transition-colors"
              >
                Log Issue
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default IssueLog

