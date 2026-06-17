import { useEffect, useState } from 'react'
import AdminPageHeader from './components/AdminPageHeader'
import StatCard from './components/StatCard'
import SimpleDonutChart from './components/SimpleDonutChart'
import SimpleLineChart from './components/SimpleLineChart'
import { fetchAdminDashboard } from '../../services/api/dashboardApi'
import { buildStatutChart, buildStatutTrendData, formatPrice } from '../../utils/backendHelpers'

export default function AdminStatsPage() {
  const [data, setData] = useState(null)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchAdminDashboard()
      .then(setData)
      .catch(err => setError(err.message))
      .finally(() => setLoading(false))
  }, [])

  if (loading) return <p className="text-gray-500 text-center py-12">Chargement…</p>
  if (error) return <div className="bg-red-50 border border-red-200 rounded-xl p-6 text-red-700 text-sm">{error}</div>

  const stats = [
    { label: 'Utilisateurs', value: String(data.totalUtilisateurs), icon: 'store', trend: `${data.totalVendeurs} vendeurs` },
    { label: 'Produits', value: String(data.totalProduits), icon: 'package', trend: `${data.produitsActifs} actifs` },
    { label: 'En attente', value: String(data.produitsEnAttente), icon: 'cart', trend: 'Modération requise' },
    { label: "Chiffre d'affaires", value: formatPrice(data.chiffreAffairesEstime), icon: 'revenue', trend: 'Produits vendus' },
  ]

  return (
    <div>
      <AdminPageHeader title="Statistiques" description="Analyses de la plateforme depuis le backend" />

      <div className="grid sm:grid-cols-2 xl:grid-cols-4 gap-4 mb-6">
        {stats.map(stat => <StatCard key={stat.label} {...stat} />)}
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <SimpleDonutChart data={buildStatutChart(data.produitsParStatut)} title="Répartition par statut" />
        <SimpleLineChart data={buildStatutTrendData(data.produitsParStatut)} title="Volume par statut" />
      </div>
    </div>
  )
}
