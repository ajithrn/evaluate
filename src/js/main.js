import '../styles/main.scss'
import feather from 'feather-icons'
import { Calculator } from './components/Calculator.js'
import { ChemistrySelector } from './components/ChemistrySelector.js'
import { SummaryDashboard } from './components/SummaryDashboard.js'
import { Tables } from './components/Tables.js'

class EVCalculatorApp {
  constructor() {
    this.calculator = null
    this.chemistrySelector = null
    this.summaryDashboard = null
    this.tables = null
    
    this.init()
  }

  async init() {
    // Wait for DOM to be ready
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', () => this.initializeApp())
    } else {
      this.initializeApp()
    }
  }

  initializeApp() {
    // Initialize Feather icons
    this.initializeFeatherIcons()
    
    // Initialize components
    this.calculator = new Calculator()
    this.chemistrySelector = new ChemistrySelector()
    this.summaryDashboard = new SummaryDashboard()
    this.tables = new Tables()
    
    // Initialize UI interactions
    this.initializeTooltips()
    this.initializeAccordions()
    
    // Bind events between components
    this.bindComponentEvents()
    
    // Initial calculation
    this.calculator.calculate()
  }

  initializeFeatherIcons() {
    try {
      feather.replace()
    } catch (error) {
      console.warn('Error initializing Feather icons:', error)
    }
  }

  initializeTooltips() {
    const tooltipTriggers = document.querySelectorAll('.tooltip-trigger')
    const tooltip = document.getElementById('tooltip')

    if (!tooltip) return

    tooltipTriggers.forEach(trigger => {
      trigger.addEventListener('mouseenter', (e) => {
        const tooltipText = e.target.getAttribute('data-tooltip')
        tooltip.textContent = tooltipText
        
        // First, make tooltip visible but transparent to measure it
        tooltip.style.visibility = 'visible'
        tooltip.style.opacity = '0'
        
        // Position tooltip relative to the help icon specifically
        const rect = e.target.getBoundingClientRect()
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop
        const scrollLeft = window.pageXOffset || document.documentElement.scrollLeft
        
        // Calculate absolute position including scroll
        const absoluteLeft = rect.left + scrollLeft
        const absoluteTop = rect.top + scrollTop
        
        // Position tooltip to the right of the help icon with some spacing
        let left = absoluteLeft + rect.width + 8
        let top = absoluteTop - 4 // Slight vertical adjustment to align better
        
        // Check if tooltip would go off screen to the right
        const tooltipRect = tooltip.getBoundingClientRect()
        const viewportWidth = window.innerWidth
        
        if (left + tooltipRect.width > viewportWidth + scrollLeft - 10) {
          // Position to the left of the help icon instead
          left = absoluteLeft - tooltipRect.width - 8
        }
        
        // Ensure tooltip doesn't go off screen on the left
        if (left < scrollLeft + 10) {
          left = scrollLeft + 10
        }
        
        // Apply position
        tooltip.style.left = left + 'px'
        tooltip.style.top = top + 'px'
        
        // Now make it fully visible
        tooltip.classList.remove('opacity-0')
        tooltip.classList.add('opacity-100')
        tooltip.style.opacity = '1'
      })

      trigger.addEventListener('mouseleave', () => {
        tooltip.classList.remove('opacity-100')
        tooltip.classList.add('opacity-0')
        tooltip.style.visibility = 'hidden'
        tooltip.style.opacity = '0'
      })
    })
  }

  initializeAccordions() {
    const accordions = [
      { toggle: 'methodologyToggle', content: 'methodologyContent', chevron: 'methodologyChevron' },
      { toggle: 'dashboardToggle', content: 'dashboardContent', chevron: 'dashboardChevron' },
      { toggle: 'specsToggle', content: 'specsContent', chevron: 'specsChevron' },
      { toggle: 'costsToggle', content: 'costsContent', chevron: 'costsChevron' },
      { toggle: 'timeToggle', content: 'timeContent', chevron: 'timeChevron' },
      { toggle: 'comparisonToggle', content: 'comparisonContent', chevron: 'comparisonChevron' }
    ]

    accordions.forEach(accordion => {
      const toggle = document.getElementById(accordion.toggle)
      const content = document.getElementById(accordion.content)
      const chevron = document.getElementById(accordion.chevron)

      if (toggle && content && chevron) {
        toggle.addEventListener('click', () => {
          const isHidden = content.classList.contains('hidden')
          
          if (isHidden) {
            content.classList.remove('hidden')
            content.classList.add('animate-slide-down')
            chevron.classList.add('rotate-180')
          } else {
            content.classList.add('hidden')
            content.classList.remove('animate-slide-down')
            chevron.classList.remove('rotate-180')
          }
        })
      }
    })
  }

  bindComponentEvents() {
    // Listen for chemistry changes
    document.addEventListener('chemistryChanged', (e) => {
      this.calculator.setChemistry(e.detail.chemistry)
      this.calculator.calculate()
    })

    // Listen for input changes
    document.addEventListener('inputChanged', (e) => {
      this.calculator.updateInput(e.detail.field, e.detail.value)
      this.calculator.calculate()
    })

    // Listen for calculation updates
    document.addEventListener('calculationUpdated', (e) => {
      this.summaryDashboard.update(e.detail.calculations)
      this.tables.update(e.detail.calculations)
    })
  }
}

// Initialize the app
new EVCalculatorApp()
