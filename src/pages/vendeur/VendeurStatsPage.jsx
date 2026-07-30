import { useCallback, useEffect, useMemo, useState } from 'react'
import { AlertTriangle, Package, TrendingUp } from 'lucide-react'
import VendeurPageHeader from './components/VendeurPageHeader'
import SparklineBarCard from '../Administrateur/components/dashboard/SparklineBarCard'
import SparklineAreaCard from '../Administrateur/components/dashboard/SparklineAreaCard'
import VerticalKpiCard from '../Administrateur/components/dashboard/VerticalKpiCard'
import RevenueGrowthCard from '../Administrateur/components/dashboard/RevenueGrowthCard'
import ProductStatusDonut from '../Administrateur/components/dashboard/ProductStatusDonut'
import StatusBarReport from '../Administrateur/components/dashboard/StatusBarReport'
import RadialProgressCard from '../Administrateur/components/dashboard/RadialProgressCard'
import AreaTrendCard from '../Administrateur/components/dashboard/AreaTrendCard'
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
import { formatPrice, formatStatut } from '../../utils/backendHelpers'

const STATUT_COLORS = {
  ACTIF: CHART_COLORS.brand,
  EN_ATTENTE: CHART_COLORS.warning,
  REFUSE: CHART_COLORS.danger,
  INACTIF: CHART_COLORS.muted,
  VENDU: '#4a6fa5',
}

const REFRESH_MS = 30_000

export default function VendeurStatsPage() {
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
    const produitsMois = data.produitsParMois || []
    const caMois = data.caParMois || []
    const monthLabels = seriesLabels(produitsMois).length
      ? seriesLabels(produitsMois)
      : ['Jan', 'Fév', 'Mar', 'Avr', 'Mai', 'Jun', 'Jul', 'Aoû', 'Sep']
    const dayLabels = seriesLabels(caJour).length ? seriesLabels(caJour) : defaultDayLabels(7)
    const vendus = Number(parStatut.VENDU) || 0

    return {
      produitsSpark: ensureSeries(seriesValues(produitsJour), 7),
      caSpark: ensureSeries(seriesValues(caJour).map(v => Math.round(v / 1000) || 0), 7),
      caWeekRaw: ensureSeries(seriesValues(caJour), 7),
      caWeekLabels: dayLabels,
      produitsTrend: seriesTrendPercent(produitsJour),
      caTrend: seriesTrendPercent(caJour),
      actifsPct,
      vendus,
      donutLabels: statutEntries.map(([k]) => formatStatut(k)),
      donutSeries: statutEntries.map(([, v]) => Number(v) || 0),
      donutColors: statutEntries.map(([k]) => STATUT_COLORS[k] || CHART_COLORS.muted),
      barCategories: statutEntries.map(([k]) => formatStatut(k)),
      barSeries: statutEntries.map(([, v]) => Number(v) || 0),
      areaCategories: monthLabels,
      areaSeries: [
        { name: 'Produits ajoutés', data: ensureSeries(seriesValues(produitsMois), 9) },
        { name: 'CA (×1k FCFA)', data: ensureSeries(seriesValues(caMois).map(v => Math.round(v / 1000) || 0), 9) },
      ],
      activities: data.activitesRecentes || [],
    }
  }, [data])

  if (loading && !data) {
    return <p className="text-gray-500 text-center py-12">Chargement des statistiques…</p>
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
        title="Statistiques"
        description={
          lastUpdated
            ? `Analyses live de votre boutique — maj ${lastUpdated.toLocaleTimeString('fr-FR')}`
            : 'Analyses synchronisées avec vos produits et ventes'
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
            title="Actifs"
            subtitle="En boutique"
            value={compactNumber(data.produitsActifs)}
            chipText={`${charts.actifsPct}%`}
            chipTone="success"
            icon={Package}
            iconTone="brand"
          />
        </div>

        <div className="col-span-12 sm:col-span-6 lg:col-span-2">
          <VerticalKpiCard
            title="En attente"
            subtitle="Modération"
            value={String(data.produitsEnAttente ?? 0)}
            chipText={data.produitsEnAttente > 0 ? 'En cours' : 'À jour'}
            chipTone={data.produitsEnAttente > 0 ? 'warning' : 'success'}
            icon={AlertTriangle}
            iconTone={data.produitsEnAttente > 0 ? 'warning' : 'success'}
          />
        </div>

        <div className="col-span-12 lg:col-span-4">
          <RevenueGrowthCard
            title="CA de la semaine"
            subtitle="Basé sur date de vente"
            value={formatPrice(data.totalVentesEstime)}
            trend={formatTrend(charts.caTrend)}
            seriesData={charts.caWeekRaw}
            categories={charts.caWeekLabels}
          />
        </div>
      </div>

      <div className="grid grid-cols-12 gap-4 mb-4">
        <div className="col-span-12 lg:col-span-8">
          <AreaTrendCard
            title="Évolution de ma boutique"
            subtitle="Produits ajoutés et CA vendu (9 mois)"
            categories={charts.areaCategories}
            series={charts.areaSeries}
          />
        </div>
        <div className="col-span-12 lg:col-span-4">
          <RadialProgressCard
            title="Taux de publication"
            subtitle="Produits actifs / total"
            percent={charts.actifsPct}
            detail={`${data.produitsActifs || 0} actifs sur ${data.totalProduits || 0}`}
          />
        </div>
      </div>

      <div className="grid grid-cols-12 gap-4 mb-4">
        <div className="col-span-12 lg:col-span-8">
          <StatusBarReport
            title="Volume par statut"
            subtitle="État de votre catalogue"
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
          <ActivityFeed title="Actions récentes" items={charts.activities} />
        </div>
        <div className="col-span-12 lg:col-span-8 grid sm:grid-cols-2 gap-4">
          <VerticalKpiCard
            title="Produits vendus"
            subtitle="Statut VENDU"
            value={compactNumber(charts.vendus)}
            chipText="Ventes enregistrées"
            chipTone="success"
            icon={TrendingUp}
            iconTone="success"
          />
          <VerticalKpiCard
            title="CA total"
            subtitle="Estimation"
            value={formatPrice(data.totalVentesEstime)}
            chipText={formatTrend(charts.caTrend)}
            chipTone={charts.caTrend >= 0 ? 'success' : 'danger'}
            icon={TrendingUp}
            iconTone="brand"
          />
          <SparklineBarCard
            title="Ajouts produits"
            subtitle="7 derniers jours"
            value={compactNumber(data.totalProduits)}
            trend={formatTrend(charts.produitsTrend)}
            trendPositive={charts.produitsTrend >= 0}
            seriesData={charts.produitsSpark}
          />
          <SparklineAreaCard
            title="CA journalier (k)"
            subtitle="Ventes marquées"
            value={compactNumber(Math.round((data.totalVentesEstime || 0) / 1000))}
            trend={formatPrice(data.totalVentesEstime)}
            trendPositive={charts.caTrend >= 0}
            seriesData={charts.caSpark}
            color={CHART_COLORS.brand}
          />
        </div>
      </div>
    </div>
  )
}
