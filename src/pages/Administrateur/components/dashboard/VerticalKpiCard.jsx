export default function VerticalKpiCard({
  title,
  subtitle,
  value,
  chipText,
  chipTone = 'success',
  icon: Icon,
  iconTone = 'brand',
}) {
  const chipClass =
    chipTone === 'danger'
      ? 'bg-red-50 text-red-600'
      : chipTone === 'warning'
        ? 'bg-amber-50 text-amber-700'
        : 'bg-emerald-50 text-emerald-700'

  const iconWrap =
    iconTone === 'danger'
      ? 'bg-red-50 text-red-500'
      : iconTone === 'warning'
        ? 'bg-amber-50 text-amber-600'
        : iconTone === 'success'
          ? 'bg-emerald-50 text-emerald-600'
          : 'bg-brand/10 text-brand'

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 h-full flex flex-col justify-between gap-4">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-base font-semibold text-gray-900">{title}</p>
          <p className="text-xs text-gray-500 mt-0.5">{subtitle}</p>
        </div>
        {Icon && (
          <div className={`w-11 h-11 rounded-xl flex items-center justify-center shrink-0 ${iconWrap}`}>
            <Icon size={22} />
          </div>
        )}
      </div>
      <div>
        <p className="text-2xl font-bold text-gray-900 mb-2">{value}</p>
        {chipText && (
          <span className={`inline-flex px-2.5 py-1 rounded-lg text-xs font-semibold ${chipClass}`}>
            {chipText}
          </span>
        )}
      </div>
    </div>
  )
}
