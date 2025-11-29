import React, { useState } from 'react'
import { uploadImage } from '../utils/api'

function Detection({ onNavigate }) {
  const [category, setCategory] = useState('tongue')
  const [file, setFile] = useState(null)
  const [preview, setPreview] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const handleFileChange = (e) => {
    const f = e.target.files?.[0]
    if (!f) return

    // Validate file type
    if (!f.type.startsWith('image/')) {
      setError('Please select a valid image file')
      return
    }

    // Validate file size (max 10MB)
    if (f.size > 10 * 1024 * 1024) {
      setError('Image must be smaller than 10MB')
      return
    }

    setFile(f)
    setPreview(URL.createObjectURL(f))
    setError(null)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!file) {
      setError('Please select an image first')
      return
    }

    setLoading(true)
    setError(null)

    try {
      const result = await uploadImage(file, category)
      onNavigate('results', result)
    } catch (err) {
      setError(err.message || 'Analysis failed. Please try again.')
      setLoading(false)
    }
  }

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-900 mb-8 text-center">
        Upload Image for Analysis
      </h1>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Category Selection */}
        <div className="bg-white rounded-xl p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            Select Analysis Type
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <label
              className={`relative flex items-center p-4 border-2 rounded-lg cursor-pointer transition ${
                category === 'tongue'
                  ? 'border-indigo-600 bg-indigo-50'
                  : 'border-gray-300 hover:border-gray-400'
              }`}
            >
              <input
                type="radio"
                name="category"
                value="tongue"
                checked={category === 'tongue'}
                onChange={() => setCategory('tongue')}
                className="w-4 h-4"
              />
              <div className="ml-3">
                <span className="text-3xl">👅</span>
                <div className="font-semibold text-gray-900 text-sm">Tongue</div>
                <div className="text-xs text-gray-600">Tongue</div>
              </div>
            </label>

            <label
              className={`relative flex items-center p-4 border-2 rounded-lg cursor-pointer transition ${
                category === 'nail'
                  ? 'border-indigo-600 bg-indigo-50'
                  : 'border-gray-300 hover:border-gray-400'
              }`}
            >
              <input
                type="radio"
                name="category"
                value="nail"
                checked={category === 'nail'}
                onChange={() => setCategory('nail')}
                className="w-4 h-4"
              />
              <div className="ml-3">
                <span className="text-3xl">💅</span>
                <div className="font-semibold text-gray-900 text-sm">Nail</div>
                <div className="text-xs text-gray-600">Nails</div>
              </div>
            </label>

            <label
              className={`relative flex items-center p-4 border-2 rounded-lg cursor-pointer transition ${
                category === 'ankle'
                  ? 'border-indigo-600 bg-indigo-50'
                  : 'border-gray-300 hover:border-gray-400'
              }`}
            >
              <input
                type="radio"
                name="category"
                value="ankle"
                checked={category === 'ankle'}
                onChange={() => setCategory('ankle')}
                className="w-4 h-4"
              />
              <div className="ml-3">
                <span className="text-3xl">🦵</span>
                <div className="font-semibold text-gray-900 text-sm">Ankle</div>
                <div className="text-xs text-gray-600">Ankles</div>
              </div>
            </label>

            <label
              className={`relative flex items-center p-4 border-2 rounded-lg cursor-pointer transition ${
                category === 'foot'
                  ? 'border-indigo-600 bg-indigo-50'
                  : 'border-gray-300 hover:border-gray-400'
              }`}
            >
              <input
                type="radio"
                name="category"
                value="foot"
                checked={category === 'foot'}
                onChange={() => setCategory('foot')}
                className="w-4 h-4"
              />
              <div className="ml-3">
                <span className="text-3xl">🦶</span>
                <div className="font-semibold text-gray-900 text-sm">Foot</div>
                <div className="text-xs text-gray-600">Feet</div>
              </div>
            </label>
          </div>
        </div>

        {/* Image Upload */}
        <div className="bg-white rounded-xl p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            Upload Image
          </h2>

          <div className="relative">
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              disabled={loading}
              className="hidden"
              id="file-input"
            />
            <label
              htmlFor="file-input"
              className={`block border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition ${
                preview
                  ? 'border-green-300 bg-green-50'
                  : 'border-gray-300 hover:border-gray-400 hover:bg-gray-50'
              }`}
            >
              {preview ? (
                <div className="space-y-2">
                  <span className="text-2xl">✓</span>
                  <p className="text-sm text-gray-600">Image selected</p>
                </div>
              ) : (
                <div className="space-y-2">
                  <span className="text-4xl">📸</span>
                  <p className="text-gray-900 font-medium">
                    Click to upload or drag and drop
                  </p>
                  <p className="text-sm text-gray-600">
                    PNG, JPG, GIF up to 10MB
                  </p>
                </div>
              )}
            </label>
          </div>

          {/* Preview */}
          {preview && (
            <div className="mt-4">
              <img
                src={preview}
                alt="Preview"
                className="w-full max-h-96 object-contain rounded-lg"
              />
              <button
                type="button"
                onClick={() => {
                  setFile(null)
                  setPreview(null)
                  setError(null)
                }}
                className="mt-4 text-sm text-indigo-600 hover:text-indigo-700 font-medium"
              >
                ✕ Remove Image
              </button>
            </div>
          )}
        </div>

        {/* Error Message */}
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
            <p className="text-red-800 font-medium">⚠️ Error</p>
            <p className="text-red-700 text-sm">{error}</p>
          </div>
        )}

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading || !file}
          className={`w-full py-3 rounded-lg font-semibold transition ${
            loading || !file
              ? 'bg-gray-300 text-gray-600 cursor-not-allowed'
              : 'bg-indigo-600 text-white hover:bg-indigo-700 hover:shadow-lg'
          }`}
        >
          {loading ? (
            <span className="flex items-center justify-center gap-2">
              <span className="animate-spin">⚙️</span> Analyzing...
            </span>
          ) : (
            'Analyze Image'
          )}
        </button>
      </form>

      {/* Tips */}
      <div className="mt-8 bg-blue-50 border border-blue-200 rounded-xl p-6">
        <h3 className="font-semibold text-blue-900 mb-3">📋 Tips for Best Results</h3>
        <ul className="text-blue-800 text-sm space-y-2">
          <li>✓ Ensure good lighting and clear focus</li>
          <li>✓ Fill the frame with the relevant body part</li>
          <li>✓ Avoid shadows and glare</li>
          <li>✓ Use a clean background for better contrast</li>
        </ul>
      </div>
    </div>
  )
}

export default Detection
