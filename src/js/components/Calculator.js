import { formatCurrency, formatTime } from '../utils/formatters.js'
import { validateInput } from '../utils/validators.js'

export class Calculator {
  constructor() {
    this.inputs = {
      batteryCapacity: 53,
      efficiencyMode: 'kmPerKwh',
      efficiency: 7.7,
      fastDCNight: 25,
      fastDCDay: 18.5,
      homeAC: 10,
      homeACSolar: 5,
      iceRunningCost: 10,
      fastDCSpeed: 60,
      homeACSpeed: 7.2,
      monthlyDistance: 2000
    }

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
    
    this.bindInputEvents()
  }

  bindInputEvents() {
    // Input event listeners
    const inputIds = Object.keys(this.inputs)
    inputIds.forEach(id => {
      const element = document.getElementById(id)
      if (element) {
        element.addEventListener('input', (e) => {
          this.handleInputChange(id, e.target.value)
        })
      }
    })

    // Efficiency mode change
    const efficiencyModeElement = document.getElementById('efficiencyMode')
    if (efficiencyModeElement) {
      efficiencyModeElement.addEventListener('change', (e) => {
        this.updateEfficiencyLabel(e.target.value)
        this.handleInputChange('efficiencyMode', e.target.value)
      })
    }
  }

  updateEfficiencyLabel(mode) {
    const label = document.getElementById('efficiencyLabel')
    if (!label) return

    const iconHtml = '<i data-feather="gauge" class="h-4 w-4 mr-1 text-indigo-600"></i>'
    const helpHtml = '<div class="relative ml-2"><i data-feather="help-circle" class="h-4 w-4 text-gray-400 cursor-help tooltip-trigger" data-tooltip="Real-world efficiency from battery to wheels"></i></div>'
    
    if (mode === 'kmPerKwh') {
      label.innerHTML = `${iconHtml}Efficiency (km/kWh)${helpHtml}`
    } else {
      label.innerHTML = `${iconHtml}Range per 1% (km)${helpHtml}`
    }
    
    // Re-initialize icons
    if (typeof feather !== 'undefined') {
      feather.replace()
    }
  }

  handleInputChange(field, value) {
    if (field === 'efficiencyMode') {
      this.inputs[field] = value
    } else {
      const numValue = parseFloat(value)
      
      if (!validateInput(field, numValue)) {
        this.showError(field, 'Please enter a valid positive number')
        return
      } else {
        this.clearError(field)
        this.inputs[field] = numValue
      }
    }

    // Dispatch input change event
    document.dispatchEvent(new CustomEvent('inputChanged', {
      detail: { field, value }
    }))
  }

  showError(field, message) {
    const errorElement = document.getElementById(field + 'Error')
    if (errorElement) {
      errorElement.textContent = message
      errorElement.classList.remove('hidden')
      
      // Add error styling to input
      const input = document.getElementById(field)
      if (input) {
        input.classList.add('border-red-500', 'ring-red-500')
        input.classList.remove('border-gray-300')
      }
    }
  }

  clearError(field) {
    const errorElement = document.getElementById(field + 'Error')
    if (errorElement) {
      errorElement.textContent = ''
      errorElement.classList.add('hidden')
      
      // Remove error styling from input
      const input = document.getElementById(field)
      if (input) {
        input.classList.remove('border-red-500', 'ring-red-500')
        input.classList.add('border-gray-300')
      }
    }
  }

  setChemistry(chemistry) {
    this.selectedChemistry = chemistry
  }

  updateInput(field, value) {
    this.inputs[field] = value
  }

  calculate() {
    const calculations = this.performCalculations()
    
    // Dispatch calculation update event
    document.dispatchEvent(new CustomEvent('calculationUpdated', {
      detail: { calculations }
    }))
  }

  performCalculations() {
    const { batteryCapacity, efficiencyMode, efficiency } = this.inputs
    
    // Get chemistry data
    const chemData = this.chemistryData[this.selectedChemistry]
    
    // Determine efficiency in km/kWh
    const kmPerKwh = efficiencyMode === 'kmPerKwh' 
      ? efficiency 
      : (efficiency / (batteryCapacity / 100))

    // Charging efficiencies from selected chemistry
    const efficiency0to100 = chemData.efficiency0to100
    const efficiency20to80 = chemData.efficiency20to80
    
    // Energy drawn from wall
    const energyDrawn0to100 = batteryCapacity / efficiency0to100
    const energyDrawn20to80 = (batteryCapacity * 0.6) / efficiency20to80
    
    // Wall-to-wheel efficiency
    const wallToWheel0to100 = kmPerKwh * efficiency0to100
    const wallToWheel20to80 = kmPerKwh * efficiency20to80
    
    // Range calculations
    const range0to100 = batteryCapacity * kmPerKwh
    const range20to80 = batteryCapacity * 0.6 * kmPerKwh
    
    // Charging times
    const chargingTimes = this.calculateChargingTimes(energyDrawn0to100, energyDrawn20to80)

    return {
      batteryCapacity,
      efficiency0to100: efficiency0to100 * 100, // Convert to percentage
      efficiency20to80: efficiency20to80 * 100, // Convert to percentage
      energyDrawn0to100,
      energyDrawn20to80,
      wallToWheel0to100,
      wallToWheel20to80,
      range0to100,
      range20to80,
      chargingTimes,
      selectedChemistry: this.selectedChemistry,
      inputs: this.inputs,
      chemistryData: this.chemistryData[this.selectedChemistry]
    }
  }

  calculateChargingTimes(energyDrawn0to100, energyDrawn20to80) {
    const calculateTime = (totalEnergy, chargerPower, is0to100) => {
      if (!is0to100) {
        return totalEnergy / chargerPower
      } else {
        // Account for charging curve - slower at end
        const first80Percent = totalEnergy * 0.8
        const last20Percent = totalEnergy * 0.2
        const timeFirst80 = first80Percent / chargerPower
        const timeLast20 = last20Percent / (chargerPower * 0.35)
        return timeFirst80 + timeLast20
      }
    }

    return {
      dcFast: {
        full: calculateTime(energyDrawn0to100, this.inputs.fastDCSpeed, true),
        partial: calculateTime(energyDrawn20to80, this.inputs.fastDCSpeed, false)
      },
      dc30kW: {
        full: calculateTime(energyDrawn0to100, 30, true),
        partial: calculateTime(energyDrawn20to80, 30, false)
      },
      homeAC: {
        full: calculateTime(energyDrawn0to100, this.inputs.homeACSpeed, true),
        partial: calculateTime(energyDrawn20to80, this.inputs.homeACSpeed, false)
      }
    }
  }
}
