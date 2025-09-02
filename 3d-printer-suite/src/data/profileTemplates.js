// Profile templates for quick creation with optimized settings
// Each template includes base settings and metadata

export const PROFILE_TEMPLATES = {
  quality: {
    id: 'high-quality',
    name: 'High Quality',
    description: 'Best visual quality with fine details',
    category: 'Quality',
    icon: '🎯',
    settings: {
      layer_height: 0.15,
      infill_sparse_density: 20,
      speed_print: 50,
      speed_infill: 80,
      speed_wall_0: 25,
      speed_wall_x: 40,
      wall_thickness: 1.2,
      top_thickness: 0.8,
      bottom_thickness: 0.8,
      support_enable: true,
      support_angle: 45,
      retraction_enable: true,
      retraction_amount: 5,
      retraction_speed: 45,
      adhesion_type: 'brim',
      brim_width: 3
    }
  },
  draft: {
    id: 'draft-fast',
    name: 'Draft/Fast',
    description: 'Quick prints with acceptable quality',
    category: 'Speed',
    icon: '⚡',
    settings: {
      layer_height: 0.3,
      infill_sparse_density: 10,
      speed_print: 80,
      speed_infill: 120,
      speed_wall_0: 40,
      speed_wall_x: 60,
      wall_thickness: 0.8,
      top_thickness: 0.6,
      bottom_thickness: 0.6,
      support_enable: false,
      retraction_enable: true,
      retraction_amount: 4,
      retraction_speed: 60,
      adhesion_type: 'skirt'
    }
  },
  strong: {
    id: 'strong-durable',
    name: 'Strong & Durable',
    description: 'Maximum strength for functional parts',
    category: 'Strength',
    icon: '💪',
    settings: {
      layer_height: 0.2,
      infill_sparse_density: 40,
      infill_pattern: 'grid',
      speed_print: 40,
      speed_infill: 60,
      speed_wall_0: 20,
      speed_wall_x: 30,
      wall_thickness: 1.6,
      wall_line_count: 4,
      top_thickness: 1.2,
      bottom_thickness: 1.2,
      top_layers: 6,
      bottom_layers: 6,
      support_enable: true,
      support_angle: 60,
      retraction_enable: true,
      retraction_amount: 5.5,
      retraction_speed: 40,
      adhesion_type: 'brim',
      brim_width: 5
    }
  },
  flexible: {
    id: 'flexible-tpu',
    name: 'Flexible Materials',
    description: 'Optimized for TPU and flexible filaments',
    category: 'Material',
    icon: '🤸',
    settings: {
      layer_height: 0.2,
      infill_sparse_density: 25,
      infill_pattern: 'gyroid',
      speed_print: 20,
      speed_infill: 15,
      speed_wall_0: 10,
      speed_wall_x: 15,
      wall_thickness: 1.0,
      top_thickness: 0.8,
      bottom_thickness: 0.8,
      support_enable: false,
      retraction_enable: false,
      retraction_amount: 0.8,
      retraction_speed: 25,
      adhesion_type: 'raft',
      material_print_temperature: 230,
      material_bed_temperature: 50
    }
  },
  miniatures: {
    id: 'miniatures-detail',
    name: 'Miniatures & Details',
    description: 'Ultra-fine details for small models',
    category: 'Specialty',
    icon: '🎭',
    settings: {
      layer_height: 0.1,
      infill_sparse_density: 15,
      speed_print: 30,
      speed_infill: 40,
      speed_wall_0: 15,
      speed_wall_x: 25,
      wall_thickness: 0.8,
      top_thickness: 0.6,
      bottom_thickness: 0.6,
      support_enable: true,
      support_angle: 30,
      support_density: 15,
      retraction_enable: true,
      retraction_amount: 6,
      retraction_speed: 35,
      adhesion_type: 'raft'
    }
  },
  vase: {
    id: 'vase-mode',
    name: 'Vase Mode',
    description: 'Single wall continuous print',
    category: 'Specialty',
    icon: '🏺',
    settings: {
      layer_height: 0.2,
      wall_thickness: 0.4,
      wall_line_count: 1,
      infill_sparse_density: 0,
      top_thickness: 0,
      support_enable: false,
      retraction_enable: false,
      magic_spiralize: true,
      speed_print: 60,
      speed_wall_0: 30,
      adhesion_type: 'brim',
      brim_width: 2
    }
  }
}

// One-click preset adjustments
export const QUICK_PRESETS = {
  stronger: {
    name: 'Stronger',
    description: 'Increase infill and wall thickness for more durability',
    icon: '🔧',
    changes: {
      infill_sparse_density: '+15',
      wall_thickness: '+0.4',
      top_thickness: '+0.2',
      bottom_thickness: '+0.2'
    }
  },
  faster: {
    name: 'Faster',
    description: 'Increase speeds and reduce quality for quicker prints',
    icon: '🚀',
    changes: {
      speed_print: '+20',
      speed_infill: '+30',
      layer_height: '+0.05',
      infill_sparse_density: '-5'
    }
  },
  smoother: {
    name: 'Smoother',
    description: 'Reduce layer height and speeds for better surface quality',
    icon: '✨',
    changes: {
      layer_height: '-0.05',
      speed_print: '-15',
      speed_wall_0: '-10',
      wall_thickness: '+0.2'
    }
  },
  detailed: {
    name: 'More Detail',
    description: 'Optimize for fine details and overhangs',
    icon: '🔍',
    changes: {
      layer_height: '-0.05',
      support_angle: '-15',
      retraction_amount: '+1',
      speed_wall_0: '-10'
    }
  },
  economical: {
    name: 'Save Material',
    description: 'Reduce material usage while maintaining strength',
    icon: '💰',
    changes: {
      infill_sparse_density: '-10',
      wall_thickness: '-0.2',
      top_thickness: '-0.2',
      infill_pattern: 'gyroid'
    }
  }
}

// Optimization wizard configurations
export const OPTIMIZATION_WIZARDS = {
  strength: {
    id: 'optimize-strength',
    name: 'Optimize for Strength',
    description: 'Step-by-step guide to maximize part strength',
    icon: '💪',
    steps: [
      {
        title: 'Layer Adhesion',
        description: 'Lower layer height improves layer bonding',
        setting: 'layer_height',
        recommendation: 0.2,
        explanation: 'Thinner layers create more interfaces between layers, improving strength'
      },
      {
        title: 'Infill Density',
        description: 'Higher infill provides more internal structure',
        setting: 'infill_sparse_density',
        recommendation: 40,
        explanation: '40% infill provides good strength without excessive material use'
      },
      {
        title: 'Infill Pattern',
        description: 'Grid pattern offers excellent strength in all directions',
        setting: 'infill_pattern',
        recommendation: 'grid',
        explanation: 'Grid pattern distributes stress evenly throughout the part'
      },
      {
        title: 'Wall Thickness',
        description: 'Thicker walls resist bending and impact',
        setting: 'wall_thickness',
        recommendation: 1.6,
        explanation: 'Multiple perimeters create a strong shell around the part'
      },
      {
        title: 'Print Temperature',
        description: 'Optimal temperature ensures proper layer bonding',
        setting: 'material_print_temperature',
        recommendation: '+5°C',
        explanation: 'Slightly higher temperature improves layer adhesion'
      }
    ]
  },
  speed: {
    id: 'optimize-speed',
    name: 'Minimize Print Time',
    description: 'Reduce print time while maintaining acceptable quality',
    icon: '⚡',
    steps: [
      {
        title: 'Layer Height',
        description: 'Thicker layers mean fewer total layers',
        setting: 'layer_height',
        recommendation: 0.3,
        explanation: 'Doubling layer height can halve print time'
      },
      {
        title: 'Infill Reduction',
        description: 'Lower infill prints faster with less material',
        setting: 'infill_sparse_density',
        recommendation: 10,
        explanation: 'Minimal infill for non-structural parts saves significant time'
      },
      {
        title: 'Print Speeds',
        description: 'Increase movement speeds where quality allows',
        setting: 'speed_print',
        recommendation: 80,
        explanation: 'Higher speeds reduce print time, monitor quality'
      },
      {
        title: 'Fewer Walls',
        description: 'Reduce perimeter count for faster printing',
        setting: 'wall_line_count',
        recommendation: 2,
        explanation: 'Fewer perimeters print faster, ensure adequate strength'
      },
      {
        title: 'Skip Supports',
        description: 'Avoid supports when design allows',
        setting: 'support_enable',
        recommendation: false,
        explanation: 'Supports add significant print time and material'
      }
    ]
  },
  quality: {
    id: 'optimize-quality',
    name: 'Maximize Surface Quality',
    description: 'Achieve the best possible surface finish',
    icon: '✨',
    steps: [
      {
        title: 'Fine Layer Height',
        description: 'Thinner layers create smoother surfaces',
        setting: 'layer_height',
        recommendation: 0.15,
        explanation: 'Fine layers reduce visible layer lines'
      },
      {
        title: 'Slower Outer Walls',
        description: 'Slow outer perimeter for better accuracy',
        setting: 'speed_wall_0',
        recommendation: 25,
        explanation: 'Slower outer walls improve dimensional accuracy'
      },
      {
        title: 'Optimal Temperature',
        description: 'Perfect temperature prevents over/under-extrusion',
        setting: 'material_print_temperature',
        recommendation: 'calibrate',
        explanation: 'Temperature towers help find optimal settings'
      },
      {
        title: 'Retraction Tuning',
        description: 'Proper retraction eliminates stringing',
        setting: 'retraction_amount',
        recommendation: 5,
        explanation: 'Balanced retraction prevents oozing without jamming'
      },
      {
        title: 'Support Settings',
        description: 'Fine-tune supports for clean removal',
        setting: 'support_angle',
        recommendation: 45,
        explanation: 'Appropriate support angle minimizes surface marks'
      }
    ]
  }
}

export function applyTemplate(templateId, existingSettings = {}) {
  const template = PROFILE_TEMPLATES[templateId]
  if (!template) return existingSettings
  
  return {
    ...existingSettings,
    ...template.settings
  }
}

export function applyPreset(presetId, currentSettings) {
  const preset = QUICK_PRESETS[presetId]
  if (!preset) return currentSettings
  
  const newSettings = { ...currentSettings }
  
  Object.entries(preset.changes).forEach(([key, change]) => {
    const currentValue = currentSettings[key] || 0
    
    if (typeof change === 'string') {
      if (change.startsWith('+')) {
        const increment = parseFloat(change.substring(1))
        newSettings[key] = currentValue + increment
      } else if (change.startsWith('-')) {
        const decrement = parseFloat(change.substring(1))
        newSettings[key] = Math.max(0, currentValue - decrement)
      } else {
        newSettings[key] = change
      }
    } else {
      newSettings[key] = change
    }
  })
  
  return newSettings
}

export function getTemplatesByCategory() {
  const categories = {}
  
  Object.values(PROFILE_TEMPLATES).forEach(template => {
    if (!categories[template.category]) {
      categories[template.category] = []
    }
    categories[template.category].push(template)
  })
  
  return categories
}
