import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import ProtectedRoute from './components/auth/ProtectedRoute'
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

import AdminLayout from './pages/Administrateur/components/AdminLayout'
import AdminDashboardPage from './pages/Administrateur/AdminDashboardPage'
import AdminUsersPage from './pages/Administrateur/AdminUsersPage'
import AdminVendorsPage from './pages/Administrateur/AdminVendorsPage'
import AdminProductsPage from './pages/Administrateur/AdminProductsPage'
import AdminCategoriesPage from './pages/Administrateur/AdminCategoriesPage'
import AdminStatsPage from './pages/Administrateur/AdminStatsPage'
import AdminSettingsPage from './pages/Administrateur/AdminSettingsPage'

import VendeurLayout from './pages/vendeur/components/VendeurLayout'
import VendeurDashboardPage from './pages/vendeur/VendeurDashboardPage'
import VendeurProductsPage from './pages/vendeur/VendeurProductsPage'
import VendeurAddProductPage from './pages/vendeur/VendeurAddProductPage'
import VendeurStatsPage from './pages/vendeur/VendeurStatsPage'
import VendeurProfilePage from './pages/vendeur/VendeurProfilePage'
import VendeurSettingsPage from './pages/vendeur/VendeurSettingsPage'

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

        <Route path="/admin" element={
          <ProtectedRoute allowedRoles={['admin']}>
            <AdminLayout />
          </ProtectedRoute>
        }>
          <Route index element={<Navigate to="dashboard" replace />} />
          <Route path="dashboard" element={<AdminDashboardPage />} />
          <Route path="utilisateurs" element={<AdminUsersPage />} />
          <Route path="vendeurs" element={<AdminVendorsPage />} />
          <Route path="produits" element={<AdminProductsPage />} />
          <Route path="categories" element={<AdminCategoriesPage />} />
          <Route path="statistiques" element={<AdminStatsPage />} />
          <Route path="parametres" element={<AdminSettingsPage />} />
        </Route>

        <Route path="/vendeur" element={
          <ProtectedRoute allowedRoles={['vendeur']}>
            <VendeurLayout />
          </ProtectedRoute>
        }>
          <Route index element={<Navigate to="dashboard" replace />} />
          <Route path="dashboard" element={<VendeurDashboardPage />} />
          <Route path="produits" element={<VendeurProductsPage />} />
          <Route path="ajouter-produit" element={<VendeurAddProductPage />} />
          <Route path="statistiques" element={<VendeurStatsPage />} />
          <Route path="profil" element={<VendeurProfilePage />} />
          <Route path="parametres" element={<VendeurSettingsPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
