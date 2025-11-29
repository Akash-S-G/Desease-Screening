from flask import Flask, request, jsonify
from flask_cors import CORS
from PIL import Image
import io
import numpy as np
import os

app = Flask(__name__)
CORS(app)

# Class labels for the categories
TONGUE_CLASSES = ['Normal Tongue', 'Coated Tongue', 'Geographic Tongue']
NAIL_CLASSES = ['Healthy Nail', 'Fungal Infection', 'Nail Discoloration / Iron Deficiency']
ANKLE_CLASSES = ['Healthy Ankle', 'Ankle Swelling', 'Skin Inflammation']
FOOT_CLASSES = ['Healthy Foot', 'Fungal Foot Infection', 'Foot Callus / Corn']

# Try to load a Keras model if present at ./models/model.h5
MODEL = None
MODEL_PATH = os.path.join(os.path.dirname(__file__), 'models', 'model.h5')

try:
    from tensorflow.keras.models import load_model
    if os.path.exists(MODEL_PATH):
        MODEL = load_model(MODEL_PATH)
        print('Loaded model from', MODEL_PATH)
    else:
        print('No model found at', MODEL_PATH, '- running in dummy mode')
except Exception as e:
    MODEL = None
    print('TensorFlow not available or failed to load model:', e)


def preprocess_image(image_bytes, target_size=(224, 224)):
    image = Image.open(io.BytesIO(image_bytes)).convert('RGB')
    image = image.resize(target_size)
    arr = np.array(image).astype('float32') / 255.0
    arr = np.expand_dims(arr, axis=0)
    return arr


@app.route('/predict', methods=['POST'])
def predict():
    if 'image' not in request.files:
        return jsonify({'error': 'no image provided'}), 400

    img_file = request.files['image']
    category = request.form.get('category', 'tongue').lower()

    try:
        img_bytes = img_file.read()
        x = preprocess_image(img_bytes)

        if MODEL is not None:
            preds = MODEL.predict(x)
            # If the model outputs 3 classes for all categories, interpret accordingly
            class_idx = int(np.argmax(preds[0]))
            confidence = float(np.max(preds[0]))
        else:
            # Dummy fallback: random prediction for development
            class_idx = int(np.random.choice(3))
            confidence = float(np.random.uniform(0.6, 0.95))

        # Select class labels based on category
        if category == 'nail':
            label = NAIL_CLASSES[class_idx]
        elif category == 'ankle':
            label = ANKLE_CLASSES[class_idx]
        elif category == 'foot':
            label = FOOT_CLASSES[class_idx]
        else:
            label = TONGUE_CLASSES[class_idx]

        explanation = 'This is a simple MVP result — not medical advice.'

        return jsonify({
            'condition': label,
            'confidence': confidence,
            'explanation': explanation
        })

    except Exception as e:
        print('Error during prediction:', e)
        return jsonify({'error': 'prediction failed', 'detail': str(e)}), 500


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)
