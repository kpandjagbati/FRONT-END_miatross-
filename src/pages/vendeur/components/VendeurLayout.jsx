import { useState } from 'react'
import { Link, NavLink, Outlet, useNavigate } from 'react-router-dom'
import { Bell, LogOut, Menu, Search, X } from 'lucide-react'
import { useAuth } from '../../../context/AuthContext'
import { VENDEUR_NAV } from '../config/navConfig'
import logoImg from '../../../assets/MiaTrossè-logo1.png'

export default function VendeurLayout() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const handleLogout = () => {
    logout()
    navigate('/auth')
  }

  return (
    <div className="min-h-dvh bg-gray-50 flex">
      {sidebarOpen && (
        <button
          type="button"
          aria-label="Fermer le menu"
          className="fixed inset-0 bg-black/40 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <aside className={`fixed lg:static inset-y-0 left-0 z-50 w-64 bg-[#1a2540]
                         flex flex-col transform transition-transform duration-200
                         ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}>
        <div className="p-5 border-b border-white/10 text-white">
          <Link to="/" className="flex items-center gap-2">
            <img src={logoImg} alt="MiaTrossè" className="h-10 w-auto brightness-0 invert" />
          </Link>
          <p className="text-xs text-white/50 mt-2 font-medium uppercase tracking-wider">
            Espace vendeur
          </p>
        </div>

        <nav className="flex-1 overflow-y-auto p-3 space-y-1 text-white">
          {VENDEUR_NAV.map(({ to, label, icon: Icon }) => (
            <NavLink
              key={to}
              to={to}
              onClick={() => setSidebarOpen(false)}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                  isActive
                    ? 'bg-brand text-white'
                    : 'text-white/70 hover:bg-white/10 hover:text-white'
                }`
              }
            >
              <Icon size={18} />
              {label}
            </NavLink>
          ))}
        </nav>

        <div className="p-3 border-t border-white/10 text-white">
          <button
            type="button"
            onClick={handleLogout}
            className="flex items-center gap-3 w-full px-3 py-2.5 rounded-xl text-sm
                       font-medium text-white/70 hover:bg-white/10 hover:text-white transition-colors"
          >
            <LogOut size={18} />
            Déconnexion
          </button>
        </div>
      </aside>

      <div className="flex-1 flex flex-col min-w-0 text-gray-900">
        <header className="sticky top-0 z-30 bg-white border-b border-gray-100 px-4 sm:px-6 py-4 text-gray-900">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-3 flex-1 min-w-0">
              <button
                type="button"
                onClick={() => setSidebarOpen(true)}
                className="lg:hidden p-2 rounded-lg hover:bg-gray-100 text-gray-600"
              >
                <Menu size={22} />
              </button>
              <div className="relative flex-1 max-w-md hidden sm:block">
                <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="search"
                  placeholder="Rechercher..."
                  className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-xl
                             text-sm outline-none focus:border-brand focus:ring-2 focus:ring-brand/20"
                />
              </div>
            </div>
            <div className="flex items-center gap-3">
              <button type="button" className="relative p-2 rounded-lg hover:bg-gray-100 text-gray-600">
                <Bell size={20} />
                <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full" />
              </button>
              <div className="flex items-center gap-2 pl-3 border-l border-gray-200">
                <div className="w-9 h-9 rounded-full bg-brand text-white flex items-center justify-center
                                text-sm font-bold">
                  {user?.storeName?.charAt(0) || user?.name?.charAt(0) || 'V'}
                </div>
                <div className="hidden md:block">
                  <p className="text-sm font-semibold text-gray-900">{user?.storeName || user?.name}</p>
                  <p className="text-xs text-gray-500">Vendeur</p>
                </div>
              </div>
            </div>
          </div>
        </header>

        <main className="dashboard-main flex-1 p-4 sm:p-6 overflow-auto text-gray-900">
          <Outlet />
        </main>
      </div>

      {sidebarOpen && (
        <button
          type="button"
          onClick={() => setSidebarOpen(false)}
          className="fixed top-4 right-4 z-50 lg:hidden p-2 bg-white rounded-full shadow-lg"
        >
          <X size={20} />
        </button>
      )}
    </div>
  )
}
