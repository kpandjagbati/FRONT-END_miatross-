function getArcPath(start, end) {
  const span = end - start
  if (span >= 99.99) {
    return null
  }
  if (span <= 0) {
    return null
  }

  const startAngle = (start / 100) * 360 - 90
  const endAngle = (end / 100) * 360 - 90
  const largeArc = span > 50 ? 1 : 0
  const x1 = 50 + 40 * Math.cos((startAngle * Math.PI) / 180)
  const y1 = 50 + 40 * Math.sin((startAngle * Math.PI) / 180)
  const x2 = 50 + 40 * Math.cos((endAngle * Math.PI) / 180)
  const y2 = 50 + 40 * Math.sin((endAngle * Math.PI) / 180)
  return `M 50 50 L ${x1} ${y1} A 40 40 0 ${largeArc} 1 ${x2} ${y2} Z`
}

export default function SimpleDonutChart({ data, title }) {
  const filtered = (data || []).filter(item => (item.count ?? item.value) > 0)
  const safeData = filtered.length
    ? filtered
    : [{ label: 'Aucune donnée', value: 100, count: 0, color: '#e2e8f0' }]

  const totalPercent = safeData.reduce((sum, item) => sum + item.value, 0) || 1
  const totalCount = safeData.reduce((sum, item) => sum + (item.count ?? 0), 0)
  let cumulative = 0

  const segments = safeData.map(item => {
    const start = cumulative
    cumulative += (item.value / totalPercent) * 100
    return { ...item, start, end: cumulative }
  })

  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-4 shadow-sm">
      {title && <h3 className="text-sm font-bold text-gray-900 mb-2">{title}</h3>}
      <div className="flex flex-col sm:flex-row items-center gap-4">
        <svg viewBox="0 0 100 100" className="w-24 h-24 shrink-0" role="img" aria-label={title}>
          {segments.map(item => {
            const span = item.end - item.start
            if (span >= 99.99) {
              return (
                <circle
                  key={item.label}
                  cx="50"
                  cy="50"
                  r="40"
                  fill={item.color}
                />
              )
            }
            const path = getArcPath(item.start, item.end)
            return path ? (
              <path key={item.label} d={path} fill={item.color} />
            ) : null
          })}
          <circle cx="50" cy="50" r="24" fill="white" />
          {totalCount > 0 && (
            <>
              <text x="50" y="48" textAnchor="middle" fill="#111827" fontSize="11" fontWeight="700">
                {totalCount}
              </text>
              <text x="50" y="58" textAnchor="middle" fill="#6b7280" fontSize="6">
                produits
              </text>
            </>
          )}
        </svg>
        <div className="flex-1 space-y-1.5 w-full">
          {safeData.map(item => (
            <div key={item.label} className="flex items-center justify-between text-xs gap-2">
              <div className="flex items-center gap-2 min-w-0">
                <span
                  className="w-3 h-3 rounded-full shrink-0"
                  style={{ backgroundColor: item.color }}
                />
                <span className="text-gray-600 truncate">{item.label}</span>
              </div>
              <span className="font-semibold text-gray-900 shrink-0">
                {item.count != null && item.count > 0 ? `${item.count} · ` : ''}
                {item.value}%
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
