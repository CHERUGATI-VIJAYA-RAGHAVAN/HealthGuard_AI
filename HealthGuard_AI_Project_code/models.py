import joblib
import os
import numpy as np
import pandas as pd
import json

# Get the current directory
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
MODEL_DIR = os.path.join(BASE_DIR, "models")
CONFIG_FILE = os.path.join(BASE_DIR, "config.json")

# Load configuration
with open(CONFIG_FILE, "r") as f:
    config = json.load(f)

# Function to safely load models
def load_model(file_name):
    try:
        return joblib.load(os.path.join(MODEL_DIR, file_name))
    except Exception as e:
        print(f"Error loading {file_name}: {e}")
        return None

# Load trained models and scalers safely
diabetes_model = load_model("diabetes_model.pkl")
heart_model = load_model("heart_model.pkl")
parkinsons_model = load_model("parkinsons_model.pkl")

diabetes_scaler = load_model("diabetes_scaler.pkl")
heart_scaler = load_model("heart_scaler.pkl")
parkinsons_scaler = load_model("parkinsons_scaler.pkl")

# Dictionary for easier access
models = {
    "diabetes": (diabetes_model, diabetes_scaler),
    "heart": (heart_model, heart_scaler),
    "parkinsons": (parkinsons_model, parkinsons_scaler),
}

# Function to make predictions
def predict_disease(disease, features):
    try:
        if disease not in models or models[disease][0] is None:
            return "Error: Model for this disease is unavailable."

        model, scaler = models[disease]

        # Ensure features are numeric and reshape them
        features = np.array(features, dtype=float).reshape(1, -1)

        # Scale features
        if hasattr(scaler, "feature_names_in_"):
            features_df = pd.DataFrame(features, columns=scaler.feature_names_in_)
            features_scaled = scaler.transform(features_df)
        else:
            features_scaled = scaler.transform(features)

        # Predict
        prediction = model.predict(features_scaled)[0]

        # Get labels from config file
        return config["disease_labels"][disease][prediction]

    except Exception as e:
        return f"Error processing request: {str(e)}"
