import { formatCurrency, formatTime } from '../utils/formatters.js'
import feather from 'feather-icons'

export class SummaryDashboard {
  constructor() {
    this.summaryCardsElement = document.getElementById('summaryCards')
    this.chargingFrequencyElement = document.getElementById('chargingFrequency')
    this.chargingOptionsComparisonElement = document.getElementById('chargingOptionsComparison')
  }

  update(calculations) {
    this.updateSummaryCards(calculations)
    this.updateChargingFrequency(calculations)
    this.updateChargingOptionsComparison(calculations)
  }

  updateSummaryCards(calculations) {
    if (!this.summaryCardsElement) return
    
    // Calculate key metrics using Home AC as baseline (most common)
    const homeACCostPerKm = calculations.inputs.homeAC / calculations.wallToWheel20to80
    const homeACMonthlySavings = (calculations.inputs.iceRunningCost - homeACCostPerKm) * calculations.inputs.monthlyDistance
    const homeACAnnualSavings = homeACMonthlySavings * 12
    const monthlyChargingCost = (calculations.inputs.monthlyDistance / calculations.wallToWheel20to80) * calculations.inputs.homeAC
    const monthlyChargingTime = (calculations.inputs.monthlyDistance / calculations.wallToWheel20to80) / calculations.inputs.homeACSpeed

    this.summaryCardsElement.innerHTML = `
      <!-- Monthly Savings (Home AC) -->
      <div class="bg-gradient-to-br from-green-50 to-emerald-50 border border-green-200 rounded-lg p-6">
        <div class="flex items-center justify-between mb-3">
          <div class="flex items-center">
            <i data-feather="trending-up" class="h-8 w-8 text-green-600"></i>
          </div>
          <span class="text-xs font-medium text-green-700 bg-green-100 px-2 py-1 rounded-full">Home AC</span>
        </div>
        <div class="text-2xl font-bold text-green-900 mb-1">${formatCurrency(homeACMonthlySavings)}</div>
        <div class="text-sm text-green-700 mb-2">Monthly Savings vs ICE</div>
        <div class="text-xs text-green-600">Using Home AC Charging</div>
      </div>

      <!-- Monthly Charging Cost -->
      <div class="bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-200 rounded-lg p-6">
        <div class="flex items-center justify-between mb-3">
          <div class="flex items-center">
            <i data-feather="dollar-sign" class="h-8 w-8 text-blue-600"></i>
          </div>
          <span class="text-xs font-medium text-blue-700 bg-blue-100 px-2 py-1 rounded-full">Home AC</span>
        </div>
        <div class="text-2xl font-bold text-blue-900 mb-1">${formatCurrency(monthlyChargingCost)}</div>
        <div class="text-sm text-blue-700 mb-2">Monthly Charging Cost</div>
        <div class="text-xs text-blue-600">${calculations.inputs.monthlyDistance} km @ ₹${calculations.inputs.homeAC}/kWh</div>
      </div>

      <!-- Annual Savings -->
      <div class="bg-gradient-to-br from-purple-50 to-violet-50 border border-purple-200 rounded-lg p-6">
        <div class="flex items-center justify-between mb-3">
          <div class="flex items-center">
            <i data-feather="calendar" class="h-8 w-8 text-purple-600"></i>
          </div>
          <span class="text-xs font-medium text-purple-700 bg-purple-100 px-2 py-1 rounded-full">Annual</span>
        </div>
        <div class="text-2xl font-bold text-purple-900 mb-1">${formatCurrency(homeACAnnualSavings)}</div>
        <div class="text-sm text-purple-700 mb-2">Annual Savings Potential</div>
        <div class="text-xs text-purple-600">Home AC charging</div>
      </div>

      <!-- Monthly Charging Time -->
      <div class="bg-gradient-to-br from-orange-50 to-red-50 border border-orange-200 rounded-lg p-6">
        <div class="flex items-center justify-between mb-3">
          <div class="flex items-center">
            <i data-feather="clock" class="h-8 w-8 text-orange-600"></i>
          </div>
          <span class="text-xs font-medium text-orange-700 bg-orange-100 px-2 py-1 rounded-full">Time</span>
        </div>
        <div class="text-2xl font-bold text-orange-900 mb-1">${formatTime(monthlyChargingTime)}</div>
        <div class="text-sm text-orange-700 mb-2">Monthly Charging Time</div>
        <div class="text-xs text-orange-600">Home AC charging needed</div>
      </div>
    `

    feather.replace()
  }

  updateChargingFrequency(calculations) {
    if (!this.chargingFrequencyElement) return
    
    // Calculate charging frequency based on 20-80% optimal range
    const optimalRange = calculations.range20to80
    const dailyKm = calculations.inputs.monthlyDistance / 30
    const daysPerCharge = Math.floor(optimalRange / dailyKm)
    const chargesPerMonth = Math.ceil(30 / daysPerCharge)
    
    // Calculate charging times for optimal 20-80% cycle
    const optimalChargingTimeHomeAC = calculations.chargingTimes.homeAC.partial
    const optimalChargingTimeFastDC = calculations.chargingTimes.dcFast.partial
    
    // Calculate when to charge before hitting 20%
    const totalRange = calculations.range0to100
    const twentyPercentRange = totalRange * 0.2
    const usableRangeBeforeCharging = totalRange - twentyPercentRange
    const daysBeforeCharging = Math.floor(usableRangeBeforeCharging / dailyKm)

    this.chargingFrequencyElement.innerHTML = `
      <!-- Optimal Charging Frequency -->
      <div class="bg-white border border-blue-300 rounded-lg p-4">
        <h4 class="font-semibold text-blue-900 mb-3 flex items-center">
          <i data-feather="battery" class="h-5 w-5 mr-2 text-blue-600"></i>
          Optimal Charging Pattern (20-80%)
        </h4>
        <div class="space-y-3">
          <div class="flex justify-between items-center">
            <span class="text-sm text-gray-700">Charge every:</span>
            <span class="font-semibold text-blue-600">${daysPerCharge} days <span class="text-xs text-gray-500 font-normal">(${formatTime(optimalChargingTimeHomeAC)} per charge)</span></span>
          </div>
          <div class="flex justify-between items-center">
            <span class="text-sm text-gray-700">Monthly charges needed:</span>
            <span class="font-semibold text-blue-600">${chargesPerMonth} times</span>
          </div>
          <div class="flex justify-between items-center">
            <span class="text-sm text-gray-700">Range per charge:</span>
            <span class="font-semibold text-blue-600">${Math.round(optimalRange)} km</span>
          </div>
          <div class="text-xs text-blue-600 bg-blue-50 p-2 rounded">
            💡 Optimal for battery longevity and efficiency
          </div>
        </div>
      </div>

      <!-- Charging Recommendations -->
      <div class="bg-white border border-amber-300 rounded-lg p-4">
        <h4 class="font-semibold text-amber-900 mb-3 flex items-center">
          <i data-feather="alert-circle" class="h-5 w-5 mr-2 text-amber-600"></i>
          Charging Recommendations
        </h4>
        <div class="space-y-3">
          <div class="flex justify-between items-center">
            <span class="text-sm text-gray-700">Charge before reaching:</span>
            <span class="font-semibold text-amber-600">20% SOC</span>
          </div>
          <div class="flex justify-between items-center">
            <span class="text-sm text-gray-700">Maximum days without charging:</span>
            <span class="font-semibold text-amber-600">${daysBeforeCharging} days</span>
          </div>
          <div class="flex justify-between items-center">
            <span class="text-sm text-gray-700">Usable range before 20%:</span>
            <span class="font-semibold text-amber-600">${Math.round(usableRangeBeforeCharging)} km</span>
          </div>
          <div class="text-xs text-amber-700 bg-amber-50 p-2 rounded">
            ⚠️ Avoid going below 20% regularly to preserve battery health
          </div>
        </div>
      </div>
    `

    feather.replace()
  }

  updateChargingOptionsComparison(calculations) {
    if (!this.chargingOptionsComparisonElement) return
    
    const chargingOptions = [
      { 
        name: 'Home AC Solar', 
        rate: calculations.inputs.homeACSolar, 
        icon: 'sun', 
        color: 'text-yellow-500',
        bgColor: 'from-yellow-50 to-orange-50',
        borderColor: 'border-yellow-200'
      },
      { 
        name: 'Home AC Grid', 
        rate: calculations.inputs.homeAC, 
        icon: 'home', 
        color: 'text-green-500',
        bgColor: 'from-green-50 to-emerald-50',
        borderColor: 'border-green-200'
      },
      { 
        name: 'Fast DC Day', 
        rate: calculations.inputs.fastDCDay, 
        icon: 'zap', 
        color: 'text-blue-500',
        bgColor: 'from-blue-50 to-indigo-50',
        borderColor: 'border-blue-200'
      },
      { 
        name: 'Fast DC Night', 
        rate: calculations.inputs.fastDCNight, 
        icon: 'moon', 
        color: 'text-purple-500',
        bgColor: 'from-purple-50 to-violet-50',
        borderColor: 'border-purple-200'
      }
    ]

    const cards = chargingOptions.map(option => {
      const costPerKm = option.rate / calculations.wallToWheel20to80
      const monthlyCost = (calculations.inputs.monthlyDistance / calculations.wallToWheel20to80) * option.rate
      const monthlySavings = (calculations.inputs.iceRunningCost - costPerKm) * calculations.inputs.monthlyDistance
      const savingsColor = monthlySavings > 0 ? 'text-green-600' : 'text-red-600'

      // Calculate charging times based on option type
      let perChargeTime, monthlyTime
      if (option.name.includes('Fast DC')) {
        perChargeTime = calculations.chargingTimes.dcFast.partial // 20-80% optimal charge
        monthlyTime = (calculations.inputs.monthlyDistance / calculations.wallToWheel20to80) / calculations.inputs.fastDCSpeed
      } else {
        perChargeTime = calculations.chargingTimes.homeAC.partial // 20-80% optimal charge
        monthlyTime = (calculations.inputs.monthlyDistance / calculations.wallToWheel20to80) / calculations.inputs.homeACSpeed
      }

      return `
        <div class="bg-gradient-to-br ${option.bgColor} border ${option.borderColor} rounded-lg p-4">
          <div class="flex items-center justify-between mb-3">
            <i data-feather="${option.icon}" class="h-6 w-6 ${option.color}"></i>
            <span class="text-xs font-medium px-2 py-1 rounded-full bg-white bg-opacity-70">₹${option.rate}/kWh</span>
          </div>
          <h4 class="font-semibold text-gray-900 mb-3">${option.name}</h4>
          <div class="space-y-2">
            <div class="flex justify-between items-center">
              <span class="text-xs text-gray-600">Cost/km:</span>
              <span class="text-sm font-medium">₹${costPerKm.toFixed(2)}</span>
            </div>
            <div class="flex justify-between items-center">
              <span class="text-xs text-gray-600">Monthly cost:</span>
              <span class="text-sm font-medium">${formatCurrency(monthlyCost)}</span>
            </div>
            <div class="flex justify-between items-center">
              <span class="text-xs text-gray-600">Per charge time:</span>
              <span class="text-sm font-medium">${formatTime(perChargeTime)}</span>
            </div>
            <div class="flex justify-between items-center">
              <span class="text-xs text-gray-600">Monthly time:</span>
              <span class="text-sm font-medium">${formatTime(monthlyTime)}</span>
            </div>
            <div class="flex justify-between items-center">
              <span class="text-xs text-gray-600">Monthly savings:</span>
              <span class="text-sm font-semibold ${savingsColor}">${formatCurrency(monthlySavings)}</span>
            </div>
          </div>
        </div>
      `
    }).join('')

    this.chargingOptionsComparisonElement.innerHTML = cards
    feather.replace()
  }
}
