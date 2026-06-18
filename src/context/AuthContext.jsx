import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'
import { AUTH_STORAGE_KEY } from '../config/api'
import { loginRequest, mapAuthUser } from '../services/api/authApi'
import { ApiError } from '../services/api/httpClient'

function loadAuth() {
  try {
    const raw = localStorage.getItem(AUTH_STORAGE_KEY)
    return raw ? JSON.parse(raw) : null
  } catch {
    return null
  }
}

const AuthContext = createContext(null)

/** Comptes de démonstration (backend assigame) */
export const BACKEND_DEMO_ACCOUNTS = [
  { login: 'admin', password: 'admin123', label: 'Admin', role: 'admin' },
  { login: 'vendeur', password: 'vendeur123', label: 'Vendeur', role: 'vendeur' },
]

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => loadAuth())
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (user) {
      localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(user))
    } else {
      localStorage.removeItem(AUTH_STORAGE_KEY)
    }
  }, [user])

  const login = useCallback(async (identifier, password) => {
    setLoading(true)
    try {
      const response = await loginRequest(identifier.trim(), password)
      const mapped = mapAuthUser(response)
      localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(mapped))
      setUser(mapped)
      return mapped
    } catch (err) {
      const isNetworkError = err instanceof TypeError
        || (err instanceof Error && /fetch|network|failed/i.test(err.message))
      const message = err instanceof ApiError
        ? err.message
        : isNetworkError
          ? 'Impossible de joindre le serveur. Vérifiez que le backend tourne sur http://localhost:8080 et que CORS est configuré (redémarrez le backend après mise à jour).'
          : 'Impossible de joindre le serveur. Vérifiez que le backend est démarré.'
      throw new Error(message)
    } finally {
      setLoading(false)
    }
  }, [])

  const logout = useCallback(() => {
    setUser(null)
  }, [])

  const getDashboardPath = useCallback((role) => {
    if (role === 'admin') return '/admin/dashboard'
    if (role === 'vendeur') return '/vendeur/dashboard'
    return '/profile'
  }, [])

  const value = useMemo(() => ({
    user,
    loading,
    isAuthenticated: Boolean(user),
    login,
    logout,
    getDashboardPath,
  }), [user, loading, login, logout, getDashboardPath])

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider')
  }
  return context
}
