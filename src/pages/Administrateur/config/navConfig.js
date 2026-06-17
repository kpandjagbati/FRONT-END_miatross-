import {
  LayoutDashboard, Package, ShoppingCart, Users, Store, FolderTree,
  CreditCard, MessageSquare, BarChart3, Settings,
} from 'lucide-react'

export const ADMIN_NAV = [
  { to: '/admin/dashboard', label: 'Tableau de bord', icon: LayoutDashboard },
  { to: '/admin/utilisateurs', label: 'Utilisateurs', icon: Users },
  { to: '/admin/vendeurs', label: 'Vendeurs', icon: Store },
  { to: '/admin/produits', label: 'Produits', icon: Package },
  { to: '/admin/categories', label: 'Catégories', icon: FolderTree },
  { to: '/admin/commandes', label: 'Commandes', icon: ShoppingCart },
  { to: '/admin/transactions', label: 'Transactions', icon: CreditCard },
  { to: '/admin/avis', label: 'Avis & Réclamations', icon: MessageSquare },
  { to: '/admin/statistiques', label: 'Statistiques', icon: BarChart3 },
  { to: '/admin/parametres', label: 'Paramètres', icon: Settings },
]

export const STAT_ICONS = {
  store: Store,
  package: Package,
  cart: ShoppingCart,
  revenue: BarChart3,
}
