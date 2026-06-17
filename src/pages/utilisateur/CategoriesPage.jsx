import { useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Star, Heart, ShoppingCart, Search, Check, LayoutGrid, Footprints, Plug, Home, Sparkles, Dumbbell } from 'lucide-react'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import ProductImageFrame from './components/ProductImageFrame'
import { PRODUCTS_BY_CATEGORY, CATEGORY_COUNTS, CATEGORY_LABELS, getAllProductsWithCategory } from '../../data/productsByCategory'
import { productMatchesSearch } from '../../utils/productSearch'
import { useShop } from '../../context/ShopContext'

const CATEGORIES = [
  { key: 'tous', label: 'Tous les produits', icon: LayoutGrid, count: CATEGORY_COUNTS.tous },
  { key: 'mode', label: 'Mode & Accessoires', icon: Footprints, count: CATEGORY_COUNTS.mode },
  { key: 'electronique', label: 'Électronique', icon: Plug, count: CATEGORY_COUNTS.electronique },
  { key: 'maison', label: 'Maison & Bureau', icon: Home, count: CATEGORY_COUNTS.maison },
  { key: 'beaute', label: 'Beauté & Santé', icon: Sparkles, count: CATEGORY_COUNTS.beaute },
  { key: 'sport', label: 'Sports & Loisirs', icon: Dumbbell, count: CATEGORY_COUNTS.sport },
]

// ── Composant carte produit ─────────────────────────────────────────────────
function ProductCard({ product, index, categoryLabel }) {
  const { addToCart, toggleWishlist, isInWishlist, openProductModal } = useShop()
  const isFav = isInWishlist(product.id)
  const [addedFeedback, setAddedFeedback] = useState(false)

  const handleAddToCart = (e) => {
    e.stopPropagation()
    addToCart(product)
    setAddedFeedback(true)
    setTimeout(() => setAddedFeedback(false), 1500)
  }

  const handleOpenDetails = () => {
    openProductModal(product, { categoryLabel })
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
      onClick={handleOpenDetails}
      onKeyDown={e => e.key === 'Enter' && handleOpenDetails()}
      role="button"
      tabIndex={0}
      className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl
                 transition-shadow duration-300 flex flex-col cursor-pointer"
    >
      <ProductImageFrame
        src={product.img}
        alt={product.name}
        imgClassName="group-hover:scale-105 transition-transform duration-300"
        className="group"
      >
        {/* Badge stock */}
        <div className="absolute top-3 left-3 bg-brand text-white text-xs
                        font-bold px-3 py-1 rounded-full inline-flex items-center gap-1">
          <Check size={12} /> {product.inStock} en stock
        </div>
        {/* Favori */}
        <button
          type="button"
          onClick={e => {
            e.stopPropagation()
            toggleWishlist(product, categoryLabel)
          }}
          className="absolute bottom-3 right-3 bg-white rounded-full p-2 shadow-sm
                     hover:bg-gray-50 transition-colors border border-gray-100"
          aria-label={isFav ? 'Retirer des favoris' : 'Ajouter aux favoris'}
        >
          <Heart
            size={18}
            className={isFav ? 'fill-red-500 text-red-500' : 'text-gray-400'}
          />
        </button>
      </ProductImageFrame>

      {/* Contenu */}
      <div className="p-4 flex flex-col flex-1">
        <h3 className="text-sm font-bold text-gray-900 line-clamp-2 flex-1">
          {product.name}
        </h3>

        {/* Rating */}
        <div className="flex items-center gap-1 mt-3">
          <div className="flex text-yellow-400">
            {new Array(5).fill(0).map((_, i) => (
              <Star
                key={`star-${i}`}
                size={14}
                className={i < Math.floor(product.rating) ? 'fill-current' : ''}
              />
            ))}
          </div>
          <span className="text-xs text-gray-600">
            {product.reviews}
          </span>
        </div>

        {/* Prix */}
        <div className="mt-4 mb-4">
          <div className="flex items-center gap-2">
            <span className="text-lg font-bold text-gray-900">
              {product.price.toLocaleString()} FCFA
            </span>
            {product.oldPrice && (
              <span className="text-sm text-gray-500 line-through">
                {product.oldPrice.toLocaleString()}
              </span>
            )}
          </div>
        </div>

        {/* Bouton panier */}
        <button
          type="button"
          onClick={handleAddToCart}
          className="w-full bg-brand hover:bg-brand-hover text-white
                     font-bold py-2 rounded-xl transition-colors flex items-center
                     justify-center gap-2 text-sm"
        >
          <ShoppingCart size={16} />
          {addedFeedback ? 'Ajouté !' : 'Ajouter'}
        </button>
      </div>
    </motion.div>
  )
}

export default function CategoriesPage() {
  const [searchParams, setSearchParams] = useSearchParams()
  const catParam = searchParams.get('cat')
  const queryParam = searchParams.get('q') ?? ''
  const initialCategory = catParam && PRODUCTS_BY_CATEGORY[catParam] ? catParam : 'tous'

  const [selectedCategory, setSelectedCategory] = useState(initialCategory)
  const [searchQuery, setSearchQuery] = useState(queryParam)
  const [sortBy, setSortBy] = useState('popular')

  useEffect(() => {
    setSearchQuery(searchParams.get('q') ?? '')
  }, [searchParams])

  useEffect(() => {
    if (catParam && PRODUCTS_BY_CATEGORY[catParam]) {
      setSelectedCategory(catParam)
    } else if (queryParam && !catParam) {
      setSelectedCategory('tous')
    }
  }, [catParam, queryParam])

  const handleSearchChange = (value) => {
    setSearchQuery(value)
    const params = new URLSearchParams(searchParams)
    if (value.trim()) {
      params.set('q', value.trim())
    } else {
      params.delete('q')
    }
    setSearchParams(params, { replace: true })
  }

  // Filtrer les produits
  let filteredProducts = selectedCategory === 'tous'
    ? getAllProductsWithCategory()
    : (PRODUCTS_BY_CATEGORY[selectedCategory] || []).map(product => ({
        ...product,
        categoryKey: selectedCategory,
        category: CATEGORY_LABELS[selectedCategory],
      }))

  // Appliquer recherche (nom, catégorie, synonymes)
  if (searchQuery.trim()) {
    filteredProducts = filteredProducts.filter(p => productMatchesSearch(p, searchQuery))
  }

  // Appliquer tri
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortBy === 'price-low') return a.price - b.price
    if (sortBy === 'price-high') return b.price - a.price
    if (sortBy === 'rating') return b.rating - a.rating
    return 0
  })

  const categoryData = CATEGORIES.find(c => c.key === selectedCategory)

  return (
    <div className="min-h-dvh bg-gray-50">
      <Navbar />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-3">
            Toutes les catégories
          </h1>
          <p className="text-gray-600 text-lg">
            {searchQuery.trim()
              ? `Résultats pour « ${searchQuery.trim()} »`
              : `Explorez nos ${categoryData?.count.toLocaleString()} produits de qualité`}
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-4 gap-8">
          {/* Sidebar filtres */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-1"
          >
            <div className="bg-white rounded-2xl p-6 shadow-sm sticky top-20">
              {/* Recherche */}
              <div className="mb-6">
                <label htmlFor="search-input" className="block text-sm font-bold text-gray-900 mb-3">
                  Rechercher
                </label>
                <div className="relative">
                  <Search size={18} className="absolute left-3 top-3 text-gray-400" />
                  <input
                    id="search-input"
                    type="text"
                    placeholder="Nom du produit…"
                    value={searchQuery}
                    onChange={e => handleSearchChange(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 border border-gray-300
                               rounded-xl outline-none focus:border-brand
                               focus:ring-2 focus:ring-brand/20"
                  />
                </div>
              </div>

              {/* Catégories */}
              <div className="mb-6 pb-6 border-b border-gray-200">
                <label className="block text-sm font-bold text-gray-900 mb-3">
                  Catégories
                </label>
                <div className="space-y-2">
                  {CATEGORIES.map(cat => {
                    const CatIcon = cat.icon
                    return (
                    <button
                      key={cat.key}
                      onClick={() => setSelectedCategory(cat.key)}
                      className={`w-full text-left px-4 py-2.5 rounded-lg font-medium
                                 transition-all text-sm ${selectedCategory === cat.key
                          ? 'bg-brand text-white'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }`}
                    >
                      <span className="flex justify-between items-center gap-2">
                        <span className="inline-flex items-center gap-2">
                          {CatIcon && <CatIcon size={16} className="shrink-0" />}
                          {cat.label}
                        </span>
                        <span className="text-xs opacity-70">({cat.count})</span>
                      </span>
                    </button>
                    )
                  })}
                </div>
              </div>

              {/* Tri */}
              <div>
                <label htmlFor="sort-select" className="block text-sm font-bold text-gray-900 mb-3">
                  Trier par
                </label>
                <select
                  id="sort-select"
                  value={sortBy}
                  onChange={e => setSortBy(e.target.value)}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-xl
                             outline-none focus:border-brand focus:ring-2
                             focus:ring-brand/20 text-sm cursor-pointer
                             bg-white text-gray-900"
                >
                  <option value="popular">Populaires</option>
                  <option value="price-low">Prix (bas au haut)</option>
                  <option value="price-high">Prix (haut au bas)</option>
                  <option value="rating">Meilleures notes</option>
                </select>
              </div>
            </div>
          </motion.div>

          {/* Grille produits */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="lg:col-span-3"
          >
            {/* Résultats */}
            <div className="mb-6 flex items-center justify-between">
              <p className="text-sm text-gray-600">
                <span className="font-bold text-gray-900">{sortedProducts.length}</span> produits
                {searchQuery && ' trouvés'}
              </p>
            </div>

            {sortedProducts.length > 0 ? (
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {sortedProducts.map((product, index) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    index={index}
                    categoryLabel={product.category || (selectedCategory !== 'tous' ? CATEGORY_LABELS[selectedCategory] : undefined)}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-16">
                <p className="text-xl text-gray-600 mb-2">Aucun produit trouvé</p>
                <p className="text-gray-500">Essayez de modifier vos filtres ou votre recherche</p>
              </div>
            )}
          </motion.div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
