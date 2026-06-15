import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'
import { findProductById } from '../data/productsByCategory'

const CART_KEY = 'miatrosse_cart'
const WISHLIST_KEY = 'miatrosse_wishlist'

const ShopContext = createContext(null)

function loadStorage(key) {
  try {
    const raw = localStorage.getItem(key)
    return raw ? JSON.parse(raw) : []
  } catch {
    return []
  }
}

export function ShopProvider({ children }) {
  const [cartItems, setCartItems] = useState(() => loadStorage(CART_KEY))
  const [wishlistItems, setWishlistItems] = useState(() => loadStorage(WISHLIST_KEY))

  useEffect(() => {
    localStorage.setItem(CART_KEY, JSON.stringify(cartItems))
  }, [cartItems])

  useEffect(() => {
    localStorage.setItem(WISHLIST_KEY, JSON.stringify(wishlistItems))
  }, [wishlistItems])

  const addToCart = useCallback((product, quantity = 1) => {
    const qty = Math.max(1, quantity)
    setCartItems(prev => {
      const existing = prev.find(item => item.id === product.id)
      if (existing) {
        const maxStock = product.inStock ?? existing.stock
        const newQuantity = Math.min(existing.quantity + qty, maxStock)
        return prev.map(item =>
          item.id === product.id ? { ...item, quantity: newQuantity } : item
        )
      }
      return [...prev, {
        id: product.id,
        name: product.name,
        price: product.price,
        oldPrice: product.oldPrice ?? null,
        img: product.img,
        quantity: Math.min(qty, product.inStock ?? qty),
        stock: product.inStock,
      }]
    })
  }, [])

  const updateCartQuantity = useCallback((id, quantity) => {
    setCartItems(prev =>
      prev.map(item => (item.id === id ? { ...item, quantity } : item))
    )
  }, [])

  const removeFromCart = useCallback((id) => {
    setCartItems(prev => prev.filter(item => item.id !== id))
  }, [])

  const toggleWishlist = useCallback((product, categoryLabel) => {
    setWishlistItems(prev => {
      if (prev.some(item => item.id === product.id)) {
        return prev.filter(item => item.id !== product.id)
      }
      const meta = findProductById(product.id)
      return [...prev, {
        id: product.id,
        name: product.name,
        price: product.price,
        oldPrice: product.oldPrice ?? null,
        rating: product.rating,
        reviews: product.reviews,
        img: product.img,
        inStock: product.inStock > 0,
        stock: product.inStock,
        category: categoryLabel || meta?.category || 'Produit',
      }]
    })
  }, [])

  const removeFromWishlist = useCallback((id) => {
    setWishlistItems(prev => prev.filter(item => item.id !== id))
  }, [])

  const clearWishlist = useCallback(() => {
    setWishlistItems([])
  }, [])

  const isInWishlist = useCallback(
    (id) => wishlistItems.some(item => item.id === id),
    [wishlistItems]
  )

  const cartCount = useMemo(
    () => cartItems.reduce((sum, item) => sum + item.quantity, 0),
    [cartItems]
  )

  const value = useMemo(() => ({
    cartItems,
    wishlistItems,
    cartCount,
    addToCart,
    updateCartQuantity,
    removeFromCart,
    toggleWishlist,
    removeFromWishlist,
    clearWishlist,
    isInWishlist,
  }), [
    cartItems,
    wishlistItems,
    cartCount,
    addToCart,
    updateCartQuantity,
    removeFromCart,
    toggleWishlist,
    removeFromWishlist,
    clearWishlist,
    isInWishlist,
  ])

  return (
    <ShopContext.Provider value={value}>
      {children}
    </ShopContext.Provider>
  )
}

export function useShop() {
  const context = useContext(ShopContext)
  if (!context) {
    throw new Error('useShop must be used within ShopProvider')
  }
  return context
}
