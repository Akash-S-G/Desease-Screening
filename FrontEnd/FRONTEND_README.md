# MediScape - AI-Based Disease Detection Frontend

A modern, responsive React + Vite frontend for disease screening using AI-powered tongue and nail image analysis.

## 🎯 Features

- **Modern UI** - Beautiful Tailwind CSS design with smooth transitions
- **Image Upload** - Drag-and-drop or click to upload images (max 10MB)
- **Real-time Analysis** - Integration with Flask backend for instant predictions
- **Confidence Scores** - Visual display of model confidence levels
- **Recommendations** - Context-aware health recommendations based on results
- **Mobile Responsive** - Works seamlessly on all devices
- **Privacy-Focused** - Images processed locally without storage

## 🏗️ Project Structure

```
src/
├── pages/
│   ├── Home.jsx          # Landing page with features overview
│   ├── Detection.jsx     # Upload and analysis interface
│   └── Results.jsx       # Results display with recommendations
├── utils/
│   └── api.js            # Flask API integration
├── components/
│   ├── Login.jsx         # (Legacy)
│   └── Upload.jsx        # (Legacy)
├── App.jsx               # Main app component with routing
├── index.css             # Tailwind imports
├── App.css               # App styles
└── main.jsx              # React entry point
```

## 🚀 Quick Start

### Prerequisites

- Node.js 16+ and npm
- Flask backend running at `http://localhost:5000`

### Installation & Running

```powershell
# Install dependencies
npm install

# Start development server (runs on http://localhost:5173)
npm run dev

# Build for production
npm run build

# Preview production build
npm preview
```

### Configure API Endpoint

Edit `.env` to point to your Flask backend:

```env
VITE_API_URL=http://localhost:5000
```

## 📱 Pages

### Home Page
- Welcome message and feature highlights (Tongue, Nail, Ankle, Foot)
- "How it Works" section
- Medical disclaimer
- Call-to-action to start analysis

### Detection Page
- Category selection (Tongue / Nail / Ankle / Foot)
- Image upload with drag-and-drop
- Image preview
- Real-time validation

### Results Page
- Condition prediction with color-coded severity
- Confidence percentage and visual bar
- Context-aware health recommendations
- Medical disclaimer
- Options to analyze another image or return home

## 🎨 Design System

- **Primary Colors**: Indigo (600) and Purple (600)
- **Semantic Colors**: Green (success), Yellow (warning), Red (danger)
- **Typography**: System fonts with Tailwind scales
- **Spacing**: 8px base unit
- **Radius**: 8-12px for UI elements

## 🔌 API Integration

The frontend calls the Flask backend `/predict` endpoint:

```javascript
POST /predict
Content-Type: multipart/form-data

Fields:
- image: File (image file)
- category: string ("tongue" or "nail")

Response:
{
  "condition": "Normal Tongue",
  "confidence": 0.92,
  "explanation": "This is a simple MVP result — not medical advice."
}
```

## 📦 Dependencies

- **react** ^18.3 - UI framework
- **react-dom** ^18.3 - React DOM binding
- **tailwindcss** ^4.1 - Utility-first CSS
- **@material-tailwind/react** ^2.1 - Material Design components
- **@heroicons/react** ^2.2 - Icon library
- **vite** ^7.2 - Build tool and dev server

## 🛠️ Development

### Available Scripts

- `npm run dev` - Start Vite dev server
- `npm run build` - Build for production
- `npm run lint` - Run ESLint
- `npm run preview` - Preview production build

### File Upload Validation

- Accepted formats: All image types (JPEG, PNG, GIF, etc.)
- Max size: 10MB
- Validation happens client-side before sending to backend

## 📄 License

MIT License - See LICENSE file for details

## 🚨 Medical Disclaimer

This application is for informational purposes only and is NOT a substitute for professional medical advice. Always consult with a qualified healthcare professional for diagnosis and treatment.
