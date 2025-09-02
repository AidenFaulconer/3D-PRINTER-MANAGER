// Build Cura-compatible .cfg from internal profile
// Minimal sections: [general], [metadata], [values]

export function buildCuraCfg(profile, opts = {}) {
  const now = new Date().toISOString()
  const general = {
    version: 4,
    name: profile.name,
    definition: opts.definition || 'fused_deposition'
  }
  const metadata = {
    type: profile.type || 'quality',
    setting_version: 20,
    modified: now
  }
  const values = profile.settings || {}

  const ini = []
  ini.push('[general]')
  for (const [k, v] of Object.entries(general)) ini.push(`${k} = ${serializeValue(v)}`)
  ini.push('')
  ini.push('[metadata]')
  for (const [k, v] of Object.entries(metadata)) ini.push(`${k} = ${serializeValue(v)}`)
  ini.push('')
  ini.push('[values]')
  for (const [k, v] of Object.entries(values)) ini.push(`${k} = ${serializeValue(v)}`)
  ini.push('')
  return ini.join('\n')
}

export function exportProfilesToDownloads(profiles) {
  profiles.forEach((p) => {
    const content = buildCuraCfg(p)
    const blob = new Blob([content], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `${safeFilename(p.name)}.cfg`
    a.click()
    URL.revokeObjectURL(url)
  })
}

function safeFilename(name) {
  return String(name || 'profile').replace(/[^a-z0-9-_]+/gi, '_')
}

function serializeValue(v) {
  if (typeof v === 'boolean') return v ? 'True' : 'False'
  if (Array.isArray(v)) return v.join(',')
  return v
}
