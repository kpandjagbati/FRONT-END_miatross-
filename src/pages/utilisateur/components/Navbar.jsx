import { useState, useEffect } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { ShoppingCart, Heart, User, Search, Menu, X } from 'lucide-react'
import logoImg from '../../../assets/MiaTrossè-logo1.png'
import { useShop } from '../../../context/ShopContext'

const NAV_LINKS = [
  { label: 'Accueil',    to: '/' },
  { label: 'Catégories', to: '/categories' },
  { label: 'Offres',     to: '/offres' },
  { label: 'À propos',   to: '/a-propos' },
  { label: 'Contact',    to: '/contact' },
]

export default function Navbar() {
  const [menuOpen, setMenuOpen]   = useState(false)
  const [scrolled, setScrolled]   = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const location                  = useLocation()
  const navigate                  = useNavigate()
  const { cartCount, wishlistItems } = useShop()
  const wishlistCount = wishlistItems.length

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => setMenuOpen(false), [location])

  useEffect(() => {
    if (location.pathname === '/categories') {
      const q = new URLSearchParams(location.search).get('q') ?? ''
      setSearchTerm(q)
    }
  }, [location])

  const handleSearch = (e) => {
    e.preventDefault()
    const q = searchTerm.trim()
    if (q) {
      navigate(`/categories?q=${encodeURIComponent(q)}`)
    } else {
      navigate('/categories')
    }
    setMenuOpen(false)
  }

  return (
      <header
        className={`sticky top-0 z-50 bg-white transition-shadow duration-300 ${
          scrolled ? 'shadow-md' : 'shadow-sm'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex items-center md:grid md:grid-cols-[1fr_minmax(18rem,36rem)_1fr]
                          gap-3 md:gap-6 lg:gap-8 h-14 sm:h-16 overflow-visible">

            {/* Logo — agrandi visuellement, centré verticalement dans la barre */}
            <Link
              to="/"
              className="flex h-14 sm:h-16 items-start shrink-0 justify-self-start relative z-10 pt-3 sm:pt-4 md:pt-5"
            >
              <img
                src={logoImg}
                alt="Shop MiaTrossè"
                className="h-12 w-auto sm:h-14 object-contain origin-bottom-left
                           scale-[1.55] sm:scale-[1.7] md:scale-[1.9] lg:scale-[2]
                           translate-y-2 sm:translate-y-3 md:translate-y-4"
              />
            </Link>

            {/* Barre de recherche — centrée horizontalement et verticalement */}
            <div className="hidden md:flex h-14 sm:h-16 w-full items-center justify-center justify-self-center self-center">
              <form
                onSubmit={handleSearch}
                className="flex w-full rounded-xl border border-gray-200 overflow-hidden
                           focus-within:border-brand focus-within:ring-2
                           focus-within:ring-brand/20 transition-all shadow-sm"
              >
                <input
                  type="search"
                  value={searchTerm}
                  onChange={e => setSearchTerm(e.target.value)}
                  placeholder="Rechercher un produit, une catégorie…"
                  className="flex-1 px-4 py-2 text-sm outline-none bg-white text-gray-900
                             placeholder:text-gray-400 min-w-0"
                />
                <button
                  type="submit"
                  className="bg-brand hover:bg-brand-hover px-4 py-2 text-white shrink-0
                             transition-colors flex items-center gap-2 text-sm font-medium"
                >
                  <Search size={16} />
                  Rechercher
                </button>
              </form>
            </div>

            {/* Icônes — alignées verticalement avec le logo */}
            <div className="hidden md:flex h-14 sm:h-16 items-center justify-end gap-6 lg:gap-8
                            justify-self-end self-center pr-1 lg:pr-2">
              <Link to="/auth"
                className="flex flex-col items-center text-gray-500 hover:text-brand transition-colors">
                <User size={22} />
                <span className="text-[10px] mt-1">Compte</span>
              </Link>

              <Link to="/wishlist"
                className="flex flex-col items-center text-gray-500 hover:text-brand transition-colors">
                <div className="relative">
                  <Heart size={22} />
                  {wishlistCount > 0 && (
                    <span className="absolute -top-2 -right-2 bg-brand text-white text-[9px]
                                     font-bold w-4 h-4 rounded-full flex items-center justify-center">
                      {wishlistCount > 9 ? '9+' : wishlistCount}
                    </span>
                  )}
                </div>
                <span className="text-[10px] mt-1">Favoris</span>
              </Link>

              <Link to="/cart"
                className="flex flex-col items-center text-gray-500 hover:text-brand transition-colors">
                <div className="relative">
                  <ShoppingCart size={22} />
                  {cartCount > 0 && (
                    <span className="absolute -top-2 -right-2 bg-brand text-white text-[9px]
                                     font-bold w-4 h-4 rounded-full flex items-center justify-center">
                      {cartCount > 9 ? '9+' : cartCount}
                    </span>
                  )}
                </div>
                <span className="text-[10px] mt-1">Panier</span>
              </Link>
            </div>

            {/* Burger — mobile */}
            <button
              className="ml-auto md:hidden flex h-14 sm:h-16 items-center text-gray-700"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Menu"
            >
              {menuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

          {/* Liens de navigation — centrés sous la barre de recherche */}
          <nav className="hidden md:grid md:grid-cols-[1fr_minmax(18rem,36rem)_1fr]
                          gap-3 md:gap-6 lg:gap-8 pb-2">
            <div aria-hidden="true" />
            <div className="flex items-center justify-center gap-1">
              {NAV_LINKS.map(({ label, to }) => {
                const active = location.pathname === to
                return (
                  <Link
                    key={to}
                    to={to}
                    className={`relative px-4 py-2 text-sm font-medium rounded-lg transition-colors group ${
                      active ? 'text-brand' : 'text-gray-600 hover:text-brand'
                    }`}
                  >
                    {label}
                    <span
                      className={`absolute bottom-0 left-4 right-4 h-0.5 bg-brand rounded-full
                                  transition-transform duration-300 origin-left ${
                        active ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
                      }`}
                    />
                  </Link>
                )
              })}
            </div>
            <div aria-hidden="true" />
          </nav>
        </div>

        {/* Menu mobile */}
        <AnimatePresence>
          {menuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.25 }}
              className="md:hidden bg-white border-t border-gray-100 overflow-hidden"
            >
              <div className="px-4 py-3 space-y-1">
                {/* Recherche mobile */}
                <form onSubmit={handleSearch} className="flex rounded-xl border border-gray-200 overflow-hidden mb-3">
                  <input
                    type="search"
                    value={searchTerm}
                    onChange={e => setSearchTerm(e.target.value)}
                    placeholder="Rechercher…"
                    className="flex-1 px-3 py-2 text-sm outline-none bg-white text-gray-900
                               placeholder:text-gray-400"
                  />
                  <button type="submit" className="bg-brand px-4 text-white">
                    <Search size={16} />
                  </button>
                </form>

                {NAV_LINKS.map(({ label, to }) => (
                  <Link key={to} to={to}
                    className={`block px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                      location.pathname === to
                        ? 'bg-brand/10 text-brand'
                        : 'text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    {label}
                  </Link>
                ))}

                <div className="flex gap-4 pt-3 border-t border-gray-100 mt-2">
                  <Link to="/auth" className="flex items-center gap-2 text-sm text-gray-600 hover:text-brand">
                    <User size={16} /> Compte
                  </Link>
                  <Link to="/wishlist" className="flex items-center gap-2 text-sm text-gray-600 hover:text-brand">
                    <Heart size={16} /> Favoris ({wishlistCount})
                  </Link>
                  <Link to="/cart" className="flex items-center gap-2 text-sm text-gray-600 hover:text-brand">
                    <ShoppingCart size={16} /> Panier ({cartCount})
                  </Link>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>
  )
}
