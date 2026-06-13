import { useState } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import {
  Heart, Trash2, ShoppingBag, ArrowRight, Star
} from 'lucide-react'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import ProductImageFrame from './components/ProductImageFrame'
import heroCasque from '../../assets/electronique/casque-sony-wh1000xm4.png'
import heroSacHermes from '../../assets/mode/sac-hermes-birkin.png'
import heroPS5 from '../../assets/electronique/console-ps5.png'
import heroCardigan from '../../assets/mode/cardigan-ami-paris.png'

// ── Données favoris (mock) ───────────────────────────────────────────────────
const WISHLIST_ITEMS = [
  {
    id: 1,
    name: 'Casque Sony WH-1000XM4',
    price: 45000,
    oldPrice: 55000,
    rating: 4.8,
    reviews: 120,
    img: heroCasque,
    category: 'Électronique',
    inStock: true,
    stock: 5
  },
  {
    id: 2,
    name: 'Sac Hermès Birkin',
    price: 120000,
    oldPrice: 150000,
    rating: 4.9,
    reviews: 45,
    img: heroSacHermes,
    category: 'Mode',
    inStock: true,
    stock: 3
  },
  {
    id: 3,
    name: 'Console PlayStation 5',
    price: 180000,
    oldPrice: 210000,
    rating: 4.9,
    reviews: 350,
    img: heroPS5,
    category: 'Électronique',
    inStock: false,
    stock: 0
  },
  {
    id: 4,
    name: 'Cardigan Ami Paris',
    price: 35000,
    oldPrice: 45000,
    rating: 4.6,
    reviews: 28,
    img: heroCardigan,
    category: 'Mode',
    inStock: true,
    stock: 7
  },
]

// ── Composant carte favori ───────────────────────────────────────────────────
function WishlistItem({ item, onRemove }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-2xl p-4 border border-gray-200 hover:border-[#00b649]
                 hover:shadow-lg transition-all group"
    >
      <div className="flex gap-4">
        {/* Image */}
        <Link to={`/product/${item.id}`} className="shrink-0">
          <ProductImageFrame
            src={item.img}
            alt={item.name}
            size="thumb"
            border={false}
            className="rounded-xl border border-gray-100"
            imgClassName="group-hover:scale-105 transition-transform duration-300"
          />
        </Link>

        {/* Infos */}
        <div className="flex-1 min-w-0">
          <Link to={`/product/${item.id}`}>
            <h3 className="font-semibold text-gray-900 line-clamp-2 mb-1 hover:text-[#00b649] transition-colors">
              {item.name}
            </h3>
          </Link>
          <p className="text-xs text-gray-500 mb-2">{item.category}</p>

          {/* Rating */}
          <div className="flex items-center gap-1 mb-2">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  size={12}
                  className={i < Math.floor(item.rating)
                    ? 'fill-amber-400 text-amber-400'
                    : 'text-gray-200'}
                />
              ))}
            </div>
            <span className="text-xs text-gray-500">({item.reviews})</span>
          </div>

          {/* Prix */}
          <div className="flex items-baseline gap-2 mb-2">
            <span className="text-lg font-bold text-gray-900">
              {item.price.toLocaleString('fr-FR')} FCFA
            </span>
            {item.oldPrice && (
              <span className="text-sm text-gray-400 line-through">
                {item.oldPrice.toLocaleString('fr-FR')} FCFA
              </span>
            )}
          </div>

          {/* Stock */}
          <p className={`text-xs font-medium ${item.inStock ? 'text-[#00b649]' : 'text-red-500'
            }`}>
            {item.inStock ? `En stock (${item.stock} disponibles)` : 'Rupture de stock'}
          </p>
        </div>

        {/* Actions */}
        <div className="flex flex-col gap-2">
          <button
            onClick={() => onRemove(item.id)}
            className="p-2 rounded-lg border border-gray-200 text-gray-400
                       hover:border-red-500 hover:text-red-500 transition-colors"
            title="Retirer des favoris"
          >
            <Trash2 size={18} />
          </button>
          <button
            disabled={!item.inStock}
            className="p-2 rounded-lg border border-gray-200 text-gray-400
                       hover:border-[#00b649] hover:text-[#00b649] transition-colors
                       disabled:opacity-50 disabled:cursor-not-allowed"
            title="Ajouter au panier"
          >
            <ShoppingBag size={18} />
          </button>
        </div>
      </div>
    </motion.div>
  )
}

// ── Page principale ───────────────────────────────────────────────────────────
export default function WishlistPage() {
  const [wishlistItems, setWishlistItems] = useState(WISHLIST_ITEMS)

  const handleRemove = (id) => {
    setWishlistItems(items => items.filter(item => item.id !== id))
  }

  const handleRemoveAll = () => {
    setWishlistItems([])
  }

  return (
    <div className="min-h-dvh bg-gray-50">
      <Navbar />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-between mb-8"
        >
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">Mes favoris</h1>
            <p className="text-gray-600">
              {wishlistItems.length} article{wishlistItems.length > 1 ? 's' : ''} en favoris
            </p>
          </div>
          {wishlistItems.length > 0 && (
            <button
              onClick={handleRemoveAll}
              className="text-sm text-red-500 hover:text-red-600 font-medium transition-colors"
            >
              Tout supprimer
            </button>
          )}
        </motion.div>

        {wishlistItems.length === 0 ? (
          /* Liste vide */
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-2xl p-12 text-center"
          >
            <Heart size={64} className="text-gray-300 mx-auto mb-6" />
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Aucun favori</h2>
            <p className="text-gray-600 mb-6">
              Ajoutez des produits à vos favoris pour les retrouver plus tard
            </p>
            <Link
              to="/categories"
              className="inline-flex items-center gap-2 bg-[#00b649] hover:bg-[#009d3f]
                         text-white font-bold px-6 py-3 rounded-xl transition-colors"
            >
              Parcourir les catégories <ArrowRight size={18} />
            </Link>
          </motion.div>
        ) : (
          /* Liste favoris */
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="grid md:grid-cols-2 gap-4"
          >
            {wishlistItems.map(item => (
              <WishlistItem
                key={item.id}
                item={item}
                onRemove={handleRemove}
              />
            ))}
          </motion.div>
        )}
      </main>

      <Footer />
    </div>
  )
}
