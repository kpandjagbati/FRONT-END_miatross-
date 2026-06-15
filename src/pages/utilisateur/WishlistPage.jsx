import { motion } from 'framer-motion'
import { Link, useNavigate } from 'react-router-dom'
import {
  Heart, Trash2, ShoppingBag, ArrowRight, Star
} from 'lucide-react'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import ProductImageFrame from './components/ProductImageFrame'
import { useShop } from '../../context/ShopContext'

// ── Composant carte favori ───────────────────────────────────────────────────
function WishlistItem({ item, onRemove, onOrder }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-2xl p-4 border border-gray-200 hover:border-brand
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
            <h3 className="font-semibold text-gray-900 line-clamp-2 mb-1 hover:text-brand transition-colors">
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
          <p className={`text-xs font-medium ${item.inStock ? 'text-brand' : 'text-red-500'
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
            type="button"
            onClick={() => onOrder(item)}
            disabled={!item.inStock}
            className="p-2 rounded-lg border border-gray-200 text-gray-400
                       hover:border-brand hover:text-brand transition-colors
                       disabled:opacity-50 disabled:cursor-not-allowed"
            title="Passer commande"
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
  const navigate = useNavigate()
  const { wishlistItems, removeFromWishlist, clearWishlist } = useShop()

  const handleRemove = (id) => {
    removeFromWishlist(id)
  }

  const handleRemoveAll = () => {
    clearWishlist()
  }

  const handleOrder = () => {
    navigate('/auth')
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
              className="inline-flex items-center gap-2 bg-brand hover:bg-brand-hover
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
                onOrder={handleOrder}
              />
            ))}
          </motion.div>
        )}
      </main>

      <Footer />
    </div>
  )
}
