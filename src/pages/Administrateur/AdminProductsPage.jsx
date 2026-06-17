import { useEffect, useState } from 'react'
import { Check, ShoppingBag, Trash2, X } from 'lucide-react'
import AdminPageHeader from './components/AdminPageHeader'
import { deleteProduit, fetchProduits, updateProduitStatut } from '../../services/api/produitApi'
import { formatPrice, formatStatut, statutToBadgeClass } from '../../utils/backendHelpers'

export default function AdminProductsPage() {
  const [produits, setProduits] = useState([])
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(true)

  const load = () => {
    setLoading(true)
    fetchProduits()
      .then(setProduits)
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

  const handleDelete = async (id) => {
    if (!window.confirm('Supprimer ce produit ?')) return
    try {
      await deleteProduit(id)
      setProduits(prev => prev.filter(p => p.id_produit !== id))
    } catch (err) {
      setError(err.message)
    }
  }

  return (
    <div>
      <AdminPageHeader title="Produits" description="Modération et validation des produits vendeurs" />
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
                    <td className="px-5 py-3">
                      {p.utilisateur ? `${p.utilisateur.prenom_utilisateur} ${p.utilisateur.nom_utilisateur}` : '—'}
                    </td>
                    <td className="px-5 py-3">{p.categorie_produit?.nom_categorieproduit || '—'}</td>
                    <td className="px-5 py-3">{formatPrice(p.prix)}</td>
                    <td className="px-5 py-3">
                      <span className={`inline-flex px-2.5 py-1 rounded-full text-xs font-semibold ${statutToBadgeClass(p.statut)}`}>
                        {formatStatut(p.statut)}
                      </span>
                    </td>
                    <td className="px-5 py-3">
                      <div className="flex items-center gap-1">
                        {p.statut === 'EN_ATTENTE' && (
                          <>
                            <button type="button" title="Approuver" onClick={() => handleStatut(p.id_produit, 'ACTIF')}
                              className="p-1.5 rounded-lg hover:bg-brand/10 text-brand">
                              <Check size={16} />
                            </button>
                            <button type="button" title="Refuser" onClick={() => handleStatut(p.id_produit, 'REFUSE')}
                              className="p-1.5 rounded-lg hover:bg-red-50 text-red-500">
                              <X size={16} />
                            </button>
                          </>
                        )}
                        {p.statut === 'ACTIF' && (
                          <button type="button" title="Marquer vendu" onClick={() => handleStatut(p.id_produit, 'VENDU')}
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
                  <tr><td colSpan={6} className="px-5 py-8 text-center text-gray-500">Aucun produit.</td></tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  )
}
