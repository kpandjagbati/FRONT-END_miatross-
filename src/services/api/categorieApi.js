import { apiFetch } from './httpClient'

export function fetchCategories() {
  return apiFetch('/api/categorieproduit/list')
}

export function createCategory(data) {
  return apiFetch('/api/categorieproduit/add', {
    method: 'POST',
    body: JSON.stringify(data),
  })
}

export function updateCategory(id, data) {
  return apiFetch(`/api/categorieproduit/update/${id}`, {
    method: 'PUT',
    body: JSON.stringify(data),
  })
}

export function deleteCategory(id) {
  return apiFetch(`/api/categorieproduit/delete/${id}`, { method: 'DELETE' })
}
