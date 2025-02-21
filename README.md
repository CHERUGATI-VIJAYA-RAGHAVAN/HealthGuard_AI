# 🛡️ HealthGuard AI - AI-Powered Disease Prediction 🏥

## 🔍 About HealthGuard AI
     (https://github.com/CHERUGATI-VIJAYA-RAGHAVAN/HealthGuard_AI/blob/main/images/health_preview_resized_75.png?raw=true)

HealthGuard AI is a web-based AI-powered disease prediction system that helps users assess their risk for:  
✔ **Diabetes**  
✔ **Heart Disease**  
✔ **Parkinson’s Disease**  

Using Machine Learning models, this tool allows users to enter their medical data and get real-time health risk predictions.

📌 **Note:** This project primarily focuses on the backend (AI models and Flask API).  
👉 **Frontend is minimal and not the main focus of this project.**  

---

## ⚙️ Features
✅ **AI-Powered Predictions** – Uses Random Forest classifiers for accurate results  
✅ **User-Friendly Web Interface** – Developed with Flask, HTML, CSS, and JavaScript  
✅ **Real-Time Results** – Provides instant disease risk assessments  
✅ **Scalable & Extendable** – Designed for cloud deployment & future expansions  

📌 **Frontend development is not the main focus of this project.** The web UI is basic and serves only as an interface to interact with the AI models.

---

## 🛠️ Tech Stack
| Language  | Percentage |
|-----------|------------|
| 🐍 Python | 38.1% |
| 🌐 HTML   | 37.8% |
| 🎨 CSS    | 17.4% |
| 🖥️ JavaScript | 6.7% |

### **Frameworks & Libraries Used**
- **Flask** – Web framework for Python  
- **Scikit-Learn** – Machine learning library  
- **Pandas & NumPy** – Data processing  
- **Matplotlib & Seaborn** – Data visualization  
- **Bootstrap/Tailwind CSS** – UI styling (minimal usage)  

📌 **The main focus is on backend development and AI integration.** The frontend is a basic implementation.

---

## 📥 Installation & Usage

Follow these steps to run the project on your local system:

### **1️⃣ Clone the Repository**
```bash
git clone https://github.com/CHERUGATI-VIJAYA-RAGHAVAN/HealthGuard_AI.git
cd HealthGuard_AI/HealthGuard_AI_Project_code
```

### **2️⃣ Create & Activate Virtual Environment**
```bash
python -m venv venv
```

- **Windows:**
  ```bash
  venv\Scripts\activate
  ```
- **Mac/Linux:**
  ```bash
  source venv/bin/activate
  ```

### **3️⃣ Install Dependencies**
```bash
pip install -r requirements.txt
```

### **4️⃣ Run the Application**
```bash
python app.py
```
HealthGuard AI will now be accessible at:  
🔗 **http://127.0.0.1:5000/**  

---

## 🖼️ Screenshots & Explanations

### **🏠 1️⃣ Main Page - Disease Selection**[[
![Main Page](https://github.com/CHERUGATI-VIJAYA-RAGHAVAN/HealthGuard_AI/blob/main/images/main%20page.png?raw=true)


📌 **Explanation:** This is the homepage where users enter their name and select the disease they want to check (Diabetes, Heart Disease, or Parkinson's).  

---

### **🌗 2️⃣ Dark/Light Mode Feature**
![Dark Mode](https://github.com/CHERUGATI-VIJAYA-RAGHAVAN/HealthGuard_AI/blob/main/images/dark_light_mode.png?raw=true)

📌 **Explanation:** The application supports both **Dark Mode and Light Mode**, allowing users to switch between themes for better readability.

---

### **📊 3️⃣ Diabetes Prediction Input Page**
![Diabetes](https://github.com/CHERUGATI-VIJAYA-RAGHAVAN/HealthGuard_AI/blob/main/images/diabetes%20.png?raw=true)


📌 **Explanation:** Users enter their medical details, such as **glucose levels, blood pressure, and BMI**, to check for diabetes risk.  

---

### **🫀 4️⃣ Heart Disease Prediction Input Page**
![Heart Disease Prediction](https://github.com/CHERUGATI-VIJAYA-RAGHAVAN/HealthGuard_AI/blob/main/images/heart.png?raw=true)

📌 **Explanation:** Users provide **cholesterol levels, blood pressure, and other heart-related details** to assess their heart disease risk.  

---

### **🧠 5️⃣ Parkinson’s Disease Prediction Input Page**
![Parkinson's Prediction](https://github.com/CHERUGATI-VIJAYA-RAGHAVAN/HealthGuard_AI/blob/main/images/parkisons.png?raw=true)

📌 **Explanation:** The AI model evaluates **voice parameters, jitter, and HNR (Harmonic-to-Noise Ratio)** to determine the **risk of Parkinson’s Disease**.

---

### **✅ 6️⃣ Prediction Result Page**
![Prediction Result](https://github.com/CHERUGATI-VIJAYA-RAGHAVAN/HealthGuard_AI/blob/main/images/result.png?raw=true)

📌 **Explanation:** After submitting medical parameters, users receive a **disease prediction result**. If the result is **positive**, health tips are displayed.  

---

## 🧪 Model Performance
| Disease       | Model          | Accuracy |
|--------------|---------------|----------|
| **Diabetes** | Random Forest  | **94.1%** |
| **Heart Disease** | Random Forest | **97.4%** |
| **Parkinson’s** | Random Forest | **98.9%** |

📌 **Machine learning models were trained using structured medical datasets with hyperparameter tuning for better accuracy.**  

---

## 💡 Future Enhancements
🔹 **Expand to More Diseases** – Hypertension, Stroke, Cancer, etc.  
🔹 **Integration with Wearables** – Fitbit, Apple Watch for real-time data  
🔹 **Mobile App Version** – Deploy on Android/iOS  
🔹 **AI Chatbot** – Medical guidance before doctor consultation  
🔹 **Multilingual Support** – Reach a wider audience  

📌 **Since the main focus is backend AI models, future improvements may include API development instead of UI enhancements.**  

---

## 💖 Acknowledgment
This project was developed as part of the **AICTE TechSaksham AI Internship**  
Special thanks to **TechSaksham & Edunet** for their guidance and support.  

---

## 📜 License
📌 **This project is open-source under the MIT License.**  
Feel free to **contribute** and improve HealthGuard AI!  

---

## 👨‍💻 Contributing
🚀 **Want to improve HealthGuard AI? Pull requests are welcome!**  
1. **Fork the repository**  
2. **Create a feature branch** (`git checkout -b feature-name`)  
3. **Commit your changes** (`git commit -m "Added new feature"`)  
4. **Push the branch** (`git push origin feature-name`)  
5. **Submit a pull request**  

---

## 📧 Contact
👤 **CH. Vijaya Raghavan**  
📧 **Email:** vijayraghava1234@gmail.com  
🔗 **GitHub:** [CHERUGATI-VIJAYA-RAGHAVAN](https://github.com/CHERUGATI-VIJAYA-RAGHAVAN)  
