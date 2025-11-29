/**
 * API utilities for communicating with Flask backend
 */

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000'

export async function uploadImage(file, category = 'tongue') {
  const formData = new FormData()
  formData.append('image', file)
  formData.append('category', category)

  try {
    const response = await fetch(`${API_BASE_URL}/predict`, {
      method: 'POST',
      body: formData,
    })

    if (!response.ok) {
      throw new Error(`Server returned ${response.status}`)
    }

    const data = await response.json()

    // Ensure confidence is a number between 0 and 1
    if (typeof data.confidence === 'string') {
      data.confidence = parseFloat(data.confidence)
    }
    if (data.confidence > 1) {
      data.confidence = data.confidence / 100
    }

    return data
  } catch (error) {
    if (error instanceof TypeError && error.message.includes('fetch')) {
      throw new Error(
        'Cannot connect to the server. Make sure the Flask backend is running at ' + API_BASE_URL
      )
    }
    throw new Error(error.message || 'Failed to analyze image')
  }
}

export { API_BASE_URL }
