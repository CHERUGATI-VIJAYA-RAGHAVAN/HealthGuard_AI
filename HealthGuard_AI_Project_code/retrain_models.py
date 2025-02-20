# Improved retrain_models.py with Hyperparameter Tuning & Evaluation
import pandas as pd
import numpy as np
import pickle
import os
from sklearn.model_selection import train_test_split, GridSearchCV
from sklearn.preprocessing import StandardScaler
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import classification_report

# Define paths
datasets_path = "datasets/"
models_path = "models/"

def train_model(X, y, model_name):
    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)
    scaler = StandardScaler().fit(X_train)
    X_train_scaled = scaler.transform(X_train)
    X_test_scaled = scaler.transform(X_test)

    # Hyperparameter tuning with GridSearchCV
    param_grid = {"n_estimators": [50, 100, 200], "max_depth": [None, 10, 20]}
    grid = GridSearchCV(RandomForestClassifier(random_state=42), param_grid, cv=5, n_jobs=-1)
    grid.fit(X_train_scaled, y_train)

    best_model = grid.best_estimator_
    print(f"Best parameters for {model_name}: {grid.best_params_}")
    
    # Evaluate model
    y_pred = best_model.predict(X_test_scaled)
    print(f"\nClassification Report for {model_name}:\n", classification_report(y_test, y_pred))

    # Save model & scaler
    pickle.dump(best_model, open(os.path.join(models_path, f"{model_name}_model.pkl"), "wb"))
    pickle.dump(scaler, open(os.path.join(models_path, f"{model_name}_scaler.pkl"), "wb"))

# Load datasets
diabetes_data = pd.read_csv(os.path.join(datasets_path, "diabetes.csv"))
heart_data = pd.read_csv(os.path.join(datasets_path, "heart.csv"))
parkinsons_data = pd.read_csv(os.path.join(datasets_path, "parkinsons.csv"))

# Handle missing/zero values in diabetes dataset
diabetes_data.replace({"Glucose": 0, "BloodPressure": 0, "BMI": 0}, np.nan, inplace=True)
diabetes_data.fillna(diabetes_data.median(), inplace=True)

# Train and save models
train_model(diabetes_data.drop(columns=["Outcome"]), diabetes_data["Outcome"], "diabetes")
train_model(heart_data.drop(columns=["target"]), heart_data["target"], "heart")
train_model(parkinsons_data.drop(columns=["name", "status"]), parkinsons_data["status"], "parkinsons")

print("✅ Models trained, tuned, and saved successfully!")
