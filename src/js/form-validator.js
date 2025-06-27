export class FormValidator {
  validate(form) {
    if (!form) return false

    const inputs = form.querySelectorAll('input[required], select[required]')
    let isValid = true
    
    inputs.forEach(input => {
      this.clearErrors(input)
      
      if (!this.validateInput(input)) {
        this.showError(input, this.getErrorMessage(input))
        isValid = false
      }
    })

    return isValid
  }

  validateInput(input) {
    const value = input.value.trim()
    const type = input.type
    const min = parseFloat(input.min)
    const max = parseFloat(input.max)

    // Required field check
    if (input.required && !value) {
      return false
    }

    // Type-specific validation
    if (value) {
      switch (type) {
        case 'number':
          const numValue = parseFloat(value)
          if (isNaN(numValue)) return false
          if (!isNaN(min) && numValue < min) return false
          if (!isNaN(max) && numValue > max) return false
          break
        case 'email':
          const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
          if (!emailRegex.test(value)) return false
          break
        case 'text':
          if (input.id === 'patient-name' && value.length < 2) return false
          break
      }
    }

    return true
  }

  getErrorMessage(input) {
    const value = input.value.trim()
    const type = input.type
    const min = parseFloat(input.min)
    const max = parseFloat(input.max)
    const label = input.previousElementSibling?.textContent?.replace('*', '').trim() || 'Field'

    if (!value && input.required) {
      return `${label} is required`
    }

    switch (type) {
      case 'number':
        const numValue = parseFloat(value)
        if (isNaN(numValue)) return `${label} must be a valid number`
        if (!isNaN(min) && numValue < min) return `${label} must be at least ${min}`
        if (!isNaN(max) && numValue > max) return `${label} must be no more than ${max}`
        break
      case 'email':
        return `Please enter a valid email address`
      case 'text':
        if (input.id === 'patient-name') return `Name must be at least 2 characters long`
        break
    }

    return `${label} is invalid`
  }

  showError(input, message) {
    input.classList.add('error')
    
    // Remove existing error message
    this.clearErrors(input)
    
    // Add new error message
    const errorDiv = document.createElement('div')
    errorDiv.className = 'error-message'
    errorDiv.textContent = message
    errorDiv.style.color = 'var(--danger-color)'
    errorDiv.style.fontSize = '0.875rem'
    errorDiv.style.marginTop = '0.25rem'
    
    input.parentNode.appendChild(errorDiv)
  }

  clearErrors(input) {
    input.classList.remove('error')
    const existingError = input.parentNode.querySelector('.error-message')
    if (existingError) {
      existingError.remove()
    }
  }

  clearAllErrors(form) {
    const inputs = form.querySelectorAll('input, select')
    inputs.forEach(input => this.clearErrors(input))
  }
}