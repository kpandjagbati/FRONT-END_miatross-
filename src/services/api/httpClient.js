import { API_BASE_URL, AUTH_STORAGE_KEY } from '../../config/api'

export class ApiError extends Error {
  constructor(message, status) {
    super(message)
    this.status = status
  }
}

export function getStoredAuth() {
  try {
    const raw = localStorage.getItem(AUTH_STORAGE_KEY)
    return raw ? JSON.parse(raw) : null
  } catch {
    return null
  }
}

export async function apiFetch(path, options = {}) {
  const auth = getStoredAuth()
  const headers = { ...options.headers }

  if (!(options.body instanceof FormData) && !headers['Content-Type']) {
    headers['Content-Type'] = 'application/json'
  }

  if (auth?.token) {
    headers.Authorization = `Bearer ${auth.token}`
  }

  const response = await fetch(`${API_BASE_URL}${path}`, {
    ...options,
    headers,
  })

  if (!response.ok) {
    let message = `Erreur ${response.status}`
    try {
      const data = await response.json()
      message = data.message || data.error || message
    } catch {
      try {
        message = await response.text()
      } catch {
        // keep default
      }
    }
    throw new ApiError(message, response.status)
  }

  if (response.status === 204) return null

  const contentType = response.headers.get('content-type') || ''
  if (contentType.includes('application/json')) {
    return response.json()
  }

  return response
}
