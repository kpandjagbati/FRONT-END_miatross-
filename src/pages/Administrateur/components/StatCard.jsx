import { STAT_ICONS } from '../config/navConfig'

export default function StatCard({ label, value, icon, trend }) {
  const Icon = STAT_ICONS[icon] || STAT_ICONS.package

  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="text-sm text-gray-500 font-medium">{label}</p>
          <p className="text-2xl font-bold text-gray-900 mt-1 truncate">{value}</p>
          {trend && <p className="text-xs text-brand mt-2 font-medium">{trend}</p>}
        </div>
        <div className="w-11 h-11 rounded-xl bg-brand/10 flex items-center justify-center shrink-0">
          <Icon size={22} className="text-brand" />
        </div>
      </div>
    </div>
  )
}
