import ApexChart from '../../../../components/charts/ApexChart'
import { CHART_COLORS, ensureSeries, yAxisBounds } from './chartHelpers'

export default function SparklineAreaCard({
  title = 'Ventes',
  subtitle = 'Cette année',
  value,
  trend = '+0%',
  trendPositive = true,
  seriesData = [],
  color = CHART_COLORS.success,
}) {
  const data = ensureSeries(seriesData, Math.max(seriesData?.length || 0, 4))
  const y = yAxisBounds(data)

  const options = {
    chart: {
      parentHeightOffset: 0,
      toolbar: { show: false },
      sparkline: { enabled: true },
    },
    tooltip: { enabled: true, y: { formatter: val => `${val}` } },
    dataLabels: { enabled: false },
    stroke: { width: 3, curve: 'smooth' },
    markers: {
      size: 0,
      hover: { size: 4 },
    },
    grid: {
      show: false,
      padding: { top: 8, bottom: 8 },
    },
    fill: {
      type: 'gradient',
      gradient: {
        opacityTo: 0.05,
        opacityFrom: 0.45,
        shadeIntensity: 1,
        stops: [0, 100],
      },
    },
    colors: [color],
    xaxis: {
      labels: { show: false },
      axisTicks: { show: false },
      axisBorder: { show: false },
    },
    yaxis: { show: false, min: y.min, max: y.max },
  }

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 h-full flex flex-col">
      <div className="mb-1">
        <p className="text-base font-semibold text-gray-900">{title}</p>
        <p className="text-xs text-gray-500">{subtitle}</p>
      </div>
      <div className="flex-1 min-h-[110px]">
        <ApexChart
          type="area"
          height={110}
          series={[{ name: title, data }]}
          options={options}
        />
      </div>
      <div className="flex items-center justify-between gap-2 mt-1">
        <p className="text-2xl font-bold text-gray-900">{value}</p>
        <p className={`text-sm font-medium ${trendPositive ? 'text-emerald-600' : 'text-red-500'}`}>
          {trend}
        </p>
      </div>
    </div>
  )
}
