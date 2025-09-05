import useAdvancedQueueStore from '../stores/advancedQueueStore'

// Selector hooks for useAdvancedQueueStore to prevent unnecessary re-renders
// Each hook only subscribes to the specific state it needs

// Queue management selectors
export const useQueueItems = () => useAdvancedQueueStore(state => state.queueItems)
export const useQueueCount = () => useAdvancedQueueStore(state => state.queueItems.length)

export const useQueueActions = () => useAdvancedQueueStore(state => ({
  addToQueue: state.addToQueue,
  updateQueueItem: state.updateQueueItem,
  removeFromQueue: state.removeFromQueue,
  reorderQueue: state.reorderQueue,
  getNextPrintable: state.getNextPrintable,
  recalculateQueueTimes: state.recalculateQueueTimes
}))

export const useAdvancedQueueActions = () => useAdvancedQueueStore(state => ({
  addToQueue: state.addToQueue,
  updateQueueItem: state.updateQueueItem,
  removeFromQueue: state.removeFromQueue,
  reorderQueue: state.reorderQueue,
  getNextPrintable: state.getNextPrintable,
  recalculateQueueTimes: state.recalculateQueueTimes
}))

// Queue status selectors
export const usePendingItems = () => useAdvancedQueueStore(state => 
  state.queueItems.filter(item => item.status === 'pending')
)

export const useRunningItems = () => useAdvancedQueueStore(state => 
  state.queueItems.filter(item => item.status === 'running')
)

export const useCompletedItems = () => useAdvancedQueueStore(state => 
  state.queueItems.filter(item => item.status === 'completed')
)

export const useCancelledItems = () => useAdvancedQueueStore(state => 
  state.queueItems.filter(item => item.status === 'cancelled')
)

export const usePausedItems = () => useAdvancedQueueStore(state => 
  state.queueItems.filter(item => item.status === 'paused')
)

// Template management selectors
export const useTemplates = () => useAdvancedQueueStore(state => state.templates)
export const useTemplateCount = () => useAdvancedQueueStore(state => state.templates.length)

export const useTemplateActions = () => useAdvancedQueueStore(state => ({
  addTemplate: state.addTemplate,
  updateTemplate: state.updateTemplate,
  deleteTemplate: state.deleteTemplate
}))

// Folder management selectors
export const useFolders = () => useAdvancedQueueStore(state => state.folders)
export const useFolderCount = () => useAdvancedQueueStore(state => state.folders.length)

export const useFolderActions = () => useAdvancedQueueStore(state => ({
  addFolder: state.addFolder,
  updateFolder: state.updateFolder,
  deleteFolder: state.deleteFolder
}))

// Notification selectors
export const useNotifications = () => useAdvancedQueueStore(state => state.notifications)
export const useUnreadNotifications = () => useAdvancedQueueStore(state => 
  state.notifications.filter(notification => !notification.read)
)
export const useNotificationCount = () => useAdvancedQueueStore(state => state.notifications.length)
export const useUnreadNotificationCount = () => useAdvancedQueueStore(state => 
  state.notifications.filter(notification => !notification.read).length
)

export const useNotificationActions = () => useAdvancedQueueStore(state => ({
  addNotification: state.addNotification,
  markNotificationRead: state.markNotificationRead,
  clearNotifications: state.clearNotifications
}))

// Priority selectors
export const useHighPriorityItems = () => useAdvancedQueueStore(state => 
  state.queueItems.filter(item => item.priority >= 3)
)

export const useMediumPriorityItems = () => useAdvancedQueueStore(state => 
  state.queueItems.filter(item => item.priority === 2)
)

export const useLowPriorityItems = () => useAdvancedQueueStore(state => 
  state.queueItems.filter(item => item.priority <= 1)
)

// Scheduled items selectors
export const useScheduledItems = () => useAdvancedQueueStore(state => 
  state.queueItems.filter(item => item.scheduledTime !== null)
)

export const useOverdueItems = () => useAdvancedQueueStore(state => {
  const now = new Date()
  return state.queueItems.filter(item => 
    item.scheduledTime && new Date(item.scheduledTime) < now && item.status === 'pending'
  )
})

export const useUpcomingItems = (hours = 24) => useAdvancedQueueStore(state => {
  const now = new Date()
  const future = new Date(now.getTime() + hours * 60 * 60 * 1000)
  return state.queueItems.filter(item => 
    item.scheduledTime && 
    new Date(item.scheduledTime) > now && 
    new Date(item.scheduledTime) <= future
  )
})

// Material-based selectors
export const useItemsByMaterial = (material) => useAdvancedQueueStore(state => 
  state.queueItems.filter(item => item.requiredMaterial === material)
)

export const useMaterialChanges = () => useAdvancedQueueStore(state => {
  const items = state.queueItems
  const changes = []
  let lastMaterial = null
  
  items.forEach((item, index) => {
    if (item.requiredMaterial && item.requiredMaterial !== lastMaterial) {
      changes.push({
        index,
        item,
        fromMaterial: lastMaterial,
        toMaterial: item.requiredMaterial
      })
      lastMaterial = item.requiredMaterial
    }
  })
  
  return changes
})

// Dependency selectors
export const useItemsWithDependencies = () => useAdvancedQueueStore(state => 
  state.queueItems.filter(item => item.dependencies.length > 0)
)

export const useItemsByDependency = (dependencyId) => useAdvancedQueueStore(state => 
  state.queueItems.filter(item => item.dependencies.includes(dependencyId))
)

// Tag-based selectors
export const useItemsByTag = (tag) => useAdvancedQueueStore(state => 
  state.queueItems.filter(item => item.tags.includes(tag))
)

export const useAllTags = () => useAdvancedQueueStore(state => {
  const tags = new Set()
  state.queueItems.forEach(item => {
    item.tags.forEach(tag => tags.add(tag))
  })
  return Array.from(tags)
})

// Statistics selectors
export const useQueueStatistics = () => useAdvancedQueueStore(state => {
  const items = state.queueItems
  const notifications = state.notifications
  
  return {
    totalItems: items.length,
    pendingItems: items.filter(item => item.status === 'pending').length,
    runningItems: items.filter(item => item.status === 'running').length,
    completedItems: items.filter(item => item.status === 'completed').length,
    cancelledItems: items.filter(item => item.status === 'cancelled').length,
    pausedItems: items.filter(item => item.status === 'paused').length,
    totalTemplates: state.templates.length,
    totalFolders: state.folders.length,
    totalNotifications: notifications.length,
    unreadNotifications: notifications.filter(n => !n.read).length,
    averagePriority: items.length > 0 
      ? items.reduce((sum, item) => sum + item.priority, 0) / items.length 
      : 0
  }
})

// Bulk operation selectors
export const useBulkActions = () => useAdvancedQueueStore(state => ({
  bulkAddToQueue: state.bulkAddToQueue,
  bulkUpdateQueue: state.bulkUpdateQueue,
  bulkRemoveFromQueue: state.bulkRemoveFromQueue
}))

// Utility selectors
export const useGetNextPrintable = () => useAdvancedQueueStore(state => state.getNextPrintable)
export const useRecalculateQueueTimes = () => useAdvancedQueueStore(state => state.recalculateQueueTimes)
export const useResetStore = () => useAdvancedQueueStore(state => state.resetStore)
