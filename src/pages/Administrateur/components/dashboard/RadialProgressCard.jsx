import ApexChart from '../../../../components/charts/ApexChart'
import { CHART_COLORS } from './chartHelpers'

export default function RadialProgressCard({
  title = 'Produits actifs',
  subtitle = 'Taux de publication',
  percent = 0,
  detail = '',
}) {
  const value = Math.min(100, Math.max(0, Number(percent) || 0))

  const options = {
    chart: {
      sparkline: { enabled: true },
      parentHeightOffset: 0,
    },
    colors: [CHART_COLORS.brand],
    plotOptions: {
      radialBar: {
        startAngle: -90,
        endAngle: 90,
        hollow: { size: '60%' },
        track: {
          background: CHART_COLORS.brandSoft,
          strokeWidth: '100%',
        },
        dataLabels: {
          name: {
            show: true,
            offsetY: 18,
            color: CHART_COLORS.muted,
            fontSize: '13px',
          },
          value: {
            offsetY: -12,
            fontSize: '24px',
            fontWeight: 700,
            color: '#111827',
            formatter: val => `${Math.round(val)}%`,
          },
        },
      },
    },
    stroke: { lineCap: 'round' },
    labels: ['Actifs'],
  }

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 h-full flex flex-col">
      <div className="mb-1">
        <p className="text-base font-semibold text-gray-900">{title}</p>
        <p className="text-xs text-gray-500">{subtitle}</p>
      </div>
      <div className="flex-1 flex items-center justify-center min-h-[180px]">
        <ApexChart type="radialBar" height={220} series={[value]} options={options} />
      </div>
      {detail && (
        <p className="text-center text-sm text-gray-600 mt-1">{detail}</p>
      )}
    </div>
  )
}
