# Backend (Flask) for Disease Screening MVP

Quick steps to run the Flask backend (PowerShell / Windows):

1. Create and activate a virtual environment

```powershell
python -m venv .venv
.\.venv\Scripts\Activate.ps1
```

2. Install dependencies

```powershell
pip install -r flask_app\requirements.txt
```

3. Run the server

```powershell
python flask_app\app.py
```

The API exposes `POST /predict` which accepts a multipart form with field `image` and optional `category` ("tongue", "nail", "ankle", or "foot"). The endpoint will return JSON with `condition`, `confidence` and `explanation`.

## Supported Categories

- **Tongue**: Normal Tongue, Coated Tongue, Geographic Tongue
- **Nail**: Healthy Nail, Fungal Infection, Nail Discoloration / Iron Deficiency
- **Ankle**: Healthy Ankle, Ankle Swelling, Skin Inflammation
- **Foot**: Healthy Foot, Fungal Foot Infection, Foot Callus / Corn

Place a Keras model at `flask_app/models/model.h5` if you want real inference. If no model is found, the server returns dummy/random predictions for development.

