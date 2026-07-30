import ApexChart from '../../../../components/charts/ApexChart'
import { CHART_COLORS, yAxisBounds } from './chartHelpers'

export default function AreaTrendCard({
  title = 'Évolution estimée',
  subtitle = 'Volume produits / CA',
  categories = [],
  series = [],
}) {
  const normalized = (series || []).map(s => ({
    name: s.name || 'Série',
    data: Array.isArray(s.data) && s.data.length > 0
      ? s.data.map(v => Number(v) || 0)
      : [0, 0, 0, 0, 0, 0, 0, 0, 0],
  }))

  const allValues = normalized.flatMap(s => s.data)
  const y = yAxisBounds(allValues)
  const cats = categories?.length
    ? categories
    : normalized[0]?.data.map((_, i) => `${i + 1}`) || []

  const options = {
    chart: {
      parentHeightOffset: 0,
      toolbar: { show: false },
      zoom: { enabled: false },
    },
    colors: [CHART_COLORS.brand, CHART_COLORS.success],
    dataLabels: { enabled: false },
    stroke: { curve: 'smooth', width: 3 },
    fill: {
      type: 'gradient',
      gradient: {
        shadeIntensity: 1,
        opacityFrom: 0.35,
        opacityTo: 0.05,
        stops: [0, 90, 100],
      },
    },
    legend: {
      position: 'top',
      horizontalAlign: 'right',
      labels: { colors: '#6b7280' },
      markers: { size: 6, offsetX: -4 },
    },
    grid: {
      borderColor: '#f1f5f9',
      strokeDashArray: 4,
      padding: { top: 0, left: 8, right: 8, bottom: 0 },
    },
    xaxis: {
      categories: cats,
      axisBorder: { show: false },
      axisTicks: { show: false },
      labels: {
        style: { colors: CHART_COLORS.muted, fontSize: '12px' },
      },
    },
    yaxis: {
      min: y.min,
      max: y.max,
      labels: {
        style: { colors: CHART_COLORS.muted, fontSize: '12px' },
      },
    },
    tooltip: {
      theme: 'light',
      shared: true,
    },
  }

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 h-full">
      <div className="mb-2">
        <p className="text-base font-semibold text-gray-900">{title}</p>
        <p className="text-xs text-gray-500">{subtitle}</p>
      </div>
      <ApexChart type="area" height={280} series={normalized} options={options} />
    </div>
  )
}
