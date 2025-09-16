import React, { useState, useMemo } from 'react'
import { ChevronDown, ChevronRight, Settings, Info, Filter } from 'lucide-react'
import { MARLIN_DEFINE_CATEGORIES, categorizeDefine, getCategoryInfo } from '../data/marlinDefineCategories'

const MarlinDefineCategorizer = ({ defines = [] }) => {
  const [expandedCategories, setExpandedCategories] = useState(new Set())
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('ALL')

  // Categorize defines
  const categorizedDefines = useMemo(() => {
    const categorized = {}
    
    defines.forEach(define => {
      const category = categorizeDefine(define.name)
      if (!categorized[category]) {
        categorized[category] = []
      }
      categorized[category].push(define)
    })

    // Sort defines within each category
    Object.keys(categorized).forEach(category => {
      categorized[category].sort((a, b) => a.name.localeCompare(b.name))
    })

    return categorized
  }, [defines])

  // Filter defines based on search and category
  const filteredDefines = useMemo(() => {
    let filtered = defines

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(define => 
        define.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (define.description && define.description.toLowerCase().includes(searchTerm.toLowerCase()))
      )
    }

    // Filter by category
    if (selectedCategory !== 'ALL') {
      filtered = filtered.filter(define => categorizeDefine(define.name) === selectedCategory)
    }

    return filtered
  }, [defines, searchTerm, selectedCategory])

  const toggleCategory = (categoryKey) => {
    const newExpanded = new Set(expandedCategories)
    if (newExpanded.has(categoryKey)) {
      newExpanded.delete(categoryKey)
    } else {
      newExpanded.add(categoryKey)
    }
    setExpandedCategories(newExpanded)
  }

  const getCategoryColor = (categoryKey) => {
    const category = getCategoryInfo(categoryKey)
    return category?.color || 'gray'
  }

  const getCategoryIcon = (categoryKey) => {
    const category = getCategoryInfo(categoryKey)
    const iconMap = {
      HARDWARE: Settings,
      TEMPERATURE: '🌡️',
      MOVEMENT: '⚡',
      BED_LEVELING: '📐',
      EXTRUSION: '🔧',
      FANS: '💨',
      DISPLAY: '📺',
      ADVANCED: '⚙️',
      SAFETY: '🛡️',
      COMMUNICATION: '📡',
      CALIBRATION: '🎯',
      POWER: '⚡',
      EXPERIMENTAL: '🧪'
    }
    return iconMap[categoryKey] || Settings
  }

  const DefineCard = ({ define }) => (
    <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-4 hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <h4 className="font-mono text-sm font-semibold text-gray-900 dark:text-gray-100 mb-1">
            {define.name}
          </h4>
          {define.description && (
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
              {define.description}
            </p>
          )}
          <div className="flex items-center space-x-4 text-xs text-gray-500 dark:text-gray-500">
            {define.value !== undefined && (
              <span className="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 px-2 py-1 rounded">
                Value: {define.value}
              </span>
            )}
            {define.unit && (
              <span className="bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 px-2 py-1 rounded">
                {define.unit}
              </span>
            )}
            {define.type && (
              <span className="bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200 px-2 py-1 rounded">
                {define.type}
              </span>
            )}
          </div>
        </div>
        <div className="ml-4">
          <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-${getCategoryColor(categorizeDefine(define.name))}-100 text-${getCategoryColor(categorizeDefine(define.name))}-800 dark:bg-${getCategoryColor(categorizeDefine(define.name))}-900 dark:text-${getCategoryColor(categorizeDefine(define.name))}-200`}>
            {categorizeDefine(define.name)}
          </span>
        </div>
      </div>
    </div>
  )

  const CategorySection = ({ categoryKey, defines: categoryDefines }) => {
    const category = getCategoryInfo(categoryKey)
    const isExpanded = expandedCategories.has(categoryKey)
    const Icon = getCategoryIcon(categoryKey)

    return (
      <div className="mb-6">
        <button
          onClick={() => toggleCategory(categoryKey)}
          className="w-full flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
        >
          <div className="flex items-center space-x-3">
            {typeof Icon === 'string' ? (
              <span className="text-lg">{Icon}</span>
            ) : (
              <Icon className="w-5 h-5 text-gray-600 dark:text-gray-400" />
            )}
            <div className="text-left">
              <h3 className="font-semibold text-gray-900 dark:text-gray-100">
                {category?.name || categoryKey}
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {category?.description || 'Configuration defines'}
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <span className="bg-gray-200 dark:bg-gray-600 text-gray-700 dark:text-gray-300 px-2 py-1 rounded-full text-xs font-medium">
              {categoryDefines.length}
            </span>
            {isExpanded ? (
              <ChevronDown className="w-5 h-5 text-gray-600 dark:text-gray-400" />
            ) : (
              <ChevronRight className="w-5 h-5 text-gray-600 dark:text-gray-400" />
            )}
          </div>
        </button>
        
        {isExpanded && (
          <div className="mt-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {categoryDefines.map((define, index) => (
              <DefineCard key={`${define.name}-${index}`} define={define} />
            ))}
          </div>
        )}
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Search and Filter Controls */}
      <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-4">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Search Defines
            </label>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search by name or description..."
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
            />
          </div>
          <div className="sm:w-64">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Filter by Category
            </label>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
            >
              <option value="ALL">All Categories</option>
              {Object.keys(MARLIN_DEFINE_CATEGORIES).map(categoryKey => (
                <option key={categoryKey} value={categoryKey}>
                  {MARLIN_DEFINE_CATEGORIES[categoryKey].name}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Results */}
      {selectedCategory === 'ALL' ? (
        // Show all categories
        Object.entries(categorizedDefines)
          .filter(([categoryKey]) => categoryKey !== 'UNCATEGORIZED')
          .sort(([a], [b]) => {
            const aInfo = getCategoryInfo(a)
            const bInfo = getCategoryInfo(b)
            return (aInfo?.name || a).localeCompare(bInfo?.name || b)
          })
          .map(([categoryKey, categoryDefines]) => (
            <CategorySection
              key={categoryKey}
              categoryKey={categoryKey}
              defines={categoryDefines}
            />
          ))
      ) : (
        // Show filtered results
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredDefines.map((define, index) => (
            <DefineCard key={`${define.name}-${index}`} define={define} />
          ))}
        </div>
      )}

      {/* Uncategorized defines */}
      {categorizedDefines.UNCATEGORIZED && categorizedDefines.UNCATEGORIZED.length > 0 && (
        <CategorySection
          categoryKey="UNCATEGORIZED"
          defines={categorizedDefines.UNCATEGORIZED}
        />
      )}

      {/* Summary */}
      <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
        <div className="flex items-center space-x-2 mb-2">
          <Info className="w-5 h-5 text-blue-600 dark:text-blue-400" />
          <h3 className="font-semibold text-blue-900 dark:text-blue-100">Summary</h3>
        </div>
        <p className="text-sm text-blue-800 dark:text-blue-200">
          Found {defines.length} total defines across {Object.keys(categorizedDefines).length} categories.
          {searchTerm && ` ${filteredDefines.length} matches your search.`}
        </p>
      </div>
    </div>
  )
}

export default MarlinDefineCategorizer
