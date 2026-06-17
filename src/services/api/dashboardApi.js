import { apiFetch } from './httpClient'

export function fetchAdminDashboard() {
  return apiFetch('/api/dashboard/admin')
}

export function fetchVendeurDashboard() {
  return apiFetch('/api/dashboard/vendeur')
}
