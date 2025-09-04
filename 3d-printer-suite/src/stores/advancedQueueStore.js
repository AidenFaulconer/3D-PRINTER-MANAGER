import { create } from 'zustand'
import { persist, devtools } from 'zustand/middleware'

const useAdvancedQueueStore = create(
  devtools(
    persist(
      (set, get) => ({
      // State
      queueItems: [], // Array of queue items with dependencies and scheduling
      templates: [], // Array of print templates
      folders: [], // Array of file organization folders
      notifications: [], // Array of queue notifications

      // Queue Management
      addToQueue: (fileId, options = {}) => {
        const {
          priority = 1,
          scheduledTime = null,
          dependencies = [],
          requiredMaterial = null,
          cooldownTime = 0,
          templateId = null,
          parameterOverrides = {},
          copies = 1,
          folder = null,
          tags = [],
          notes = '',
          requiredTemperature = null,
          conditionalExecution = null
        } = options

        const queueItem = {
          id: crypto.randomUUID(),
          fileId,
          addedAt: new Date().toISOString(),
          status: 'pending',
          priority,
          scheduledTime,
          dependencies,
          requiredMaterial,
          cooldownTime,
          templateId,
          parameterOverrides,
          copies,
          folder,
          tags,
          notes,
          requiredTemperature,
          conditionalExecution,
          estimatedStartTime: null,
          estimatedEndTime: null
        }

        set((state) => ({
          queueItems: [...state.queueItems, queueItem]
        }))

        // Recalculate estimated times for all items
        get().recalculateQueueTimes()

        return queueItem.id
      },

      updateQueueItem: (itemId, updates) => {
        set((state) => ({
          queueItems: state.queueItems.map(item =>
            item.id === itemId
              ? { ...item, ...updates }
              : item
          )
        }))

        // Recalculate if timing-related updates
        if (updates.scheduledTime || updates.cooldownTime || updates.copies) {
          get().recalculateQueueTimes()
        }
      },

      removeFromQueue: (itemId) => {
        set((state) => ({
          queueItems: state.queueItems.filter(item => item.id !== itemId)
        }))
        get().recalculateQueueTimes()
      },

      reorderQueue: (itemId, newPosition) => {
        set((state) => {
          const items = [...state.queueItems]
          const itemIndex = items.findIndex(item => item.id === itemId)
          if (itemIndex === -1) return state

          const [item] = items.splice(itemIndex, 1)
          items.splice(newPosition, 0, item)

          return { queueItems: items }
        })
        get().recalculateQueueTimes()
      },

      // Template Management
      addTemplate: (template) => {
        const newTemplate = {
          id: crypto.randomUUID(),
          createdAt: new Date().toISOString(),
          ...template
        }

        set((state) => ({
          templates: [...state.templates, newTemplate]
        }))

        return newTemplate.id
      },

      updateTemplate: (templateId, updates) => {
        set((state) => ({
          templates: state.templates.map(template =>
            template.id === templateId
              ? { ...template, ...updates }
              : template
          )
        }))
      },

      deleteTemplate: (templateId) => {
        set((state) => ({
          templates: state.templates.filter(template => template.id !== templateId)
        }))
      },

      // Folder Management
      addFolder: (name, parentId = null) => {
        const newFolder = {
          id: crypto.randomUUID(),
          name,
          parentId,
          createdAt: new Date().toISOString()
        }

        set((state) => ({
          folders: [...state.folders, newFolder]
        }))

        return newFolder.id
      },

      updateFolder: (folderId, updates) => {
        set((state) => ({
          folders: state.folders.map(folder =>
            folder.id === folderId
              ? { ...folder, ...updates }
              : folder
          )
        }))
      },

      deleteFolder: (folderId) => {
        set((state) => ({
          folders: state.folders.filter(folder => folder.id !== folderId)
        }))
      },

      // Notification Management
      addNotification: (notification) => {
        const newNotification = {
          id: crypto.randomUUID(),
          timestamp: new Date().toISOString(),
          read: false,
          ...notification
        }

        set((state) => ({
          notifications: [...state.notifications, newNotification]
        }))

        return newNotification.id
      },

      markNotificationRead: (notificationId) => {
        set((state) => ({
          notifications: state.notifications.map(notification =>
            notification.id === notificationId
              ? { ...notification, read: true }
              : notification
          )
        }))
      },

      clearNotifications: () => {
        set({ notifications: [] })
      },

      // Queue Processing
      getNextPrintable: () => {
        const state = get()
        const now = new Date()

        return state.queueItems
          .filter(item => {
            // Check status
            if (item.status !== 'pending') return false

            // Check scheduled time
            if (item.scheduledTime && new Date(item.scheduledTime) > now) {
              return false
            }

            // Check dependencies
            if (item.dependencies.length > 0) {
              const unmetDependencies = item.dependencies.filter(depId => {
                const depItem = state.queueItems.find(i => i.id === depId)
                return !depItem || depItem.status !== 'completed'
              })
              if (unmetDependencies.length > 0) return false
            }

            // Check conditional execution
            if (item.conditionalExecution) {
              const depItem = state.queueItems.find(i => i.id === item.conditionalExecution.dependsOn)
              if (!depItem || depItem.status !== item.conditionalExecution.requiredStatus) {
                return false
              }
            }

            return true
          })
          .sort((a, b) => {
            // Sort by priority first
            if (a.priority !== b.priority) {
              return b.priority - a.priority
            }
            // Then by scheduled time or added time
            const aTime = a.scheduledTime || a.addedAt
            const bTime = b.scheduledTime || b.addedAt
            return new Date(aTime) - new Date(bTime)
          })[0]
      },

      recalculateQueueTimes: () => {
        const state = get()
        let currentTime = new Date()
        let lastMaterial = null
        let lastTemperature = null

        const updatedItems = state.queueItems.map(item => {
          // Add material change time if needed
          if (item.requiredMaterial && item.requiredMaterial !== lastMaterial) {
            currentTime = new Date(currentTime.getTime() + 5 * 60000) // 5 minutes for material change
            lastMaterial = item.requiredMaterial
          }

          // Add temperature change time if needed
          if (item.requiredTemperature && item.requiredTemperature !== lastTemperature) {
            currentTime = new Date(currentTime.getTime() + 3 * 60000) // 3 minutes for temperature change
            lastTemperature = item.requiredTemperature
          }

          // Calculate start and end times
          const estimatedStartTime = new Date(Math.max(
            currentTime.getTime(),
            item.scheduledTime ? new Date(item.scheduledTime).getTime() : 0
          ))

          // Assume 1 hour per copy as default if no specific duration
          const duration = (item.estimatedDuration || 3600) * item.copies
          const estimatedEndTime = new Date(estimatedStartTime.getTime() + duration * 1000)

          // Add cooldown time for next item
          currentTime = new Date(estimatedEndTime.getTime() + (item.cooldownTime || 0) * 1000)

          return {
            ...item,
            estimatedStartTime: estimatedStartTime.toISOString(),
            estimatedEndTime: estimatedEndTime.toISOString()
          }
        })

        set({ queueItems: updatedItems })
      },

      // Bulk Operations
      bulkAddToQueue: (fileIds, commonOptions = {}) => {
        fileIds.forEach(fileId => {
          get().addToQueue(fileId, commonOptions)
        })
      },

      bulkUpdateQueue: (itemIds, updates) => {
        set((state) => ({
          queueItems: state.queueItems.map(item =>
            itemIds.includes(item.id)
              ? { ...item, ...updates }
              : item
          )
        }))
        get().recalculateQueueTimes()
      },

      bulkRemoveFromQueue: (itemIds) => {
        set((state) => ({
          queueItems: state.queueItems.filter(item => !itemIds.includes(item.id))
        }))
        get().recalculateQueueTimes()
      },

      // Reset store
      resetStore: () => {
        set({
          queueItems: [],
          templates: [],
          folders: [],
          notifications: []
        })
      }
      }),
      {
        name: 'advanced-queue-storage'
      }
    ),
    {
      name: 'AdvancedQueueStore',
      enabled: process.env.NODE_ENV === 'development'
    }
  )
)

export default useAdvancedQueueStore
