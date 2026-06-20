/**
 * @fileoverview Page de profil utilisateur
 * @description Affiche les informations de profil utilisateur, favoris
 * et statistiques. Permet la gestion des paramètres de compte.
 * @version 1.0.0
 */

import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import {
  User, Mail, Phone, MapPin, Calendar, ShoppingBag,
  Heart, ArrowRight, Settings
} from 'lucide-react'
import Navbar from './components/Navbar'
import Footer from './components/Footer'

// ── Données utilisateur (mock) ───────────────────────────────────────────────
const USER_DATA = {
  name: 'Kofi Mensah',
  email: 'kofi.mensah@email.com',
  phone: '+228 90 12 34 56',
  address: 'Lomé, Togo',
  joinDate: '15 Mars 2024',
  stats: {
    wishlist: 8,
    reviews: 5
  }
}

/**
 * Composant InfoCard
 * @component Affiche une information avec icône, libellé et valeur
 * @param {Object} props - Props du composant
 * @param {React.ElementType} props.icon - Composant icône Lucide
 * @param {string} props.label - Libellé de l'information
 * @param {string} props.value - Valeur à afficher
 * @returns {JSX.Element} Carte d'information stylisée
 * @example
 * <InfoCard icon={Mail} label="Email" value="user@example.com" />
 */
// ── Composant carte info ───────────────────────────────────────────────────
function InfoCard({ icon: Icon, label, value }) {
  return (
    <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl">
      <div className="w-10 h-10 rounded-lg bg-brand/10 flex items-center justify-center shrink-0">
        <Icon size={18} className="text-brand" />
      </div>
      <div className="min-w-0">
        <p className="text-xs text-gray-500 mb-0.5">{label}</p>
        <p className="text-sm font-semibold text-gray-900 truncate">{value}</p>
      </div>
    </div>
  )
}

/**
 * Composant StatCard
 * @component Carte de statistique cliquable avec icône et valeur
 * @param {Object} props - Props du composant
 * @param {React.ElementType} props.icon - Composant icône Lucide
 * @param {string} props.label - Libellé de la statistique
 * @param {number|string} props.value - Valeur à afficher
 * @param {string} props.to - Route de redirection au clic
 * @returns {JSX.Element} Carte statistique avec effet hover
 * @example
 * <StatCard icon={Heart} label="Favoris" value={8} to="/wishlist" />
 */
// ── Composant stat ─────────────────────────────────────────────────────────
function StatCard({ icon: Icon, label, value, to }) {
  return (
    <Link
      to={to}
      className="bg-white rounded-2xl p-6 border border-gray-200 hover:border-brand
                 hover:shadow-lg transition-all group"
    >
      <div className="w-12 h-12 rounded-xl bg-brand/10 flex items-center justify-center mb-4">
        <Icon size={24} className="text-brand" />
      </div>
      <p className="text-3xl font-bold text-gray-900 mb-1">{value}</p>
      <p className="text-sm text-gray-600 mb-3">{label}</p>
      <div className="flex items-center gap-1 text-sm text-brand opacity-0
                  group-hover:opacity-100 transition-opacity">
        Voir <ArrowRight size={14} />
      </div>
    </Link>
  )
}

/**
 * Composant UserProfilePage
 * @component Page de profil utilisateur avec gestion des informations
 * @returns {JSX.Element} Page profil avec infos personnelles, statistiques et actions rapides
 * @description
 * - Affiche les informations du profil utilisateur
 * - Affiche les statistiques (favoris, avis)
 * - Actions rapides pour naviguer vers wishlist et paramètres
 */
// ── Page principale ───────────────────────────────────────────────────────────
export default function UserProfilePage() {
  return (
    <div className="min-h-dvh bg-gray-50">
      <Navbar />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">Mon profil</h1>
          <p className="text-gray-600">Gérez vos informations personnelles</p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Colonne gauche - Infos utilisateur */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-1 space-y-6"
          >
            {/* Carte profil */}
            <div className="bg-white rounded-2xl p-6 border border-gray-200">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 rounded-full bg-brand/10 flex items-center justify-center shrink-0">
                  <User size={32} className="text-brand" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-gray-900">{USER_DATA.name}</h2>
                  <p className="text-sm text-gray-500">Membre depuis {USER_DATA.joinDate}</p>
                </div>
              </div>

              <div className="space-y-3">
                <InfoCard
                  icon={Mail}
                  label="Email"
                  value={USER_DATA.email}
                />
                <InfoCard
                  icon={Phone}
                  label="Téléphone"
                  value={USER_DATA.phone}
                />
                <InfoCard
                  icon={MapPin}
                  label="Adresse"
                  value={USER_DATA.address}
                />
                <InfoCard
                  icon={Calendar}
                  label="Membre depuis"
                  value={USER_DATA.joinDate}
                />
              </div>
            </div>

            {/* Actions rapides */}
            <div className="bg-white rounded-2xl p-6 border border-gray-200">
              <h3 className="font-semibold text-gray-900 mb-4">Actions rapides</h3>
              <div className="space-y-2">
                <Link
                  to="/categories"
                  className="flex items-center gap-3 p-3 rounded-xl hover:bg-gray-50
                             transition-colors text-gray-700 hover:text-brand"
                >
                  <ShoppingBag size={18} />
                  <span className="text-sm">Parcourir le catalogue</span>
                </Link>
                <Link
                  to="/wishlist"
                  className="flex items-center gap-3 p-3 rounded-xl hover:bg-gray-50
                             transition-colors text-gray-700 hover:text-brand"
                >
                  <Heart size={18} />
                  <span className="text-sm">Mes favoris</span>
                </Link>
                <button className="flex items-center gap-3 p-3 rounded-xl hover:bg-gray-50
                                transition-colors text-gray-700 hover:text-brand w-full text-left">
                  <Settings size={18} />
                  <span className="text-sm">Paramètres</span>
                </button>
              </div>
            </div>
          </motion.div>

          {/* Colonne droite - Stats */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-2 space-y-6"
          >
            {/* Stats */}
            <div className="grid grid-cols-2 gap-4">
              <StatCard
                icon={Heart}
                label="Favoris"
                value={USER_DATA.stats.wishlist}
                to="/wishlist"
              />
              <StatCard
                icon={User}
                label="Avis"
                value={USER_DATA.stats.reviews}
                to="#"
              />
            </div>

            {/* Informations supplémentaires */}
            <div className="bg-white rounded-2xl p-6 border border-gray-200">
              <h3 className="font-semibold text-gray-900 mb-4">Préférences</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
                  <div className="flex items-center gap-3">
                    <Mail size={18} className="text-gray-500" />
                    <span className="text-sm text-gray-700">Notifications par email</span>
                  </div>
                  <div className="w-12 h-6 bg-brand rounded-full relative">
                    <div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full" />
                  </div>
                </div>
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
                  <div className="flex items-center gap-3">
                    <Phone size={18} className="text-gray-500" />
                    <span className="text-sm text-gray-700">Notifications SMS</span>
                  </div>
                  <div className="w-12 h-6 bg-gray-300 rounded-full relative">
                    <div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full" />
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
