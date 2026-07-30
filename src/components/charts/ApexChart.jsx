import { useEffect, useMemo, useState } from 'react'
import Chart from 'react-apexcharts'

/**
 * Client-only ApexCharts wrapper.
 * Remounts when series change so sparklines always redraw after API refresh.
 */
export default function ApexChart({
  type = 'bar',
  series,
  options,
  height = 200,
  width = '100%',
}) {
  const [ready, setReady] = useState(false)

  useEffect(() => {
    setReady(true)
  }, [])

  const safeSeries = useMemo(() => {
    if (!Array.isArray(series) || series.length === 0) {
      return [{ name: 'data', data: [0, 0, 0, 0, 0, 0, 0] }]
    }
    return series.map(s => {
      if (typeof s === 'number') return s
      const data = Array.isArray(s?.data) && s.data.length > 0
        ? s.data
        : [0, 0, 0, 0, 0, 0, 0]
      return { ...s, data }
    })
  }, [series])

  const chartKey = useMemo(() => {
    try {
      return `${type}-${JSON.stringify(safeSeries)}`
    } catch {
      return `${type}-${height}`
    }
  }, [type, safeSeries, height])

  if (!ready) {
    return <div style={{ height, width: typeof width === 'number' ? width : '100%' }} />
  }

  return (
    <div className="apex-chart-wrap w-full min-w-0 overflow-hidden" style={{ minHeight: height }}>
      <Chart
        key={chartKey}
        type={type}
        series={safeSeries}
        options={{
          chart: {
            fontFamily: 'inherit',
            background: 'transparent',
            redrawOnParentResize: true,
            redrawOnWindowResize: true,
            ...(options?.chart || {}),
          },
          ...options,
        }}
        height={height}
        width={width}
      />
    </div>
  )
}
