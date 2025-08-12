export class ChemistrySelector {
  constructor() {
    this.selectedChemistry = 'LFP'
    this.chemistryData = {
      LFP: {
        name: 'LFP - Lithium Iron Phosphate',
        efficiency0to100: 0.91,
        efficiency20to80: 0.925,
        description: 'Most popular in modern EVs. Excellent thermal stability and long cycle life. Moderate charging efficiency with minimal degradation over time.',
        characteristics: ['Excellent thermal stability', 'Long cycle life', 'Safe chemistry', 'Moderate energy density']
      },
      NMC: {
        name: 'NMC - Nickel Manganese Cobalt',
        efficiency0to100: 0.89,
        efficiency20to80: 0.91,
        description: 'Balanced performance chemistry with good energy density. Popular in premium EVs with moderate efficiency characteristics.',
        characteristics: ['High energy density', 'Good power output', 'Balanced performance', 'Moderate thermal sensitivity']
      },
      NCA: {
        name: 'NCA - Nickel Cobalt Aluminum',
        efficiency0to100: 0.88,
        efficiency20to80: 0.90,
        description: 'High energy density chemistry with excellent performance but more temperature sensitive. Requires careful thermal management.',
        characteristics: ['Very high energy density', 'Excellent power output', 'Temperature sensitive', 'Premium performance']
      },
      LTO: {
        name: 'LTO - Lithium Titanate',
        efficiency0to100: 0.93,
        efficiency20to80: 0.94,
        description: 'Ultra-fast charging chemistry with highest efficiency and exceptional longevity. Premium technology with excellent performance.',
        characteristics: ['Ultra-fast charging', 'Highest efficiency', 'Exceptional longevity', 'Wide temperature range']
      }
    }
    
    this.init()
  }

  init() {
    this.bindEvents()
    this.updateChemistryInfo()
  }

  bindEvents() {
    // Handle dropdown selection
    const chemistrySelect = document.getElementById('chemistrySelect')
    if (chemistrySelect) {
      chemistrySelect.addEventListener('change', (e) => {
        this.selectChemistry(e.target.value)
      })
    }

    // Keep the old card-based selection for backward compatibility (if cards exist)
    const chemistryOptions = document.querySelectorAll('.chemistry-option')
    chemistryOptions.forEach(option => {
      option.addEventListener('click', (e) => {
        const chemistry = e.currentTarget.getAttribute('data-chemistry')
        this.selectChemistry(chemistry)
      })
    })
  }

  selectChemistry(chemistry) {
    this.selectedChemistry = chemistry
    
    // Update dropdown selection
    const chemistrySelect = document.getElementById('chemistrySelect')
    if (chemistrySelect) {
      chemistrySelect.value = chemistry
    }
    
    // Update visual selection for cards (if they exist)
    document.querySelectorAll('.chemistry-option').forEach(option => {
      if (option.getAttribute('data-chemistry') === chemistry) {
        option.classList.remove('border-gray-300', 'bg-gray-50')
        option.classList.add('border-purple-500', 'bg-purple-50', 'selected')
        
        const efficiencyElement = option.querySelector('.chemistry-efficiency')
        if (efficiencyElement) {
          efficiencyElement.classList.remove('text-gray-500')
          efficiencyElement.classList.add('text-purple-600')
        }
      } else {
        option.classList.remove('border-purple-500', 'bg-purple-50', 'selected')
        option.classList.add('border-gray-300', 'bg-gray-50')
        
        const efficiencyElement = option.querySelector('.chemistry-efficiency')
        if (efficiencyElement) {
          efficiencyElement.classList.remove('text-purple-600')
          efficiencyElement.classList.add('text-gray-500')
        }
      }
    })

    // Update chemistry info
    this.updateChemistryInfo()

    // Dispatch chemistry change event
    document.dispatchEvent(new CustomEvent('chemistryChanged', {
      detail: { chemistry }
    }))
  }

  updateChemistryInfo() {
    const data = this.chemistryData[this.selectedChemistry]
    
    // Update title
    const titleElement = document.getElementById('chemistryTitle')
    if (titleElement) {
      titleElement.textContent = data.name
    }
    
    // Update efficiency values
    const efficiency0to100Element = document.getElementById('efficiency0to100')
    if (efficiency0to100Element) {
      efficiency0to100Element.textContent = `${(data.efficiency0to100 * 100).toFixed(1)}%`
    }
    
    const efficiency20to80Element = document.getElementById('efficiency20to80')
    if (efficiency20to80Element) {
      efficiency20to80Element.textContent = `${(data.efficiency20to80 * 100).toFixed(1)}%`
    }
    
    // Update description
    const descriptionElement = document.getElementById('chemistryDescription')
    if (descriptionElement) {
      descriptionElement.textContent = data.description
    }
    

    // Fallback for old chemistry info element
    const chemistryInfo = document.getElementById('chemistryInfo')
    if (chemistryInfo && !titleElement) {
      chemistryInfo.innerHTML = `<strong>${data.name} Selected:</strong> ${data.description}`
    }
  }

  getSelectedChemistry() {
    return this.selectedChemistry
  }
}
