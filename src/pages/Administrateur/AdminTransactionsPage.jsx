import { useEffect, useState } from 'react'
import AdminPageHeader from './components/AdminPageHeader'
import { fetchProduits } from '../../services/api/produitApi'
import { filterProduitsByStatut, formatDate, formatPrice, getVendeurName, sumProduitsPrice } from '../../utils/backendHelpers'

export default function AdminTransactionsPage() {
  const [transactions, setTransactions] = useState([])
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchProduits()
      .then(produits => setTransactions(filterProduitsByStatut(produits, 'VENDU')))
      .catch(err => setError(err.message))
      .finally(() => setLoading(false))
  }, [])

  const total = sumProduitsPrice(transactions)

  return (
    <div>
      <AdminPageHeader title="Transactions" description="Historique des ventes enregistrées sur la plateforme" />

      {error && <p className="text-red-600 text-sm mb-4">{error}</p>}

      <div className="bg-brand/5 border border-brand/20 rounded-2xl p-5 mb-6">
        <p className="text-sm text-gray-600">Total des transactions</p>
        <p className="text-2xl font-bold text-brand mt-1">{formatPrice(total)}</p>
        <p className="text-xs text-gray-500 mt-1">{transactions.length} vente(s) enregistrée(s)</p>
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        {loading ? (
          <p className="p-8 text-center text-gray-500">Chargement…</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="dashboard-table w-full text-sm text-gray-800">
              <thead>
                <tr className="bg-gray-50 text-left text-gray-500">
                  <th className="px-5 py-3 font-medium">Transaction</th>
                  <th className="px-5 py-3 font-medium">Produit</th>
                  <th className="px-5 py-3 font-medium">Vendeur</th>
                  <th className="px-5 py-3 font-medium">Date</th>
                  <th className="px-5 py-3 font-medium">Montant</th>
                </tr>
              </thead>
              <tbody>
                {transactions.map(p => (
                  <tr key={p.id_produit} className="border-t border-gray-50">
                    <td className="px-5 py-3 font-mono text-xs">TXN-{p.id_produit}</td>
                    <td className="px-5 py-3 font-medium">{p.nom_produit}</td>
                    <td className="px-5 py-3">{getVendeurName(p)}</td>
                    <td className="px-5 py-3">{formatDate(p.date_ajout)}</td>
                    <td className="px-5 py-3 font-semibold text-brand">{formatPrice(p.prix)}</td>
                  </tr>
                ))}
                {transactions.length === 0 && (
                  <tr>
                    <td colSpan={5} className="px-5 py-8 text-center text-gray-500">
                      Aucune transaction pour le moment.
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
