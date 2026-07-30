import ApexChart from '../../../../components/charts/ApexChart'
import { CHART_COLORS } from './chartHelpers'

export default function ProductStatusDonut({
  title = 'Répartition produits',
  subtitle = 'Par statut',
  totalLabel = 'Total',
  totalValue = 0,
  trend = '',
  labels = [],
  series = [],
  colors = [CHART_COLORS.brand, CHART_COLORS.warning, CHART_COLORS.danger, CHART_COLORS.muted, '#4a6fa5'],
}) {
  const options = {
    colors,
    stroke: { width: 0 },
    legend: { show: false },
    tooltip: { theme: 'light' },
    dataLabels: { enabled: false },
    labels,
    states: {
      hover: { filter: { type: 'none' } },
      active: { filter: { type: 'none' } },
    },
    plotOptions: {
      pie: {
        customScale: 0.9,
        expandOnClick: false,
        donut: {
          size: '73%',
          labels: {
            show: true,
            name: {
              offsetY: 22,
              color: CHART_COLORS.muted,
              fontSize: '13px',
            },
            value: {
              offsetY: -12,
              fontWeight: 600,
              fontSize: '22px',
              color: '#111827',
              formatter: val => `${val}`,
            },
            total: {
              show: true,
              showAlways: true,
              label: totalLabel,
              color: CHART_COLORS.brand,
              fontSize: '13px',
              formatter: () => String(totalValue),
            },
          },
        },
      },
    },
  }

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 h-full overflow-visible">
      <div className="flex justify-between gap-4 items-stretch">
        <div className="flex flex-col justify-between min-w-0 py-1">
          <div>
            <p className="text-base font-semibold text-gray-900">{title}</p>
            <p className="text-xs text-gray-500 mt-0.5">{subtitle}</p>
          </div>
          <div>
            <p className="text-3xl font-bold text-gray-900">{totalValue}</p>
            {trend && (
              <p className="text-sm font-medium text-emerald-600 mt-1 flex items-center gap-1">
                <span aria-hidden>↑</span> {trend}
              </p>
            )}
            <ul className="mt-4 space-y-1.5">
              {labels.map((label, i) => (
                <li key={label} className="flex items-center gap-2 text-xs text-gray-600">
                  <span
                    className="w-2.5 h-2.5 rounded-full shrink-0"
                    style={{ backgroundColor: colors[i % colors.length] }}
                  />
                  <span className="truncate">{label}</span>
                  <span className="ml-auto font-semibold text-gray-900">{series[i] ?? 0}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="shrink-0 w-[165px]">
          {series.length > 0 ? (
            <ApexChart
              type="donut"
              width={165}
              height={210}
              series={series}
              options={options}
            />
          ) : (
            <div className="h-[210px] flex items-center justify-center text-sm text-gray-400">
              Aucune donnée
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
