import { apiFetch } from './httpClient'

export async function loginRequest(login, password) {
  return apiFetch('/api/auth/login', {
    method: 'POST',
    body: JSON.stringify({ login, password }),
  })
}

export async function registerVendeur(data) {
  return apiFetch('/api/auth/register/vendeur', {
    method: 'POST',
    body: JSON.stringify(data),
  })
}

export function mapAuthUser(response) {
  const role = response.role?.toLowerCase()
  return {
    id: response.idUtilisateur,
    nom: response.nom,
    prenom: response.prenom,
    name: `${response.prenom} ${response.nom}`.trim(),
    role,
    token: response.token,
    login: response.login,
    storeName: role === 'vendeur' ? `${response.prenom} ${response.nom}`.trim() : null,
  }
}
