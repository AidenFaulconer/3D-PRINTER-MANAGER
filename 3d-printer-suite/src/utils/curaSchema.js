// Minimal, extensible schema for Cura settings
// Each category contains a map of setting keys with type, label, description, enum options, recommended hints

export const CURA_SETTINGS_SCHEMA = {
  Quality: {
    layer_height: { type: 'number', label: 'Layer Height (mm)', step: 0.02, min: 0.04, max: 1.0, description: 'Height of each printed layer.', recommend: { default: 0.2 } },
    line_width: { type: 'number', label: 'Line Width (mm)', step: 0.01, min: 0.1, max: 1.2, description: 'Width of extruded lines.', recommend: { default: 0.4 } },
    wall_line_count: { type: 'number', label: 'Wall Line Count', step: 1, min: 0, max: 10, description: 'Number of perimeters.', recommend: { strong_parts: 4, default: 2 } }
  },
  Speed: {
    print_speed: { type: 'number', label: 'Print Speed (mm/s)', step: 1, min: 5, max: 300, description: 'Default print speed.', recommend: { default: 60, high_speed: 150 } },
    travel_speed: { type: 'number', label: 'Travel Speed (mm/s)', step: 1, min: 10, max: 500, description: 'Speed for non-printing moves.', recommend: { default: 150 } },
    infill_speed: { type: 'number', label: 'Infill Speed (mm/s)', step: 1, min: 5, max: 300, description: 'Speed for infill.', recommend: { default: 80 } }
  },
  Material: {
    material_print_temperature: { type: 'number', label: 'Printing Temperature (°C)', step: 1, min: 150, max: 300, description: 'Nozzle temperature.', recommend: { PLA: 200, PETG: 240 } },
    material_bed_temperature: { type: 'number', label: 'Bed Temperature (°C)', step: 1, min: 0, max: 120, description: 'Bed temperature.', recommend: { PLA: 60, PETG: 80 } },
    retraction_enable: { type: 'boolean', label: 'Enable Retraction', description: 'Retract filament to reduce stringing.' },
    retraction_distance: { type: 'number', label: 'Retraction Distance (mm)', step: 0.1, min: 0, max: 20, description: 'Amount of filament to retract.', recommend: { direct: 1.5, bowden: 6 } },
    retraction_speed: { type: 'number', label: 'Retraction Speed (mm/s)', step: 1, min: 1, max: 100, description: 'Retraction speed.' }
  },
  Cooling: {
    cool_fan_enabled: { type: 'boolean', label: 'Enable Cooling Fan', description: 'Use part cooling fan.' },
    cool_fan_speed: { type: 'number', label: 'Fan Speed (%)', step: 5, min: 0, max: 100, description: 'Default fan speed.' }
  },
  Support: {
    support_enable: { type: 'boolean', label: 'Enable Support', description: 'Generate support structures.' },
    support_overhang_angle: { type: 'number', label: 'Support Overhang Angle (°)', step: 1, min: 0, max: 90, description: 'Max overhang angle without support.' },
    support_pattern: { type: 'enum', label: 'Support Pattern', options: ['lines', 'grid', 'zigzag', 'gyroid'], description: 'Support infill pattern.' }
  },
  Adhesion: {
    adhesion_type: { type: 'enum', label: 'Build Plate Adhesion', options: ['none', 'brim', 'raft', 'skirt'], description: 'Adhesion helper.' },
    brim_width: { type: 'number', label: 'Brim Width (mm)', step: 1, min: 0, max: 50, description: 'Brim width around model.' }
  }
}

export function settingMeta(key) {
  for (const [category, settings] of Object.entries(CURA_SETTINGS_SCHEMA)) {
    if (settings[key]) return { category, key, ...settings[key] }
  }
  return null
}
