export const STATUT_LABELS = {
  EN_ATTENTE: 'En attente',
  ACTIF: 'Actif',
  REFUSE: 'Refusé',
  INACTIF: 'Inactif',
  VENDU: 'Vendu',
}

export function formatStatut(statut) {
  return STATUT_LABELS[statut] || statut
}

export function formatPrice(value) {
  if (value == null) return '—'
  return `${Number(value).toLocaleString('fr-FR')} FCFA`
}

export function formatDate(dateStr) {
  if (!dateStr) return '—'
  return new Date(dateStr).toLocaleDateString('fr-FR', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  })
}

export function statutToBadgeClass(statut) {
  switch (statut) {
    case 'ACTIF':
    case 'VENDU':
      return 'bg-brand/10 text-brand'
    case 'EN_ATTENTE':
      return 'bg-amber-100 text-amber-700'
    case 'REFUSE':
      return 'bg-red-100 text-red-600'
    default:
      return 'bg-gray-100 text-gray-600'
  }
}

export function getVendeurName(produit) {
  if (!produit?.utilisateur) return '—'
  const { prenom_utilisateur, nom_utilisateur } = produit.utilisateur
  return `${prenom_utilisateur || ''} ${nom_utilisateur || ''}`.trim() || '—'
}

export function filterProduitsByStatut(produits, statut) {
  return (produits || []).filter(p => p.statut === statut)
}

export function sumProduitsPrice(produits) {
  return (produits || []).reduce((sum, p) => sum + (Number(p.prix) || 0), 0)
}

export function buildStatutTrendData(produitsParStatut) {
  const values = Object.values(produitsParStatut || {})
  if (values.length === 0) return [0, 0, 0, 0]
  if (values.length === 1) return [values[0], values[0]]
  return values
}

export function buildProductNotifications(produits) {
  return (produits || []).flatMap(p => {
    switch (p.statut) {
      case 'EN_ATTENTE':
        return [{
          id: `${p.id_produit}-pending`,
          type: 'info',
          title: 'Validation en cours',
          message: `« ${p.nom_produit} » est en attente de validation par l'administrateur.`,
        }]
      case 'ACTIF':
        return [{
          id: `${p.id_produit}-active`,
          type: 'success',
          title: 'Produit publié',
          message: `« ${p.nom_produit} » est visible dans la boutique.`,
        }]
      case 'REFUSE':
        return [{
          id: `${p.id_produit}-refused`,
          type: 'error',
          title: 'Produit refusé',
          message: `« ${p.nom_produit} » a été refusé. Modifiez-le ou contactez l'administrateur.`,
        }]
      case 'VENDU':
        return [{
          id: `${p.id_produit}-sold`,
          type: 'success',
          title: 'Vente enregistrée',
          message: `« ${p.nom_produit} » a été marqué comme vendu (${formatPrice(p.prix)}).`,
        }]
      default:
        return []
    }
  })
}

export function buildStatutChart(produitsParStatut) {
  const colors = {
    ACTIF: '#273c75',
    EN_ATTENTE: '#f59e0b',
    REFUSE: '#ef4444',
    INACTIF: '#94a3b8',
    VENDU: '#4a6fa5',
  }

  const entries = Object.entries(produitsParStatut || {}).filter(([, value]) => value > 0)
  const total = entries.reduce((sum, [, v]) => sum + v, 0) || 1

  return entries.map(([label, value]) => ({
    label: formatStatut(label),
    value: Math.round((value / total) * 100),
    count: value,
    color: colors[label] || '#94a3b8',
  }))
}
