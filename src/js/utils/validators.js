export function validateInput(field, value) {
  if (isNaN(value) || value <= 0) {
    return false
  }

  // Field-specific validation
  switch (field) {
    case 'batteryCapacity':
      return value >= 10 && value <= 200
    case 'efficiency':
      return value >= 1 && value <= 15
    case 'fastDCNight':
    case 'fastDCDay':
      return value >= 1 && value <= 50
    case 'homeAC':
    case 'homeACSolar':
      return value >= 0 && value <= 30
    case 'iceRunningCost':
      return value >= 5 && value <= 30
    case 'fastDCSpeed':
      return value >= 10 && value <= 350
    case 'homeACSpeed':
      return value >= 1.4 && value <= 22
    case 'monthlyDistance':
      return value >= 500 && value <= 10000
    default:
      return true
  }
}

export function getValidationMessage(field) {
  const messages = {
    batteryCapacity: 'Battery capacity must be between 10-200 kWh',
    efficiency: 'Efficiency must be between 1-15 km/kWh',
    fastDCNight: 'Fast DC night rate must be between 1-50 ₹/kWh',
    fastDCDay: 'Fast DC day rate must be between 1-50 ₹/kWh',
    homeAC: 'Home AC rate must be between 0-30 ₹/kWh',
    homeACSolar: 'Home AC solar rate must be between 0-20 ₹/kWh',
    iceRunningCost: 'ICE running cost must be between 5-30 ₹/km',
    fastDCSpeed: 'Fast DC speed must be between 10-350 kW',
    homeACSpeed: 'Home AC speed must be between 1.4-22 kW',
    monthlyDistance: 'Monthly distance must be between 500-10000 km'
  }
  
  return messages[field] || 'Please enter a valid value'
}
