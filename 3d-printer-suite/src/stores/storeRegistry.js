import usePrintersStore from './printersStore'
import useSerialStore from './serialStore'
import useGcodeFilesStore from './gcodeFilesStore'
import useCalibrationStore from './calibrationStore'
import usePrintHistoryStore from './printHistoryStore'
import useAdvancedQueueStore from './advancedQueueStore'

/**
 * Global Store Registry for 3D Printer Suite
 * 
 * This registry exposes all Zustand stores globally so that browser extensions
 * like Zukeeper can access and inspect the application state.
 * 
 * Stores are exposed on window.__3D_PRINTER_SUITE_STORES__ for easy access.
 */

class StoreRegistry {
  constructor() {
    this.stores = {
      printers: usePrintersStore,
      serial: useSerialStore,
      gcodeFiles: useGcodeFilesStore,
      calibration: useCalibrationStore,
      printHistory: usePrintHistoryStore,
      advancedQueue: useAdvancedQueueStore
    }
    
    this.initializeGlobalExposure()
  }

  /**
   * Initialize global exposure of stores
   */
  initializeGlobalExposure() {
    // Expose stores on window object for browser extensions
    if (typeof window !== 'undefined') {
      window.__3D_PRINTER_SUITE_STORES__ = {
        // Store instances
        stores: this.stores,
        
        // Helper methods for extensions
        getStoreState: (storeName) => {
          const store = this.stores[storeName]
          if (!store) {
            throw new Error(`Store '${storeName}' not found. Available stores: ${Object.keys(this.stores).join(', ')}`)
          }
          return store.getState()
        },
        
        subscribeToStore: (storeName, callback) => {
          const store = this.stores[storeName]
          if (!store) {
            throw new Error(`Store '${storeName}' not found. Available stores: ${Object.keys(this.stores).join(', ')}`)
          }
          return store.subscribe(callback)
        },
        
        // Get all store states at once
        getAllStates: () => {
          const states = {}
          Object.keys(this.stores).forEach(storeName => {
            states[storeName] = this.stores[storeName].getState()
          })
          return states
        },
        
        // Get store metadata
        getStoreInfo: () => {
          return Object.keys(this.stores).map(storeName => ({
            name: storeName,
            hasState: !!this.stores[storeName].getState,
            hasSubscribe: !!this.stores[storeName].subscribe,
            hasSetState: !!this.stores[storeName].setState
          }))
        },
        
        // Store names for easy reference
        storeNames: Object.keys(this.stores)
      }
      
      // Also expose individual stores for direct access
      Object.keys(this.stores).forEach(storeName => {
        window[`__${storeName.toUpperCase()}_STORE__`] = this.stores[storeName]
      })
      
      // Log availability for debugging
      console.log('🔧 3D Printer Suite stores exposed globally:', {
        main: 'window.__3D_PRINTER_SUITE_STORES__',
        individual: Object.keys(this.stores).map(name => `window.__${name.toUpperCase()}_STORE__`),
        availableStores: Object.keys(this.stores)
      })
    }
  }

  /**
   * Get a specific store by name
   */
  getStore(storeName) {
    return this.stores[storeName]
  }

  /**
   * Get all stores
   */
  getAllStores() {
    return this.stores
  }

  /**
   * Get store names
   */
  getStoreNames() {
    return Object.keys(this.stores)
  }

  /**
   * Subscribe to all stores
   */
  subscribeToAllStores(callback) {
    const unsubscribers = Object.keys(this.stores).map(storeName => {
      return this.stores[storeName].subscribe(callback)
    })
    
    return () => {
      unsubscribers.forEach(unsubscribe => unsubscribe())
    }
  }
}

// Create and export the registry instance
const storeRegistry = new StoreRegistry()

export default storeRegistry

// Export individual stores for convenience
export {
  usePrintersStore,
  useSerialStore,
  useGcodeFilesStore,
  useCalibrationStore,
  usePrintHistoryStore,
  useAdvancedQueueStore
}
