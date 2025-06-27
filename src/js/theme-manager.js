export class ThemeManager {
  constructor() {
    this.currentTheme = localStorage.getItem('theme') || 'light'
  }

  init() {
    this.applyTheme(this.currentTheme)
    this.updateToggleIcon()
  }

  toggle() {
    this.currentTheme = this.currentTheme === 'light' ? 'dark' : 'light'
    this.applyTheme(this.currentTheme)
    this.updateToggleIcon()
    localStorage.setItem('theme', this.currentTheme)
  }

  applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme)
  }

  updateToggleIcon() {
    const toggleButton = document.querySelector('.theme-toggle i')
    if (toggleButton) {
      toggleButton.className = this.currentTheme === 'light' ? 'fas fa-moon' : 'fas fa-sun'
    }
  }

  getCurrentTheme() {
    return this.currentTheme
  }
}