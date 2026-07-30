import { useCallback, useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { AlertTriangle, Package, Plus } from 'lucide-react'
import VendeurPageHeader from './components/VendeurPageHeader'
import SparklineBarCard from '../Administrateur/components/dashboard/SparklineBarCard'
import SparklineAreaCard from '../Administrateur/components/dashboard/SparklineAreaCard'
import VerticalKpiCard from '../Administrateur/components/dashboard/VerticalKpiCard'
import RevenueGrowthCard from '../Administrateur/components/dashboard/RevenueGrowthCard'
import ProductStatusDonut from '../Administrateur/components/dashboard/ProductStatusDonut'
import StatusBarReport from '../Administrateur/components/dashboard/StatusBarReport'
import ActivityFeed from '../Administrateur/components/dashboard/ActivityFeed'
import {
  CHART_COLORS,
  compactNumber,
  defaultDayLabels,
  ensureSeries,
  formatTrend,
  seriesLabels,
  seriesTrendPercent,
  seriesValues,
} from '../Administrateur/components/dashboard/chartHelpers'
import { fetchVendeurDashboard } from '../../services/api/dashboardApi'
import { formatPrice, formatStatut, statutToBadgeClass } from '../../utils/backendHelpers'

const STATUT_COLORS = {
  ACTIF: CHART_COLORS.brand,
  EN_ATTENTE: CHART_COLORS.warning,
  REFUSE: CHART_COLORS.danger,
  INACTIF: CHART_COLORS.muted,
  VENDU: '#4a6fa5',
}

const REFRESH_MS = 30_000

export default function VendeurDashboardPage() {
  const [data, setData] = useState(null)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(true)
  const [lastUpdated, setLastUpdated] = useState(null)

  const load = useCallback(async (silent = false) => {
    if (!silent) setLoading(true)
    try {
      const payload = await fetchVendeurDashboard()
      setData(payload)
      setError('')
      setLastUpdated(new Date())
    } catch (err) {
      setError(err.message)
    } finally {
      if (!silent) setLoading(false)
    }
  }, [])

  useEffect(() => {
    load(false)
    const id = setInterval(() => load(true), REFRESH_MS)
    const onFocus = () => load(true)
    window.addEventListener('focus', onFocus)
    return () => {
      clearInterval(id)
      window.removeEventListener('focus', onFocus)
    }
  }, [load])

  const charts = useMemo(() => {
    if (!data) return null

    const parStatut = data.produitsParStatut || {}
    const statutEntries = Object.entries(parStatut)
    const actifsPct = data.totalProduits
      ? Math.round(((data.produitsActifs || 0) / data.totalProduits) * 100)
      : 0

    const produitsJour = data.produitsParJour || []
    const caJour = data.caParJour || []
    const dayLabels = seriesLabels(caJour).length ? seriesLabels(caJour) : defaultDayLabels(7)

    return {
      produitsSpark: ensureSeries(seriesValues(produitsJour), 7),
      caSpark: ensureSeries(seriesValues(caJour).map(v => Math.round(v / 1000) || 0), 7),
      caWeekRaw: ensureSeries(seriesValues(caJour), 7),
      caWeekLabels: dayLabels,
      produitsTrend: seriesTrendPercent(produitsJour),
      caTrend: seriesTrendPercent(caJour),
      actifsPct,
      donutLabels: statutEntries.map(([k]) => formatStatut(k)),
      donutSeries: statutEntries.map(([, v]) => Number(v) || 0),
      donutColors: statutEntries.map(([k]) => STATUT_COLORS[k] || CHART_COLORS.muted),
      barCategories: statutEntries.map(([k]) => formatStatut(k)),
      barSeries: statutEntries.map(([, v]) => Number(v) || 0),
      activities: data.activitesRecentes || [],
    }
  }, [data])

  if (loading && !data) {
    return <p className="text-gray-500 text-center py-12">Chargement du tableau de bord…</p>
  }

  if (error && !data) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-xl p-6 text-red-700 text-sm">
        {error}
      </div>
    )
  }

  return (
    <div>
      <VendeurPageHeader
        title="Tableau de bord"
        description={
          lastUpdated
            ? `Synchronisé avec vos actions — maj ${lastUpdated.toLocaleTimeString('fr-FR')}`
            : 'Statistiques synchronisées avec votre boutique'
        }
      />

      <div className="grid grid-cols-12 gap-4 mb-4">
        <div className="col-span-12 sm:col-span-6 lg:col-span-2">
          <SparklineBarCard
            title="Produits"
            subtitle="Ajouts (7 j)"
            value={compactNumber(data.totalProduits)}
            trend={formatTrend(charts.produitsTrend)}
            trendPositive={charts.produitsTrend >= 0}
            seriesData={charts.produitsSpark}
          />
        </div>

        <div className="col-span-12 sm:col-span-6 lg:col-span-2">
          <SparklineAreaCard
            title="Ventes"
            subtitle="CA (7 j)"
            value={compactNumber(data.totalVentesEstime)}
            trend={formatTrend(charts.caTrend)}
            trendPositive={charts.caTrend >= 0}
            seriesData={charts.caSpark}
            color={CHART_COLORS.success}
          />
        </div>

        <div className="col-span-12 sm:col-span-6 lg:col-span-2">
          <VerticalKpiCard
            title="En attente"
            subtitle="Validation"
            value={String(data.produitsEnAttente ?? 0)}
            chipText={data.produitsEnAttente > 0 ? 'En cours' : 'À jour'}
            chipTone={data.produitsEnAttente > 0 ? 'warning' : 'success'}
            icon={AlertTriangle}
            iconTone={data.produitsEnAttente > 0 ? 'warning' : 'success'}
          />
        </div>

        <div className="col-span-12 sm:col-span-6 lg:col-span-2">
          <VerticalKpiCard
            title="Actifs"
            subtitle="En boutique"
            value={compactNumber(data.produitsActifs)}
            chipText={`${charts.actifsPct}%`}
            chipTone="success"
            icon={Package}
            iconTone="brand"
          />
        </div>

        <div className="col-span-12 lg:col-span-4">
          <RevenueGrowthCard
            title="CA de la semaine"
            subtitle="Produits marqués vendus"
            value={formatPrice(data.totalVentesEstime)}
            trend={formatTrend(charts.caTrend)}
            seriesData={charts.caWeekRaw}
            categories={charts.caWeekLabels}
          />
        </div>
      </div>

      <div className="grid grid-cols-12 gap-4 mb-4">
        <div className="col-span-12 lg:col-span-8">
          <StatusBarReport
            title="Mes produits"
            subtitle="Volume par statut"
            categories={charts.barCategories}
            seriesData={charts.barSeries}
          />
        </div>
        <div className="col-span-12 lg:col-span-4">
          <ProductStatusDonut
            title="Répartition"
            subtitle="Statuts de vos produits"
            totalLabel="Total"
            totalValue={data.totalProduits ?? 0}
            trend={`${charts.actifsPct}% actifs`}
            labels={charts.donutLabels}
            series={charts.donutSeries}
            colors={charts.donutColors}
          />
        </div>
      </div>

      <div className="grid grid-cols-12 gap-4">
        <div className="col-span-12 lg:col-span-4">
          <ActivityFeed title="Activité de ma boutique" items={charts.activities} />
        </div>

        <div className="col-span-12 lg:col-span-8 bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="p-5 border-b border-gray-100 flex items-center justify-between gap-3">
            <h3 className="text-sm font-bold text-gray-900">Mes produits récents</h3>
            <Link
              to="/vendeur/ajouter-produit"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-brand hover:underline"
            >
              <Plus size={14} />
              Ajouter
            </Link>
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
    </div>
  )
}
