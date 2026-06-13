export const FORMSPREE_URL = 'https://formspree.io/f/xlgkarlq'

export async function submitToFormspree(fields) {
  const response = await fetch(FORMSPREE_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify(fields),
  })

  let data = {}
  const contentType = response.headers.get('content-type') || ''
  if (contentType.includes('application/json')) {
    data = await response.json().catch(() => ({}))
  }

  if (!response.ok) {
    const message = typeof data.error === 'string'
      ? data.error
      : 'Envoi impossible'
    throw new Error(message)
  }

  return data
}
