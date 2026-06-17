import { useEffect, useState } from 'react'
import StatCard from './components/StatCard'
import VendeurPageHeader from './components/VendeurPageHeader'
import { fetchVendeurDashboard } from '../../services/api/dashboardApi'
import { formatPrice, formatStatut, statutToBadgeClass } from '../../utils/backendHelpers'

export default function VendeurDashboardPage() {
  const [data, setData] = useState(null)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchVendeurDashboard()
      .then(setData)
      .catch(err => setError(err.message))
      .finally(() => setLoading(false))
  }, [])

  if (loading) {
    return <p className="text-gray-500 text-center py-12">Chargement du tableau de bord…</p>
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-xl p-6 text-red-700 text-sm">
        {error}
      </div>
    )
  }

  const stats = [
    { label: 'Produits publiés', value: String(data.totalProduits), icon: 'package', trend: `${data.produitsActifs} actifs` },
    { label: 'En attente', value: String(data.produitsEnAttente), icon: 'pending', trend: 'Validation admin' },
    { label: 'Produits actifs', value: String(data.produitsActifs), icon: 'cart', trend: 'Visibles boutique' },
    { label: 'Ventes estimées', value: formatPrice(data.totalVentesEstime), icon: 'revenue', trend: 'Produits vendus' },
  ]

  return (
    <div>
      <VendeurPageHeader
        title="Tableau de bord"
        description="Données en temps réel depuis le backend assigame"
      />

      <div className="grid sm:grid-cols-2 xl:grid-cols-4 gap-4 mb-6">
        {stats.map(stat => (
          <StatCard key={stat.label} {...stat} />
        ))}
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="p-5 border-b border-gray-100">
          <h3 className="text-sm font-bold text-gray-900">Mes produits récents</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="dashboard-table w-full text-sm text-gray-800">
            <thead>
              <tr className="bg-gray-50 text-left text-gray-500">
                <th className="px-5 py-3 font-medium">Produit</th>
                <th className="px-5 py-3 font-medium">Catégorie</th>
                <th className="px-5 py-3 font-medium">Prix</th>
                <th className="px-5 py-3 font-medium">Statut</th>
              </tr>
            </thead>
            <tbody>
              {(data.produitsRecents || []).map(p => (
                <tr key={p.id} className="border-t border-gray-50">
                  <td className="px-5 py-3 font-medium text-gray-900">{p.nom}</td>
                  <td className="px-5 py-3 text-gray-600">{p.categorie || '—'}</td>
                  <td className="px-5 py-3">{formatPrice(p.prix)}</td>
                  <td className="px-5 py-3">
                    <span className={`inline-flex px-2.5 py-1 rounded-full text-xs font-semibold ${statutToBadgeClass(p.statut)}`}>
                      {formatStatut(p.statut)}
                    </span>
                  </td>
                </tr>
              ))}
              {(data.produitsRecents || []).length === 0 && (
                <tr>
                  <td colSpan={4} className="px-5 py-8 text-center text-gray-500">
                    Aucun produit. Ajoutez-en depuis « Ajouter un produit ».
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
