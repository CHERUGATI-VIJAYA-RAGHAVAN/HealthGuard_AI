from flask import Flask, render_template, request, redirect, url_for
import numpy as np
import pickle
import os

# Initialize Flask app
app = Flask(__name__)

# Get the absolute path of the current directory
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
MODEL_DIR = os.path.join(BASE_DIR, "models")

# Function to load models safely
def load_model(model_name):
    model_path = os.path.join(MODEL_DIR, model_name)
    if not os.path.exists(model_path):
        print(f"⚠️ Warning: Model file '{model_name}' not found at {model_path}")
        return None
    with open(model_path, "rb") as model_file:
        return pickle.load(model_file)

# Load trained models
diabetes_model = load_model("diabetes_model.pkl")
heart_model = load_model("heart_model.pkl")
parkinsons_model = load_model("parkinsons_model.pkl")

# Check if all models are loaded
if not all([diabetes_model, heart_model, parkinsons_model]):
    print("🚨 ERROR: One or more models are missing! Please retrain or restore them.")
else:
    print("✅ All models loaded successfully!")

# ---------------- Routes ---------------- #

# Home Page - Disease Selection
@app.route("/")
def home():
    return render_template("index.html")

# Disease Selection Form Handling
@app.route("/predict", methods=["POST"])
def predict():
    name = request.form.get("name")
    disease = request.form.get("disease")

    if disease == "Diabetes":
        return redirect(url_for("diabetes", name=name))
    elif disease == "Heart Disease":
        return redirect(url_for("heart", name=name))
    elif disease == "Parkinson's":
        return redirect(url_for("parkinsons", name=name))
    
    return redirect(url_for("home"))

# Routes for Disease Input Pages
@app.route("/diabetes")
def diabetes():
    name = request.args.get("name", "Unknown")
    return render_template("diabetes.html", name=name)

@app.route("/heart")
def heart():
    name = request.args.get("name", "Unknown")
    return render_template("heart.html", name=name)

@app.route("/parkinsons")
def parkinsons():
    name = request.args.get("name", "Unknown")
    return render_template("parkinsons.html", name=name)

# ---------------- Prediction Routes ---------------- #

@app.route("/predict_diabetes", methods=["POST"])
def predict_diabetes():
    try:
        features = [float(request.form[key]) for key in ["pregnancies", "glucose", "bloodpressure", "skinthickness", "insulin", "bmi", "pedigree", "age"]]
        
        if diabetes_model:
            prediction = diabetes_model.predict([features])[0]
            result = "Positive" if prediction == 1 else "Negative"
            return redirect(url_for("result", name=request.form.get("name"), disease="Diabetes", result=result))
        else:
            return "🚨 Error: Diabetes model not loaded!"
    
    except Exception as e:
        return f"⚠️ Error: {str(e)}"

@app.route("/predict_heart", methods=["POST"])
def predict_heart():
    try:
        features = [float(request.form[key]) for key in ["age", "sex", "cp", "trestbps", "chol", "fbs", "restecg", "thalach", "exang", "oldpeak", "slope", "ca", "thal"]]

        if heart_model:
            prediction = heart_model.predict([features])[0]
            result = "Positive" if prediction == 1 else "Negative"
            return redirect(url_for("result", name=request.form.get("name"), disease="Heart Disease", result=result))
        else:
            return "🚨 Error: Heart disease model not loaded!"
    
    except Exception as e:
        return f"⚠️ Error: {str(e)}"

@app.route("/predict_parkinsons", methods=["POST"])
def predict_parkinsons():
    try:
        features = [float(request.form[key]) for key in ["fo", "fhi", "flo", "jitter", "shimmer", "hnr", "rpde", "dfa", "spread1", "spread2", "d2", "ppe"]]

        if parkinsons_model:
            prediction = parkinsons_model.predict([features])[0]
            result = "Positive" if prediction == 1 else "Negative"
            return redirect(url_for("result", name=request.form.get("name"), disease="Parkinson's", result=result))
        else:
            return "🚨 Error: Parkinson's model not loaded!"
    
    except Exception as e:
        return f"⚠️ Error: {str(e)}"

# ---------------- Result Page ---------------- #

@app.route("/result", methods=["GET"])
def result():
    name = request.args.get("name", "Unknown")
    disease = request.args.get("disease", "Unknown")
    result = request.args.get("result", "Unknown")
    return render_template("result.html", name=name, disease=disease, result=result)

# ---------------- Run Flask App ---------------- #
if __name__ == "__main__":
    app.run(debug=True)
