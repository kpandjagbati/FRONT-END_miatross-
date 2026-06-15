import { getAllProductsWithCategory } from '../data/productsByCategory'

/** Associe un produit affiché (accueil, offres…) au catalogue central */
export function resolveCatalogProduct(product) {
  const name = (product.name || '').toLowerCase()
  const match = getAllProductsWithCategory().find(p => {
    const catalogName = p.name.toLowerCase()
    return catalogName === name || catalogName.includes(name) || name.includes(catalogName)
  })

  if (match) return match

  return {
    id: product.id,
    name: product.name,
    price: product.price,
    oldPrice: product.oldPrice ?? null,
    img: product.img,
    rating: product.rating,
    reviews: product.reviews,
    inStock: product.inStock ?? product.stock ?? 10,
    category: product.category || product.cat || 'Produit',
  }
}
