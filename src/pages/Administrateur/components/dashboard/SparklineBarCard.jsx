import ApexChart from '../../../../components/charts/ApexChart'
import { CHART_COLORS, ensureSeries, yAxisBounds } from './chartHelpers'

export default function SparklineBarCard({
  title = 'Produits',
  subtitle = 'Cette semaine',
  value,
  trend = '+0%',
  trendPositive = true,
  seriesData = [],
}) {
  const data = ensureSeries(seriesData, 7)
  const y = yAxisBounds(data)

  const options = {
    chart: {
      type: 'bar',
      parentHeightOffset: 0,
      toolbar: { show: false },
      sparkline: { enabled: true },
    },
    tooltip: { enabled: true, y: { formatter: val => `${val}` } },
    legend: { show: false },
    dataLabels: { enabled: false },
    colors: [CHART_COLORS.brand],
    states: {
      hover: { filter: { type: 'none' } },
      active: { filter: { type: 'none' } },
    },
    plotOptions: {
      bar: {
        borderRadius: 3,
        columnWidth: '42%',
        colors: {
          backgroundBarRadius: 5,
          backgroundBarColors: [
            CHART_COLORS.brandSoft,
            CHART_COLORS.brandSoft,
            CHART_COLORS.brandSoft,
            CHART_COLORS.brandSoft,
            CHART_COLORS.brandSoft,
            CHART_COLORS.brandSoft,
            CHART_COLORS.brandSoft,
          ],
        },
      },
    },
    grid: {
      show: false,
      padding: { left: 4, right: 4, top: 8, bottom: 8 },
    },
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
          type="bar"
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
