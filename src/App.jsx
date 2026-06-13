import { BrowserRouter, Routes, Route } from 'react-router-dom'
import AuthPage from './pages/auth/AuthPage'
import HomePage from './pages/utilisateur/HomePage'
import CategoriesPage from './pages/utilisateur/CategoriesPage'
import OffresPage from './pages/utilisateur/OffresPage'
import AProposPage from './pages/utilisateur/AProposPage'
import ContactPage from './pages/utilisateur/ContactPage'
import ProductDetailPage from './pages/utilisateur/ProductDetailPage'
import CartPage from './pages/utilisateur/CartPage'
import WishlistPage from './pages/utilisateur/WishlistPage'
import UserProfilePage from './pages/utilisateur/UserProfilePage'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/auth" element={<AuthPage />} />
        <Route path="/" element={<HomePage />} />
        <Route path="/categories" element={<CategoriesPage />} />
        <Route path="/offres" element={<OffresPage />} />
        <Route path="/a-propos" element={<AProposPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/product/:id" element={<ProductDetailPage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/wishlist" element={<WishlistPage />} />
        <Route path="/profile" element={<UserProfilePage />} />
      </Routes>
    </BrowserRouter>
  )
}
