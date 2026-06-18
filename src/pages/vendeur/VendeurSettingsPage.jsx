/**
 * VendeurSettingsPage
 * ──────────────────
 * Hub central des paramètres du vendeur.
 * Accès rapide aux pages de configuration :
 * 
 * Liens disponibles :
 * 1. Mon profil - Modifier les informations personnelles
 * 2. Notifications - Consulter les alertes sur les produits
 * 3. Sécurité - Redirecte vers la page auth pour changer le mot de passe
 * 
 * Format : Grille de cartes cliquables avec icônes et descriptions
 */

import { Link } from 'react-router-dom'
import { User, Bell, Shield } from 'lucide-react'
import VendeurPageHeader from './components/VendeurPageHeader'

const LINKS = [
  {
    to: '/vendeur/profil',
    icon: User,
    title: 'Mon profil',
    description: 'Modifier vos informations personnelles et votre mot de passe',
  },
  {
    to: '/vendeur/messages',
    icon: Bell,
    title: 'Notifications',
    description: 'Consulter les alertes liées à vos produits',
  },
  {
    to: '/auth',
    icon: Shield,
    title: 'Sécurité',
    description: 'Changez régulièrement votre mot de passe depuis votre profil',
  },
]

export default function VendeurSettingsPage() {
  return (
    <div>
      <VendeurPageHeader title="Paramètres" description="Gérez votre compte et vos préférences" />

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {LINKS.map(({ to, icon: Icon, title, description }) => (
          <Link
            key={to}
            to={to}
            className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm hover:border-brand/30 hover:shadow-md transition-all group"
          >
            <div className="w-10 h-10 rounded-xl bg-brand/10 flex items-center justify-center mb-3 group-hover:bg-brand/15">
              <Icon size={20} className="text-brand" />
            </div>
            <p className="font-semibold text-gray-900">{title}</p>
            <p className="text-sm text-gray-500 mt-1">{description}</p>
          </Link>
        ))}
      </div>
    </div>
  )
}
