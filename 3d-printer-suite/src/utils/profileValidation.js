// Validation and optimization utilities for slicer profiles

export function validateSettings(settings) {
  const errors = {}

  const num = (key, min, max) => {
    const v = settings[key]
    if (v === undefined || v === null || v === '') return
    if (typeof v !== 'number' || Number.isNaN(v)) {
      errors[key] = 'Must be a number'
      return
    }
    if (min !== undefined && v < min) errors[key] = `Must be ≥ ${min}`
    if (!errors[key] && max !== undefined && v > max) errors[key] = `Must be ≤ ${max}`
  }

  const bool = (key) => {
    const v = settings[key]
    if (v === undefined) return
    if (typeof v !== 'boolean') errors[key] = 'Must be true/false'
  }

  const oneOf = (key, values) => {
    const v = settings[key]
    if (v === undefined || v === '') return
    if (!values.includes(v)) errors[key] = `Must be one of: ${values.join(', ')}`
  }

  // Core validations (extend as needed)
  num('layer_height', 0.04, 1.0)
  num('line_width', 0.1, 1.2)
  num('wall_line_count', 0, 20)
  num('print_speed', 5, 300)
  num('travel_speed', 10, 500)
  num('infill_speed', 5, 300)
  num('material_print_temperature', 150, 300)
  num('material_bed_temperature', 0, 120)
  bool('retraction_enable')
  num('retraction_distance', 0, 20)
  num('retraction_speed', 1, 100)
  bool('cool_fan_enabled')
  num('cool_fan_speed', 0, 100)
  bool('support_enable')
  num('support_overhang_angle', 0, 90)
  oneOf('support_pattern', ['lines', 'grid', 'zigzag', 'gyroid'])
  oneOf('adhesion_type', ['none', 'brim', 'raft', 'skirt'])
  num('brim_width', 0, 50)

  return errors
}

export function detectConflicts(settings, capabilities = {}) {
  const issues = []

  const push = (key, message, suggestion) => issues.push({ key, message, suggestion, level: 'warning' })

  // Example conflicts
  if (settings.iron_enable && (settings.infill_sparse_density ?? 20) < 10) {
    push('iron_enable', 'Ironing with very low infill can waste time with minimal benefit.', 'Increase infill density or disable ironing for speed.')
  }

  // Printer capability checks
  const maxSpeed = capabilities.maxPrintSpeed ?? 150
  if (typeof settings.print_speed === 'number' && settings.print_speed > maxSpeed) {
    push('print_speed', `Print speed ${settings.print_speed} exceeds printer max ${maxSpeed}.`, `Reduce print_speed ≤ ${maxSpeed}.`)
  }

  const maxBedTemp = capabilities.maxBedTemp ?? 110
  if (typeof settings.material_bed_temperature === 'number' && settings.material_bed_temperature > maxBedTemp) {
    push('material_bed_temperature', `Bed temp exceeds capability (${maxBedTemp}°C).`, `Use ≤ ${maxBedTemp}°C or upgrade bed insulation.`)
  }

  return issues
}

export function analyzeStrength(settings) {
  const findings = []
  const warn = (key, message, suggest) => findings.push({ key, message, suggestion: suggest, level: 'strength' })

  if ((settings.wall_line_count ?? 2) < 2) {
    warn('wall_line_count', 'Low wall count reduces part strength.', 'Use ≥ 3 walls for stronger parts.')
  }

  const pattern = settings.infill_pattern || 'grid'
  const density = settings.infill_sparse_density ?? 20
  if (density < 15) {
    warn('infill_sparse_density', 'Low infill density weakens parts.', 'Use ≥ 25% for functional parts.')
  }
  if (['lines', 'zigzag'].includes(pattern) && density < 30) {
    warn('infill_pattern', 'Selected infill pattern provides low shear strength at low density.', 'Use gyroid/cubic or increase density.')
  }

  return findings
}

export function analyzeSpeed(settings) {
  const hints = []
  const note = (key, message, suggestion) => hints.push({ key, message, suggestion, level: 'speed' })

  // Rough time contributors
  const speed = settings.print_speed ?? 60
  const layer = settings.layer_height ?? 0.2
  const walls = settings.wall_line_count ?? 2
  const estTimeFactor = (walls * 0.4 + 1.0) * (0.2 / layer) * (60 / speed) // heuristic factor

  if (speed < 30) note('print_speed', 'Very low print speed increases print time.', 'Increase to 50-70 mm/s if quality allows.')
  if (layer < 0.12) note('layer_height', 'Very low layer height increases print time significantly.', 'Use 0.16-0.24 mm for general prints.')
  if (walls > 4) note('wall_line_count', 'High wall count increases time and material.', 'Use 2-3 walls unless strength is critical.')

  return { estimates: { estTimeFactor }, hints }
}

export function validateAndAnalyze(settings, capabilities) {
  const errors = validateSettings(settings)
  const conflicts = detectConflicts(settings, capabilities)
  const strength = analyzeStrength(settings)
  const speed = analyzeSpeed(settings)
  return { errors, conflicts, strength, speed }
}
