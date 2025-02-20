from flask import Flask, render_template, request, redirect, url_for
import numpy as np
import pickle

app = Flask(__name__)

# Load trained models
diabetes_model = pickle.load(open("models/diabetes_model.pkl", "rb"))
heart_model = pickle.load(open("models/heart_model.pkl", "rb"))
parkinsons_model = pickle.load(open("models/parkinsons_model.pkl", "rb"))

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

# Prediction Routes for Each Disease
@app.route("/predict_diabetes", methods=["POST"])
def predict_diabetes():
    try:
        features = [float(request.form[key]) for key in ["pregnancies", "glucose", "bloodpressure", "skinthickness", "insulin", "bmi", "pedigree", "age"]]
        prediction = diabetes_model.predict([features])[0]
        result = "Positive" if prediction == 1 else "Negative"
        return redirect(url_for("result", name=request.form.get("name"), disease="Diabetes", result=result))
    except Exception as e:
        return f"Error: {str(e)}"

@app.route("/predict_heart", methods=["POST"])
def predict_heart():
    try:
        features = [float(request.form[key]) for key in ["age", "sex", "cp", "trestbps", "chol", "fbs", "restecg", "thalach", "exang", "oldpeak", "slope", "ca", "thal"]]
        prediction = heart_model.predict([features])[0]
        result = "Positive" if prediction == 1 else "Negative"
        return redirect(url_for("result", name=request.form.get("name"), disease="Heart Disease", result=result))
    except Exception as e:
        return f"Error: {str(e)}"

@app.route("/predict_parkinsons", methods=["POST"])
def predict_parkinsons():
    try:
        features = [float(request.form[key]) for key in ["fo", "fhi", "flo", "jitter", "shimmer", "hnr", "rpde", "dfa", "spread1", "spread2", "d2", "ppe"]]
        prediction = parkinsons_model.predict([features])[0]
        result = "Positive" if prediction == 1 else "Negative"
        return redirect(url_for("result", name=request.form.get("name"), disease="Parkinson's", result=result))
    except Exception as e:
        return f"Error: {str(e)}"

# Result Page - Displays the Prediction Result
@app.route("/result", methods=["GET"])
def result():
    name = request.args.get("name", "Unknown")
    disease = request.args.get("disease", "Unknown")
    result = request.args.get("result", "Unknown")
    return render_template("result.html", name=name, disease=disease, result=result)

# Run Flask app
if __name__ == "__main__":
    app.run(debug=True)
