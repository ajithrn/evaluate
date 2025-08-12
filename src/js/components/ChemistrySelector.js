export class ChemistrySelector {
  constructor() {
    this.selectedChemistry = 'LFP'
    this.chemistryData = {
      LFP: {
        name: 'LFP - Lithium Iron Phosphate',
        description: 'Most popular in modern EVs. Excellent thermal stability and long cycle life. Moderate charging efficiency with minimal degradation over time.'
      },
      NMC: {
        name: 'NMC - Nickel Manganese Cobalt',
        description: 'Balanced performance chemistry with good energy density. Popular in premium EVs with moderate efficiency characteristics.'
      },
      NCA: {
        name: 'NCA - Nickel Cobalt Aluminum',
        description: 'High energy density chemistry with excellent performance but more temperature sensitive. Requires careful thermal management.'
      },
      LTO: {
        name: 'LTO - Lithium Titanate',
        description: 'Ultra-fast charging chemistry with highest efficiency and exceptional longevity. Premium technology with excellent performance.'
      }
    }
    
    this.init()
  }

  init() {
    this.bindEvents()
    this.updateChemistryInfo()
  }

  bindEvents() {
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
    
    // Update visual selection
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
    const chemistryInfo = document.getElementById('chemistryInfo')
    if (chemistryInfo) {
      const data = this.chemistryData[this.selectedChemistry]
      chemistryInfo.innerHTML = `<strong>${data.name} Selected:</strong> ${data.description}`
    }
  }

  getSelectedChemistry() {
    return this.selectedChemistry
  }
}
