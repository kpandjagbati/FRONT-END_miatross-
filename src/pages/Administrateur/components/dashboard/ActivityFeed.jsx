import { Package, ShoppingBag, Store } from 'lucide-react'

const ICONS = {
  produit: Package,
  vente: ShoppingBag,
  vendeur: Store,
}

export default function ActivityFeed({ title = 'Activité récente', items = [] }) {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 h-full">
      <h3 className="text-sm font-bold text-gray-900 mb-4">{title}</h3>
      <div className="space-y-3">
        {items.map((item, index) => {
          const Icon = ICONS[item.type] || Package
          return (
            <div key={`${item.type}-${item.date}-${index}`} className="flex items-start gap-3">
              <div className="w-9 h-9 rounded-xl bg-brand/10 flex items-center justify-center shrink-0">
                <Icon size={16} className="text-brand" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-sm font-semibold text-gray-900">{item.titre}</p>
                <p className="text-xs text-gray-600 truncate">{item.detail}</p>
                <p className="text-[11px] text-gray-400 mt-0.5">{item.date}</p>
              </div>
            </div>
          )
        })}
        {items.length === 0 && (
          <p className="text-sm text-gray-500">Aucune activité récente sur la plateforme.</p>
        )}
      </div>
    </div>
  )
}
