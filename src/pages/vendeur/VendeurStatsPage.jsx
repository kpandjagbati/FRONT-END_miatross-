import { useEffect, useState } from 'react'
import VendeurPageHeader from './components/VendeurPageHeader'
import StatCard from './components/StatCard'
import SimpleDonutChart from './components/SimpleDonutChart'
import SimpleLineChart from './components/SimpleLineChart'
import { fetchVendeurDashboard } from '../../services/api/dashboardApi'
import { buildStatutChart, buildStatutTrendData, formatPrice } from '../../utils/backendHelpers'

export default function VendeurStatsPage() {
  const [data, setData] = useState(null)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchVendeurDashboard()
      .then(setData)
      .catch(err => setError(err.message))
      .finally(() => setLoading(false))
  }, [])

  if (loading) return <p className="text-gray-500 text-center py-12">Chargement…</p>
  if (error) return <div className="bg-red-50 border border-red-200 rounded-xl p-6 text-red-700 text-sm">{error}</div>

  const stats = [
    { label: 'Produits publiés', value: String(data.totalProduits), icon: 'package', trend: `${data.produitsActifs} actifs` },
    { label: 'En attente', value: String(data.produitsEnAttente), icon: 'pending', trend: 'Validation admin' },
    { label: 'Produits actifs', value: String(data.produitsActifs), icon: 'cart', trend: 'En boutique' },
    { label: 'Ventes', value: formatPrice(data.totalVentesEstime), icon: 'revenue', trend: 'Total estimé' },
  ]

  return (
    <div>
      <VendeurPageHeader title="Statistiques" description="Analyses détaillées de votre activité" />

      <div className="grid sm:grid-cols-2 xl:grid-cols-4 gap-4 mb-6">
        {stats.map(stat => <StatCard key={stat.label} {...stat} />)}
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <SimpleDonutChart data={buildStatutChart(data.produitsParStatut)} title="Répartition de vos produits" />
        <SimpleLineChart data={buildStatutTrendData(data.produitsParStatut)} title="Volume par statut" />
      </div>
    </div>
  )
}
