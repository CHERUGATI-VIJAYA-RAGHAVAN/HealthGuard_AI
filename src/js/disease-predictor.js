export class DiseasePredictor {
  constructor() {
    this.diseases = {
      diabetes: {
        id: 'diabetes',
        name: 'Diabetes',
        icon: 'fas fa-tint',
        description: 'Assess your risk of developing Type 2 diabetes based on key health indicators.',
        features: [
          'Blood glucose analysis',
          'BMI assessment',
          'Family history evaluation',
          'Lifestyle factor analysis'
        ],
        parameters: [
          {
            id: 'pregnancies',
            label: 'Number of Pregnancies',
            required: true,
            min: 0,
            max: 20,
            placeholder: '0',
            help: 'Total number of pregnancies (0 if male or never pregnant)'
          },
          {
            id: 'glucose',
            label: 'Glucose Level (mg/dL)',
            required: true,
            min: 0,
            max: 300,
            placeholder: '120',
            help: 'Plasma glucose concentration (fasting: 70-100 mg/dL normal)'
          },
          {
            id: 'bloodpressure',
            label: 'Blood Pressure (mmHg)',
            required: true,
            min: 0,
            max: 200,
            placeholder: '80',
            help: 'Diastolic blood pressure (normal: 60-80 mmHg)'
          },
          {
            id: 'skinthickness',
            label: 'Skin Thickness (mm)',
            required: true,
            min: 0,
            max: 100,
            placeholder: '20',
            help: 'Triceps skin fold thickness'
          },
          {
            id: 'insulin',
            label: 'Insulin Level (μU/mL)',
            required: true,
            min: 0,
            max: 900,
            placeholder: '80',
            help: '2-Hour serum insulin (normal: 16-166 μU/mL)'
          },
          {
            id: 'bmi',
            label: 'BMI (kg/m²)',
            required: true,
            min: 10,
            max: 70,
            step: 0.1,
            placeholder: '25.0',
            help: 'Body Mass Index (normal: 18.5-24.9)'
          },
          {
            id: 'pedigree',
            label: 'Diabetes Pedigree Function',
            required: true,
            min: 0,
            max: 3,
            step: 0.001,
            placeholder: '0.5',
            help: 'Genetic predisposition score (0.0-2.5 typical range)'
          },
          {
            id: 'age',
            label: 'Age (years)',
            required: true,
            min: 1,
            max: 120,
            placeholder: '30',
            help: 'Current age in years'
          }
        ]
      },
      heart: {
        id: 'heart',
        name: 'Heart Disease',
        icon: 'fas fa-heartbeat',
        description: 'Evaluate your cardiovascular health and heart disease risk factors.',
        features: [
          'Cholesterol level analysis',
          'Blood pressure assessment',
          'ECG interpretation',
          'Exercise tolerance evaluation'
        ],
        parameters: [
          {
            id: 'age',
            label: 'Age (years)',
            required: true,
            min: 1,
            max: 120,
            placeholder: '50',
            help: 'Current age in years'
          },
          {
            id: 'sex',
            label: 'Sex (0=Female, 1=Male)',
            required: true,
            min: 0,
            max: 1,
            placeholder: '1',
            help: 'Biological sex: 0 for female, 1 for male'
          },
          {
            id: 'cp',
            label: 'Chest Pain Type (0-3)',
            required: true,
            min: 0,
            max: 3,
            placeholder: '2',
            help: '0: Asymptomatic, 1: Atypical angina, 2: Non-anginal, 3: Typical angina'
          },
          {
            id: 'trestbps',
            label: 'Resting Blood Pressure (mmHg)',
            required: true,
            min: 80,
            max: 200,
            placeholder: '120',
            help: 'Resting systolic blood pressure (normal: 90-140 mmHg)'
          },
          {
            id: 'chol',
            label: 'Cholesterol Level (mg/dL)',
            required: true,
            min: 100,
            max: 600,
            placeholder: '200',
            help: 'Serum cholesterol (normal: <200 mg/dL)'
          },
          {
            id: 'fbs',
            label: 'Fasting Blood Sugar (0=Normal, 1=High)',
            required: true,
            min: 0,
            max: 1,
            placeholder: '0',
            help: '1 if fasting blood sugar > 120 mg/dL, 0 otherwise'
          },
          {
            id: 'restecg',
            label: 'Resting ECG (0-2)',
            required: true,
            min: 0,
            max: 2,
            placeholder: '0',
            help: '0: Normal, 1: ST-T abnormality, 2: Left ventricular hypertrophy'
          },
          {
            id: 'thalach',
            label: 'Maximum Heart Rate',
            required: true,
            min: 60,
            max: 220,
            placeholder: '150',
            help: 'Maximum heart rate achieved during exercise'
          },
          {
            id: 'exang',
            label: 'Exercise Induced Angina (0=No, 1=Yes)',
            required: true,
            min: 0,
            max: 1,
            placeholder: '0',
            help: 'Exercise induced angina: 0 for no, 1 for yes'
          },
          {
            id: 'oldpeak',
            label: 'ST Depression',
            required: true,
            min: 0,
            max: 10,
            step: 0.1,
            placeholder: '1.0',
            help: 'ST depression induced by exercise relative to rest'
          },
          {
            id: 'slope',
            label: 'ST Segment Slope (0-2)',
            required: true,
            min: 0,
            max: 2,
            placeholder: '1',
            help: '0: Downsloping, 1: Flat, 2: Upsloping'
          },
          {
            id: 'ca',
            label: 'Major Vessels (0-4)',
            required: true,
            min: 0,
            max: 4,
            placeholder: '0',
            help: 'Number of major vessels colored by fluoroscopy'
          },
          {
            id: 'thal',
            label: 'Thalassemia (0-3)',
            required: true,
            min: 0,
            max: 3,
            placeholder: '2',
            help: '0: Normal, 1: Fixed defect, 2: Reversible defect, 3: Not described'
          }
        ]
      },
      parkinsons: {
        id: 'parkinsons',
        name: "Parkinson's Disease",
        icon: 'fas fa-brain',
        description: 'Analyze voice patterns and motor symptoms to assess Parkinson\'s disease risk.',
        features: [
          'Voice pattern analysis',
          'Motor symptom assessment',
          'Tremor evaluation',
          'Speech characteristic analysis'
        ],
        parameters: [
          {
            id: 'fo',
            label: 'Average Vocal Frequency (Hz)',
            required: true,
            min: 50,
            max: 300,
            step: 0.001,
            placeholder: '150.0',
            help: 'MDVP:Fo(Hz) - Average vocal fundamental frequency'
          },
          {
            id: 'fhi',
            label: 'Maximum Vocal Frequency (Hz)',
            required: true,
            min: 50,
            max: 600,
            step: 0.001,
            placeholder: '200.0',
            help: 'MDVP:Fhi(Hz) - Maximum vocal fundamental frequency'
          },
          {
            id: 'flo',
            label: 'Minimum Vocal Frequency (Hz)',
            required: true,
            min: 50,
            max: 300,
            step: 0.001,
            placeholder: '100.0',
            help: 'MDVP:Flo(Hz) - Minimum vocal fundamental frequency'
          },
          {
            id: 'jitter',
            label: 'Jitter Percentage (%)',
            required: true,
            min: 0,
            max: 10,
            step: 0.00001,
            placeholder: '0.005',
            help: 'MDVP:Jitter(%) - Frequency variation measure'
          },
          {
            id: 'shimmer',
            label: 'Shimmer',
            required: true,
            min: 0,
            max: 1,
            step: 0.00001,
            placeholder: '0.03',
            help: 'MDVP:Shimmer - Amplitude variation measure'
          },
          {
            id: 'hnr',
            label: 'Harmonics-to-Noise Ratio',
            required: true,
            min: 0,
            max: 40,
            step: 0.001,
            placeholder: '20.0',
            help: 'HNR - Ratio of noise to tonal components in voice'
          },
          {
            id: 'rpde',
            label: 'RPDE',
            required: true,
            min: 0,
            max: 1,
            step: 0.000001,
            placeholder: '0.5',
            help: 'Recurrence Period Density Entropy measure'
          },
          {
            id: 'dfa',
            label: 'DFA',
            required: true,
            min: 0,
            max: 1,
            step: 0.000001,
            placeholder: '0.7',
            help: 'Detrended Fluctuation Analysis'
          },
          {
            id: 'spread1',
            label: 'Spread1',
            required: true,
            min: -10,
            max: 0,
            step: 0.000001,
            placeholder: '-5.0',
            help: 'Nonlinear dynamical complexity measure'
          },
          {
            id: 'spread2',
            label: 'Spread2',
            required: true,
            min: 0,
            max: 1,
            step: 0.000001,
            placeholder: '0.2',
            help: 'Nonlinear dynamical complexity measure'
          },
          {
            id: 'd2',
            label: 'D2',
            required: true,
            min: 0,
            max: 5,
            step: 0.000001,
            placeholder: '2.0',
            help: 'Correlation dimension'
          },
          {
            id: 'ppe',
            label: 'PPE',
            required: true,
            min: 0,
            max: 1,
            step: 0.000001,
            placeholder: '0.2',
            help: 'Pitch Period Entropy'
          }
        ]
      }
    }
  }

  getDiseases() {
    return Object.values(this.diseases)
  }

  getDisease(id) {
    return this.diseases[id]
  }

  async predict(diseaseId, data) {
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 2000))

    const disease = this.getDisease(diseaseId)
    if (!disease) {
      throw new Error('Invalid disease ID')
    }

    // Extract parameter values
    const features = disease.parameters.map(param => {
      const value = parseFloat(data[param.id])
      return isNaN(value) ? 0 : value
    })

    // Simple rule-based prediction for demo
    // In a real application, this would call your ML API
    const prediction = this.simulatePrediction(diseaseId, features, data)

    return prediction
  }

  simulatePrediction(diseaseId, features, data) {
    let riskScore = 0
    let recommendations = []

    switch (diseaseId) {
      case 'diabetes':
        riskScore = this.calculateDiabetesRisk(features, data)
        recommendations = this.getDiabetesRecommendations(riskScore > 0.5)
        break
      case 'heart':
        riskScore = this.calculateHeartRisk(features, data)
        recommendations = this.getHeartRecommendations(riskScore > 0.5)
        break
      case 'parkinsons':
        riskScore = this.calculateParkinsonsRisk(features, data)
        recommendations = this.getParkinsonsRecommendations(riskScore > 0.5)
        break
      default:
        riskScore = Math.random()
    }

    const isHighRisk = riskScore > 0.5
    const confidence = Math.round((0.8 + Math.random() * 0.2) * 100)

    return {
      risk: isHighRisk ? 'high' : 'low',
      score: riskScore,
      confidence: confidence,
      message: isHighRisk 
        ? `Based on the provided parameters, there is an elevated risk for ${this.getDisease(diseaseId).name}. Please consult with a healthcare professional for proper evaluation.`
        : `Based on the provided parameters, the risk for ${this.getDisease(diseaseId).name} appears to be low. Continue maintaining healthy lifestyle habits.`,
      recommendations: recommendations
    }
  }

  calculateDiabetesRisk(features, data) {
    const [pregnancies, glucose, bp, skin, insulin, bmi, pedigree, age] = features
    
    let risk = 0
    
    // Glucose level (most important factor)
    if (glucose > 140) risk += 0.3
    else if (glucose > 100) risk += 0.15
    
    // BMI
    if (bmi > 30) risk += 0.2
    else if (bmi > 25) risk += 0.1
    
    // Age
    if (age > 45) risk += 0.15
    else if (age > 35) risk += 0.1
    
    // Blood pressure
    if (bp > 90) risk += 0.1
    
    // Family history (pedigree)
    if (pedigree > 0.5) risk += 0.1
    
    // Insulin resistance
    if (insulin > 200) risk += 0.1
    
    return Math.min(risk, 1)
  }

  calculateHeartRisk(features, data) {
    const [age, sex, cp, trestbps, chol, fbs, restecg, thalach, exang, oldpeak, slope, ca, thal] = features
    
    let risk = 0
    
    // Age factor
    if (age > 55) risk += 0.2
    else if (age > 45) risk += 0.1
    
    // Gender (males higher risk)
    if (sex === 1) risk += 0.1
    
    // Chest pain type
    if (cp === 3) risk += 0.15 // Typical angina
    
    // Blood pressure
    if (trestbps > 140) risk += 0.15
    
    // Cholesterol
    if (chol > 240) risk += 0.1
    
    // Exercise induced angina
    if (exang === 1) risk += 0.1
    
    // ST depression
    if (oldpeak > 2) risk += 0.1
    
    // Number of vessels
    if (ca > 0) risk += 0.1
    
    return Math.min(risk, 1)
  }

  calculateParkinsonsRisk(features, data) {
    const [fo, fhi, flo, jitter, shimmer, hnr, rpde, dfa, spread1, spread2, d2, ppe] = features
    
    let risk = 0
    
    // Jitter (voice instability)
    if (jitter > 0.01) risk += 0.2
    
    // Shimmer (amplitude variation)
    if (shimmer > 0.05) risk += 0.2
    
    // HNR (lower values indicate more noise)
    if (hnr < 15) risk += 0.2
    
    // RPDE (complexity measure)
    if (rpde > 0.6) risk += 0.15
    
    // DFA (correlation measure)
    if (dfa > 0.8) risk += 0.15
    
    // PPE (pitch entropy)
    if (ppe > 0.3) risk += 0.1
    
    return Math.min(risk, 1)
  }

  getDiabetesRecommendations(isHighRisk) {
    if (isHighRisk) {
      return [
        'Schedule an immediate appointment with your healthcare provider',
        'Monitor blood glucose levels regularly',
        'Follow a low-glycemic diet with reduced sugar intake',
        'Engage in regular physical activity (150 minutes per week)',
        'Maintain a healthy weight through diet and exercise',
        'Consider diabetes education classes',
        'Monitor blood pressure and cholesterol levels'
      ]
    } else {
      return [
        'Maintain a balanced diet rich in vegetables and whole grains',
        'Exercise regularly to maintain healthy weight',
        'Get annual health screenings including glucose tests',
        'Limit processed foods and sugary beverages',
        'Stay hydrated and get adequate sleep',
        'Manage stress through relaxation techniques'
      ]
    }
  }

  getHeartRecommendations(isHighRisk) {
    if (isHighRisk) {
      return [
        'Consult a cardiologist immediately for comprehensive evaluation',
        'Monitor blood pressure and heart rate regularly',
        'Follow a heart-healthy diet low in saturated fats',
        'Take prescribed medications as directed',
        'Quit smoking and limit alcohol consumption',
        'Engage in supervised cardiac rehabilitation if recommended',
        'Learn to recognize heart attack warning signs'
      ]
    } else {
      return [
        'Maintain regular cardiovascular exercise',
        'Follow a Mediterranean-style diet',
        'Keep cholesterol and blood pressure in healthy ranges',
        'Avoid smoking and excessive alcohol',
        'Manage stress through healthy coping strategies',
        'Get regular heart health screenings'
      ]
    }
  }

  getParkinsonsRecommendations(isHighRisk) {
    if (isHighRisk) {
      return [
        'Consult a neurologist for comprehensive evaluation',
        'Consider speech therapy for voice-related symptoms',
        'Engage in regular physical therapy and exercise',
        'Join support groups for patients and families',
        'Maintain social connections and mental stimulation',
        'Consider occupational therapy for daily activities',
        'Stay informed about treatment options and research'
      ]
    } else {
      return [
        'Maintain regular physical exercise and movement',
        'Practice good vocal hygiene and speech exercises',
        'Stay mentally active with puzzles and learning',
        'Get adequate sleep and manage stress',
        'Maintain social connections and activities',
        'Consider regular neurological check-ups if family history exists'
      ]
    }
  }
}