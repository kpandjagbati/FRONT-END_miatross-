import {
  LayoutDashboard, Package, ShoppingCart, MessageSquare, Star,
  BarChart3, User, Settings, PlusCircle, TrendingUp, AlertTriangle,
} from 'lucide-react'

export const VENDEUR_NAV = [
  { to: '/vendeur/dashboard', label: 'Tableau de bord', icon: LayoutDashboard },
  { to: '/vendeur/produits', label: 'Mes produits', icon: Package },
  { to: '/vendeur/ajouter-produit', label: 'Ajouter un produit', icon: PlusCircle },
  { to: '/vendeur/commandes', label: 'Commandes', icon: ShoppingCart },
  { to: '/vendeur/ventes', label: 'Mes ventes', icon: TrendingUp },
  { to: '/vendeur/messages', label: 'Messages', icon: MessageSquare },
  { to: '/vendeur/avis', label: 'Avis clients', icon: Star },
  { to: '/vendeur/statistiques', label: 'Statistiques', icon: BarChart3 },
  { to: '/vendeur/profil', label: 'Mon profil', icon: User },
  { to: '/vendeur/parametres', label: 'Paramètres', icon: Settings },
]

export const STAT_ICONS = {
  package: Package,
  cart: ShoppingCart,
  revenue: TrendingUp,
  pending: AlertTriangle,
}
