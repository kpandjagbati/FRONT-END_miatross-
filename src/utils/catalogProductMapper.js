import { API_BASE_URL } from '../config/api'

function normalizeText(value) {
  return (value || '')
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
}

export function resolveCategoryKey(categoryName) {
  const name = normalizeText(categoryName)
  if (name.includes('mode')) return 'mode'
  if (name.includes('electron')) return 'electronique'
  if (name.includes('maison') || name.includes('bureau')) return 'maison'
  if (name.includes('beaute') || name.includes('sante')) return 'beaute'
  if (name.includes('sport')) return 'sport'
  return null
}

export function mapApiProduitToCatalogProduct(produit) {
  const categoryName = produit.categorie_produit?.nom_categorieproduit || 'Produit'
  const categoryKey = resolveCategoryKey(categoryName)

  return {
    id: `api-${produit.id_produit}`,
    apiId: produit.id_produit,
    source: 'api',
    name: produit.nom_produit,
    price: produit.prix ?? 0,
    oldPrice: null,
    img: `${API_BASE_URL}/api/produit/catalogue/${produit.id_produit}/image`,
    rating: 4.5,
    reviews: 0,
    inStock: 10,
    stock: 10,
    category: categoryName,
    categoryKey,
    description: produit.description || '',
    badge: 'Nouveau',
  }
}

export function mapApiProduitToHomeCard(produit) {
  const catalog = mapApiProduitToCatalogProduct(produit)
  return {
    ...catalog,
    cat: catalog.category,
  }
}
