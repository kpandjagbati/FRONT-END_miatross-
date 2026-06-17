import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Plus, Store } from 'lucide-react'
import AdminPageHeader from './components/AdminPageHeader'
import StatCard from './components/StatCard'
import SimpleDonutChart from './components/SimpleDonutChart'
import { fetchAdminDashboard } from '../../services/api/dashboardApi'
import { buildStatutChart, formatPrice, formatStatut, statutToBadgeClass } from '../../utils/backendHelpers'

export default function AdminDashboardPage() {
  const [data, setData] = useState(null)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchAdminDashboard()
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
    { label: 'Vendeurs', value: String(data.totalVendeurs), icon: 'store', trend: `${data.totalUtilisateurs} utilisateurs au total` },
    { label: 'Produits', value: String(data.totalProduits), icon: 'package', trend: `${data.produitsActifs} actifs` },
    { label: 'En attente', value: String(data.produitsEnAttente), icon: 'cart', trend: 'Validation requise' },
    { label: "CA estimé", value: formatPrice(data.chiffreAffairesEstime), icon: 'revenue', trend: 'Produits vendus' },
  ]

  const chartData = buildStatutChart(data.produitsParStatut)

  return (
    <div>
      <AdminPageHeader
        title="Tableau de bord"
        description="Données en temps réel depuis le backend assigame"
      />

      <div className="grid sm:grid-cols-2 xl:grid-cols-4 gap-4 mb-6">
        {stats.map(stat => (
          <StatCard key={stat.label} {...stat} />
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-6 mb-6">
        <div className="lg:col-span-2 bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="p-5 border-b border-gray-100">
            <h3 className="text-sm font-bold text-gray-900">Produits récents</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="dashboard-table w-full text-sm text-gray-800">
              <thead>
                <tr className="bg-gray-50 text-left text-gray-500">
                  <th className="px-5 py-3 font-medium">Produit</th>
                  <th className="px-5 py-3 font-medium">Vendeur</th>
                  <th className="px-5 py-3 font-medium">Prix</th>
                  <th className="px-5 py-3 font-medium">Statut</th>
                </tr>
              </thead>
              <tbody>
                {(data.produitsRecents || []).map(p => (
                  <tr key={p.id} className="border-t border-gray-50">
                    <td className="px-5 py-3 font-medium text-gray-900">{p.nom}</td>
                    <td className="px-5 py-3 text-gray-600">{p.vendeur || '—'}</td>
                    <td className="px-5 py-3">{formatPrice(p.prix)}</td>
                    <td className="px-5 py-3">
                      <span className={`inline-flex px-2.5 py-1 rounded-full text-xs font-semibold ${statutToBadgeClass(p.statut)}`}>
                        {formatStatut(p.statut)}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <SimpleDonutChart data={chartData} title="Répartition des produits" />
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
        <div className="flex items-center justify-between gap-3 mb-4">
          <h3 className="text-sm font-bold text-gray-900">Vendeurs récents</h3>
          <Link
            to="/admin/vendeurs"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-brand hover:underline"
          >
            <Plus size={14} />
            Créer un vendeur
          </Link>
        </div>
        <div className="space-y-3">
          {(data.vendeursRecents || []).map(v => (
            <div key={v.id} className="flex items-center justify-between gap-2">
              <div className="flex items-center gap-3 min-w-0">
                <div className="w-8 h-8 rounded-lg bg-brand/10 flex items-center justify-center shrink-0">
                  <Store size={14} className="text-brand" />
                </div>
                <div className="min-w-0">
                  <p className="text-sm font-semibold text-gray-900 truncate">{v.prenom} {v.nom}</p>
                  <p className="text-xs text-gray-500">{v.email || v.login}</p>
                </div>
              </div>
              <span className="text-xs text-brand font-medium">Actif</span>
            </div>
          ))}
          {(data.vendeursRecents || []).length === 0 && (
            <p className="text-sm text-gray-500">Aucun vendeur inscrit.</p>
          )}
        </div>
      </div>
    </div>
  )
}
