import {
  LayoutDashboard, Package, ShoppingCart,
  BarChart3, User, Settings, PlusCircle, TrendingUp, AlertTriangle,
} from 'lucide-react'

export const VENDEUR_NAV = [
  { to: '/vendeur/dashboard', label: 'Tableau de bord', icon: LayoutDashboard },
  { to: '/vendeur/produits', label: 'Mes produits', icon: Package },
  { to: '/vendeur/ajouter-produit', label: 'Ajouter un produit', icon: PlusCircle },
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
