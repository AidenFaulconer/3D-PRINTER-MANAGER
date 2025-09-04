import React, { useState, useMemo } from 'react'
import useGcodeFilesStore from '../stores/gcodeFilesStore'
import useAdvancedQueueStore from '../stores/advancedQueueStore'

const FileManager = () => {
  const { gcodeFiles } = useGcodeFilesStore()
  const { folders, addFolder, updateFolder, deleteFolder } = useAdvancedQueueStore()
  
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedFiles, setSelectedFiles] = useState(new Set())
  const [currentFolder, setCurrentFolder] = useState(null)
  const [showNewFolderModal, setShowNewFolderModal] = useState(false)
  const [newFolderName, setNewFolderName] = useState('')
  const [sortBy, setSortBy] = useState('name') // name, date, size
  const [sortOrder, setSortOrder] = useState('asc') // asc, desc
  const [filterTags, setFilterTags] = useState([])

  // Get all unique tags from files
  const allTags = useMemo(() => {
    const tags = new Set()
    gcodeFiles.forEach(file => {
      file.tags?.forEach(tag => tags.add(tag))
    })
    return Array.from(tags)
  }, [gcodeFiles])

  // Filter and sort files
  const filteredFiles = useMemo(() => {
    return gcodeFiles
      .filter(file => {
        // Filter by folder
        if (currentFolder && file.folder !== currentFolder) return false

        // Filter by search term
        if (searchTerm && !file.name.toLowerCase().includes(searchTerm.toLowerCase())) {
          return false
        }

        // Filter by tags
        if (filterTags.length > 0) {
          return filterTags.every(tag => file.tags?.includes(tag))
        }

        return true
      })
      .sort((a, b) => {
        let comparison = 0
        switch (sortBy) {
          case 'name':
            comparison = a.name.localeCompare(b.name)
            break
          case 'date':
            comparison = new Date(b.uploadDate) - new Date(a.uploadDate)
            break
          case 'size':
            comparison = a.size - b.size
            break
          default:
            comparison = 0
        }
        return sortOrder === 'asc' ? comparison : -comparison
      })
  }, [gcodeFiles, currentFolder, searchTerm, filterTags, sortBy, sortOrder])

  // Get current folder path
  const folderPath = useMemo(() => {
    const path = []
    let current = currentFolder
    while (current) {
      const folder = folders.find(f => f.id === current)
      if (folder) {
        path.unshift(folder)
        current = folder.parentId
      } else {
        break
      }
    }
    return path
  }, [currentFolder, folders])

  const handleCreateFolder = () => {
    if (newFolderName.trim()) {
      addFolder(newFolderName.trim(), currentFolder)
      setNewFolderName('')
      setShowNewFolderModal(false)
    }
  }

  const handleBulkAction = (action) => {
    switch (action) {
      case 'move':
        // Show folder selection modal
        break
      case 'delete':
        // Show confirmation modal
        break
      case 'tag':
        // Show tag selection modal
        break
      case 'queue':
        // Show queue options modal
        break
      default:
        break
    }
  }

  const formatFileSize = (bytes) => {
    if (bytes < 1024) return `${bytes} B`
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`
  }

  return (
    <div className="space-y-4">
      {/* Toolbar */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4">
        <div className="flex items-center justify-between">
          {/* Search and Filters */}
          <div className="flex items-center space-x-4 flex-1">
            <div className="flex-1">
              <input
                type="text"
                placeholder="Search files..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full p-2 border rounded"
              />
            </div>

            {/* Tag Filter */}
            <div className="relative">
              <select
                multiple
                value={filterTags}
                onChange={(e) => {
                  const values = Array.from(e.target.selectedOptions, option => option.value)
                  setFilterTags(values)
                }}
                className="p-2 border rounded"
              >
                {allTags.map(tag => (
                  <option key={tag} value={tag}>{tag}</option>
                ))}
              </select>
            </div>

            {/* Sort Options */}
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="p-2 border rounded"
            >
              <option value="name">Name</option>
              <option value="date">Date</option>
              <option value="size">Size</option>
            </select>

            <button
              onClick={() => setSortOrder(order => order === 'asc' ? 'desc' : 'asc')}
              className="p-2 text-gray-500 hover:text-gray-700"
            >
              {sortOrder === 'asc' ? '↑' : '↓'}
            </button>
          </div>

          {/* Actions */}
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setShowNewFolderModal(true)}
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              New Folder
            </button>
          </div>
        </div>
      </div>

      {/* Folder Path */}
      <div className="flex items-center space-x-2 text-sm">
        <button
          onClick={() => setCurrentFolder(null)}
          className="text-blue-500 hover:text-blue-600"
        >
          Root
        </button>
        {folderPath.map((folder, index) => (
          <React.Fragment key={folder.id}>
            <span>/</span>
            <button
              onClick={() => setCurrentFolder(folder.id)}
              className="text-blue-500 hover:text-blue-600"
            >
              {folder.name}
            </button>
          </React.Fragment>
        ))}
      </div>

      {/* File List */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow">
        {/* Header */}
        <div className="p-4 border-b">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={selectedFiles.size === filteredFiles.length}
                onChange={(e) => {
                  if (e.target.checked) {
                    setSelectedFiles(new Set(filteredFiles.map(f => f.id)))
                  } else {
                    setSelectedFiles(new Set())
                  }
                }}
                className="rounded"
              />
              <span className="font-medium">
                {selectedFiles.size} selected
              </span>
            </div>

            {selectedFiles.size > 0 && (
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => handleBulkAction('move')}
                  className="px-3 py-1 text-sm text-blue-600 hover:bg-blue-50 rounded"
                >
                  Move
                </button>
                <button
                  onClick={() => handleBulkAction('tag')}
                  className="px-3 py-1 text-sm text-blue-600 hover:bg-blue-50 rounded"
                >
                  Tag
                </button>
                <button
                  onClick={() => handleBulkAction('queue')}
                  className="px-3 py-1 text-sm text-blue-600 hover:bg-blue-50 rounded"
                >
                  Add to Queue
                </button>
                <button
                  onClick={() => handleBulkAction('delete')}
                  className="px-3 py-1 text-sm text-red-600 hover:bg-red-50 rounded"
                >
                  Delete
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Files and Folders */}
        <div className="divide-y">
          {/* Folders */}
          {folders
            .filter(folder => folder.parentId === currentFolder)
            .map(folder => (
              <div
                key={folder.id}
                className="p-4 hover:bg-gray-50 flex items-center justify-between"
              >
                <div className="flex items-center space-x-2">
                  <svg className="w-5 h-5 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M2 6a2 2 0 012-2h4l2 2h4a2 2 0 012 2v6a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" />
                  </svg>
                  <button
                    onClick={() => setCurrentFolder(folder.id)}
                    className="font-medium hover:text-blue-500"
                  >
                    {folder.name}
                  </button>
                </div>

                <button
                  onClick={() => deleteFolder(folder.id)}
                  className="text-red-500 hover:text-red-600"
                >
                  Delete
                </button>
              </div>
            ))}

          {/* Files */}
          {filteredFiles.map(file => (
            <div
              key={file.id}
              className="p-4 hover:bg-gray-50"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <input
                    type="checkbox"
                    checked={selectedFiles.has(file.id)}
                    onChange={(e) => {
                      const newSelected = new Set(selectedFiles)
                      if (e.target.checked) {
                        newSelected.add(file.id)
                      } else {
                        newSelected.delete(file.id)
                      }
                      setSelectedFiles(newSelected)
                    }}
                    className="rounded"
                  />

                  <div>
                    <div className="font-medium">{file.name}</div>
                    <div className="text-sm text-gray-500">
                      {formatFileSize(file.size)} • {new Date(file.uploadDate).toLocaleDateString()}
                    </div>
                  </div>
                </div>

                {/* Tags */}
                <div className="flex items-center space-x-2">
                  {file.tags?.map(tag => (
                    <span
                      key={tag}
                      className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}

          {filteredFiles.length === 0 && folders.filter(f => f.parentId === currentFolder).length === 0 && (
            <div className="p-8 text-center text-gray-500">
              No files or folders found
            </div>
          )}
        </div>
      </div>

      {/* New Folder Modal */}
      {showNewFolderModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-md w-full p-6">
            <h3 className="text-lg font-semibold mb-4">Create New Folder</h3>
            
            <input
              type="text"
              value={newFolderName}
              onChange={(e) => setNewFolderName(e.target.value)}
              placeholder="Folder name"
              className="w-full p-2 border rounded mb-4"
            />

            <div className="flex justify-end space-x-2">
              <button
                onClick={() => setShowNewFolderModal(false)}
                className="px-4 py-2 border rounded hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={handleCreateFolder}
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
              >
                Create
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default FileManager
