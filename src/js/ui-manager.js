export class UIManager {
  constructor() {
    this.notifications = []
  }

  showLoading(message = 'Loading...') {
    this.hideLoading() // Remove any existing loading
    
    const loadingDiv = document.createElement('div')
    loadingDiv.id = 'loading-overlay'
    loadingDiv.innerHTML = `
      <div style="
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: rgba(0, 0, 0, 0.5);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 9999;
        backdrop-filter: blur(4px);
      ">
        <div style="
          background: var(--surface-color);
          padding: 2rem;
          border-radius: var(--border-radius);
          text-align: center;
          box-shadow: var(--shadow-lg);
          border: 1px solid var(--border-color);
        ">
          <div class="spinner" style="margin: 0 auto 1rem;"></div>
          <div style="color: var(--text-primary); font-weight: 500;">${message}</div>
        </div>
      </div>
    `
    
    document.body.appendChild(loadingDiv)
  }

  hideLoading() {
    const loadingDiv = document.getElementById('loading-overlay')
    if (loadingDiv) {
      loadingDiv.remove()
    }
  }

  showNotification(message, type = 'info', duration = 5000) {
    const notification = document.createElement('div')
    const id = Date.now()
    
    notification.id = `notification-${id}`
    notification.className = `notification notification-${type}`
    notification.innerHTML = `
      <div style="
        position: fixed;
        top: 20px;
        right: 20px;
        background: var(--surface-color);
        border: 1px solid var(--border-color);
        border-left: 4px solid ${this.getTypeColor(type)};
        border-radius: var(--border-radius);
        padding: 1rem 1.5rem;
        box-shadow: var(--shadow-lg);
        z-index: 1000;
        max-width: 400px;
        animation: slideInRight 0.3s ease-out;
      ">
        <div style="display: flex; align-items: center; gap: 0.75rem;">
          <i class="fas ${this.getTypeIcon(type)}" style="color: ${this.getTypeColor(type)};"></i>
          <span style="color: var(--text-primary); flex: 1;">${message}</span>
          <button onclick="this.closest('[id^=notification-]').remove()" style="
            background: none;
            border: none;
            color: var(--text-secondary);
            cursor: pointer;
            padding: 0;
            font-size: 1.25rem;
          ">&times;</button>
        </div>
      </div>
    `
    
    document.body.appendChild(notification)
    
    // Auto-remove after duration
    setTimeout(() => {
      const element = document.getElementById(`notification-${id}`)
      if (element) {
        element.style.animation = 'slideOutRight 0.3s ease-out'
        setTimeout(() => element.remove(), 300)
      }
    }, duration)
    
    return id
  }

  showSuccess(message, duration) {
    return this.showNotification(message, 'success', duration)
  }

  showError(message, duration) {
    return this.showNotification(message, 'error', duration)
  }

  showWarning(message, duration) {
    return this.showNotification(message, 'warning', duration)
  }

  showInfo(message, duration) {
    return this.showNotification(message, 'info', duration)
  }

  getTypeColor(type) {
    const colors = {
      success: 'var(--success-color)',
      error: 'var(--danger-color)',
      warning: 'var(--warning-color)',
      info: 'var(--primary-color)'
    }
    return colors[type] || colors.info
  }

  getTypeIcon(type) {
    const icons = {
      success: 'fa-check-circle',
      error: 'fa-exclamation-circle',
      warning: 'fa-exclamation-triangle',
      info: 'fa-info-circle'
    }
    return icons[type] || icons.info
  }

  confirmDialog(message, title = 'Confirm') {
    return new Promise((resolve) => {
      const dialog = document.createElement('div')
      dialog.innerHTML = `
        <div style="
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.5);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 10000;
          backdrop-filter: blur(4px);
        ">
          <div style="
            background: var(--surface-color);
            border-radius: var(--border-radius);
            padding: 2rem;
            max-width: 400px;
            width: 90%;
            box-shadow: var(--shadow-lg);
            border: 1px solid var(--border-color);
          ">
            <h3 style="margin: 0 0 1rem 0; color: var(--text-primary);">${title}</h3>
            <p style="margin: 0 0 2rem 0; color: var(--text-secondary);">${message}</p>
            <div style="display: flex; gap: 1rem; justify-content: flex-end;">
              <button class="btn btn-secondary" onclick="this.closest('div').remove(); window.dialogResolve(false)">
                Cancel
              </button>
              <button class="btn btn-primary" onclick="this.closest('div').remove(); window.dialogResolve(true)">
                Confirm
              </button>
            </div>
          </div>
        </div>
      `
      
      window.dialogResolve = resolve
      document.body.appendChild(dialog)
    })
  }
}

// Add CSS for animations
const style = document.createElement('style')
style.textContent = `
  @keyframes slideInRight {
    from {
      transform: translateX(100%);
      opacity: 0;
    }
    to {
      transform: translateX(0);
      opacity: 1;
    }
  }
  
  @keyframes slideOutRight {
    from {
      transform: translateX(0);
      opacity: 1;
    }
    to {
      transform: translateX(100%);
      opacity: 0;
    }
  }
`
document.head.appendChild(style)