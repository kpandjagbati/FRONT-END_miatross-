import { Navigate, useLocation } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'

export default function ProtectedRoute({ children, allowedRoles }) {
  const { user, isAuthenticated, getDashboardPath } = useAuth()
  const location = useLocation()

  if (!isAuthenticated) {
    const redirect = encodeURIComponent(location.pathname + location.search)
    return <Navigate to={`/auth?redirect=${redirect}`} replace />
  }

  if (allowedRoles && !allowedRoles.includes(user.role)) {
    return <Navigate to={getDashboardPath(user.role)} replace />
  }

  return children
}
