import { useEffect, useState } from 'react'
import { AlertTriangle } from 'lucide-react'
import VendeurPageHeader from './components/VendeurPageHeader'
import { fetchMesProduits } from '../../services/api/produitApi'
import { formatPrice, formatStatut, statutToBadgeClass } from '../../utils/backendHelpers'

export default function VendeurReviewsPage() {
  const [items, setItems] = useState([])
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchMesProduits()
      .then(produits => setItems(produits.filter(p => p.statut === 'REFUSE')))
      .catch(err => setError(err.message))
      .finally(() => setLoading(false))
  }, [])

  return (
    <div>
      <VendeurPageHeader title="Avis clients" description="Produits refusés nécessitant votre attention" />

      {error && <p className="text-red-600 text-sm mb-4">{error}</p>}

      {loading ? (
        <p className="text-gray-500 text-center py-12">Chargement…</p>
      ) : (
        <div className="space-y-3">
          {items.map(p => (
            <div key={p.id_produit} className="bg-white rounded-2xl border border-red-100 p-5 shadow-sm">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-xl bg-red-50 flex items-center justify-center shrink-0">
                  <AlertTriangle size={18} className="text-red-500" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-center gap-2 mb-1">
                    <p className="font-semibold text-gray-900">{p.nom_produit}</p>
                    <span className={`inline-flex px-2.5 py-1 rounded-full text-xs font-semibold ${statutToBadgeClass(p.statut)}`}>
                      {formatStatut(p.statut)}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600">
                    Ce produit a été refusé par l'administrateur. Modifiez-le ou ajoutez un nouveau produit conforme.
                  </p>
                  <p className="text-sm font-medium text-brand mt-2">{formatPrice(p.prix)}</p>
                </div>
              </div>
            </div>
          ))}
          {items.length === 0 && (
            <div className="bg-white rounded-2xl border border-gray-100 p-12 text-center shadow-sm">
              <p className="text-gray-500">Aucun produit refusé. Tout va bien !</p>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
