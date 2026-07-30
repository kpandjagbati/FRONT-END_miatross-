import ApexChart from '../../../../components/charts/ApexChart'
import { CHART_COLORS, defaultDayLabels, ensureSeries, yAxisBounds } from './chartHelpers'

export default function RevenueGrowthCard({
  title = 'Croissance CA',
  subtitle = 'Rapport hebdomadaire',
  value,
  trend = '+0%',
  seriesData = [],
  categories,
}) {
  const data = ensureSeries(seriesData, 7)
  const cats = categories?.length ? categories : defaultDayLabels(7)
  const y = yAxisBounds(data)
  const peak = Math.max(...data)
  const peakIndex = peak > 0 ? data.indexOf(peak) : data.length - 1

  const colors = data.map((_, i) =>
    i === peakIndex ? CHART_COLORS.success : CHART_COLORS.successSoft,
  )

  const options = {
    chart: {
      parentHeightOffset: 0,
      toolbar: { show: false },
    },
    plotOptions: {
      bar: {
        borderRadius: 5,
        distributed: true,
        columnWidth: '48%',
      },
    },
    legend: { show: false },
    tooltip: {
      enabled: true,
      y: { formatter: val => `${Number(val).toLocaleString('fr-FR')} FCFA` },
    },
    dataLabels: { enabled: false },
    colors,
    states: {
      hover: { filter: { type: 'none' } },
      active: { filter: { type: 'none' } },
    },
    grid: {
      show: false,
      padding: { top: -10, left: 0, right: 0, bottom: -5 },
    },
    xaxis: {
      categories: cats,
      axisTicks: { show: false },
      axisBorder: { show: false },
      labels: {
        style: {
          colors: CHART_COLORS.muted,
          fontSize: '12px',
        },
      },
    },
    yaxis: { show: false, min: y.min, max: y.max },
  }

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 h-full">
      <div className="flex justify-between gap-4">
        <div className="flex flex-col justify-between gap-4 min-w-0">
          <div>
            <p className="text-base font-semibold text-gray-900">{title}</p>
            <p className="text-xs text-gray-500 mt-0.5">{subtitle}</p>
          </div>
          <div>
            <p className="text-2xl font-bold text-gray-900">{value}</p>
            <span className="inline-flex mt-2 px-2.5 py-1 rounded-lg text-xs font-semibold bg-emerald-50 text-emerald-700">
              {trend}
            </span>
          </div>
        </div>
        <div className="w-[190px] shrink-0">
          <ApexChart
            type="bar"
            height={172}
            width="100%"
            series={[{ name: title, data }]}
            options={options}
          />
        </div>
      </div>
    </div>
  )
}
