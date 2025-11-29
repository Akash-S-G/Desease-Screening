import React from 'react'

function Home({ onNavigate }) {
  const features = [
    {
      icon: '👅',
      title: 'Tongue Analysis',
      desc: 'Detect conditions like coated tongue, geographic tongue and more'
    },
    {
      icon: '💅',
      title: 'Nail Analysis',
      desc: 'Identify fungal infections, discoloration, and other nail issues'
    },
    {
      icon: '🦵',
      title: 'Ankle Analysis',
      desc: 'Assess ankle swelling, skin conditions, and joint health indicators'
    },
    {
      icon: '🦶',
      title: 'Foot Analysis',
      desc: 'Detect foot infections, skin issues, and structural abnormalities'
    },
    {
      icon: '⚡',
      title: 'Instant Results',
      desc: 'Get AI-powered predictions in seconds with confidence scores'
    },
    {
      icon: '🔒',
      title: 'Privacy First',
      desc: 'Your images are processed locally and never stored on servers'
    }
  ]

  return (
    <div className="space-y-12">
      {/* Hero Section */}
      <section className="text-center py-12">
        <div className="inline-block bg-indigo-100 text-indigo-700 px-4 py-2 rounded-full text-sm font-semibold mb-4">
          ✨ AI-Powered Health Screening
        </div>
        <h1 className="text-5xl font-bold text-gray-900 mb-6">
          Detect Health Issues Early
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-8">
          Upload a clear image of your tongue or nails. Our advanced AI analyzes subtle indicators
          to help you understand your health better. Fast, accurate, and private.
        </p>
        <button
          onClick={onNavigate}
          className="inline-block bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-8 py-4 rounded-lg font-semibold hover:shadow-lg hover:scale-105 transition transform"
        >
          Start Analysis →
        </button>
      </section>

      {/* Features Grid */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {features.map((feature, idx) => (
          <div
            key={idx}
            className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition"
          >
            <div className="text-4xl mb-4">{feature.icon}</div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              {feature.title}
            </h3>
            <p className="text-gray-600">{feature.desc}</p>
          </div>
        ))}
      </section>

      {/* Info Section */}
      <section className="bg-white rounded-xl p-8 shadow-sm">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">How It Works</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">📸</span>
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">1. Capture</h3>
            <p className="text-gray-600 text-sm">
              Take a clear, well-lit photo of your tongue or nails
            </p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">🧠</span>
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">2. Analyze</h3>
            <p className="text-gray-600 text-sm">
              Our AI model processes the image instantly
            </p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-pink-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">✅</span>
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">3. Results</h3>
            <p className="text-gray-600 text-sm">
              Get detailed insights and health recommendations
            </p>
          </div>
        </div>
      </section>

      {/* Disclaimer */}
      <section className="bg-yellow-50 border border-yellow-200 rounded-xl p-6">
        <h3 className="font-semibold text-yellow-900 mb-2">⚠️ Medical Disclaimer</h3>
        <p className="text-yellow-800 text-sm">
          This tool is for informational purposes only and should not be considered medical advice.
          Always consult with a qualified healthcare professional for diagnosis and treatment.
        </p>
      </section>
    </div>
  )
}

export default Home
