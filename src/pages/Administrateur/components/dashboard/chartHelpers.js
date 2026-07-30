/** Brand palette aligned with MiaTrossè */
export const CHART_COLORS = {
  brand: '#273c75',
  brandSoft: 'rgba(39, 60, 117, 0.18)',
  brandMuted: 'rgba(39, 60, 117, 0.45)',
  success: '#22c55e',
  successSoft: 'rgba(34, 197, 94, 0.18)',
  warning: '#f59e0b',
  danger: '#ef4444',
  muted: '#94a3b8',
  paper: '#ffffff',
}

/**
 * Build a short sparkline series seeded from a real KPI so charts feel alive
 * even when the API has no time-series endpoint yet.
 * @deprecated Prefer real series from the dashboard API (`produitsParJour`, `caParJour`, …).
 */
export function sparkFromValue(value, length = 7) {
  const base = Math.max(Number(value) || 1, 1)
  return Array.from({ length }, (_, i) => {
    const wave = 0.55 + ((Math.sin(i * 1.2 + base) + 1) / 2) * 0.5
    return Math.max(1, Math.round(base * wave))
  })
}

/** Map backend SeriePointDto[] → numeric values for ApexCharts */
export function seriesValues(points = []) {
  if (!Array.isArray(points)) return []
  return points.map(p => Number(p?.value) || 0)
}

/** Map backend SeriePointDto[] → category labels */
export function seriesLabels(points = []) {
  if (!Array.isArray(points)) return []
  return points.map(p => p?.label || '')
}

/** Guarantee a fixed-length numeric series (pads with 0). */
export function ensureSeries(values = [], length = 7) {
  const list = Array.isArray(values) ? values.map(v => Number(v) || 0) : []
  if (list.length >= length) return list.slice(0, length)
  return [...list, ...Array(length - list.length).fill(0)]
}

/** Default weekday labels when API series is missing */
export function defaultDayLabels(length = 7) {
  const days = ['Dim', 'Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam']
  const today = new Date()
  return Array.from({ length }, (_, i) => {
    const d = new Date(today)
    d.setDate(today.getDate() - (length - 1 - i))
    return days[d.getDay()]
  })
}

/** Y-axis bounds so all-zero series still render visibly */
export function yAxisBounds(values = []) {
  const nums = (values || []).map(v => Number(v) || 0)
  const max = Math.max(0, ...nums)
  return { min: 0, max: max <= 0 ? 1 : max * 1.15 }
}

/** Percent change between last two points (0 if not enough data) */
export function seriesTrendPercent(points = []) {
  const values = seriesValues(points)
  if (values.length < 2) return 0
  const prev = values[values.length - 2]
  const curr = values[values.length - 1]
  if (prev === 0) return curr > 0 ? 100 : 0
  return Math.round(((curr - prev) / prev) * 100)
}

export function formatTrend(percent) {
  if (percent > 0) return `+${percent}%`
  if (percent < 0) return `${percent}%`
  return '0%'
}

export function compactNumber(value) {
  const n = Number(value) || 0
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`
  if (n >= 1_000) return `${(n / 1_000).toFixed(n >= 10_000 ? 0 : 1)}k`
  return String(n)
}
