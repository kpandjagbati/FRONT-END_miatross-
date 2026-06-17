import { useEffect, useState } from 'react'
import VendeurPageHeader from './components/VendeurPageHeader'
import { fetchMesProduits } from '../../services/api/produitApi'
import { filterProduitsByStatut, formatDate, formatPrice, formatStatut, statutToBadgeClass } from '../../utils/backendHelpers'

export default function VendeurOrdersPage() {
  const [commandes, setCommandes] = useState([])
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchMesProduits()
      .then(produits => setCommandes(filterProduitsByStatut(produits, 'VENDU')))
      .catch(err => setError(err.message))
      .finally(() => setLoading(false))
  }, [])

  return (
    <div>
      <VendeurPageHeader title="Commandes" description="Ventes finalisées de votre boutique" />

      {error && <p className="text-red-600 text-sm mb-4">{error}</p>}

      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        {loading ? (
          <p className="p-8 text-center text-gray-500">Chargement…</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="dashboard-table w-full text-sm text-gray-800">
              <thead>
                <tr className="bg-gray-50 text-left text-gray-500">
                  <th className="px-5 py-3 font-medium">Réf.</th>
                  <th className="px-5 py-3 font-medium">Produit</th>
                  <th className="px-5 py-3 font-medium">Date</th>
                  <th className="px-5 py-3 font-medium">Montant</th>
                  <th className="px-5 py-3 font-medium">Statut</th>
                </tr>
              </thead>
              <tbody>
                {commandes.map(p => (
                  <tr key={p.id_produit} className="border-t border-gray-50">
                    <td className="px-5 py-3 font-mono text-xs">CMD-{p.id_produit}</td>
                    <td className="px-5 py-3 font-medium">{p.nom_produit}</td>
                    <td className="px-5 py-3">{formatDate(p.date_ajout)}</td>
                    <td className="px-5 py-3">{formatPrice(p.prix)}</td>
                    <td className="px-5 py-3">
                      <span className={`inline-flex px-2.5 py-1 rounded-full text-xs font-semibold ${statutToBadgeClass(p.statut)}`}>
                        {formatStatut(p.statut)}
                      </span>
                    </td>
                  </tr>
                ))}
                {commandes.length === 0 && (
                  <tr>
                    <td colSpan={5} className="px-5 py-8 text-center text-gray-500">
                      Aucune commande. Marquez un produit actif comme vendu depuis « Mes produits ».
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  )
}
