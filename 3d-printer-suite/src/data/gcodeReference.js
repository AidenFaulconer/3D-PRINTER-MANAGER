export const GCODES = [
  {
    code: 'G0/G1',
    name: 'Linear Move',
    category: 'Movement',
    syntax: 'G0|G1 X<pos> Y<pos> Z<pos> E<len> F<feed>',
    params: [
      { key: 'X', desc: 'X position (mm)', type: 'number' },
      { key: 'Y', desc: 'Y position (mm)', type: 'number' },
      { key: 'Z', desc: 'Z position (mm)', type: 'number' },
      { key: 'E', desc: 'Extruder length (mm)', type: 'number' },
      { key: 'F', desc: 'Feedrate (mm/min)', type: 'number' }
    ],
    description: 'Move in a straight line to the specified coordinates. G0 is treated as G1 in Marlin.',
    examples: ['G1 X10 Y10 F6000', 'G1 Z0.2 F300']
  },
  {
    code: 'G28',
    name: 'Auto Home',
    category: 'Movement',
    syntax: 'G28 [X] [Y] [Z]',
    params: [
      { key: 'X', desc: 'Home X axis', type: 'flag' },
      { key: 'Y', desc: 'Home Y axis', type: 'flag' },
      { key: 'Z', desc: 'Home Z axis', type: 'flag' }
    ],
    description: 'Home one or more axes to their endstops.',
    examples: ['G28', 'G28 X Y']
  },
  {
    code: 'G90',
    name: 'Absolute Positioning',
    category: 'Movement',
    syntax: 'G90',
    params: [],
    description: 'Set positioning to absolute for X/Y/Z/E.',
    examples: ['G90']
  },
  {
    code: 'G91',
    name: 'Relative Positioning',
    category: 'Movement',
    syntax: 'G91',
    params: [],
    description: 'Set positioning to relative for X/Y/Z/E.',
    examples: ['G91']
  },
  {
    code: 'M104',
    name: 'Set Hotend Temperature',
    category: 'Temperature',
    syntax: 'M104 S<temp> [T<tool>]',
    params: [
      { key: 'S', desc: 'Target temperature (°C)', type: 'number' },
      { key: 'T', desc: 'Tool index', type: 'number' }
    ],
    description: 'Set the hotend temperature without waiting.',
    examples: ['M104 S200', 'M104 S210 T0']
  },
  {
    code: 'M109',
    name: 'Wait for Hotend Temp',
    category: 'Temperature',
    syntax: 'M109 S<temp> [T<tool>]',
    params: [
      { key: 'S', desc: 'Target temperature (°C)', type: 'number' },
      { key: 'T', desc: 'Tool index', type: 'number' }
    ],
    description: 'Set the hotend temperature and wait until reached.',
    examples: ['M109 S200']
  },
  {
    code: 'M140',
    name: 'Set Bed Temperature',
    category: 'Temperature',
    syntax: 'M140 S<temp>',
    params: [
      { key: 'S', desc: 'Target temperature (°C)', type: 'number' }
    ],
    description: 'Set the bed temperature without waiting.',
    examples: ['M140 S60']
  },
  {
    code: 'M190',
    name: 'Wait for Bed Temp',
    category: 'Temperature',
    syntax: 'M190 S<temp>',
    params: [
      { key: 'S', desc: 'Target temperature (°C)', type: 'number' }
    ],
    description: 'Set the bed temperature and wait until reached.',
    examples: ['M190 S60']
  },
  {
    code: 'M106',
    name: 'Fan On',
    category: 'Cooling',
    syntax: 'M106 [S<0-255>]',
    params: [
      { key: 'S', desc: 'Fan speed (0-255)', type: 'number' }
    ],
    description: 'Set part cooling fan speed.',
    examples: ['M106 S255', 'M106 S128']
  },
  {
    code: 'M107',
    name: 'Fan Off',
    category: 'Cooling',
    syntax: 'M107',
    params: [],
    description: 'Turn off part cooling fan.',
    examples: ['M107']
  },
  {
    code: 'M114',
    name: 'Get Current Position',
    category: 'Information',
    syntax: 'M114',
    params: [],
    description: 'Report the current position of all axes and extruder.',
    examples: ['M114']
  },
  {
    code: 'M115',
    name: 'Firmware Info',
    category: 'Information',
    syntax: 'M115',
    params: [],
    description: 'Request firmware capabilities and version.',
    examples: ['M115']
  },
  {
    code: 'M303',
    name: 'PID Autotune',
    category: 'Temperature',
    syntax: 'M303 E<hotend> S<temp> C<cycles>',
    params: [
      { key: 'E', desc: 'Hotend index (0 for first)', type: 'number' },
      { key: 'S', desc: 'Target temp (°C)', type: 'number' },
      { key: 'C', desc: 'Cycles count', type: 'number' }
    ],
    description: 'Run PID autotune routine for the specified hotend.',
    examples: ['M303 E0 S210 C8']
  }
]

export const GCODES_BY_CATEGORY = GCODES.reduce((acc, g) => {
  acc[g.category] = acc[g.category] || []
  acc[g.category].push(g)
  return acc
}, {})
