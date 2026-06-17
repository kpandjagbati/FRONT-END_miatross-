import { useEffect, useState } from 'react'
import { ShoppingBag, Trash2 } from 'lucide-react'
import VendeurPageHeader from './components/VendeurPageHeader'
import { deleteProduit, fetchMesProduits, markProduitVendu } from '../../services/api/produitApi'
import { formatPrice, formatStatut, statutToBadgeClass } from '../../utils/backendHelpers'

export default function VendeurProductsPage() {
  const [produits, setProduits] = useState([])
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(true)

  const load = () => {
    setLoading(true)
    fetchMesProduits()
      .then(setProduits)
      .catch(err => setError(err.message))
      .finally(() => setLoading(false))
  }

  useEffect(() => { load() }, [])

  const handleDelete = async (id) => {
    if (!window.confirm('Supprimer ce produit ?')) return
    try {
      await deleteProduit(id)
      setProduits(prev => prev.filter(p => p.id_produit !== id))
    } catch (err) {
      setError(err.message)
    }
  }

  const handleMarkSold = async (id) => {
    if (!window.confirm('Marquer ce produit comme vendu ?')) return
    try {
      await markProduitVendu(id)
      load()
    } catch (err) {
      setError(err.message)
    }
  }

  return (
    <div>
      <VendeurPageHeader title="Mes produits" description="Produits publiés dans votre boutique" />
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
                  <th className="px-5 py-3 font-medium">Catégorie</th>
                  <th className="px-5 py-3 font-medium">Prix</th>
                  <th className="px-5 py-3 font-medium">Statut</th>
                  <th className="px-5 py-3 font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {produits.map(p => (
                  <tr key={p.id_produit} className="border-t border-gray-50">
                    <td className="px-5 py-3 font-medium">{p.nom_produit}</td>
                    <td className="px-5 py-3">{p.categorie_produit?.nom_categorieproduit || '—'}</td>
                    <td className="px-5 py-3">{formatPrice(p.prix)}</td>
                    <td className="px-5 py-3">
                      <span className={`inline-flex px-2.5 py-1 rounded-full text-xs font-semibold ${statutToBadgeClass(p.statut)}`}>
                        {formatStatut(p.statut)}
                      </span>
                    </td>
                    <td className="px-5 py-3">
                      <div className="flex items-center gap-1">
                        {p.statut === 'ACTIF' && (
                          <button type="button" title="Marquer vendu" onClick={() => handleMarkSold(p.id_produit)}
                            className="p-1.5 rounded-lg hover:bg-brand/10 text-brand">
                            <ShoppingBag size={16} />
                          </button>
                        )}
                        <button type="button" onClick={() => handleDelete(p.id_produit)}
                          className="p-1.5 rounded-lg hover:bg-red-50 text-red-500">
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
                {produits.length === 0 && (
                  <tr><td colSpan={5} className="px-5 py-8 text-center text-gray-500">Aucun produit publié.</td></tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  )
}
