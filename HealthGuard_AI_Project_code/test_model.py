# Updated test_model.py - Tests with Real Data Instead of Random Values
import joblib
import numpy as np
import pandas as pd
import os
from sklearn.metrics import accuracy_score, classification_report

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
MODEL_DIR = os.path.join(BASE_DIR, "models")
DATASETS_DIR = os.path.join(BASE_DIR, "datasets")

# Load all models
models = {
    "diabetes": joblib.load(os.path.join(MODEL_DIR, "diabetes_model.pkl")),
    "heart": joblib.load(os.path.join(MODEL_DIR, "heart_model.pkl")),
    "parkinsons": joblib.load(os.path.join(MODEL_DIR, "parkinsons_model.pkl")),
}

# Load scalers
scalers = {
    "diabetes": joblib.load(os.path.join(MODEL_DIR, "diabetes_scaler.pkl")),
    "heart": joblib.load(os.path.join(MODEL_DIR, "heart_scaler.pkl")),
    "parkinsons": joblib.load(os.path.join(MODEL_DIR, "parkinsons_scaler.pkl")),
}

# Load datasets for testing
data_files = {
    "diabetes": pd.read_csv(os.path.join(DATASETS_DIR, "diabetes.csv")),
    "heart": pd.read_csv(os.path.join(DATASETS_DIR, "heart.csv")),
    "parkinsons": pd.read_csv(os.path.join(DATASETS_DIR, "parkinsons.csv")),
}

# Define target columns
target_columns = {
    "diabetes": "Outcome",
    "heart": "target",
    "parkinsons": "status",
}

# Evaluate each model
for disease in models:
    df = data_files[disease]
    target = target_columns[disease]
    
   # Drop 'name' column for Parkinson's dataset
    if disease == "parkinsons":
        X_test = df.drop(columns=["name", target])
    else:
        X_test = df.drop(columns=[target])

    y_test = df[target]
    
    scaler = scalers[disease]
    X_test_scaled = scaler.transform(X_test)
    
    predictions = models[disease].predict(X_test_scaled)
    
    print(f"\nEvaluation for {disease.capitalize()} Model:")
    print("Accuracy:", accuracy_score(y_test, predictions))
    print(classification_report(y_test, predictions))