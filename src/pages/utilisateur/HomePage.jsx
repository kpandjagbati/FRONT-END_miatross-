import { useState, useEffect, useRef, useCallback, useMemo } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import { Link } from 'react-router-dom'
import {
  ChevronLeft, ChevronRight, Star, Heart, ShoppingCart,
  Shield, Truck, RefreshCw, Headphones, ArrowRight, Zap,
  Store
} from 'lucide-react'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import ProductImageFrame from './components/ProductImageFrame'
import { useShop } from '../../context/ShopContext'
import { resolveCatalogProduct } from '../../utils/resolveCatalogProduct'

// ── Images carrousel hero (fond transparent) ─────────────────────────────────
import heroSlideCasque from '../../assets/hero/casque-noir.png'
import heroSlideMode from '../../assets/hero/baskets-nike-dunk.png'
import heroSlideSport from '../../assets/hero/sacs-sport-luxe.png'
import heroSlideEnceinte from '../../assets/hero/enceinte-bluetooth.png'

// ── Images produits (grille accueil) ──────────────────────────────────────────
import heroCasque from '../../assets/electronique/casque-sony-wh1000xm4.png'
import heroNike from '../../assets/mode/baskets-adidas-samba.png'
import heroSac from '../../assets/sport/s1.jpeg'
import heroEnceinte from '../../assets/electronique/enceinte-jbl.png'

// ── Images catégories ─────────────────────────────────────────────────────────
import coverMode from '../../assets/mode/cover.png'
import coverElectro from '../../assets/electronique/cover.png'
import coverMaison from '../../assets/maison/M1.jpeg'
import coverBeaute from '../../assets/beaute/b1.jpeg'
import coverSport from '../../assets/sport/s1.jpeg'

// ── Données ───────────────────────────────────────────────────────────────────
const HERO_SLIDES = [
  {
    id: 1,
    brandLine: 'Casque Sony',
    titleLine: 'WH-1000XM4',
    bgWord: 'CASQUE',
    description: 'Réduction de bruit active, son premium et autonomie jusqu\'à 30 h. L\'expérience audio ultime pour vos déplacements.',
    img: heroSlideCasque,
  },
  {
    id: 2,
    brandLine: 'Adidas Originals',
    titleLine: 'Samba OG',
    bgWord: 'MODE',
    description: 'Icône intemporelle du streetwear. Cuir premium, semelle gomme et confort au quotidien pour un style affirmé.',
    img: heroSlideMode,
  },
  {
    id: 3,
    brandLine: 'Luxe Fitness',
    titleLine: 'Sac Sport',
    bgWord: 'SPORT',
    description: 'Compartiments intelligents, matériaux résistants et design élégant pour accompagner toutes vos séances.',
    img: heroSlideSport,
  },
  {
    id: 4,
    brandLine: 'JBL Audio',
    titleLine: 'Bluetooth',
    bgWord: 'AUDIO',
    description: 'Son puissant, basses profondes et connectivité sans fil. Emportez votre musique partout avec style.',
    img: heroSlideEnceinte,
  },
]

const CATEGORIES = [
  { label: 'Mode & Accessoires', img: coverMode, to: '/categories?cat=mode', count: 17 },
  { label: 'Électronique', img: coverElectro, to: '/categories?cat=electronique', count: 15 },
  { label: 'Maison & Bureau', img: coverMaison, to: '/categories?cat=maison', count: 15 },
  { label: 'Beauté & Santé', img: coverBeaute, to: '/categories?cat=beaute', count: 15 },
  { label: 'Sports & Loisirs', img: coverSport, to: '/categories?cat=sport', count: 15 },
]

const PRODUCTS = [
  { id: 1, name: 'Casque Sony WH-1000XM4', price: 45000, oldPrice: 55000, rating: 4.8, reviews: 120, badge: 'Populaire', img: heroCasque, cat: 'Électronique' },
  { id: 2, name: 'Basket Adidas Samba', price: 22000, oldPrice: null, rating: 4.5, reviews: 85, badge: 'Nouveau', img: heroNike, cat: 'Mode' },
  { id: 3, name: 'Sac de sport fitness', price: 18000, oldPrice: 25000, rating: 4.3, reviews: 60, badge: 'Promo', img: heroSac, cat: 'Sport' },
  { id: 4, name: 'Enceinte JBL Bluetooth', price: 35000, oldPrice: 40000, rating: 4.7, reviews: 200, badge: 'Top ventes', img: heroEnceinte, cat: 'Électronique' },
  { id: 5, name: 'Casque Sony WH-1000XM4', price: 45000, oldPrice: 55000, rating: 4.8, reviews: 120, badge: 'Populaire', img: heroCasque, cat: 'Électronique' },
  { id: 6, name: 'Basket Adidas Samba', price: 22000, oldPrice: null, rating: 4.5, reviews: 85, badge: 'Nouveau', img: heroNike, cat: 'Mode' },
]

const GUARANTEES = [
  { icon: Shield, title: 'Paiement sécurisé', desc: '100% sécurisé' },
  { icon: Truck, title: 'Livraison rapide', desc: 'Partout au Togo' },
  { icon: RefreshCw, title: 'Retour facile', desc: '14 jours pour changer' },
  { icon: Headphones, title: 'Support 24/7', desc: 'Assistance dédiée' },
]

const TABS = ['Populaires', 'Nouveautés', 'Meilleures ventes']

const EASE = [0.4, 0, 0.2, 1]

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-40px' },
  transition: { duration: 0.5, delay, ease: EASE },
})

const staggerContainer = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08, delayChildren: 0.05 } },
}

const staggerItem = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.45, ease: EASE } },
}

function SectionHeader({ title, linkTo, linkLabel = 'Voir tout' }) {
  return (
    <motion.div {...fadeUp()} className="flex items-center justify-between mb-5">
      <h2 className="text-xl font-bold text-gray-900">{title}</h2>
      {linkTo && (
        <Link to={linkTo}
          className="text-sm text-brand font-medium hover:underline flex items-center gap-1 group">
          {linkLabel}
          <motion.span whileHover={{ x: 4 }} transition={{ duration: 0.2 }}>
            <ArrowRight size={14} />
          </motion.span>
        </Link>
      )}
    </motion.div>
  )
}

// ── Hero Slider ───────────────────────────────────────────────────────────────
function HeroSlider() {
  const [current, setCurrent] = useState(0)
  const [dir, setDir] = useState(1)
  const [paused, setPaused] = useState(false)
  const timerRef = useRef(null)
  const reduceMotion = useReducedMotion()

  const go = useCallback((next) => {
    setDir(next > current ? 1 : -1)
    setCurrent((next + HERO_SLIDES.length) % HERO_SLIDES.length)
  }, [current])

  const resetTimer = useCallback(() => {
    clearInterval(timerRef.current)
    if (paused || reduceMotion) return
    timerRef.current = setInterval(() => {
      setDir(1)
      setCurrent(c => (c + 1) % HERO_SLIDES.length)
    }, 5500)
  }, [paused, reduceMotion])

  useEffect(() => {
    resetTimer()
    return () => clearInterval(timerRef.current)
  }, [resetTimer])

  const slide = HERO_SLIDES[current]

  const slideVariants = reduceMotion
    ? { enter: { opacity: 0 }, center: { opacity: 1 }, exit: { opacity: 0 } }
    : {
        enter: (d) => ({ opacity: 0, x: d > 0 ? 40 : -40 }),
        center: { opacity: 1, x: 0 },
        exit: (d) => ({ opacity: 0, x: d > 0 ? -40 : 40 }),
      }

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: EASE }}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      className="relative overflow-hidden rounded-3xl mx-4 sm:mx-6 my-4
                 bg-gradient-to-br from-[#e4e4e4] via-[#efefef] to-[#e8e8e8]
                 shadow-[0_20px_60px_rgba(0,0,0,0.08)] min-h-[460px] md:min-h-[520px]"
      aria-roledescription="carousel"
      aria-label="Produits en vedette"
    >
      {/* Mot géant en arrière-plan */}
      <div
        aria-hidden
        className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden"
      >
        <span className="text-[5.5rem] sm:text-[7rem] md:text-[9rem] lg:text-[11rem]
                           font-black tracking-tight uppercase leading-none
                           translate-y-2 md:translate-y-4
                           text-gray-900/[0.06]">
          {slide.bgWord}
        </span>
      </div>

      <AnimatePresence custom={dir} initial={false} mode="wait">
        <motion.div
          key={current}
          custom={dir}
          variants={slideVariants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{ duration: reduceMotion ? 0.2 : 0.5, ease: EASE }}
          className="relative z-10 grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-4 items-stretch
                     px-6 sm:px-10 md:px-12 py-10 md:py-12 min-h-[460px] md:min-h-[520px]"
        >
          {/* Marque + titre + CTA */}
          <div className="md:col-span-3 flex flex-col justify-between pt-2 md:pt-8 pb-4 md:pb-10 order-1 min-h-[220px] md:min-h-0">
            <div>
              <p className="text-sm font-semibold text-gray-900 tracking-wide">
                {slide.brandLine}
              </p>
              <h2 className="text-4xl sm:text-5xl md:text-[3.25rem] font-bold text-gray-900
                             leading-[1.05] mt-1">
                {slide.titleLine}
              </h2>
            </div>
            <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} className="mt-10 md:mt-0">
              <Link
                to="/categories"
                className="inline-flex items-center justify-center bg-red-500 hover:bg-red-600
                           text-white text-sm font-semibold px-8 py-3 rounded-full
                           shadow-md shadow-red-500/25 transition-colors"
              >
                Parcourir les catégories
              </Link>
            </motion.div>
          </div>

          {/* Image produit flottante */}
          <div className="md:col-span-6 flex items-center justify-center order-2 md:order-2 relative">
            <div
              aria-hidden
              className="absolute bottom-4 md:bottom-8 w-48 md:w-64 h-8 md:h-10
                         bg-black/10 blur-2xl rounded-full"
            />
            <motion.img
              src={slide.img}
              alt={`${slide.brandLine} ${slide.titleLine}`}
              animate={reduceMotion ? {} : { y: [0, -12, 0] }}
              transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut' }}
              className="relative max-h-52 sm:max-h-64 md:max-h-80 lg:max-h-[22rem] w-auto object-contain z-10"
              style={{ filter: 'drop-shadow(0 28px 40px rgba(0,0,0,0.18))' }}
            />
          </div>

          {/* Description */}
          <div className="md:col-span-3 flex flex-col justify-end items-start md:items-end
                          pb-2 md:pb-6 order-3">
            <p className="text-sm font-bold text-gray-900">Description</p>
            <p className="text-xs sm:text-sm text-gray-500 leading-relaxed mt-2
                           max-w-xs md:text-right">
              {slide.description}
            </p>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Contrôles carousel */}
      <motion.button
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.92 }}
        onClick={() => { go(current - 1); resetTimer() }}
        aria-label="Produit précédent"
        className="absolute left-3 top-1/2 -translate-y-1/2 z-20 bg-white/80 hover:bg-white
                   text-gray-700 p-2 rounded-full shadow-md backdrop-blur-sm border border-gray-200/80"
      >
        <ChevronLeft size={20} />
      </motion.button>
      <motion.button
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.92 }}
        onClick={() => { go(current + 1); resetTimer() }}
        aria-label="Produit suivant"
        className="absolute right-3 top-1/2 -translate-y-1/2 z-20 bg-white/80 hover:bg-white
                   text-gray-700 p-2 rounded-full shadow-md backdrop-blur-sm border border-gray-200/80"
      >
        <ChevronRight size={20} />
      </motion.button>

      {/* Indicateurs */}
      <div className="absolute bottom-6 sm:bottom-8 right-6 sm:right-10 md:right-12 flex gap-2 z-20">
        {HERO_SLIDES.map((_, i) => (
          <button
            key={i}
            onClick={() => { go(i); resetTimer() }}
            aria-label={`Aller au produit ${i + 1}`}
            aria-current={i === current ? 'true' : undefined}
            className={`h-2 rounded-full transition-all duration-300 ${
              i === current ? 'w-7 bg-gray-900' : 'w-2 bg-gray-400/70 hover:bg-gray-500'
            }`}
          />
        ))}
      </div>
    </motion.section>
  )
}

// ── Carte produit ─────────────────────────────────────────────────────────────
function ProductCard({ product }) {
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
      categoryLabel: product.cat,
      badge: product.badge,
    })
  }

  const BADGE_COLORS = {
    'Populaire': 'bg-brand text-white',
    'Nouveau': 'bg-blue-500 text-white',
    'Promo': 'bg-red-500 text-white',
    'Top ventes': 'bg-amber-500 text-white',
  }

  return (
    <motion.div
      whileHover={{ y: -8, boxShadow: '0 20px 40px rgba(0,0,0,0.08)' }}
      whileTap={{ scale: 0.98 }}
      transition={{ duration: 0.25, ease: EASE }}
      onClick={handleOpenDetails}
      onKeyDown={e => e.key === 'Enter' && handleOpenDetails()}
      role="button"
      tabIndex={0}
      className="group relative bg-white rounded-2xl border border-gray-100
                 shadow-sm overflow-hidden cursor-pointer"
    >
      <ProductImageFrame
        src={product.img}
        alt={product.name}
        imgClassName="group-hover:scale-105 transition-transform duration-500"
        className="group"
      >
        {/* Badge */}
        {product.badge && (
          <motion.span
            initial={{ opacity: 0, x: -8 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.15 }}
            className={`absolute top-3 left-3 text-xs font-bold px-2.5 py-1 rounded-full
                        ${BADGE_COLORS[product.badge] || 'bg-gray-200'}`}
          >
            {product.badge}
          </motion.span>
        )}

        {/* Favori */}
        <motion.button
          type="button"
          whileHover={{ scale: 1.12 }}
          whileTap={{ scale: 0.9 }}
          onClick={e => {
            e.stopPropagation()
            toggleWishlist(catalogProduct, product.cat)
          }}
          className="absolute top-3 right-3 w-8 h-8 bg-white rounded-full shadow flex
                     items-center justify-center border border-gray-100"
          aria-label={isFav ? 'Retirer des favoris' : 'Ajouter aux favoris'}
        >
          <motion.div
            animate={isFav ? { scale: [1, 1.35, 1] } : { scale: 1 }}
            transition={{ duration: 0.35 }}
          >
            <Heart size={15} className={isFav ? 'fill-red-500 text-red-500' : 'text-gray-400'} />
          </motion.div>
        </motion.button>

        {/* Bouton panier au hover */}
        <div className="absolute bottom-0 left-0 right-0 translate-y-full group-hover:translate-y-0
                        transition-transform duration-300 ease-out">
          <button
            type="button"
            onClick={handleAddToCart}
            className="w-full bg-brand hover:bg-brand-hover text-white text-sm font-semibold
                             py-2.5 flex items-center justify-center gap-2 transition-colors"
          >
            <ShoppingCart size={15} /> {addedFeedback ? 'Ajouté !' : 'Ajouter au panier'}
          </button>
        </div>
      </ProductImageFrame>

      {/* Infos */}
      <div className="p-4">
        <p className="text-xs text-brand font-medium mb-1">{product.cat}</p>
        <h3 className="text-sm font-semibold text-gray-800 leading-snug line-clamp-2 mb-2">
          {product.name}
        </h3>

        {/* Étoiles */}
        <div className="flex items-center gap-1 mb-3">
          <div className="flex">
            {[1, 2, 3, 4, 5].map(s => (
              <Star key={s} size={12}
                className={s <= Math.round(product.rating)
                  ? 'fill-amber-400 text-amber-400'
                  : 'text-gray-200 fill-gray-200'}
              />
            ))}
          </div>
          <span className="text-xs text-gray-400 ml-1">({product.reviews})</span>
        </div>

        {/* Prix */}
        <div className="flex items-baseline gap-2">
          <span className="text-base font-bold text-gray-900">
            {product.price.toLocaleString('fr-FR')} FCFA
          </span>
          {product.oldPrice && (
            <span className="text-xs text-gray-400 line-through">
              {product.oldPrice.toLocaleString('fr-FR')} FCFA
            </span>
          )}
        </div>
      </div>
    </motion.div>
  )
}

// ── Page Accueil ──────────────────────────────────────────────────────────────
export default function HomePage() {
  const [activeTab, setActiveTab] = useState('Populaires')
  const reduceMotion = useReducedMotion()
  const { storeProducts, refreshStoreProducts } = useShop()

  useEffect(() => {
    refreshStoreProducts()
  }, [refreshStoreProducts])

  const displayProducts = useMemo(
    () => [
      ...storeProducts.map(product => ({ ...product, cat: product.category })),
      ...PRODUCTS,
    ],
    [storeProducts]
  )

  return (
    <div className="min-h-dvh bg-gray-50">
      <Navbar />

      {/* Hero Slider */}
      <HeroSlider />

      {/* Garanties */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 my-6">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-30px' }}
          className="grid grid-cols-2 md:grid-cols-4 gap-3"
        >
          {GUARANTEES.map(({ icon: Icon, title, desc }) => (
            <motion.div
              key={title}
              variants={staggerItem}
              whileHover={{ y: -4, boxShadow: '0 8px 24px rgba(39,60,117,0.12)' }}
              className="bg-white rounded-xl border border-gray-100 px-4 py-4 flex items-center
                         gap-3 shadow-sm cursor-default"
            >
              <motion.div
                whileHover={{ rotate: [0, -8, 8, 0], scale: 1.08 }}
                transition={{ duration: 0.45 }}
                className="w-10 h-10 rounded-xl bg-brand/10 flex items-center justify-center shrink-0"
              >
                <Icon size={18} className="text-brand" />
              </motion.div>
              <div>
                <p className="text-xs font-bold text-gray-800">{title}</p>
                <p className="text-xs text-gray-400">{desc}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* Catégories populaires */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 my-8">
        <SectionHeader title="Catégories populaires" linkTo="/categories" />
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-40px' }}
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4"
        >
          {CATEGORIES.map(({ label, img, to, count }) => (
            <motion.div key={label} variants={staggerItem}>
              <Link to={to}>
                <motion.div
                  whileHover={{ y: -6, scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ duration: 0.25, ease: EASE }}
                  className="group bg-white rounded-2xl border border-gray-100 overflow-hidden
                             shadow-sm hover:shadow-xl cursor-pointer"
                >
                  <ProductImageFrame
                    src={img}
                    alt={label}
                    size="category"
                    border={false}
                    className="rounded-none"
                    imgClassName="group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="px-3 py-3 text-center">
                    <p className="text-xs font-bold text-gray-800 leading-tight">{label}</p>
                    <p className="text-xs text-gray-400 mt-0.5">{count} produits</p>
                  </div>
                </motion.div>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* Flash Sale */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 my-8">
        <motion.div
          {...fadeUp(0.1)}
          whileHover={{ scale: 1.01 }}
          transition={{ duration: 0.3 }}
          className="bg-gradient-to-r from-brand to-brand-hover rounded-2xl px-6 py-5
                     flex flex-col sm:flex-row items-center justify-between gap-4 shadow-lg
                     overflow-hidden relative"
        >
          {!reduceMotion && (
            <motion.div
              aria-hidden
              animate={{ x: ['-100%', '200%'] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'linear', repeatDelay: 2 }}
              className="absolute inset-0 w-1/3 bg-gradient-to-r from-transparent via-white/10 to-transparent skew-x-12 pointer-events-none"
            />
          )}
          <div className="flex items-center gap-3 text-white relative z-10">
            <motion.div
              animate={reduceMotion ? {} : { scale: [1, 1.15, 1], rotate: [0, -8, 8, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            >
              <Zap size={28} className="text-white" strokeWidth={2.25} />
            </motion.div>
            <div>
              <p className="font-black text-lg">Flash Sale !</p>
              <p className="text-white/80 text-sm">Offres limitées — Ne les manquez pas</p>
            </div>
          </div>
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="flex gap-3 relative z-10"
          >
            {[['02', 'h'], ['45', 'm'], ['30', 's']].map(([val, unit], i) => (
              <motion.div
                key={unit}
                variants={staggerItem}
                animate={reduceMotion ? {} : { y: [0, -3, 0] }}
                transition={{ duration: 1.8, repeat: Infinity, delay: i * 0.2, ease: 'easeInOut' }}
                className="bg-white/20 backdrop-blur-sm text-white text-center
                           px-4 py-2 rounded-xl min-w-[56px]"
              >
                <p className="text-2xl font-black tabular-nums">{val}</p>
                <p className="text-xs text-white/70">{unit}</p>
              </motion.div>
            ))}
          </motion.div>
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }} className="relative z-10 shrink-0">
            <Link to="/offres"
              className="bg-white text-brand font-bold text-sm px-5 py-2.5 rounded-xl
                         hover:bg-gray-50 transition-colors inline-block">
              Voir les offres
            </Link>
          </motion.div>
        </motion.div>
      </section>

      {/* Produits populaires */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 my-8">
        <motion.div {...fadeUp()} className="flex items-center justify-between mb-5 flex-wrap gap-3">
          <h2 className="text-xl font-bold text-gray-900">Produits populaires</h2>

          {/* Tabs */}
          <div className="flex bg-gray-100 rounded-xl p-1 gap-1 relative">
            {TABS.map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`relative px-4 py-1.5 rounded-lg text-sm font-medium transition-colors z-10 ${
                  activeTab === tab ? 'text-brand' : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                {activeTab === tab && (
                  <motion.span
                    layoutId="home-product-tab"
                    className="absolute inset-0 bg-white rounded-lg shadow-sm -z-10"
                    transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                  />
                )}
                {tab}
              </button>
            ))}
          </div>

          <Link to="/categories"
            className="text-sm text-brand font-medium hover:underline flex items-center gap-1">
            Voir tout <ArrowRight size={14} />
          </Link>
        </motion.div>

        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.35, ease: EASE }}
            className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4"
          >
            {displayProducts.map((p, i) => (
              <motion.div
                key={`${p.id}-${i}`}
                initial={{ opacity: 0, y: 24, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ delay: i * 0.06, duration: 0.4, ease: EASE }}
              >
                <ProductCard product={p} />
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>
      </section>

      {/* Bannière CTA */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 my-10">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6, ease: EASE }}
          whileHover={{ scale: 1.01 }}
          className="bg-gray-900 rounded-2xl overflow-hidden relative"
        >
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.15, duration: 0.55, ease: EASE }}
            className="relative px-8 py-12 max-w-lg"
          >
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-brand font-semibold text-sm mb-2 inline-flex items-center gap-1.5"
            >
              <Store size={16} /> Vendez sur MiaTrossè
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.28 }}
              className="text-white text-3xl font-black mb-3"
            >
              Devenez vendeur<br />dès aujourd'hui
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.36 }}
              className="text-gray-400 text-sm mb-6"
            >
              Rejoignez des milliers de vendeurs et touchez des milliers de clients au Togo.
            </motion.p>
            <motion.div
              whileHover={{ scale: 1.05, x: 4 }}
              whileTap={{ scale: 0.97 }}
            >
              <Link to="/auth?tab=signup"
                className="inline-flex items-center gap-2 bg-brand hover:bg-brand-hover
                           text-white font-bold px-6 py-3 rounded-xl transition-colors">
                Commencer gratuitement <ArrowRight size={16} />
              </Link>
            </motion.div>
          </motion.div>
        </motion.div>
      </section>

      <Footer />
    </div>
  )
}
