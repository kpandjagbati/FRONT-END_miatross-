export const ADMIN_STATS = [
  { label: 'Vendeurs', value: '124', icon: 'store', trend: '+12 ce mois' },
  { label: 'Produits', value: '1 245', icon: 'package', trend: '+89 ce mois' },
  { label: 'Commandes', value: '892', icon: 'cart', trend: '+34 cette semaine' },
  { label: "Chiffre d'affaires", value: '12 450 000 FCFA', icon: 'revenue', trend: '+18% vs mois dernier' },
]

export const SALES_CHART_DATA = [42, 58, 45, 72, 65, 88, 76, 95, 82, 110, 98, 125, 115, 130]

export const ORDER_STATUS_DISTRIBUTION = [
  { label: 'Livrées', value: 65, color: '#273c75' },
  { label: 'En cours', value: 20, color: '#4a6fa5' },
  { label: 'En attente', value: 10, color: '#f59e0b' },
  { label: 'Annulées', value: 5, color: '#ef4444' },
]

export const RECENT_ORDERS = [
  { id: 'CMD-1042', date: '16 Juin 2026', client: 'Amina K.', amount: 85000, status: 'Livrée' },
  { id: 'CMD-1041', date: '16 Juin 2026', client: 'Yao M.', amount: 45000, status: 'En cours' },
  { id: 'CMD-1040', date: '15 Juin 2026', client: 'Fatou B.', amount: 120000, status: 'En attente' },
  { id: 'CMD-1039', date: '15 Juin 2026', client: 'Kofi A.', amount: 35000, status: 'Livrée' },
  { id: 'CMD-1038', date: '14 Juin 2026', client: 'Esi D.', amount: 67000, status: 'Annulée' },
]

export const RECENT_ACTIVITIES = [
  { text: 'Nouveau vendeur inscrit — Boutique Mode Plus', time: 'Il y a 2h', type: 'vendor' },
  { text: 'Nouvelle commande #CMD-1042 — 85 000 FCFA', time: 'Il y a 3h', type: 'order' },
  { text: 'Produit signalé — Casque Bluetooth', time: 'Il y a 5h', type: 'alert' },
  { text: 'Vendeur validé — TechStore Lomé', time: 'Il y a 8h', type: 'vendor' },
  { text: 'Nouvelle commande #CMD-1040 — 120 000 FCFA', time: 'Hier', type: 'order' },
]

export const RECENT_SELLERS = [
  { name: 'Boutique Chic', email: 'contact@boutiquechic.tg', date: '16 Juin 2026', status: 'Actif' },
  { name: 'TechStore Lomé', email: 'info@techstore.tg', date: '15 Juin 2026', status: 'Actif' },
  { name: 'Mode Plus', email: 'hello@modeplus.tg', date: '14 Juin 2026', status: 'En attente' },
  { name: 'Sport Elite', email: 'sport@sportelite.tg', date: '13 Juin 2026', status: 'Actif' },
]
