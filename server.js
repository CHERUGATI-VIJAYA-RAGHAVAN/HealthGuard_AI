const express = require('express')
const cors = require('cors')
const helmet = require('helmet')
const compression = require('compression')
const rateLimit = require('express-rate-limit')
const path = require('path')

const app = express()
const PORT = process.env.PORT || 5000

// Security middleware
app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      styleSrc: ["'self'", "'unsafe-inline'", "https://fonts.googleapis.com", "https://cdnjs.cloudflare.com"],
      fontSrc: ["'self'", "https://fonts.gstatic.com", "https://cdnjs.cloudflare.com"],
      scriptSrc: ["'self'", "'unsafe-inline'"],
      imgSrc: ["'self'", "data:", "https:"],
      connectSrc: ["'self'"]
    }
  }
}))

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: 'Too many requests from this IP, please try again later.'
})

app.use(limiter)
app.use(compression())
app.use(cors())
app.use(express.json({ limit: '10mb' }))
app.use(express.urlencoded({ extended: true, limit: '10mb' }))

// Serve static files from dist directory
app.use(express.static(path.join(__dirname, 'dist')))

// API Routes
app.post('/api/predict', async (req, res) => {
  try {
    const { disease, patientName, patientAge, patientGender, ...features } = req.body
    
    // Validate input
    if (!disease || !patientName) {
      return res.status(400).json({
        error: 'Missing required fields: disease and patientName'
      })
    }

    // Here you would integrate with your Python ML models
    // For now, we'll simulate the prediction
    const prediction = await simulatePrediction(disease, features)
    
    res.json({
      success: true,
      prediction: prediction,
      timestamp: new Date().toISOString()
    })
    
  } catch (error) {
    console.error('Prediction error:', error)
    res.status(500).json({
      error: 'Internal server error during prediction',
      message: error.message
    })
  }
})

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({
    status: 'healthy',
    timestamp: new Date().toISOString(),
    version: '1.0.0'
  })
})

// Serve the React app for all other routes
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'))
})

// Error handling middleware
app.use((error, req, res, next) => {
  console.error('Server error:', error)
  res.status(500).json({
    error: 'Internal server error',
    message: process.env.NODE_ENV === 'development' ? error.message : 'Something went wrong'
  })
})

// Simulate ML prediction (replace with actual Python integration)
async function simulatePrediction(disease, features) {
  // Simulate processing delay
  await new Promise(resolve => setTimeout(resolve, 1000))
  
  // Simple rule-based prediction for demo
  let riskScore = Math.random()
  let recommendations = []
  
  switch (disease) {
    case 'diabetes':
      if (features.glucose > 140 || features.bmi > 30) {
        riskScore = 0.7 + Math.random() * 0.3
      }
      recommendations = riskScore > 0.5 ? 
        ['Consult healthcare provider', 'Monitor blood glucose', 'Follow diabetic diet'] :
        ['Maintain healthy diet', 'Regular exercise', 'Annual screenings']
      break
      
    case 'heart':
      if (features.chol > 240 || features.trestbps > 140) {
        riskScore = 0.6 + Math.random() * 0.4
      }
      recommendations = riskScore > 0.5 ?
        ['See cardiologist', 'Monitor blood pressure', 'Heart-healthy diet'] :
        ['Regular cardio exercise', 'Mediterranean diet', 'Stress management']
      break
      
    case 'parkinsons':
      if (features.jitter > 0.01 || features.shimmer > 0.05) {
        riskScore = 0.65 + Math.random() * 0.35
      }
      recommendations = riskScore > 0.5 ?
        ['Consult neurologist', 'Speech therapy', 'Physical therapy'] :
        ['Stay active', 'Mental stimulation', 'Regular check-ups']
      break
  }
  
  const isHighRisk = riskScore > 0.5
  const confidence = Math.round((0.85 + Math.random() * 0.15) * 100)
  
  return {
    risk: isHighRisk ? 'high' : 'low',
    score: riskScore,
    confidence: confidence,
    message: isHighRisk 
      ? `Based on the provided parameters, there is an elevated risk. Please consult with a healthcare professional.`
      : `Based on the provided parameters, the risk appears to be low. Continue maintaining healthy lifestyle habits.`,
    recommendations: recommendations
  }
}

app.listen(PORT, () => {
  console.log(`🚀 HealthGuard AI server running on port ${PORT}`)
  console.log(`📱 Frontend: http://localhost:3000`)
  console.log(`🔧 API: http://localhost:${PORT}/api`)
})

module.exports = app