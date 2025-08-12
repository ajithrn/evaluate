export function validateInput(field, value) {
  if (isNaN(value) || value <= 0) {
    return false
  }

  // Field-specific validation
  switch (field) {
    case 'batteryCapacity':
      return value >= 1 && value <= 500
    case 'efficiency':
      return value >= 1 && value <= 50
    case 'fastDCNight':
    case 'fastDCDay':
      return value >= 1 && value <= 100
    case 'homeAC':
      return value >= 1 && value <= 30
    case 'homeACSolar':
      return value >= 0 && value <= 20
    case 'iceRunningCost':
      return value >= 1 && value <= 100
    case 'fastDCSpeed':
      return value >= 10 && value <= 350
    case 'homeACSpeed':
      return value >= 1.4 && value <= 22
    case 'monthlyDistance':
      return value >= 50 && value <= 25000
    default:
      return true
  }
}

export function getValidationMessage(field) {
  const messages = {
    batteryCapacity: 'Battery capacity must be between 1-500 kWh',
    efficiency: 'Efficiency must be between 1-50 km/kWh',
    fastDCNight: 'Fast DC night rate must be between 1-100 ₹/kWh',
    fastDCDay: 'Fast DC day rate must be between 1-100 ₹/kWh',
    homeAC: 'Home AC rate must be between 1-30 ₹/kWh',
    homeACSolar: 'Home AC solar rate must be between 0-20 ₹/kWh',
    iceRunningCost: 'ICE running cost must be between 1-100 ₹/km',
    fastDCSpeed: 'Fast DC speed must be between 10-350 kW',
    homeACSpeed: 'Home AC speed must be between 1.4-22 kW',
    monthlyDistance: 'Monthly distance must be between 50-25000 km'
  }
  
  return messages[field] || 'Please enter a valid value'
}
