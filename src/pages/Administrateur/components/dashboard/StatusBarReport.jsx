import ApexChart from '../../../../components/charts/ApexChart'
import { CHART_COLORS, yAxisBounds } from './chartHelpers'

export default function StatusBarReport({
  title = 'Rapport produits',
  subtitle = 'Volume par statut',
  categories = [],
  seriesData = [],
}) {
  const data = (seriesData || []).map(v => Number(v) || 0)
  const cats = categories?.length ? categories : data.map((_, i) => `#${i + 1}`)
  const y = yAxisBounds(data)
  const peak = data.length ? Math.max(...data) : 0
  const peakIndex = peak > 0 ? data.indexOf(peak) : 0

  const colors = data.length
    ? data.map((_, i) => (i === peakIndex ? CHART_COLORS.brand : CHART_COLORS.brandSoft))
    : [CHART_COLORS.brand]

  const options = {
    chart: {
      parentHeightOffset: 0,
      toolbar: { show: false },
    },
    plotOptions: {
      bar: {
        borderRadius: 6,
        distributed: true,
        columnWidth: '40%',
        borderRadiusApplication: 'end',
        dataLabels: { position: 'top' },
      },
    },
    legend: { show: false },
    tooltip: { enabled: true },
    dataLabels: {
      offsetY: -12,
      formatter: val => `${val}`,
      style: {
        fontWeight: 500,
        colors: ['#111827'],
        fontSize: '12px',
      },
    },
    colors,
    states: {
      hover: { filter: { type: 'none' } },
      active: { filter: { type: 'none' } },
    },
    grid: {
      show: false,
      padding: { top: 12, left: 4, right: 4, bottom: 0 },
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
      <div className="mb-2">
        <p className="text-base font-semibold text-gray-900">{title}</p>
        <p className="text-xs text-gray-500">{subtitle}</p>
      </div>
      {data.length > 0 ? (
        <ApexChart
          type="bar"
          height={240}
          series={[{ name: title, data }]}
          options={options}
        />
      ) : (
        <div className="h-[240px] flex items-center justify-center text-sm text-gray-400">
          Aucune donnée — ajoutez des produits pour alimenter le graphique
        </div>
      )}
    </div>
  )
}
