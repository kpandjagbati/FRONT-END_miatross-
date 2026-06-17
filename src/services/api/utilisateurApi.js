import { apiFetch } from './httpClient'
import { registerVendeur } from './authApi'

function isVendeur(user) {
  const role = user.type_utilisateur?.libelle_type_utilisateur
  return role && role.toUpperCase() === 'VENDEUR'
}

export function getUtilisateurLogin(user) {
  return user?.Login_utilisateur || user?.login_utilisateur || user?.login || '—'
}

export function fetchUtilisateurs() {
  return apiFetch('/api/utilisateur')
}

export async function fetchVendeurs() {
  try {
    return await apiFetch('/api/utilisateur/vendeurs')
  } catch {
    const users = await apiFetch('/api/utilisateur')
    return users.filter(isVendeur)
  }
}

export function fetchCurrentUser() {
  return apiFetch('/api/utilisateur/me')
}

export function updateCurrentUser(data) {
  return apiFetch('/api/utilisateur/me', {
    method: 'PUT',
    body: JSON.stringify(data),
  })
}

export function deleteUtilisateur(id) {
  return apiFetch(`/api/utilisateur/delete/${id}`, { method: 'DELETE' })
}

export function createUtilisateur(data) {
  return apiFetch('/api/utilisateur/add', {
    method: 'POST',
    body: JSON.stringify(data),
  })
}

export async function createVendeur(data) {
  try {
    return await apiFetch('/api/utilisateur/vendeur', {
      method: 'POST',
      body: JSON.stringify(data),
    })
  } catch (err) {
    // Fallback : endpoint public (backend pas redémarré ou route admin indisponible)
    if (err.status === 403 || err.status === 404) {
      return registerVendeur(data)
    }
    throw err
  }
}
