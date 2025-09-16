import React, { forwardRef } from 'react'
import { useInputState } from '../hooks/useInputState'
import { HelpTooltip } from './Tooltip'

/**
 * Reusable Input component with validation and store integration
 */
const Input = forwardRef(({
  type = 'text',
  value: controlledValue,
  onChange: controlledOnChange,
  onInput: controlledOnInput,
  validate,
  syncWithStore = false,
  getStoreValue,
  onChangeStore,
  debounceMs = 300,
  initialValue = '',
  className = '',
  errorClassName = '',
  label,
  placeholder,
  min,
  max,
  step,
  disabled = false,
  required = false,
  readOnly = false,
  helpText,
  ...props
}, ref) => {
  // Use controlled or uncontrolled mode
  const isControlled = controlledValue !== undefined && controlledOnChange !== undefined
  
  const inputState = useInputState({
    initialValue: isControlled ? controlledValue : initialValue,
    onChange: isControlled ? controlledOnChange : onChangeStore,
    validate,
    syncWithStore: !isControlled && syncWithStore,
    getStoreValue,
    debounceMs
  })

  const {
    value,
    setValue,
    setValueImmediate,
    isValid,
    error,
    isDirty
  } = inputState

  // Handle input events
  const handleChange = (e) => {
    const newValue = type === 'checkbox' ? e.target.checked : e.target.value
    if (isControlled) {
      controlledOnChange?.(newValue)
    } else {
      setValue(newValue)
    }
  }

  const handleInput = (e) => {
    const newValue = type === 'checkbox' ? e.target.checked : e.target.value
    if (isControlled) {
      controlledOnInput?.(newValue)
    } else {
      setValueImmediate(newValue)
    }
  }

  // Determine display value
  const displayValue = isControlled ? controlledValue : value
  const hasError = !isValid && error
  const inputClasses = `
    w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500
    ${hasError 
      ? 'border-red-500 focus:ring-red-500 focus:border-red-500 dark:border-red-400 dark:focus:ring-red-400 dark:focus:border-red-400' 
      : 'border-gray-300 dark:border-gray-600'}
    ${disabled 
      ? 'bg-gray-100 dark:bg-gray-700 cursor-not-allowed' 
      : 'bg-white dark:bg-gray-800'}
    text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500
    ${className}
  `.trim()

  const errorClasses = `
    text-red-600 dark:text-red-400 text-sm mt-1
    ${errorClassName}
  `.trim()

  const labelClasses = `
    block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1
    ${hasError ? 'text-red-700 dark:text-red-400' : ''}
  `.trim()

  return (
    <div className="w-full">
      {label && (
        <label className={`${labelClasses} flex items-center gap-2`}>
          <span>{label}</span>
          {required && <span className="text-red-500">*</span>}
          {helpText && <HelpTooltip content={helpText} />}
        </label>
      )}
      
      {type === 'select' ? (
        <select
          ref={ref}
          value={displayValue || ''}
          onChange={handleChange}
          disabled={disabled}
          required={required}
          className={inputClasses}
        >
          {(props.options || []).map((opt) => (
            <option key={opt.value} value={opt.value}>{opt.label}</option>
          ))}
        </select>
      ) : (
        <input
          ref={ref}
          type={type}
          {...(type === 'checkbox' ? { checked: !!displayValue } : { value: displayValue || '' })}
          onChange={handleChange}
          onInput={handleInput}
          placeholder={placeholder}
          min={min}
          max={max}
          step={step}
          disabled={disabled}
          required={required}
          readOnly={readOnly}
          className={inputClasses}
          {...props}
        />
      )}
      
      {hasError && (
        <div className={errorClasses}>
          {error}
        </div>
      )}
      
      {/* Debug info in development */}
      {process.env.NODE_ENV === 'development' && (
        <div className="text-xs text-gray-500 mt-1">
          Valid: {isValid ? 'Yes' : 'No'} | Dirty: {isDirty ? 'Yes' : 'No'} | Value: {displayValue}
        </div>
      )}
    </div>
  )
})

Input.displayName = 'Input'

export default Input
