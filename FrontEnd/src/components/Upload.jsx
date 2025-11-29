import React, { useState } from 'react'

function Upload() {
  const [file, setFile] = useState(null)
  const [preview, setPreview] = useState(null)
  const [category, setCategory] = useState('tongue')
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState(null)

  function onFileChange(e) {
    const f = e.target.files[0]
    if (!f) return
    setFile(f)
    setPreview(URL.createObjectURL(f))
    setResult(null)
  }

  async function onSubmit(e) {
    e.preventDefault()
    if (!file) return alert('Please choose an image to upload')
    setLoading(true)
    setResult(null)

    try {
      const fd = new FormData()
      fd.append('image', file)
      fd.append('category', category)

      const resp = await fetch('http://localhost:5000/predict', {
        method: 'POST',
        body: fd,
      })

      if (!resp.ok) throw new Error(`Server error: ${resp.status}`)

      const data = await resp.json()
      setResult(data)
    } catch (err) {
      console.error(err)
      alert('Upload failed: ' + err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={{maxWidth:480, margin:'0 auto'}}>
      <h2>Upload Tongue / Nail Image</h2>
      <form onSubmit={onSubmit}>
        <div style={{marginBottom:8}}>
          <label>
            <input
              type="radio"
              name="category"
              value="tongue"
              checked={category === 'tongue'}
              onChange={() => setCategory('tongue')}
            />{' '}
            Tongue
          </label>{' '}
          <label>
            <input
              type="radio"
              name="category"
              value="nail"
              checked={category === 'nail'}
              onChange={() => setCategory('nail')}
            />{' '}
            Nail
          </label>
        </div>

        <div style={{marginBottom:8}}>
          <input type="file" accept="image/*" onChange={onFileChange} />
        </div>

        {preview && (
          <div style={{marginBottom:8}}>
            <img src={preview} alt="preview" style={{maxWidth:'100%'}} />
          </div>
        )}

        <div>
          <button type="submit" disabled={loading}>
            {loading ? 'Analyzing...' : 'Upload & Analyze'}
          </button>
        </div>
      </form>

      {result && (
        <div style={{marginTop:16, padding:12, border:'1px solid #ddd'}}>
          <h3>Result</h3>
          <p><strong>Condition:</strong> {result.condition}</p>
          <p><strong>Confidence:</strong> {(result.confidence * 100).toFixed(1)}%</p>
          {result.explanation && <p><strong>Note:</strong> {result.explanation}</p>}
        </div>
      )}
    </div>
  )
}

export default Upload