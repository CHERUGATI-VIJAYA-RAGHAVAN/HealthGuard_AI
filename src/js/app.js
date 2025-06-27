import { DiseasePredictor } from './disease-predictor.js'
import { ThemeManager } from './theme-manager.js'
import { FormValidator } from './form-validator.js'
import { UIManager } from './ui-manager.js'

class HealthGuardApp {
  constructor() {
    this.diseasePredictor = new DiseasePredictor()
    this.themeManager = new ThemeManager()
    this.formValidator = new FormValidator()
    this.uiManager = new UIManager()
    
    this.currentStep = 'selection'
    this.selectedDisease = null
    this.patientName = ''
    
    this.init()
  }

  init() {
    this.render()
    this.bindEvents()
    this.themeManager.init()
  }

  render() {
    const app = document.getElementById('app')
    app.innerHTML = this.getHTML()
  }

  getHTML() {
    return `
      <header class="header">
        <div class="container">
          <div class="header-content">
            <a href="#" class="logo" onclick="app.resetToHome()">
              <div class="logo-icon">
                <i class="fas fa-heartbeat"></i>
              </div>
              <span>HealthGuard AI</span>
            </a>
            <div class="nav-actions">
              <button class="theme-toggle" onclick="app.themeManager.toggle()" aria-label="Toggle theme">
                <i class="fas fa-moon"></i>
              </button>
            </div>
          </div>
        </div>
      </header>

      <main class="main-content">
        <div class="container">
          ${this.getStepContent()}
        </div>
      </main>
    `
  }

  getStepContent() {
    switch (this.currentStep) {
      case 'selection':
        return this.getSelectionStep()
      case 'patient-info':
        return this.getPatientInfoStep()
      case 'prediction-form':
        return this.getPredictionFormStep()
      case 'results':
        return this.getResultsStep()
      default:
        return this.getSelectionStep()
    }
  }

  getSelectionStep() {
    return `
      <div class="hero-section fade-in">
        <h1 class="hero-title">AI-Powered Health Predictions</h1>
        <p class="hero-subtitle">
          Get instant health risk assessments using advanced machine learning algorithms.
          Select a condition below to begin your health screening.
        </p>
      </div>

      <div class="disease-grid">
        ${this.diseasePredictor.getDiseases().map(disease => `
          <div class="card disease-card" onclick="app.selectDisease('${disease.id}')" tabindex="0">
            <div class="disease-icon">
              <i class="${disease.icon}"></i>
            </div>
            <h3 class="disease-title">${disease.name}</h3>
            <p class="disease-description">${disease.description}</p>
            <ul class="disease-features">
              ${disease.features.map(feature => `<li>${feature}</li>`).join('')}
            </ul>
            <div class="btn btn-secondary">
              Start Screening <i class="fas fa-arrow-right"></i>
            </div>
          </div>
        `).join('')}
      </div>

      <div class="card">
        <h2>Why Choose HealthGuard AI?</h2>
        <div class="form-grid">
          <div>
            <h4><i class="fas fa-brain"></i> Advanced AI Models</h4>
            <p>Our machine learning models achieve 94-99% accuracy using the latest algorithms.</p>
          </div>
          <div>
            <h4><i class="fas fa-shield-alt"></i> Privacy First</h4>
            <p>Your health data is processed securely and never stored permanently.</p>
          </div>
          <div>
            <h4><i class="fas fa-clock"></i> Instant Results</h4>
            <p>Get your health risk assessment in seconds, not days.</p>
          </div>
        </div>
      </div>
    `
  }

  getPatientInfoStep() {
    return `
      <div class="progress-bar">
        <div class="progress-fill" style="width: 33%"></div>
      </div>

      <div class="card">
        <h2>Patient Information</h2>
        <p class="hero-subtitle">Please provide your basic information to personalize your health assessment.</p>
        
        <form id="patient-form" class="form-grid">
          <div class="form-group">
            <label class="form-label" for="patient-name">Full Name *</label>
            <input 
              type="text" 
              id="patient-name" 
              class="form-input" 
              required 
              placeholder="Enter your full name"
              value="${this.patientName}"
            >
            <div class="form-help">This will be used in your health report</div>
          </div>
          
          <div class="form-group">
            <label class="form-label" for="patient-age">Age *</label>
            <input 
              type="number" 
              id="patient-age" 
              class="form-input" 
              required 
              min="1" 
              max="120"
              placeholder="Enter your age"
            >
          </div>
          
          <div class="form-group">
            <label class="form-label" for="patient-gender">Gender</label>
            <select id="patient-gender" class="form-input">
              <option value="">Select gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </div>
        </form>

        <div style="margin-top: 2rem; display: flex; gap: 1rem; justify-content: space-between;">
          <button class="btn btn-secondary" onclick="app.goToStep('selection')">
            <i class="fas fa-arrow-left"></i> Back
          </button>
          <button class="btn btn-primary" onclick="app.submitPatientInfo()">
            Continue <i class="fas fa-arrow-right"></i>
          </button>
        </div>
      </div>
    `
  }

  getPredictionFormStep() {
    const disease = this.diseasePredictor.getDisease(this.selectedDisease)
    if (!disease) return this.getSelectionStep()

    return `
      <div class="progress-bar">
        <div class="progress-fill" style="width: 66%"></div>
      </div>

      <div class="card">
        <h2><i class="${disease.icon}"></i> ${disease.name} Screening</h2>
        <p class="hero-subtitle">Please provide the following medical parameters for accurate prediction.</p>
        
        <form id="prediction-form" class="form-grid">
          ${disease.parameters.map(param => `
            <div class="form-group">
              <label class="form-label" for="${param.id}">${param.label} ${param.required ? '*' : ''}</label>
              <input 
                type="number" 
                id="${param.id}" 
                class="form-input" 
                ${param.required ? 'required' : ''}
                min="${param.min || ''}"
                max="${param.max || ''}"
                step="${param.step || 'any'}"
                placeholder="${param.placeholder || ''}"
              >
              ${param.help ? `<div class="form-help">${param.help}</div>` : ''}
            </div>
          `).join('')}
        </form>

        <div style="margin-top: 2rem; display: flex; gap: 1rem; justify-content: space-between;">
          <button class="btn btn-secondary" onclick="app.goToStep('patient-info')">
            <i class="fas fa-arrow-left"></i> Back
          </button>
          <button class="btn btn-primary" onclick="app.submitPrediction()">
            <i class="fas fa-search"></i> Analyze Health Risk
          </button>
        </div>
      </div>

      <div class="card">
        <h3>Important Notes</h3>
        <ul class="health-tips">
          <li>Ensure all measurements are accurate for best results</li>
          <li>This is a screening tool, not a medical diagnosis</li>
          <li>Consult healthcare professionals for medical advice</li>
          <li>Regular health check-ups are recommended</li>
        </ul>
      </div>
    `
  }

  getResultsStep() {
    if (!this.predictionResult) return this.getSelectionStep()

    const isPositive = this.predictionResult.risk === 'high'
    const disease = this.diseasePredictor.getDisease(this.selectedDisease)

    return `
      <div class="progress-bar">
        <div class="progress-fill" style="width: 100%"></div>
      </div>

      <div class="result-card ${isPositive ? 'result-positive' : 'result-negative'}">
        <div class="result-icon">
          <i class="fas ${isPositive ? 'fa-exclamation-triangle' : 'fa-check-circle'}"></i>
        </div>
        <h2 class="result-title">
          ${isPositive ? 'High Risk Detected' : 'Low Risk Assessment'}
        </h2>
        <p class="result-message">
          ${this.predictionResult.message}
        </p>
        <div style="margin-bottom: 1rem;">
          <strong>Confidence Level:</strong> ${this.predictionResult.confidence}%
        </div>
      </div>

      <div class="health-tips">
        <h3><i class="fas fa-lightbulb"></i> ${isPositive ? 'Immediate Action Required' : 'Preventive Measures'}</h3>
        <ul>
          ${this.predictionResult.recommendations.map(rec => `<li>${rec}</li>`).join('')}
        </ul>
      </div>

      <div class="card">
        <h3>Next Steps</h3>
        <div style="display: flex; gap: 1rem; flex-wrap: wrap; margin-top: 1rem;">
          <button class="btn btn-primary" onclick="app.downloadReport()">
            <i class="fas fa-download"></i> Download Report
          </button>
          <button class="btn btn-secondary" onclick="app.resetToHome()">
            <i class="fas fa-home"></i> New Assessment
          </button>
          <button class="btn btn-secondary" onclick="app.shareResults()">
            <i class="fas fa-share"></i> Share Results
          </button>
        </div>
      </div>

      <div class="card">
        <h3>Disclaimer</h3>
        <p style="color: var(--text-secondary); font-size: 0.875rem;">
          This AI-powered assessment is for informational purposes only and should not replace professional medical advice, 
          diagnosis, or treatment. Always consult with qualified healthcare providers regarding your health concerns.
        </p>
      </div>
    `
  }

  selectDisease(diseaseId) {
    this.selectedDisease = diseaseId
    this.goToStep('patient-info')
  }

  goToStep(step) {
    this.currentStep = step
    this.render()
    window.scrollTo(0, 0)
  }

  submitPatientInfo() {
    const form = document.getElementById('patient-form')
    if (!this.formValidator.validate(form)) return

    this.patientName = document.getElementById('patient-name').value
    this.patientAge = document.getElementById('patient-age').value
    this.patientGender = document.getElementById('patient-gender').value

    this.goToStep('prediction-form')
  }

  async submitPrediction() {
    const form = document.getElementById('prediction-form')
    if (!this.formValidator.validate(form)) return

    // Show loading state
    this.uiManager.showLoading('Analyzing your health data...')

    try {
      const formData = new FormData(form)
      const data = Object.fromEntries(formData.entries())
      
      // Add patient info
      data.disease = this.selectedDisease
      data.patientName = this.patientName
      data.patientAge = this.patientAge
      data.patientGender = this.patientGender

      // Get prediction from disease predictor
      this.predictionResult = await this.diseasePredictor.predict(this.selectedDisease, data)
      
      this.uiManager.hideLoading()
      this.goToStep('results')
    } catch (error) {
      this.uiManager.hideLoading()
      this.uiManager.showError('Failed to analyze health data. Please try again.')
      console.error('Prediction error:', error)
    }
  }

  resetToHome() {
    this.currentStep = 'selection'
    this.selectedDisease = null
    this.patientName = ''
    this.predictionResult = null
    this.render()
  }

  downloadReport() {
    if (!this.predictionResult) return

    const report = this.generateReport()
    const blob = new Blob([report], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    
    const a = document.createElement('a')
    a.href = url
    a.download = `healthguard-report-${Date.now()}.txt`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  generateReport() {
    const disease = this.diseasePredictor.getDisease(this.selectedDisease)
    const date = new Date().toLocaleDateString()
    
    return `
HEALTHGUARD AI - HEALTH ASSESSMENT REPORT
=========================================

Patient Information:
- Name: ${this.patientName}
- Age: ${this.patientAge}
- Gender: ${this.patientGender || 'Not specified'}
- Assessment Date: ${date}

Assessment Type: ${disease.name}

Results:
- Risk Level: ${this.predictionResult.risk.toUpperCase()}
- Confidence: ${this.predictionResult.confidence}%
- Assessment: ${this.predictionResult.message}

Recommendations:
${this.predictionResult.recommendations.map(rec => `- ${rec}`).join('\n')}

IMPORTANT DISCLAIMER:
This assessment is for informational purposes only and should not replace 
professional medical advice, diagnosis, or treatment. Always consult with 
qualified healthcare providers regarding your health concerns.

Generated by HealthGuard AI - ${new Date().toISOString()}
    `.trim()
  }

  shareResults() {
    if (navigator.share) {
      navigator.share({
        title: 'HealthGuard AI Assessment',
        text: `I just completed a ${this.diseasePredictor.getDisease(this.selectedDisease).name} health screening with HealthGuard AI.`,
        url: window.location.href
      })
    } else {
      // Fallback for browsers that don't support Web Share API
      const text = `I just completed a health screening with HealthGuard AI. Check it out at ${window.location.href}`
      navigator.clipboard.writeText(text).then(() => {
        this.uiManager.showSuccess('Link copied to clipboard!')
      })
    }
  }

  bindEvents() {
    // Handle keyboard navigation
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        this.resetToHome()
      }
    })

    // Handle form submissions
    document.addEventListener('submit', (e) => {
      e.preventDefault()
    })
  }
}

// Initialize the application
export function initializeApp() {
  window.app = new HealthGuardApp()
}