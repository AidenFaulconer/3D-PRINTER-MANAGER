export const MATERIAL_TEMPLATES = [
  {
    id: 'mat-pla',
    name: 'PLA',
    type: 'PLA',
    properties: {
      density: 1.24,
      glass_transition: 60
    },
    recommendedSettings: {
      material_print_temperature: 200,
      material_bed_temperature: 60,
      cool_fan_enabled: true,
      cool_fan_speed: 100,
      retraction_enable: true,
      retraction_distance: 1.5,
      retraction_speed: 35
    }
  },
  {
    id: 'mat-petg',
    name: 'PETG',
    type: 'PETG',
    properties: {
      density: 1.27,
      glass_transition: 80
    },
    recommendedSettings: {
      material_print_temperature: 240,
      material_bed_temperature: 80,
      cool_fan_enabled: true,
      cool_fan_speed: 40,
      retraction_enable: true,
      retraction_distance: 4,
      retraction_speed: 35
    }
  },
  {
    id: 'mat-abs',
    name: 'ABS',
    type: 'ABS',
    properties: {
      density: 1.05,
      glass_transition: 105
    },
    recommendedSettings: {
      material_print_temperature: 250,
      material_bed_temperature: 100,
      cool_fan_enabled: false,
      retraction_enable: true,
      retraction_distance: 2,
      retraction_speed: 35
    }
  }
]

export function parseCuraMaterial(content, filename = '') {
  // Cura materials are JSON files in definitions/materials
  try {
    const obj = JSON.parse(content)
    const name = obj.name || filename.replace(/\.json$/i, '')
    const props = obj.properties || {}
    const settings = obj.settings || {}

    // Map common fields
    const recommendedSettings = {
      material_print_temperature: settings.material_print_temperature?.value ?? settings.print_temperature?.value,
      material_bed_temperature: settings.material_bed_temperature?.value ?? settings.bed_temperature?.value,
      cool_fan_enabled: settings.cool_fan_enabled?.value ?? true,
      cool_fan_speed: settings.cool_fan_speed?.value,
      retraction_enable: settings.retraction_enable?.value,
      retraction_distance: settings.retraction_distance?.value,
      retraction_speed: settings.retraction_speed?.value
    }

    return {
      name,
      type: obj.guid || obj.material || 'Custom',
      properties: {
        density: props.density,
        glass_transition: props.glass_transition_temperature
      },
      recommendedSettings
    }
  } catch (e) {
    return null
  }
}
