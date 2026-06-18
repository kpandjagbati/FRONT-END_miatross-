import { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Star, Heart, ShoppingCart, Minus, Plus, Check, Truck, Shield, RefreshCw } from 'lucide-react'
import ProductImageFrame from './ProductImageFrame'
import { useShop } from '../../../context/ShopContext'
import { resolveCatalogProduct } from '../../../utils/resolveCatalogProduct'

function buildDescription(product, categoryLabel) {
  if (product.description?.trim()) {
    return product.description.trim()
  }
  return `${product.name} est un produit de qualité dans la catégorie ${categoryLabel || 'notre catalogue'}. Profitez d'un excellent rapport qualité-prix, d'une livraison rapide et d'un service client réactif sur MiaTrossè.`
}

export default function ProductDetailModal() {
  const {
    productModal,
    closeProductModal,
    addToCart,
    toggleWishlist,
    isInWishlist,
  } = useShop()

  const [quantity, setQuantity] = useState(1)
  const [addedFeedback, setAddedFeedback] = useState(false)

  const isOpen = Boolean(productModal)
  const rawProduct = productModal?.product
  const categoryLabel = productModal?.categoryLabel
  const badge = productModal?.badge
  const discount = productModal?.discount

  const catalogProduct = rawProduct ? resolveCatalogProduct({
    ...rawProduct,
    category: categoryLabel || rawProduct.category || rawProduct.cat,
  }) : null

  const stock = catalogProduct?.inStock ?? rawProduct?.stock ?? 10
  const isFav = catalogProduct ? isInWishlist(catalogProduct.id) : false
  useEffect(() => {
    setQuantity(1)
    setAddedFeedback(false)
  }, [rawProduct?.id])

  useEffect(() => {
    if (!isOpen) return undefined

    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    const onKeyDown = (e) => {
      if (e.key === 'Escape') closeProductModal()
    }
    window.addEventListener('keydown', onKeyDown)

    return () => {
      document.body.style.overflow = previousOverflow
      window.removeEventListener('keydown', onKeyDown)
    }
  }, [isOpen, closeProductModal])

  if (!catalogProduct) return null

  const decreaseQty = () => setQuantity(q => Math.max(1, q - 1))
  const increaseQty = () => setQuantity(q => Math.min(stock, q + 1))

  const handleAddToCart = () => {
    addToCart(catalogProduct, quantity)
    setAddedFeedback(true)
    setTimeout(() => setAddedFeedback(false), 1500)
  }

  const discountPercent = catalogProduct.oldPrice
    ? Math.round((1 - catalogProduct.price / catalogProduct.oldPrice) * 100)
    : discount

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6"
          role="dialog"
          aria-modal="true"
          aria-labelledby="product-modal-title"
        >
          <button
            type="button"
            aria-label="Fermer"
            onClick={closeProductModal}
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="relative z-10 w-full max-w-4xl max-h-[90vh] overflow-y-auto
                       bg-white rounded-2xl shadow-2xl"
            onClick={e => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={closeProductModal}
              className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-white/90
                         border border-gray-200 flex items-center justify-center
                         hover:bg-gray-50 transition-colors shadow-sm"
              aria-label="Fermer la fenêtre"
            >
              <X size={20} className="text-gray-600" />
            </button>

            <div className="grid md:grid-cols-2 gap-0">
              <div className="relative bg-gray-50 p-6 md:p-8">
                <ProductImageFrame
                  src={catalogProduct.img}
                  alt={catalogProduct.name}
                  size="square"
                  border={false}
                  className="rounded-xl"
                />
                {badge && (
                  <span className="absolute top-8 left-8 bg-brand text-white text-xs
                                   font-bold px-3 py-1 rounded-full">
                    {badge}
                  </span>
                )}
                {discountPercent > 0 && (
                  <span className="absolute top-8 right-8 bg-red-500 text-white text-sm
                                   font-bold px-3 py-1 rounded-full">
                    -{discountPercent}%
                  </span>
                )}
              </div>

              <div className="p-6 md:p-8 flex flex-col">
                <div className="flex items-center gap-2 mb-2">
                  {categoryLabel && (
                    <span className="text-sm text-gray-500">{categoryLabel}</span>
                  )}
                </div>

                <h2 id="product-modal-title" className="text-2xl md:text-3xl font-bold text-gray-900 pr-10">
                  {catalogProduct.name}
                </h2>

                <div className="flex items-center gap-2 mt-3">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        size={16}
                        className={i < Math.floor(catalogProduct.rating)
                          ? 'fill-amber-400 text-amber-400'
                          : 'text-gray-200'}
                      />
                    ))}
                  </div>
                  <span className="text-sm font-semibold text-gray-900">{catalogProduct.rating}</span>
                  <span className="text-sm text-gray-500">({catalogProduct.reviews} avis)</span>
                </div>

                <div className="flex items-baseline gap-3 mt-4">
                  <span className="text-3xl font-bold text-gray-900">
                    {catalogProduct.price.toLocaleString('fr-FR')} FCFA
                  </span>
                  {catalogProduct.oldPrice && (
                    <span className="text-lg text-gray-400 line-through">
                      {catalogProduct.oldPrice.toLocaleString('fr-FR')} FCFA
                    </span>
                  )}
                </div>

                <p className={`flex items-center gap-2 text-sm mt-3 ${
                  stock <= 5 ? 'text-red-600' : 'text-brand'
                }`}>
                  <Check size={16} />
                  {stock <= 5 ? `Seulement ${stock} en stock` : `En stock (${stock} disponibles)`}
                </p>

                <p className="text-sm text-gray-600 mt-4 leading-relaxed">
                  {buildDescription(catalogProduct, categoryLabel)}
                </p>

                <div className="mt-5">
                  <p className="text-sm font-semibold text-gray-900 mb-2">Quantité</p>
                  <div className="flex items-center gap-3">
                    <button
                      type="button"
                      onClick={decreaseQty}
                      className="w-10 h-10 rounded-lg border border-gray-300 text-gray-800 flex items-center
                                 justify-center hover:border-brand hover:text-brand transition-all"
                    >
                      <Minus size={18} />
                    </button>
                    <span className="w-12 text-center font-semibold text-lg text-gray-900 tabular-nums">
                      {quantity}
                    </span>
                    <button
                      type="button"
                      onClick={increaseQty}
                      disabled={quantity >= stock}
                      className="w-10 h-10 rounded-lg border border-gray-300 text-gray-800 flex items-center
                                 justify-center hover:border-brand hover:text-brand transition-all
                                 disabled:opacity-60 disabled:text-gray-400 disabled:border-gray-200
                                 disabled:cursor-not-allowed"
                    >
                      <Plus size={18} />
                    </button>
                  </div>
                </div>

                <div className="flex gap-3 mt-6">
                  <button
                    type="button"
                    onClick={handleAddToCart}
                    className="flex-1 bg-brand hover:bg-brand-hover text-white font-bold
                               py-3 rounded-xl transition-colors flex items-center
                               justify-center gap-2"
                  >
                    <ShoppingCart size={18} />
                    {addedFeedback ? 'Ajouté !' : 'Ajouter au panier'}
                  </button>
                  <button
                    type="button"
                    onClick={() => toggleWishlist(catalogProduct, categoryLabel)}
                    className="w-12 h-12 rounded-xl border border-gray-300 flex items-center
                               justify-center hover:border-brand hover:text-brand transition-all"
                    aria-label={isFav ? 'Retirer des favoris' : 'Ajouter aux favoris'}
                  >
                    <Heart size={20} className={isFav ? 'fill-red-500 text-red-500' : ''} />
                  </button>
                </div>

                <div className="grid grid-cols-3 gap-3 mt-6 pt-5 border-t border-gray-100">
                  {[
                    { icon: Truck, text: 'Livraison rapide' },
                    { icon: Shield, text: 'Paiement sécurisé' },
                    { icon: RefreshCw, text: 'Retour 14 jours' },
                  ].map(({ icon: Icon, text }) => (
                    <div key={text} className="text-center">
                      <Icon size={18} className="text-brand mx-auto mb-1" />
                      <p className="text-[11px] text-gray-600 leading-tight">{text}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  )
}
