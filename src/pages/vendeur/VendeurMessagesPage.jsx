/**
 * VendeurMessagesPage
 * ──────────────────
 * Centre de notifications du vendeur.
 * Affiche les alertes générées automatiquement sur les produits :
 * - Info : Nouveaux produits
 * - Success : Produits approuvés
 * - Error : Produits refusés ou problèmes
 * 
 * Types de notifications construites à partir du statut des produits :
 * - EN_ATTENTE : Info
 * - ACTIF : Success
 * - REFUSE : Error
 * 
 * Données : Construites via buildProductNotifications() depuis fetchMesProduits()
 */

import { useEffect, useState } from 'react'
import { Bell, CheckCircle, AlertCircle, Info } from 'lucide-react'
import VendeurPageHeader from './components/VendeurPageHeader'
import { fetchMesProduits } from '../../services/api/produitApi'
import { buildProductNotifications } from '../../utils/backendHelpers'

const ICONS = {
  info: Info,
  success: CheckCircle,
  error: AlertCircle,
}

const STYLES = {
  info: 'bg-blue-50 border-blue-200 text-blue-800',
  success: 'bg-green-50 border-green-200 text-green-800',
  error: 'bg-red-50 border-red-200 text-red-800',
}

export default function VendeurMessagesPage() {
  const [messages, setMessages] = useState([])
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchMesProduits()
      .then(produits => setMessages(buildProductNotifications(produits)))
      .catch(err => setError(err.message))
      .finally(() => setLoading(false))
  }, [])

  return (
    <div>
      <VendeurPageHeader title="Messages" description="Notifications liées à vos produits" />

      {error && <p className="text-red-600 text-sm mb-4">{error}</p>}

      {loading ? (
        <p className="text-gray-500 text-center py-12">Chargement…</p>
      ) : (
        <div className="space-y-3">
          {messages.map(msg => {
            const Icon = ICONS[msg.type] || Bell
            return (
              <div key={msg.id} className={`rounded-2xl border p-4 flex gap-3 ${STYLES[msg.type]}`}>
                <Icon size={20} className="shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-sm">{msg.title}</p>
                  <p className="text-sm mt-1 opacity-90">{msg.message}</p>
                </div>
              </div>
            )
          })}
          {messages.length === 0 && (
            <div className="bg-white rounded-2xl border border-gray-100 p-12 text-center shadow-sm">
              <Bell size={32} className="mx-auto text-gray-300 mb-3" />
              <p className="text-gray-500">Aucun message pour le moment.</p>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
