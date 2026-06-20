export default function SimpleLineChart({ data = [], title, height = 100 }) {
  const safeData = data.length ? data : [0, 0, 0, 0]
  const max = Math.max(...safeData)
  const min = Math.min(...safeData)
  const range = max - min || 1
  const width = 100
  const padding = 4
  const divisor = safeData.length - 1 || 1

  const points = safeData.map((value, i) => {
    const x = padding + (i / divisor) * (width - padding * 2)
    const y = height - padding - ((value - min) / range) * (height - padding * 2)
    return `${x},${y}`
  }).join(' ')

  const areaPoints = `${padding},${height - padding} ${points} ${width - padding},${height - padding}`

  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-4 shadow-sm">
      {title && <h3 className="text-sm font-bold text-gray-900 mb-2">{title}</h3>}
      <svg
        viewBox={`0 0 ${width} ${height}`}
        className="w-full h-24"
        preserveAspectRatio="none"
      >
        <defs>
          <linearGradient id="adminChartGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#273c75" stopOpacity="0.25" />
            <stop offset="100%" stopColor="#273c75" stopOpacity="0.02" />
          </linearGradient>
        </defs>
        <polygon points={areaPoints} fill="url(#adminChartGradient)" />
        <polyline
          points={points}
          fill="none"
          stroke="#273c75"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          vectorEffect="non-scaling-stroke"
        />
      </svg>
    </div>
  )
}
