const STATUS_STYLES = {
  'Livrée': 'bg-brand/10 text-brand',
  'En cours': 'bg-blue-100 text-blue-700',
  'En attente': 'bg-amber-100 text-amber-700',
  'Annulée': 'bg-red-100 text-red-600',
  'Actif': 'bg-brand/10 text-brand',
}

export default function StatusBadge({ status }) {
  return (
    <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold ${
      STATUS_STYLES[status] || 'bg-gray-100 text-gray-600'
    }`}>
      {status}
    </span>
  )
}
