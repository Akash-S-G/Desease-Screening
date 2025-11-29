import React from 'react'

function Results({ data, onBack, onHome }) {
  if (!data) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-600">No results available</p>
      </div>
    )
  }

  const getConditionColor = (condition) => {
    if (condition.includes('Normal') || condition.includes('Healthy')) {
      return 'green'
    }
    if (condition.includes('Coated') || condition.includes('Discoloration')) {
      return 'yellow'
    }
    if (condition.includes('Fungal') || condition.includes('Geographic')) {
      return 'red'
    }
    return 'blue'
  }

  const color = getConditionColor(data.condition)

  const colorMap = {
    green: {
      bg: 'bg-green-50',
      border: 'border-green-200',
      text: 'text-green-900',
      light: 'text-green-700',
      badge: 'bg-green-100 text-green-700'
    },
    yellow: {
      bg: 'bg-yellow-50',
      border: 'border-yellow-200',
      text: 'text-yellow-900',
      light: 'text-yellow-700',
      badge: 'bg-yellow-100 text-yellow-700'
    },
    red: {
      bg: 'bg-red-50',
      border: 'border-red-200',
      text: 'text-red-900',
      light: 'text-red-700',
      badge: 'bg-red-100 text-red-700'
    },
    blue: {
      bg: 'bg-blue-50',
      border: 'border-blue-200',
      text: 'text-blue-900',
      light: 'text-blue-700',
      badge: 'bg-blue-100 text-blue-700'
    }
  }

  const colors = colorMap[color]

  const getRecommendations = () => {
    const condition = data.condition.toLowerCase()
    const recommendations = {
      'normal tongue': [
        'Maintain good oral hygiene with regular brushing',
        'Stay hydrated - drink plenty of water',
        'Eat a balanced diet rich in vitamins and minerals',
        'Visit your dentist regularly for checkups'
      ],
      'coated tongue': [
        'Brush your tongue gently with a soft toothbrush',
        'Maintain excellent oral hygiene',
        'Increase water intake',
        'Consider consulting a dentist if it persists'
      ],
      'geographic tongue': [
        'No specific treatment is usually needed',
        'Maintain good oral hygiene',
        'Use a soft toothbrush to avoid irritation',
        'Consult a dentist if experiencing discomfort'
      ],
      'healthy nail': [
        'Maintain strong nails with proper nutrition',
        'Keep nails clean and dry',
        'Use moisturizer regularly',
        'Avoid excessive exposure to harsh chemicals'
      ],
      'fungal infection': [
        'Keep nails clean and dry',
        'Trim nails short and straight',
        'Avoid sharing personal grooming items',
        'Consult a dermatologist for appropriate treatment'
      ],
      'nail discoloration': [
        'Improve nutrition - ensure adequate protein and iron intake',
        'Keep nails moisturized and protected',
        'Avoid harsh chemicals and excessive water exposure',
        'Consult a healthcare professional for persistent issues'
      ],
      'healthy ankle': [
        'Maintain regular physical activity and stretching',
        'Wear supportive footwear',
        'Maintain healthy weight to reduce ankle stress',
        'Perform ankle strengthening exercises'
      ],
      'ankle swelling': [
        'Elevate your feet above heart level when resting',
        'Apply ice for 15-20 minutes several times daily',
        'Wear compression socks or wraps',
        'Consult a healthcare provider if swelling persists'
      ],
      'skin inflammation': [
        'Keep the area clean and dry',
        'Avoid irritants and harsh chemicals',
        'Apply gentle moisturizer',
        'Consult a dermatologist if condition worsens'
      ],
      'healthy foot': [
        'Wash feet daily with mild soap and water',
        'Keep toenails trimmed straight across',
        'Wear breathable shoes and moisture-wicking socks',
        'Inspect feet regularly for cuts or abnormalities'
      ],
      'fungal foot': [
        'Keep feet clean and completely dry',
        'Avoid walking barefoot in public areas',
        'Wear breathable shoes and change socks if damp',
        'Consult a dermatologist for antifungal treatment'
      ],
      'foot callus': [
        'Soak feet in warm water to soften calluses',
        'Use a pumice stone gently to remove dead skin',
        'Apply moisturizer daily',
        'Wear comfortable, well-fitting shoes'
      ]
    }

    for (const [key, value] of Object.entries(recommendations)) {
      if (condition.includes(key)) {
        return value
      }
    }

    return [
      'Consult with a healthcare professional',
      'Monitor for any changes over time',
      'Maintain good overall hygiene',
      'Take regular photos to track changes'
    ]
  }

  return (
    <div className="max-w-2xl mx-auto space-y-8">
      {/* Main Result Card */}
      <div className={`${colors.bg} border ${colors.border} rounded-xl p-8`}>
        <div className="text-center">
          <div className={`${colors.badge} inline-block px-4 py-2 rounded-full font-semibold mb-4`}>
            Analysis Complete
          </div>

          <h1 className={`text-4xl font-bold ${colors.text} mb-6`}>
            {data.condition}
          </h1>

          <div className="mb-8">
            <div className="text-6xl font-bold text-indigo-600">
              {Math.round(data.confidence * 100)}%
            </div>
            <p className="text-gray-600 mt-2">Confidence Score</p>
          </div>

          {data.explanation && (
            <p className={`text-lg ${colors.light} mb-4`}>
              {data.explanation}
            </p>
          )}
        </div>

        {/* Confidence Bar */}
        <div className="mt-8">
          <div className="flex justify-between text-sm text-gray-600 mb-2">
            <span>Confidence Level</span>
            <span>{Math.round(data.confidence * 100)}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3">
            <div
              className={`h-3 rounded-full transition-all duration-500 ${
                color === 'green'
                  ? 'bg-green-500'
                  : color === 'yellow'
                    ? 'bg-yellow-500'
                    : color === 'red'
                      ? 'bg-red-500'
                      : 'bg-blue-500'
              }`}
              style={{ width: `${data.confidence * 100}%` }}
            />
          </div>
        </div>
      </div>

      {/* Recommendations */}
      <div className="bg-white rounded-xl p-8 shadow-sm">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">
          📋 Recommendations
        </h2>
        <ul className="space-y-3">
          {getRecommendations().map((rec, idx) => (
            <li key={idx} className="flex items-start gap-3">
              <span className="text-2xl">✓</span>
              <span className="text-gray-700">{rec}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Important Notice */}
      <div className="bg-orange-50 border border-orange-200 rounded-xl p-6">
        <h3 className="font-semibold text-orange-900 mb-2">⚠️ Important Notice</h3>
        <p className="text-orange-800 text-sm">
          This analysis is powered by AI and is for informational purposes only. It is not a
          substitute for professional medical advice, diagnosis, or treatment. Please consult with
          a qualified healthcare professional for accurate diagnosis and appropriate medical care.
        </p>
      </div>

      {/* Action Buttons */}
      <div className="grid grid-cols-2 gap-4">
        <button
          onClick={onBack}
          className="px-6 py-3 rounded-lg border border-gray-300 text-gray-900 font-semibold hover:bg-gray-50 transition"
        >
          ← Analyze Another
        </button>
        <button
          onClick={onHome}
          className="px-6 py-3 rounded-lg bg-indigo-600 text-white font-semibold hover:bg-indigo-700 transition"
        >
          Home
        </button>
      </div>

      {/* Additional Info */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-600">
        <div className="bg-white rounded-lg p-4 border border-gray-200">
          <p className="font-semibold text-gray-900 mb-2">📚 Learn More</p>
          <p>Visit health resources to learn more about detected conditions.</p>
        </div>
        <div className="bg-white rounded-lg p-4 border border-gray-200">
          <p className="font-semibold text-gray-900 mb-2">🏥 Seek Help</p>
          <p>For persistent symptoms, schedule an appointment with a specialist.</p>
        </div>
      </div>
    </div>
  )
}

export default Results
