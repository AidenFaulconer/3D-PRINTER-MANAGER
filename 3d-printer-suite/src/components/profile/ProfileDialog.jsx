import React, { useState } from 'react'
import { X, Save, AlertCircle } from 'lucide-react'
import usePrintersStore from '../../stores/printersStore'

const ProfileDialog = React.memo(function ProfileDialog({ isOpen, onClose, initialData = null }) {
  const [formData, setFormData] = useState(initialData || {
    name: '',
    model: '',
    firmwareType: 'Marlin',
    bedSize: { x: 220, y: 220, z: 250 },
    nozzleDiameter: 0.4,
    filamentDiameter: 1.75,
    maxTemperatures: {
      hotend: 250,
      bed: 100
    },
    steps: {
      x: 80,
      y: 80,
      z: 400,
      e: 93
    },
    acceleration: {
      print: 500,
      retract: 500,
      travel: 500
    },
    speeds: {
      print: 50,
      travel: 120,
      retract: 25
    }
  })

  const [errors, setErrors] = useState({})
  const addProfile = usePrintersStore(state => state.addProfile)
  const updateProfile = usePrintersStore(state => state.updateProfile)

  const validateForm = () => {
    const newErrors = {}
    if (!formData.name?.trim()) newErrors.name = 'Name is required'
    if (!formData.model?.trim()) newErrors.model = 'Model is required'
    
    // Validate numeric ranges
    if (formData.nozzleDiameter <= 0) newErrors.nozzleDiameter = 'Must be greater than 0'
    if (formData.filamentDiameter <= 0) newErrors.filamentDiameter = 'Must be greater than 0'
    
    // Validate bed size
    if (formData.bedSize.x <= 0) newErrors['bedSize.x'] = 'Must be greater than 0'
    if (formData.bedSize.y <= 0) newErrors['bedSize.y'] = 'Must be greater than 0'
    if (formData.bedSize.z <= 0) newErrors['bedSize.z'] = 'Must be greater than 0'
    
    // Validate temperatures
    if (formData.maxTemperatures.hotend < 0) newErrors['maxTemperatures.hotend'] = 'Cannot be negative'
    if (formData.maxTemperatures.bed < 0) newErrors['maxTemperatures.bed'] = 'Cannot be negative'
    
    // Validate steps
    if (formData.steps.x <= 0) newErrors['steps.x'] = 'Must be greater than 0'
    if (formData.steps.y <= 0) newErrors['steps.y'] = 'Must be greater than 0'
    if (formData.steps.z <= 0) newErrors['steps.z'] = 'Must be greater than 0'
    if (formData.steps.e <= 0) newErrors['steps.e'] = 'Must be greater than 0'
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!validateForm()) return

    if (initialData?.id) {
      updateProfile(initialData.id, formData)
    } else {
      addProfile({
        ...formData,
        id: crypto.randomUUID(),
        createdAt: new Date().toISOString(),
        lastUpdated: new Date().toISOString()
      })
    }
    onClose()
  }

  const handleChange = (path, value) => {
    setFormData(prev => {
      const newData = { ...prev }
      const parts = path.split('.')
      let current = newData
      for (let i = 0; i < parts.length - 1; i++) {
        current = current[parts[i]]
      }
      current[parts[parts.length - 1]] = value
      return newData
    })
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-3xl max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="text-xl font-semibold">
            {initialData ? 'Edit Profile' : 'Create New Profile'}
          </h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Basic Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Basic Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Profile Name
                  <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => handleChange('name', e.target.value)}
                  className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 ${
                    errors.name ? 'border-red-300' : ''
                  }`}
                />
                {errors.name && (
                  <p className="mt-1 text-sm text-red-600">{errors.name}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Printer Model
                  <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={formData.model}
                  onChange={(e) => handleChange('model', e.target.value)}
                  className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 ${
                    errors.model ? 'border-red-300' : ''
                  }`}
                />
                {errors.model && (
                  <p className="mt-1 text-sm text-red-600">{errors.model}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Firmware Type
                </label>
                <select
                  value={formData.firmwareType}
                  onChange={(e) => handleChange('firmwareType', e.target.value)}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                >
                  <option value="Marlin">Marlin</option>
                  <option value="Klipper">Klipper</option>
                  <option value="RepRap">RepRap</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Nozzle Diameter (mm)
                </label>
                <input
                  type="number"
                  step="0.1"
                  value={formData.nozzleDiameter}
                  onChange={(e) => handleChange('nozzleDiameter', parseFloat(e.target.value))}
                  className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 ${
                    errors.nozzleDiameter ? 'border-red-300' : ''
                  }`}
                />
                {errors.nozzleDiameter && (
                  <p className="mt-1 text-sm text-red-600">{errors.nozzleDiameter}</p>
                )}
              </div>
            </div>
          </div>

          {/* Printer Dimensions */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Printer Dimensions</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Bed Size X (mm)
                </label>
                <input
                  type="number"
                  value={formData.bedSize.x}
                  onChange={(e) => handleChange('bedSize.x', parseInt(e.target.value))}
                  className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 ${
                    errors['bedSize.x'] ? 'border-red-300' : ''
                  }`}
                />
                {errors['bedSize.x'] && (
                  <p className="mt-1 text-sm text-red-600">{errors['bedSize.x']}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Bed Size Y (mm)
                </label>
                <input
                  type="number"
                  value={formData.bedSize.y}
                  onChange={(e) => handleChange('bedSize.y', parseInt(e.target.value))}
                  className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 ${
                    errors['bedSize.y'] ? 'border-red-300' : ''
                  }`}
                />
                {errors['bedSize.y'] && (
                  <p className="mt-1 text-sm text-red-600">{errors['bedSize.y']}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Build Height Z (mm)
                </label>
                <input
                  type="number"
                  value={formData.bedSize.z}
                  onChange={(e) => handleChange('bedSize.z', parseInt(e.target.value))}
                  className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 ${
                    errors['bedSize.z'] ? 'border-red-300' : ''
                  }`}
                />
                {errors['bedSize.z'] && (
                  <p className="mt-1 text-sm text-red-600">{errors['bedSize.z']}</p>
                )}
              </div>
            </div>
          </div>

          {/* Motion Settings */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Motion Settings</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Steps/mm - X
                </label>
                <input
                  type="number"
                  step="0.1"
                  value={formData.steps.x}
                  onChange={(e) => handleChange('steps.x', parseFloat(e.target.value))}
                  className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 ${
                    errors['steps.x'] ? 'border-red-300' : ''
                  }`}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Steps/mm - Y
                </label>
                <input
                  type="number"
                  step="0.1"
                  value={formData.steps.y}
                  onChange={(e) => handleChange('steps.y', parseFloat(e.target.value))}
                  className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 ${
                    errors['steps.y'] ? 'border-red-300' : ''
                  }`}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Steps/mm - Z
                </label>
                <input
                  type="number"
                  step="0.1"
                  value={formData.steps.z}
                  onChange={(e) => handleChange('steps.z', parseFloat(e.target.value))}
                  className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 ${
                    errors['steps.z'] ? 'border-red-300' : ''
                  }`}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Steps/mm - E
                </label>
                <input
                  type="number"
                  step="0.1"
                  value={formData.steps.e}
                  onChange={(e) => handleChange('steps.e', parseFloat(e.target.value))}
                  className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 ${
                    errors['steps.e'] ? 'border-red-300' : ''
                  }`}
                />
              </div>
            </div>
          </div>

          {/* Temperature Limits */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Temperature Limits</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Max Hotend Temperature (°C)
                </label>
                <input
                  type="number"
                  value={formData.maxTemperatures.hotend}
                  onChange={(e) => handleChange('maxTemperatures.hotend', parseInt(e.target.value))}
                  className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 ${
                    errors['maxTemperatures.hotend'] ? 'border-red-300' : ''
                  }`}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Max Bed Temperature (°C)
                </label>
                <input
                  type="number"
                  value={formData.maxTemperatures.bed}
                  onChange={(e) => handleChange('maxTemperatures.bed', parseInt(e.target.value))}
                  className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 ${
                    errors['maxTemperatures.bed'] ? 'border-red-300' : ''
                  }`}
                />
              </div>
            </div>
          </div>

          {/* Speed Settings */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Speed Settings</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Print Speed (mm/s)
                </label>
                <input
                  type="number"
                  value={formData.speeds.print}
                  onChange={(e) => handleChange('speeds.print', parseInt(e.target.value))}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Travel Speed (mm/s)
                </label>
                <input
                  type="number"
                  value={formData.speeds.travel}
                  onChange={(e) => handleChange('speeds.travel', parseInt(e.target.value))}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Retraction Speed (mm/s)
                </label>
                <input
                  type="number"
                  value={formData.speeds.retract}
                  onChange={(e) => handleChange('speeds.retract', parseInt(e.target.value))}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
            </div>
          </div>

          {/* Acceleration Settings */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Acceleration Settings</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Print Acceleration (mm/s²)
                </label>
                <input
                  type="number"
                  value={formData.acceleration.print}
                  onChange={(e) => handleChange('acceleration.print', parseInt(e.target.value))}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Travel Acceleration (mm/s²)
                </label>
                <input
                  type="number"
                  value={formData.acceleration.travel}
                  onChange={(e) => handleChange('acceleration.travel', parseInt(e.target.value))}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Retract Acceleration (mm/s²)
                </label>
                <input
                  type="number"
                  value={formData.acceleration.retract}
                  onChange={(e) => handleChange('acceleration.retract', parseInt(e.target.value))}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
            </div>
          </div>

          <div className="flex justify-end space-x-3 pt-6 border-t">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              {initialData ? 'Update Profile' : 'Create Profile'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
})

export default ProfileDialog
