import { useState } from 'react'
import { motion } from 'framer-motion'
import { Star, Heart, ShoppingCart, Zap, Filter, Flame, AlertTriangle, Check } from 'lucide-react'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import ProductImageFrame from './components/ProductImageFrame'
import { useShop } from '../../context/ShopContext'
import { resolveCatalogProduct } from '../../utils/resolveCatalogProduct'

// ── Images produits ────────────────────────────────────────────────────────
import heroCasque from '../../assets/electronique/casque-sony-wh1000xm4.png'
import heroNike from '../../assets/mode/baskets-adidas-samba.png'
import heroSac from '../../assets/sport/s1.jpeg'
import heroEnceinte from '../../assets/electronique/enceinte-jbl.png'
import heroPS5 from '../../assets/electronique/console-ps5.png'
import heroMacbook from '../../assets/electronique/ordinateur-macbook-air.png'

// ── Données offres/promotions ──────────────────────────────────────────────
const OFFRES_PRODUITS = [
  {
    id: 1,
    name: 'Casque Sony WH-1000XM4',
    category: 'Électronique',
    price: 45000,
    oldPrice: 55000,
    discount: 18,
    rating: 4.8,
    reviews: 120,
    badge: 'Flash Sale',
    img: heroCasque,
    stock: 5,
  },
  {
    id: 2,
    name: 'Basket Adidas Samba',
    category: 'Mode',
    price: 22000,
    oldPrice: 28000,
    discount: 21,
    rating: 4.5,
    reviews: 85,
    badge: 'Promo -21%',
    img: heroNike,
    stock: 12,
  },
  {
    id: 3,
    name: 'Enceinte JBL Bluetooth',
    category: 'Électronique',
    price: 35000,
    oldPrice: 40000,
    discount: 12,
    rating: 4.7,
    reviews: 200,
    badge: 'Promo',
    img: heroEnceinte,
    stock: 8,
  },
  {
    id: 4,
    name: 'Console PlayStation 5',
    category: 'Électronique',
    price: 180000,
    oldPrice: 210000,
    discount: 14,
    rating: 4.9,
    reviews: 350,
    badge: 'Stock limité',
    img: heroPS5,
    stock: 3,
  },
  {
    id: 5,
    name: 'MacBook Air M3',
    category: 'Électronique',
    price: 850000,
    oldPrice: 950000,
    discount: 11,
    rating: 4.8,
    reviews: 95,
    badge: 'Promo',
    img: heroMacbook,
    stock: 6,
  },
  {
    id: 6,
    name: 'Sac de sport fitness',
    category: 'Sport',
    price: 18000,
    oldPrice: 25000,
    discount: 28,
    rating: 4.3,
    reviews: 60,
    badge: 'Flash Sale -28%',
    img: heroSac,
    stock: 15,
  },
]

const CATEGORIES = ['Tous', 'Électronique', 'Mode', 'Sport', 'Maison', 'Beauté']

// ── Carte produit ─────────────────────────────────────────────────────────
function ProductCard({ product, index }) {
  const { addToCart, toggleWishlist, isInWishlist, openProductModal } = useShop()
  const catalogProduct = resolveCatalogProduct(product)
  const isFav = isInWishlist(catalogProduct.id)
  const [addedFeedback, setAddedFeedback] = useState(false)

  const handleAddToCart = (e) => {
    e.stopPropagation()
    addToCart(catalogProduct)
    setAddedFeedback(true)
    setTimeout(() => setAddedFeedback(false), 1500)
  }

  const handleOpenDetails = () => {
    openProductModal(catalogProduct, {
      categoryLabel: product.category,
      badge: product.badge,
      discount: product.discount,
    })
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
                 transition-shadow duration-300 flex flex-col h-full cursor-pointer"
    >
      <ProductImageFrame
        src={product.img}
        alt={product.name}
        imgClassName="group-hover:scale-105 transition-transform duration-300"
        className="group"
      >
        {/* Badge */}
        <div className="absolute top-3 left-3 bg-brand text-white text-xs
                        font-bold px-3 py-1 rounded-full flex items-center gap-1">
          <Zap size={12} />
          {product.badge}
        </div>
        {/* Discount */}
        <div className="absolute top-3 right-3 bg-red-500 text-white text-sm
                        font-bold px-3 py-1 rounded-full">
          -{product.discount}%
        </div>
        {/* Favori button */}
        <button
          type="button"
          onClick={e => {
            e.stopPropagation()
            toggleWishlist(catalogProduct, product.category)
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
        <p className="text-xs text-gray-500 uppercase tracking-wide font-medium">
          {product.category}
        </p>
        <h3 className="text-sm font-bold text-gray-900 mt-2 line-clamp-2 flex-1">
          {product.name}
        </h3>

        {/* Rating */}
        <div className="flex items-center gap-1 mt-3">
          <div className="flex text-yellow-400">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                size={14}
                className={i < Math.floor(product.rating) ? 'fill-current' : ''}
              />
            ))}
          </div>
          <span className="text-xs text-gray-600">
            ({product.reviews})
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

        {/* Stock */}
        <div className="text-xs mb-3">
          {product.stock <= 5 ? (
            <span className="text-red-500 font-semibold inline-flex items-center gap-1">
              <AlertTriangle size={14} /> Seulement {product.stock} restants
            </span>
          ) : (
            <span className="text-brand font-semibold inline-flex items-center gap-1">
              <Check size={14} /> En stock ({product.stock})
            </span>
          )}
        </div>

        {/* Bouton panier */}
        <button
          type="button"
          onClick={handleAddToCart}
          className="w-full bg-brand hover:bg-brand-hover text-white
                     font-bold py-2.5 rounded-xl transition-colors flex items-center
                     justify-center gap-2 text-sm"
        >
          <ShoppingCart size={16} />
          {addedFeedback ? 'Ajouté !' : 'Ajouter au panier'}
        </button>
      </div>
    </motion.div>
  )
}

// ── Page principale ────────────────────────────────────────────────────────
export default function OffresPage() {
  const [selectedCategory, setSelectedCategory] = useState('Tous')
  const [sortBy, setSortBy] = useState('popular')

  const filteredProducts = selectedCategory === 'Tous'
    ? OFFRES_PRODUITS
    : OFFRES_PRODUITS.filter(p => p.category === selectedCategory)

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortBy === 'price-low') return a.price - b.price
    if (sortBy === 'price-high') return b.price - a.price
    if (sortBy === 'rating') return b.rating - a.rating
    return 0
  })

  const totalDiscount = filteredProducts.reduce((sum, p) => sum + (p.oldPrice - p.price), 0)

  return (
    <div className="min-h-dvh bg-gray-50">
      <Navbar />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
        {/* Header section */}
        <div className="mb-12">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-3 flex items-center gap-3">
              <Flame size={36} className="text-orange-500 shrink-0" />
              Offres & Promotions
            </h1>
            <p className="text-gray-600 text-lg">
              Découvrez nos meilleures réductions et profitez d'économies exceptionnelles.
            </p>
          </motion.div>

          {/* Statistiques */}
          <div className="grid grid-cols-3 gap-4 md:gap-6 mb-8">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="bg-gradient-to-br from-brand to-brand-hover text-white
                         rounded-2xl p-6 shadow-lg"
            >
              <p className="text-sm opacity-90 font-medium">Économies totales</p>
              <p className="text-3xl font-bold mt-2">
                {(totalDiscount / 1000).toFixed(0)}k FCFA
              </p>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="bg-gradient-to-br from-blue-500 to-blue-600 text-white
                         rounded-2xl p-6 shadow-lg"
            >
              <p className="text-sm opacity-90 font-medium">Produits en promo</p>
              <p className="text-3xl font-bold mt-2">{filteredProducts.length}</p>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="bg-gradient-to-br from-orange-500 to-orange-600 text-white
                         rounded-2xl p-6 shadow-lg"
            >
              <p className="text-sm opacity-90 font-medium">Réductions moyennes</p>
              <p className="text-3xl font-bold mt-2">
                {Math.round(filteredProducts.reduce((s, p) => s + p.discount, 0) / filteredProducts.length)}%
              </p>
            </motion.div>
          </div>
        </div>

        {/* Filtres et tri */}
        <div className="mb-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          {/* Catégories */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2">
            {CATEGORIES.map(cat => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-full font-semibold text-sm transition-all
                             shrink-0 ${selectedCategory === cat
                    ? 'bg-brand text-white'
                    : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
                  }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Tri */}
          <div className="flex items-center gap-2">
            <Filter size={18} className="text-gray-500" />
            <select
              value={sortBy}
              onChange={e => setSortBy(e.target.value)}
              className="px-4 py-2 border border-gray-200 rounded-xl text-sm
                         outline-none focus:border-brand focus:ring-2
                         focus:ring-brand/20 bg-white text-gray-900 cursor-pointer"
            >
              <option value="popular">Les plus populaires</option>
              <option value="price-low">Prix : bas au haut</option>
              <option value="price-high">Prix : haut au bas</option>
              <option value="rating">Meilleures notes</option>
            </select>
          </div>
        </div>

        {/* Grille de produits */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {sortedProducts.map((product, index) => (
            <ProductCard key={product.id} product={product} index={index} />
          ))}
        </div>

        {/* CTA section */}
        <motion.div
          whileHover={{ scale: 1.02 }}
          className="bg-gradient-to-r from-brand to-brand-hover text-white
                     rounded-2xl p-8 md:p-12 text-center"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Vous cherchez plus ?
          </h2>
          <p className="text-lg opacity-90 mb-6 max-w-2xl mx-auto">
            Parcourez toutes les catégories pour découvrir d'autres produits exceptionnels.
          </p>
          <button className="bg-white text-brand px-8 py-3 rounded-xl
                             font-bold hover:bg-gray-100 transition-colors">
            Voir toutes les catégories
          </button>
        </motion.div>
      </main>

      <Footer />
    </div>
  )
}
