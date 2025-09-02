// Lightweight Cura profile parser
// Supports typical Cura .cfg/.curaprofile format: INI-like with [general], [metadata], [values]
// Lines starting with ';' or '#' are comments. Key/value pairs use '='.
// Values are auto-typed: numbers, booleans, comma-separated lists.

export function parseCuraProfile(content, filename = '') {
  if (!content || typeof content !== 'string') {
    return { name: filename || 'Unknown', type: 'quality', settings: {}, metadata: {}, raw: {} }
  }

  const { sections, raw } = parseIni(content)
  const general = sections.general || {}
  const metadata = sections.metadata || {}
  const values = sections.values || sections || {}

  // Derive name and type
  const name = metadata.name || general.name || inferNameFromFilename(filename) || 'Imported Profile'
  const type = normalizeType(metadata.type || general.type || inferTypeFromFilename(filename) || 'quality')

  // Prefer [values] section settings; fallback to all non-special sections flattened
  const settings = { ...values }

  return {
    name,
    type,
    settings,
    metadata: { ...general, ...metadata },
    raw
  }
}

export function parseIni(text) {
  const sections = {}
  const raw = { lines: [] }
  let current = null

  const lines = text.split(/\r?\n/)
  for (let rawIndex = 0; rawIndex < lines.length; rawIndex += 1) {
    let line = lines[rawIndex]
    raw.lines.push(line)
    const trimmed = line.trim()

    if (!trimmed || trimmed.startsWith(';') || trimmed.startsWith('#')) continue

    // Section header
    const sect = trimmed.match(/^\[([^\]]+)\]$/)
    if (sect) {
      current = sect[1].toLowerCase()
      if (!sections[current]) sections[current] = {}
      continue
    }

    // Key=Value
    const kv = trimmed.match(/^(.*?)=(.*)$/)
    if (kv) {
      const key = kv[1].trim()
      const valueStr = kv[2].trim()
      const typed = coerceValue(valueStr)

      if (current) {
        sections[current][key] = typed
      } else {
        // entries before any [section]
        if (!sections.values) sections.values = {}
        sections.values[key] = typed
      }
    }
  }

  return { sections, raw }
}

function coerceValue(value) {
  // Strip surrounding quotes
  const unquoted = value.replace(/^"|"$/g, '').replace(/^'|'$/g, '')

  // Booleans
  if (/^(true|false)$/i.test(unquoted)) return /^true$/i.test(unquoted)

  // Numbers (int/float)
  if (/^[+-]?\d+(\.\d+)?$/.test(unquoted)) return Number(unquoted)

  // Lists (comma separated)
  if (unquoted.includes(',') && !unquoted.includes(' ')) {
    const parts = unquoted.split(',').map(p => p.trim()).filter(Boolean)
    // If all numeric, cast to numbers
    if (parts.every(p => /^[+-]?\d+(\.\d+)?$/.test(p))) return parts.map(Number)
    // If all booleans
    if (parts.every(p => /^(true|false)$/i.test(p))) return parts.map(p => /^true$/i.test(p))
    return parts
  }

  return unquoted
}

function inferNameFromFilename(filename) {
  if (!filename) return ''
  const base = filename.split(/[\\/]/).pop() || ''
  return base.replace(/\.(cfg|curaprofile)$/i, '').replace(/[_-]+/g, ' ')
}

function inferTypeFromFilename(filename) {
  const f = (filename || '').toLowerCase()
  if (f.includes('material')) return 'material'
  if (f.includes('print')) return 'print'
  if (f.includes('quality')) return 'quality'
  return 'quality'
}

function normalizeType(type) {
  const t = String(type).toLowerCase()
  if (['quality', 'material', 'print'].includes(t)) return t
  return 'quality'
}
