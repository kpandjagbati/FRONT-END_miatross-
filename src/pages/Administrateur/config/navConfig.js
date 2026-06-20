import {
  LayoutDashboard, Package, ShoppingCart, Users, Store, FolderTree,
  BarChart3, Settings,
} from 'lucide-react'

export const ADMIN_NAV = [
  { to: '/admin/dashboard', label: 'Tableau de bord', icon: LayoutDashboard },
  { to: '/admin/utilisateurs', label: 'Utilisateurs', icon: Users },
  { to: '/admin/vendeurs', label: 'Vendeurs', icon: Store },
  { to: '/admin/produits', label: 'Produits', icon: Package },
  { to: '/admin/categories', label: 'Catégories', icon: FolderTree },
  { to: '/admin/statistiques', label: 'Statistiques', icon: BarChart3 },
  { to: '/admin/parametres', label: 'Paramètres', icon: Settings },
]

export const STAT_ICONS = {
  store: Store,
  package: Package,
  cart: ShoppingCart,
  revenue: BarChart3,
}
