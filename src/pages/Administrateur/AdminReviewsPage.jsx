import { useEffect, useState } from 'react'
import { Check, X } from 'lucide-react'
import AdminPageHeader from './components/AdminPageHeader'
import { fetchProduits, updateProduitStatut } from '../../services/api/produitApi'
import { formatPrice, formatStatut, getVendeurName, statutToBadgeClass } from '../../utils/backendHelpers'

export default function AdminReviewsPage() {
  const [items, setItems] = useState([])
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(true)

  const load = () => {
    setLoading(true)
    fetchProduits()
      .then(produits => setItems(produits.filter(p => p.statut === 'EN_ATTENTE' || p.statut === 'REFUSE')))
      .catch(err => setError(err.message))
      .finally(() => setLoading(false))
  }

  useEffect(() => { load() }, [])

  const handleStatut = async (id, statut) => {
    try {
      await updateProduitStatut(id, statut)
      load()
    } catch (err) {
      setError(err.message)
    }
  }

  return (
    <div>
      <AdminPageHeader title="Avis & Réclamations" description="Produits en attente ou refusés à traiter" />

      {error && <p className="text-red-600 text-sm mb-4">{error}</p>}

      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        {loading ? (
          <p className="p-8 text-center text-gray-500">Chargement…</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="dashboard-table w-full text-sm text-gray-800">
              <thead>
                <tr className="bg-gray-50 text-left text-gray-500">
                  <th className="px-5 py-3 font-medium">Produit</th>
                  <th className="px-5 py-3 font-medium">Vendeur</th>
                  <th className="px-5 py-3 font-medium">Prix</th>
                  <th className="px-5 py-3 font-medium">Statut</th>
                  <th className="px-5 py-3 font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {items.map(p => (
                  <tr key={p.id_produit} className="border-t border-gray-50">
                    <td className="px-5 py-3 font-medium">{p.nom_produit}</td>
                    <td className="px-5 py-3">{getVendeurName(p)}</td>
                    <td className="px-5 py-3">{formatPrice(p.prix)}</td>
                    <td className="px-5 py-3">
                      <span className={`inline-flex px-2.5 py-1 rounded-full text-xs font-semibold ${statutToBadgeClass(p.statut)}`}>
                        {formatStatut(p.statut)}
                      </span>
                    </td>
                    <td className="px-5 py-3">
                      {p.statut === 'EN_ATTENTE' && (
                        <div className="flex items-center gap-1">
                          <button type="button" title="Approuver" onClick={() => handleStatut(p.id_produit, 'ACTIF')}
                            className="p-1.5 rounded-lg hover:bg-brand/10 text-brand">
                            <Check size={16} />
                          </button>
                          <button type="button" title="Refuser" onClick={() => handleStatut(p.id_produit, 'REFUSE')}
                            className="p-1.5 rounded-lg hover:bg-red-50 text-red-500">
                            <X size={16} />
                          </button>
                        </div>
                      )}
                      {p.statut === 'REFUSE' && (
                        <button type="button" onClick={() => handleStatut(p.id_produit, 'ACTIF')}
                          className="text-xs font-semibold text-brand hover:underline">
                          Réactiver
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
                {items.length === 0 && (
                  <tr>
                    <td colSpan={5} className="px-5 py-8 text-center text-gray-500">
                      Aucun produit en attente ou refusé.
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
