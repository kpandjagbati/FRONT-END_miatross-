import { useState } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import {
  Trash2, Plus, Minus, ShoppingBag, ArrowRight, X,
  Truck, Shield, RefreshCw
} from 'lucide-react'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import ProductImageFrame from './components/ProductImageFrame'
import { useShop } from '../../context/ShopContext'

const PROMO_CODES = [
  { code: 'MIATROSSE', discount: 10, description: '10% de réduction' },
  { code: 'WELCOME5', discount: 5, description: '5% de réduction' },
]

// ── Composant item panier ─────────────────────────────────────────────────────
function CartItem({ item, onUpdateQuantity, onRemove }) {
  const decreaseQty = () => {
    if (item.quantity > 1) {
      onUpdateQuantity(item.id, item.quantity - 1)
    }
  }

  const increaseQty = () => {
    if (item.quantity < item.stock) {
      onUpdateQuantity(item.id, item.quantity + 1)
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-2xl p-4 md:p-6 border border-gray-200 gap-4
                 flex flex-col md:flex-row items-start md:items-center"
    >
      {/* Image */}
      <ProductImageFrame
        src={item.img}
        alt={item.name}
        size="cart"
        border={false}
        className="rounded-xl border border-gray-100"
      />

      {/* Infos */}
      <div className="flex-1 min-w-0">
        <h3 className="font-semibold text-gray-900 line-clamp-2 mb-1">{item.name}</h3>
        <p className="text-sm text-gray-500 mb-3">
          {item.stock} en stock
        </p>

        {/* Quantité */}
        <div className="flex items-center gap-3">
          <button
            onClick={decreaseQty}
            className="w-8 h-8 rounded-lg border border-gray-300 flex items-center
                       justify-center hover:border-brand hover:text-brand transition-all"
          >
            <Minus size={16} />
          </button>
          <span className="w-10 text-center font-semibold">{item.quantity}</span>
          <button
            onClick={increaseQty}
            disabled={item.quantity >= item.stock}
            className="w-8 h-8 rounded-lg border border-gray-300 flex items-center
                       justify-center hover:border-brand hover:text-brand
                       transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Plus size={16} />
          </button>
        </div>
      </div>

      {/* Prix + Supprimer */}
      <div className="flex md:flex-col items-center md:items-end gap-4 md:gap-2 w-full md:w-auto">
        <div className="text-right">
          <p className="text-lg font-bold text-gray-900">
            {(item.price * item.quantity).toLocaleString('fr-FR')} FCFA
          </p>
          {item.oldPrice && (
            <p className="text-sm text-gray-400 line-through">
              {(item.oldPrice * item.quantity).toLocaleString('fr-FR')} FCFA
            </p>
          )}
        </div>
        <button
          onClick={() => onRemove(item.id)}
          className="text-red-500 hover:text-red-600 transition-colors"
        >
          <Trash2 size={18} />
        </button>
      </div>
    </motion.div>
  )
}

// ── Page principale ───────────────────────────────────────────────────────────
export default function CartPage() {
  const { cartItems, cartCount, updateCartQuantity, removeFromCart } = useShop()
  const [promoCode, setPromoCode] = useState('')
  const [appliedPromo, setAppliedPromo] = useState(null)
  const [promoError, setPromoError] = useState('')

  const handleUpdateQuantity = (id, quantity) => {
    updateCartQuantity(id, quantity)
  }

  const handleRemove = (id) => {
    removeFromCart(id)
  }

  const handleApplyPromo = () => {
    const validPromo = PROMO_CODES.find(p => p.code.toUpperCase() === promoCode.toUpperCase())
    if (validPromo) {
      setAppliedPromo(validPromo)
      setPromoError('')
    } else {
      setPromoError('Code promo invalide')
      setAppliedPromo(null)
    }
  }

  const handleRemovePromo = () => {
    setAppliedPromo(null)
    setPromoCode('')
  }

  // Calculs
  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0)
  const discount = appliedPromo ? Math.round(subtotal * (appliedPromo.discount / 100)) : 0
  const shipping = subtotal > 20000 ? 0 : 2500
  const total = subtotal - discount + shipping

  return (
    <div className="min-h-dvh bg-gray-50">
      <Navbar />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">Mon panier</h1>
          <p className="text-gray-600">
            {cartCount} article{cartCount > 1 ? 's' : ''} dans votre panier
          </p>
        </motion.div>

        {cartItems.length === 0 ? (
          /* Panier vide */
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-2xl p-12 text-center"
          >
            <ShoppingBag size={64} className="text-gray-300 mx-auto mb-6" />
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Votre panier est vide</h2>
            <p className="text-gray-600 mb-6">Ajoutez des produits pour commencer vos achats</p>
            <Link
              to="/categories"
              className="inline-flex items-center gap-2 bg-brand hover:bg-brand-hover
                         text-white font-bold px-6 py-3 rounded-xl transition-colors"
            >
              Parcourir les catégories <ArrowRight size={18} />
            </Link>
          </motion.div>
        ) : (
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Liste articles */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              className="lg:col-span-2 space-y-4"
            >
              {cartItems.map(item => (
                <CartItem
                  key={item.id}
                  item={item}
                  onUpdateQuantity={handleUpdateQuantity}
                  onRemove={handleRemove}
                />
              ))}
            </motion.div>

            {/* Résumé commande */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              className="lg:col-span-1"
            >
              <div className="bg-white rounded-2xl p-6 border border-gray-200 sticky top-24">
                <h2 className="text-xl font-bold text-gray-900 mb-6">Résumé</h2>

                {/* Code promo */}
                <div className="mb-6">
                  <label className="block text-sm font-semibold text-gray-900 mb-2">
                    Code promo
                  </label>
                  {appliedPromo ? (
                    <div className="flex items-center gap-2 bg-brand/10 border border-brand/20
                                rounded-lg px-3 py-2">
                      <span className="text-sm font-semibold text-brand flex-1">
                        {appliedPromo.code} (-{appliedPromo.discount}%)
                      </span>
                      <button
                        onClick={handleRemovePromo}
                        className="text-brand hover:text-brand-hover"
                      >
                        <X size={16} />
                      </button>
                    </div>
                  ) : (
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={promoCode}
                        onChange={e => {
                          setPromoCode(e.target.value)
                          setPromoError('')
                        }}
                        placeholder="Entrez un code"
                        className="flex-1 px-4 py-2.5 border border-gray-300 rounded-xl
                                   outline-none focus:border-brand text-sm"
                      />
                      <button
                        onClick={handleApplyPromo}
                        className="px-4 py-2.5 bg-gray-900 hover:bg-gray-800 text-white
                                   rounded-xl text-sm font-semibold transition-colors"
                      >
                        Appliquer
                      </button>
                    </div>
                  )}
                  {promoError && (
                    <p className="text-red-500 text-xs mt-1">{promoError}</p>
                  )}
                </div>

                {/* Calculs */}
                <div className="space-y-3 mb-6">
                  <div className="flex justify-between text-gray-600">
                    <span>Sous-total</span>
                    <span>{subtotal.toLocaleString('fr-FR')} FCFA</span>
                  </div>
                  {discount > 0 && (
                    <div className="flex justify-between text-brand">
                      <span>Réduction</span>
                      <span>-{discount.toLocaleString('fr-FR')} FCFA</span>
                    </div>
                  )}
                  <div className="flex justify-between text-gray-600">
                    <span>Livraison</span>
                    <span>{shipping === 0 ? 'Gratuite' : shipping.toLocaleString('fr-FR') + ' FCFA'}</span>
                  </div>
                  {shipping > 0 && (
                    <p className="text-xs text-gray-500">
                      Livraison gratuite dès 20 000 FCFA
                    </p>
                  )}
                  <div className="border-t border-gray-200 pt-3 flex justify-between">
                    <span className="font-bold text-gray-900">Total</span>
                    <span className="font-bold text-xl text-gray-900">
                      {total.toLocaleString('fr-FR')} FCFA
                    </span>
                  </div>
                </div>

                {/* Bouton commander */}
                <Link
                  to="/auth"
                  className="w-full bg-brand hover:bg-brand-hover text-white font-bold
                             py-3.5 rounded-xl transition-colors flex items-center justify-center gap-2 mb-4"
                >
                  Passer la commande <ArrowRight size={18} />
                </Link>

                {/* Garanties */}
                <div className="space-y-3 pt-4 border-t border-gray-200">
                  {[
                    { icon: Truck, text: 'Livraison rapide partout au Togo' },
                    { icon: Shield, text: 'Paiement 100% sécurisé' },
                    { icon: RefreshCw, text: 'Retour gratuit sous 14 jours' }
                  ].map(({ icon: Icon, text }) => (
                    <div key={text} className="flex items-center gap-3 text-sm text-gray-600">
                      <Icon size={16} className="text-brand shrink-0" />
                      {text}
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </main>

      <Footer />
    </div>
  )
}
