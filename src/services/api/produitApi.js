import { apiFetch, getStoredAuth } from './httpClient'
import { API_BASE_URL } from '../../config/api'

export function fetchCatalogueProduits() {
  return apiFetch('/api/produit/catalogue')
}

export function fetchCatalogueProduit(id) {
  return apiFetch(`/api/produit/catalogue/${id}`)
}

export function getCatalogueProduitImageUrl(id) {
  return `${API_BASE_URL}/api/produit/catalogue/${id}/image`
}

export function fetchProduits() {
  return apiFetch('/api/produit')
}

export function fetchMesProduits() {
  return apiFetch('/api/produit/mes-produits')
}

export function fetchProduit(id) {
  return apiFetch(`/api/produit/${id}`)
}

export function updateProduit(id, data) {
  return apiFetch(`/api/produit/update/${id}`, {
    method: 'PUT',
    body: JSON.stringify(data),
  })
}

export function updateProduitStatut(id, statut) {
  return apiFetch(`/api/produit/${id}/statut`, {
    method: 'PATCH',
    body: JSON.stringify({ statut }),
  })
}

export function deleteProduit(id) {
  return apiFetch(`/api/produit/delete/${id}`, { method: 'DELETE' })
}

export function markProduitVendu(id) {
  return updateProduit(id, { statut: 'VENDU' })
}

export async function createProduit(produit, imageFile) {
  const formData = new FormData()
  formData.append('produit', new Blob([JSON.stringify(produit)], { type: 'application/json' }))
  formData.append('image', imageFile)

  const auth = getStoredAuth()
  const response = await fetch(`${API_BASE_URL}/api/produit/add`, {
    method: 'POST',
    headers: auth?.token ? { Authorization: `Bearer ${auth.token}` } : {},
    body: formData,
  })

  if (!response.ok) {
    const message = await response.text()
    throw new Error(message || `Erreur ${response.status}`)
  }

  return response.json()
}

export function getProduitImageUrl(id) {
  const auth = getStoredAuth()
  if (!auth?.token) return null
  return `${API_BASE_URL}/api/produit/${id}/image`
}

export async function fetchProduitImageBlob(id) {
  const auth = getStoredAuth()
  const response = await fetch(`${API_BASE_URL}/api/produit/${id}/image`, {
    headers: auth?.token ? { Authorization: `Bearer ${auth.token}` } : {},
  })
  if (!response.ok) return null
  return response.blob()
}
