import { useState, useEffect, useCallback, useRef } from 'react'

/**
 * Custom hook for managing input state with optional store synchronization
 * @param {Object} options - Configuration options
 * @param {*} options.initialValue - Initial value for the input
 * @param {Function} options.onChange - Callback when value changes (for store updates)
 * @param {Function} options.validate - Validation function (returns true/false or error message)
 * @param {boolean} options.syncWithStore - Whether to sync with store on mount
 * @param {Function} options.getStoreValue - Function to get current store value
 * @param {number} options.debounceMs - Debounce delay for store updates (default: 300ms)
 */
export const useInputState = ({
  initialValue = '',
  onChange,
  validate,
  syncWithStore = false,
  getStoreValue,
  debounceMs = 300
}) => {
  const [value, setValue] = useState(initialValue)
  const [isValid, setIsValid] = useState(true)
  const [error, setError] = useState(null)
  const [isDirty, setIsDirty] = useState(false)
  const debounceRef = useRef(null)
  const isInitializedRef = useRef(false)

  // Initialize from store if configured
  useEffect(() => {
    if (syncWithStore && getStoreValue && !isInitializedRef.current) {
      const storeValue = getStoreValue()
      if (storeValue !== undefined && storeValue !== null) {
        setValue(storeValue)
        isInitializedRef.current = true
      }
    }
  }, [syncWithStore, getStoreValue])

  // Validation function
  const validateValue = useCallback((val) => {
    if (!validate) {
      setIsValid(true)
      setError(null)
      return true
    }

    const result = validate(val)
    if (typeof result === 'boolean') {
      setIsValid(result)
      setError(result ? null : 'Invalid value')
      return result
    } else {
      // result is an error message
      setIsValid(false)
      setError(result)
      return false
    }
  }, [validate])

  // Handle input change with immediate local update
  const handleChange = useCallback((newValue) => {
    setValue(newValue)
    setIsDirty(true)
    
    // Validate immediately for UI feedback
    validateValue(newValue)
    
    // Debounced store update
    if (onChange && debounceMs > 0) {
      if (debounceRef.current) {
        clearTimeout(debounceRef.current)
      }
      
      debounceRef.current = setTimeout(() => {
        if (validateValue(newValue)) {
          onChange(newValue)
        }
      }, debounceMs)
    } else if (onChange && debounceMs === 0) {
      // Immediate update if no debounce
      if (validateValue(newValue)) {
        onChange(newValue)
      }
    }
  }, [onChange, validateValue, debounceMs])

  // Handle immediate store update (for cases where debounce isn't wanted)
  const handleImmediateChange = useCallback((newValue) => {
    setValue(newValue)
    setIsDirty(true)
    
    if (validateValue(newValue) && onChange) {
      onChange(newValue)
    }
  }, [onChange, validateValue])

  // Reset to initial value
  const reset = useCallback(() => {
    setValue(initialValue)
    setIsDirty(false)
    setIsValid(true)
    setError(null)
    if (debounceRef.current) {
      clearTimeout(debounceRef.current)
    }
  }, [initialValue])

  // Reset to store value
  const resetToStore = useCallback(() => {
    if (getStoreValue) {
      const storeValue = getStoreValue()
      setValue(storeValue)
      setIsDirty(false)
      validateValue(storeValue)
    }
  }, [getStoreValue, validateValue])

  // Cleanup debounce on unmount
  useEffect(() => {
    return () => {
      if (debounceRef.current) {
        clearTimeout(debounceRef.current)
      }
    }
  }, [])

  return {
    value,
    setValue: handleChange,
    setValueImmediate: handleImmediateChange,
    isValid,
    error,
    isDirty,
    reset,
    resetToStore
  }
}

export default useInputState
