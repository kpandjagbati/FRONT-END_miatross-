import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Link, useParams } from 'react-router-dom'
import {
  Star, Heart, ShoppingCart, Truck, Shield, RefreshCw,
  ChevronLeft, ChevronRight, Minus, Plus, Check, Share2, ArrowRight, User
} from 'lucide-react'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import ProductImageFrame from './components/ProductImageFrame'
import { findProductById } from '../../data/productsByCategory'
import { useShop } from '../../context/ShopContext'
import { resolveCatalogProduct } from '../../utils/resolveCatalogProduct'
import heroCasque from '../../assets/electronique/casque-sony-wh1000xm4.png'
import heroEnceinte from '../../assets/electronique/enceinte-jbl.png'
import heroAirpods from '../../assets/electronique/casque-airpods-max.png'

// ── Données produit (mock) ─────────────────────────────────────────────────
const PRODUCT_DATA = {
  id: 1,
  name: 'Casque Sony WH-1000XM4',
  price: 45000,
  oldPrice: 55000,
  rating: 4.8,
  reviews: 120,
  category: 'Électronique',
  badge: 'Populaire',
  stock: 5,
  description: 'Le casque Sony WH-1000XM4 offre une réduction de bruit de classe mondiale avec deux processeurs contrôlant huit microphones pour une suppression du bruit sans précédent. Profitez d\'un son exceptionnel avec des drivers de 30 mm et une autonomie jusqu\'à 30 heures.',
  features: [
    'Réduction de bruit active de classe mondiale',
    'Autonomie jusqu\'à 30 heures',
    'Compatible avec Google Assistant et Alexa',
    'Design confortable et pliable',
    'Connexion Bluetooth multipoint',
    'Charge rapide : 10 min = 5h d\'écoute'
  ],
  images: [heroCasque, heroCasque, heroCasque, heroCasque]
}

const REVIEWS = [
  { id: 1, user: 'Kofi A.', rating: 5, date: '12 Jan 2025', comment: 'Excellent casque, la réduction de bruit est incroyable !' },
  { id: 2, user: 'Amina M.', rating: 4, date: '8 Jan 2025', comment: 'Très bon produit, confortable pour les longues sessions.' },
  { id: 3, user: 'Yao K.', rating: 5, date: '2 Jan 2025', comment: 'Qualité audio au top, je recommande vivement.' },
]

const RELATED_PRODUCTS = [
  { id: 2, name: 'Enceinte JBL Bluetooth', price: 35000, img: heroEnceinte },
  { id: 3, name: 'AirPods Max', price: 75000, img: heroAirpods },
  { id: 4, name: 'Casque Sony WH-1000XM5', price: 85000, img: heroCasque },
]

// ── Composant galerie images ─────────────────────────────────────────────────
function ImageGallery({ images }) {
  const [current, setCurrent] = useState(0)

  const next = () => setCurrent((c) => (c + 1) % images.length)
  const prev = () => setCurrent((c) => (c - 1 + images.length) % images.length)

  return (
    <div className="space-y-4">
      {/* Image principale */}
      <ProductImageFrame
        src={images[current]}
        alt="Product"
        size="gallery"
        border={false}
        className="rounded-2xl border border-gray-100"
      >
        <button
          onClick={prev}
          className="absolute left-3 top-1/2 -translate-y-1/2 z-10 bg-white/90 hover:bg-white
                     p-2 rounded-full shadow-lg transition-all border border-gray-100"
        >
          <ChevronLeft size={20} />
        </button>
        <button
          onClick={next}
          className="absolute right-3 top-1/2 -translate-y-1/2 z-10 bg-white/90 hover:bg-white
                     p-2 rounded-full shadow-lg transition-all border border-gray-100"
        >
          <ChevronRight size={20} />
        </button>
      </ProductImageFrame>

      {/* Thumbnails */}
      <div className="flex gap-3">
        {images.map((img, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={`flex-1 rounded-xl overflow-hidden aspect-square bg-white
                       border-2 transition-all ${current === i ? 'border-brand' : 'border-gray-100 hover:border-gray-300'
              }`}
          >
            <img src={img} alt={`Thumbnail ${i}`} className="w-full h-full object-contain p-2" />
          </button>
        ))}
      </div>
    </div>
  )
}

// ── Composant review ───────────────────────────────────────────────────────
function ReviewCard({ review }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      className="bg-white rounded-xl p-5 border border-gray-200"
    >
      <div className="flex items-start gap-4">
        <div className="w-10 h-10 rounded-full bg-brand/10 flex items-center justify-center shrink-0">
          <User size={20} className="text-brand" />
        </div>
        <div className="flex-1">
          <div className="flex items-center justify-between mb-2">
            <div>
              <p className="font-semibold text-gray-900">{review.user}</p>
              <p className="text-xs text-gray-500">{review.date}</p>
            </div>
            <div className="flex items-center gap-1">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  size={14}
                  className={i < review.rating ? 'fill-amber-400 text-amber-400' : 'text-gray-200'}
                />
              ))}
            </div>
          </div>
          <p className="text-sm text-gray-600">{review.comment}</p>
        </div>
      </div>
    </motion.div>
  )
}

// ── Page principale ───────────────────────────────────────────────────────────
export default function ProductDetailPage() {
  const { id } = useParams()
  const { addToCart, toggleWishlist, isInWishlist, openProductModal } = useShop()
  const [quantity, setQuantity] = useState(1)
  const [selectedColor, setSelectedColor] = useState('Noir')
  const [addedFeedback, setAddedFeedback] = useState(false)
  const [activeTab, setActiveTab] = useState('description')

  const catalogProduct = findProductById(Number(id)) || resolveCatalogProduct({
    id: PRODUCT_DATA.id,
    name: PRODUCT_DATA.name,
    price: PRODUCT_DATA.price,
    oldPrice: PRODUCT_DATA.oldPrice,
    img: PRODUCT_DATA.images[0],
    rating: PRODUCT_DATA.rating,
    reviews: PRODUCT_DATA.reviews,
    stock: PRODUCT_DATA.stock,
    category: PRODUCT_DATA.category,
  })

  const product = {
    ...PRODUCT_DATA,
    id: catalogProduct.id,
    name: catalogProduct.name,
    price: catalogProduct.price,
    oldPrice: catalogProduct.oldPrice,
    rating: catalogProduct.rating,
    reviews: catalogProduct.reviews,
    category: catalogProduct.category || PRODUCT_DATA.category,
    stock: catalogProduct.inStock ?? PRODUCT_DATA.stock,
    images: [catalogProduct.img, catalogProduct.img, catalogProduct.img, catalogProduct.img],
  }

  const isFav = isInWishlist(catalogProduct.id)
  const colors = ['Noir', 'Argent', 'Bleu']

  const decreaseQty = () => setQuantity(q => Math.max(1, q - 1))
  const increaseQty = () => setQuantity(q => Math.min(product.stock, q + 1))

  const handleAddToCart = () => {
    addToCart(catalogProduct, quantity)
    setAddedFeedback(true)
    setTimeout(() => setAddedFeedback(false), 1500)
  }

  return (
    <div className="min-h-dvh bg-gray-50">
      <Navbar />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        {/* Breadcrumb */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex items-center gap-2 text-sm text-gray-500 mb-6"
        >
          <Link to="/" className="hover:text-brand">Accueil</Link>
          <span>/</span>
          <Link to="/categories" className="hover:text-brand">Catégories</Link>
          <span>/</span>
          <Link to="/categories?cat=electronique" className="hover:text-brand">Électronique</Link>
          <span>/</span>
          <span className="text-gray-900">{product.name}</span>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 mb-16">
          {/* Images */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <ImageGallery images={product.images} />
          </motion.div>

          {/* Infos produit */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-6"
          >
            {/* Badge + Catégorie */}
            <div className="flex items-center gap-3">
              {product.badge && (
                <span className="bg-brand text-white text-xs font-bold px-3 py-1 rounded-full">
                  {product.badge}
                </span>
              )}
              <span className="text-sm text-gray-500">{product.category}</span>
            </div>

            {/* Titre */}
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
              {product.name}
            </h1>

            {/* Rating */}
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    size={18}
                    className={i < Math.floor(product.rating)
                      ? 'fill-amber-400 text-amber-400'
                      : 'text-gray-200'}
                  />
                ))}
              </div>
              <span className="text-sm font-semibold text-gray-900">{product.rating}</span>
              <span className="text-sm text-gray-500">({product.reviews} avis)</span>
            </div>

            {/* Prix */}
            <div className="flex items-baseline gap-3">
              <span className="text-4xl font-bold text-gray-900">
                {product.price.toLocaleString('fr-FR')} FCFA
              </span>
              {product.oldPrice && (
                <span className="text-xl text-gray-400 line-through">
                  {product.oldPrice.toLocaleString('fr-FR')} FCFA
                </span>
              )}
              {product.oldPrice && (
                <span className="bg-red-100 text-red-600 text-sm font-bold px-2 py-1 rounded">
                  -{Math.round((1 - product.price / product.oldPrice) * 100)}%
                </span>
              )}
            </div>

            {/* Stock */}
            <div className={`flex items-center gap-2 text-sm ${product.stock <= 5 ? 'text-red-600' : 'text-brand'
              }`}>
              <Check size={16} />
              {product.stock <= 5
                ? `Seulement ${product.stock} articles en stock`
                : 'En stock'}
            </div>

            {/* Sélecteur couleur */}
            <div>
              <p className="text-sm font-semibold text-gray-900 mb-3">Couleur</p>
              <div className="flex gap-3">
                {colors.map(color => (
                  <button
                    key={color}
                    onClick={() => setSelectedColor(color)}
                    className={`px-4 py-2 rounded-lg border-2 text-sm font-medium transition-all ${selectedColor === color
                        ? 'border-brand bg-brand/10 text-brand'
                        : 'border-gray-200 text-gray-700 hover:border-gray-300'
                      }`}
                  >
                    {color}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantité */}
            <div>
              <p className="text-sm font-semibold text-gray-900 mb-3">Quantité</p>
              <div className="flex items-center gap-3">
                <button
                  onClick={decreaseQty}
                  className="w-10 h-10 rounded-lg border border-gray-300 flex items-center
                             justify-center hover:border-brand hover:text-brand transition-all"
                >
                  <Minus size={18} />
                </button>
                <span className="w-16 text-center font-semibold text-lg">{quantity}</span>
                <button
                  onClick={increaseQty}
                  className="w-10 h-10 rounded-lg border border-gray-300 flex items-center
                             justify-center hover:border-brand hover:text-brand transition-all"
                >
                  <Plus size={18} />
                </button>
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-4">
              <button
                type="button"
                onClick={handleAddToCart}
                className="flex-1 bg-brand hover:bg-brand-hover text-white font-bold
                           py-3.5 rounded-xl transition-colors flex items-center justify-center gap-2"
              >
                <ShoppingCart size={18} />
                {addedFeedback ? 'Ajouté !' : 'Ajouter au panier'}
              </button>
              <button
                type="button"
                onClick={() => toggleWishlist(catalogProduct, product.category)}
                className="w-14 h-14 rounded-xl border border-gray-300 flex items-center
                           justify-center hover:border-brand hover:text-brand transition-all"
                aria-label={isFav ? 'Retirer des favoris' : 'Ajouter aux favoris'}
              >
                <Heart
                  size={22}
                  className={isFav ? 'fill-red-500 text-red-500' : ''}
                />
              </button>
              <button className="w-14 h-14 rounded-xl border border-gray-300 flex items-center
                         justify-center hover:border-brand hover:text-brand transition-all">
                <Share2 size={22} />
              </button>
            </div>

            {/* Garanties */}
            <div className="grid grid-cols-3 gap-4 pt-4 border-t border-gray-200">
              {[
                { icon: Truck, text: 'Livraison rapide' },
                { icon: Shield, text: 'Paiement sécurisé' },
                { icon: RefreshCw, text: 'Retour 14 jours' }
              ].map(({ icon: Icon, text }) => (
                <div key={text} className="text-center">
                  <Icon size={20} className="text-brand mx-auto mb-1" />
                  <p className="text-xs text-gray-600">{text}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Tabs Description / Reviews */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl p-6 md:p-8 mb-12"
        >
          {/* Tabs */}
          <div className="flex gap-6 border-b border-gray-200 mb-6">
            {['description', 'reviews'].map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`pb-3 text-sm font-semibold transition-all relative ${activeTab === tab
                    ? 'text-brand'
                    : 'text-gray-500 hover:text-gray-700'
                  }`}
              >
                {tab === 'description' ? 'Description' : 'Avis clients'}
                {activeTab === tab && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-brand" />
                )}
              </button>
            ))}
          </div>

          {/* Content */}
          <AnimatePresence mode="wait">
            {activeTab === 'description' ? (
              <motion.div
                key="desc"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <p className="text-gray-600 leading-relaxed mb-6">{PRODUCT_DATA.description}</p>
                <h3 className="font-semibold text-gray-900 mb-3">Caractéristiques</h3>
                <ul className="space-y-2">
                  {PRODUCT_DATA.features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-2 text-gray-600">
                      <Check size={16} className="text-brand shrink-0 mt-0.5" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ) : (
              <motion.div
                key="reviews"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="space-y-4"
              >
                {REVIEWS.map(review => (
                  <ReviewCard key={review.id} review={review} />
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Produits similaires */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Produits similaires</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {RELATED_PRODUCTS.map(product => (
              <button
                key={product.id}
                type="button"
                onClick={() => openProductModal(
                  resolveCatalogProduct(product),
                  { categoryLabel: 'Électronique' }
                )}
                className="bg-white rounded-xl p-4 border border-gray-200 hover:border-brand
                          hover:shadow-lg transition-all group text-left"
              >
                <ProductImageFrame
                  src={product.img}
                  alt={product.name}
                  size="square"
                  border={false}
                  className="mb-3 rounded-lg border border-gray-100"
                  imgClassName="group-hover:scale-105 transition-transform duration-300"
                />
                <h3 className="text-sm font-semibold text-gray-900 line-clamp-2 mb-2">
                  {product.name}
                </h3>
                <p className="text-sm font-bold text-gray-900">
                  {product.price.toLocaleString('fr-FR')} FCFA
                </p>
              </button>
            ))}
          </div>
        </motion.div>
      </main>

      <Footer />
    </div>
  )
}
