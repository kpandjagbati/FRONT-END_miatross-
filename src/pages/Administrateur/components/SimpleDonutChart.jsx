export default function SimpleDonutChart({ data, title }) {
  const safeData = data?.length ? data : [{ label: 'Aucune donnée', value: 100, color: '#e2e8f0' }]
  const total = safeData.reduce((sum, item) => sum + item.value, 0) || 1
  let cumulative = 0

  const segments = safeData.map(item => {
    const start = cumulative
    cumulative += (item.value / total) * 100
    return { ...item, start, end: cumulative }
  })

  const getArc = (start, end) => {
    const startAngle = (start / 100) * 360 - 90
    const endAngle = (end / 100) * 360 - 90
    const largeArc = end - start > 50 ? 1 : 0
    const x1 = 50 + 40 * Math.cos((startAngle * Math.PI) / 180)
    const y1 = 50 + 40 * Math.sin((startAngle * Math.PI) / 180)
    const x2 = 50 + 40 * Math.cos((endAngle * Math.PI) / 180)
    const y2 = 50 + 40 * Math.sin((endAngle * Math.PI) / 180)
    return `M 50 50 L ${x1} ${y1} A 40 40 0 ${largeArc} 1 ${x2} ${y2} Z`
  }

  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm">
      {title && <h3 className="text-sm font-bold text-gray-900 mb-4">{title}</h3>}
      <div className="flex flex-col sm:flex-row items-center gap-6">
        <svg viewBox="0 0 100 100" className="w-36 h-36 shrink-0">
          {segments.map(item => (
            <path key={item.label} d={getArc(item.start, item.end)} fill={item.color} />
          ))}
          <circle cx="50" cy="50" r="24" fill="white" />
        </svg>
        <div className="flex-1 space-y-2 w-full">
          {safeData.map(item => (
            <div key={item.label} className="flex items-center justify-between text-sm">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full shrink-0" style={{ backgroundColor: item.color }} />
                <span className="text-gray-600">{item.label}</span>
              </div>
              <span className="font-semibold text-gray-900">{item.value}%</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
