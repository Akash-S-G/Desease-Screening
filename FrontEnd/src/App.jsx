import { useState } from 'react'
import './App.css'
import Home from './pages/Home'
import Detection from './pages/Detection'
import Results from './pages/Results'

function App() {
  const [currentPage, setCurrentPage] = useState('home')
  const [detectionData, setDetectionData] = useState(null)

  const navigateTo = (page, data = null) => {
    if (data) setDetectionData(data)
    setCurrentPage(page)
    window.scrollTo(0, 0)
  }

  const navigateHome = () => {
    setDetectionData(null)
    setCurrentPage('home')
    window.scrollTo(0, 0)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      <nav className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-5xl mx-auto px-4 py-4 flex items-center justify-between">
          <button
            onClick={navigateHome}
            className="flex items-center gap-2 cursor-pointer hover:opacity-80 transition"
          >
            <div className="w-10 h-10 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">♥</span>
            </div>
            <h1 className="text-xl font-bold text-gray-800 hidden sm:block">
              MediScape
            </h1>
          </button>
          <div className="text-sm text-gray-600">
            AI-Based Disease Detection
          </div>
        </div>
      </nav>

      <main className="max-w-5xl mx-auto px-4 py-8">
        {currentPage === 'home' && (
          <Home onNavigate={() => setCurrentPage('detection')} />
        )}
        {currentPage === 'detection' && (
          <Detection onNavigate={navigateTo} />
        )}
        {currentPage === 'results' && (
          <Results
            data={detectionData}
            onBack={() => navigateTo('detection')}
            onHome={navigateHome}
          />
        )}
      </main>

      <footer className="bg-white border-t border-gray-200 mt-16">
        <div className="max-w-5xl mx-auto px-4 py-6 text-center text-sm text-gray-600">
          <p>© 2025 MediScape. Not a substitute for professional medical advice.</p>
        </div>
      </footer>
    </div>
  )
}

export default App
