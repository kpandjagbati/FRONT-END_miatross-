import { useEffect, useState } from 'react'
import VendeurPageHeader from './components/VendeurPageHeader'
import StatCard from './components/StatCard'
import { fetchMesProduits } from '../../services/api/produitApi'
import { filterProduitsByStatut, formatDate, formatPrice, sumProduitsPrice } from '../../utils/backendHelpers'

export default function VendeurSalesPage() {
  const [ventes, setVentes] = useState([])
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchMesProduits()
      .then(produits => setVentes(filterProduitsByStatut(produits, 'VENDU')))
      .catch(err => setError(err.message))
      .finally(() => setLoading(false))
  }, [])

  const total = sumProduitsPrice(ventes)
  const moyenne = ventes.length ? total / ventes.length : 0

  const stats = [
    { label: 'Ventes totales', value: String(ventes.length), icon: 'cart', trend: 'Produits vendus' },
    { label: 'Chiffre d\'affaires', value: formatPrice(total), icon: 'revenue', trend: 'Cumul' },
    { label: 'Panier moyen', value: formatPrice(moyenne), icon: 'package', trend: 'Par vente' },
  ]

  return (
    <div>
      <VendeurPageHeader title="Mes ventes" description="Suivi de vos ventes enregistrées" />

      {error && <p className="text-red-600 text-sm mb-4">{error}</p>}

      {loading ? (
        <p className="text-gray-500 text-center py-12">Chargement…</p>
      ) : (
        <>
          <div className="grid sm:grid-cols-3 gap-4 mb-6">
            {stats.map(stat => <StatCard key={stat.label} {...stat} />)}
          </div>

          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="dashboard-table w-full text-sm text-gray-800">
                <thead>
                  <tr className="bg-gray-50 text-left text-gray-500">
                    <th className="px-5 py-3 font-medium">Produit</th>
                    <th className="px-5 py-3 font-medium">Date</th>
                    <th className="px-5 py-3 font-medium">Montant</th>
                  </tr>
                </thead>
                <tbody>
                  {ventes.map(p => (
                    <tr key={p.id_produit} className="border-t border-gray-50">
                      <td className="px-5 py-3 font-medium">{p.nom_produit}</td>
                      <td className="px-5 py-3">{formatDate(p.date_ajout)}</td>
                      <td className="px-5 py-3 font-semibold text-brand">{formatPrice(p.prix)}</td>
                    </tr>
                  ))}
                  {ventes.length === 0 && (
                    <tr>
                      <td colSpan={3} className="px-5 py-8 text-center text-gray-500">
                        Aucune vente enregistrée pour le moment.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </>
      )}
    </div>
  )
}
