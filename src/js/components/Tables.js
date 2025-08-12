import { formatCurrency, formatTime } from '../utils/formatters.js'
import feather from 'feather-icons'

export class Tables {
  constructor() {
    this.specsTableBody = document.getElementById('specsTableBody')
    this.costsTableBody = document.getElementById('costsTableBody')
    this.timeTableBody = document.getElementById('timeTableBody')
    this.comparisonTableBody = document.getElementById('comparisonTableBody')
  }

  update(calculations) {
    this.updateSpecsTable(calculations)
    this.updateCostsTable(calculations)
    this.updateTimeTable(calculations)
    this.updateComparisonTable(calculations)
  }

  updateSpecsTable(calculations) {
    if (!this.specsTableBody) return

    this.specsTableBody.innerHTML = `
      <tr class="table-row-hover">
        <td class="px-6 py-4 whitespace-nowrap text-sm font-semibold text-gray-900">Battery Capacity (Nominal)</td>
        <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900 text-center">${calculations.batteryCapacity} kWh</td>
        <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900 text-center">${calculations.batteryCapacity} kWh</td>
      </tr>
      <tr class="table-row-hover">
        <td class="px-6 py-4 whitespace-nowrap text-sm font-semibold text-gray-900">Selected Battery Chemistry</td>
        <td class="px-6 py-4 whitespace-nowrap text-sm text-purple-600 text-center font-medium" colspan="2">${calculations.selectedChemistry} - ${calculations.chemistryData.name.split(' - ')[1]}</td>
      </tr>
      <tr class="table-row-hover">
        <td class="px-6 py-4 whitespace-nowrap text-sm font-semibold text-gray-900">SOC Range Used</td>
        <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900 text-center">100% (0–100%)</td>
        <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900 text-center">60% (20–80%)</td>
      </tr>
      <tr class="table-row-hover">
        <td class="px-6 py-4 whitespace-nowrap text-sm font-semibold text-gray-900">Effective Charging Efficiency</td>
        <td class="px-6 py-4 whitespace-nowrap text-sm text-green-600 text-center font-medium">${calculations.efficiency0to100.toFixed(1)}%</td>
        <td class="px-6 py-4 whitespace-nowrap text-sm text-green-600 text-center font-medium">${calculations.efficiency20to80.toFixed(1)}%</td>
      </tr>
      <tr class="table-row-hover">
        <td class="px-6 py-4 whitespace-nowrap text-sm font-semibold text-gray-900">Energy Drawn from Wall (kWh)</td>
        <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900 text-center">${calculations.energyDrawn0to100.toFixed(1)} kWh</td>
        <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900 text-center">${calculations.energyDrawn20to80.toFixed(1)} kWh</td>
      </tr>
      <tr class="table-row-hover">
        <td class="px-6 py-4 whitespace-nowrap text-sm font-semibold text-gray-900">Wall-to-Wheel Efficiency (km/kWh)</td>
        <td class="px-6 py-4 whitespace-nowrap text-sm text-blue-600 text-center font-medium">${calculations.wallToWheel0to100.toFixed(2)}</td>
        <td class="px-6 py-4 whitespace-nowrap text-sm text-blue-600 text-center font-medium">${calculations.wallToWheel20to80.toFixed(2)}</td>
      </tr>
      <tr class="table-row-hover">
        <td class="px-6 py-4 whitespace-nowrap text-sm font-semibold text-gray-900">Estimated Range per Cycle (km)</td>
        <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900 text-center">${Math.round(calculations.range0to100)} km</td>
        <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900 text-center">${Math.round(calculations.range20to80)} km</td>
      </tr>
    `
  }

  updateCostsTable(calculations) {
    if (!this.costsTableBody) return

    const chargingTypes = [
      { name: 'Fast DC Night (60kW)', rate: calculations.inputs.fastDCNight, icon: 'moon' },
      { name: 'Fast DC Day (60kW)', rate: calculations.inputs.fastDCDay, icon: 'sun' },
      { name: 'Fast DC (30kW)', rate: calculations.inputs.fastDCDay, icon: 'zap' },
      { name: 'Home AC (7.2kW)', rate: calculations.inputs.homeAC, icon: 'home' },
      { name: 'Home AC Solar (7.2kW)', rate: calculations.inputs.homeACSolar, icon: 'sun' }
    ]

    const rows = chargingTypes.map((charging, index) => {
      const cost0to100 = calculations.energyDrawn0to100 * charging.rate
      const cost20to80 = calculations.energyDrawn20to80 * charging.rate
      const costPerKm0to100 = charging.rate / calculations.wallToWheel0to100
      const costPerKm20to80 = charging.rate / calculations.wallToWheel20to80
      
      // Calculate monthly charging cost based on usage (using optimal 20-80% efficiency)
      const monthlyCost = (calculations.inputs.monthlyDistance / calculations.wallToWheel20to80) * charging.rate

      return `
        <tr class="table-row-hover">
          <td class="px-6 py-4 whitespace-nowrap text-sm font-semibold text-gray-900">
            <div class="flex items-center">
              <i data-feather="${charging.icon}" class="h-4 w-4 mr-2 text-gray-500"></i>
              ${charging.name}
            </div>
          </td>
          <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900 text-center font-medium">₹${charging.rate.toFixed(1)}</td>
          <td class="px-6 py-4 whitespace-nowrap text-sm text-center">
            <span class="text-green-600 font-semibold">${formatCurrency(cost0to100)}</span>
            <div class="text-purple-600 text-xs mt-1">(₹${costPerKm0to100.toFixed(2)}/km)</div>
          </td>
          <td class="px-6 py-4 whitespace-nowrap text-sm text-center">
            <span class="text-green-600 font-semibold">${formatCurrency(cost20to80)}</span>
            <div class="text-purple-600 text-xs mt-1">(₹${costPerKm20to80.toFixed(2)}/km)</div>
          </td>
          <td class="px-6 py-4 whitespace-nowrap text-sm text-center">
            <span class="text-orange-600 font-semibold">${formatCurrency(monthlyCost)}</span>
            <div class="text-xs text-gray-500 mt-1">(${calculations.inputs.monthlyDistance} km/month)</div>
          </td>
        </tr>
      `
    }).join('')

    this.costsTableBody.innerHTML = rows
    feather.replace()
  }

  updateTimeTable(calculations) {
    if (!this.timeTableBody) return
    
    // Calculate daily and weekly usage-based charging times
    const dailyKm = calculations.inputs.monthlyDistance / 30
    const weeklyKm = calculations.inputs.monthlyDistance / 4.33
    
    // Calculate energy needed for daily and weekly usage
    const dailyEnergyNeeded = dailyKm / calculations.wallToWheel20to80
    const weeklyEnergyNeeded = weeklyKm / calculations.wallToWheel20to80
    
    const chargerTypes = [
      { name: `${calculations.inputs.fastDCSpeed} kW DC Fast Charger`, power: calculations.inputs.fastDCSpeed, icon: 'zap', color: 'text-yellow-500', type: 'dcFast' },
      { name: '30 kW DC Fast Charger', power: 30, icon: 'battery-charging', color: 'text-orange-500', type: 'dc30kW' },
      { name: `${calculations.inputs.homeACSpeed} kW Home AC Charger`, power: calculations.inputs.homeACSpeed, icon: 'home', color: 'text-green-500', type: 'homeAC' }
    ]

    const rows = chargerTypes.map(charger => {
      const dailyTime = dailyEnergyNeeded / charger.power
      const weeklyTime = weeklyEnergyNeeded / charger.power
      
      // Get the corresponding charging times from calculations
      const fullTime = calculations.chargingTimes[charger.type].full
      const partialTime = calculations.chargingTimes[charger.type].partial

      return `
        <tr class="table-row-hover">
          <td class="px-6 py-4 whitespace-nowrap text-sm font-semibold text-gray-900">
            <div class="flex items-center">
              <i data-feather="${charger.icon}" class="h-4 w-4 mr-2 ${charger.color}"></i>
              ${charger.name}
            </div>
          </td>
          <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900 text-center">~${formatTime(fullTime)}</td>
          <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900 text-center">~${formatTime(partialTime)}</td>
          <td class="px-6 py-4 whitespace-nowrap text-sm text-center">
            <span class="text-blue-600 font-medium">~${formatTime(dailyTime)}</span>
            <div class="text-xs text-gray-500 mt-1">(${dailyKm.toFixed(0)} km/day)</div>
          </td>
          <td class="px-6 py-4 whitespace-nowrap text-sm text-center">
            <span class="text-purple-600 font-medium">~${formatTime(weeklyTime)}</span>
            <div class="text-xs text-gray-500 mt-1">(${weeklyKm.toFixed(0)} km/week)</div>
          </td>
        </tr>
      `
    }).join('')

    this.timeTableBody.innerHTML = rows
    feather.replace()
  }

  updateComparisonTable(calculations) {
    if (!this.comparisonTableBody) return

    const chargingTypes = [
      { name: 'Fast DC Night', rate: calculations.inputs.fastDCNight, icon: 'moon' },
      { name: 'Fast DC Day', rate: calculations.inputs.fastDCDay, icon: 'sun' },
      { name: 'Home AC', rate: calculations.inputs.homeAC, icon: 'home' },
      { name: 'Home AC Solar', rate: calculations.inputs.homeACSolar, icon: 'sun' }
    ]

    const rows = chargingTypes.map((charging) => {
      // Average cost per km (mix of 0-100% and 20-80%)
      const evCostPerKm = (charging.rate / calculations.wallToWheel20to80 + charging.rate / calculations.wallToWheel0to100) / 2
      const savingsPerKm = calculations.inputs.iceRunningCost - evCostPerKm
      const monthlySavings = savingsPerKm * calculations.inputs.monthlyDistance
      const annualSavings = monthlySavings * 12

      const savingsClass = savingsPerKm > 0 ? 'text-green-600' : 'text-red-600'

      return `
        <tr class="table-row-hover">
          <td class="px-6 py-4 whitespace-nowrap text-sm font-semibold text-gray-900">
            <div class="flex items-center">
              <i data-feather="${charging.icon}" class="h-4 w-4 mr-2 text-gray-500"></i>
              ${charging.name}
            </div>
          </td>
          <td class="px-6 py-4 whitespace-nowrap text-sm text-center font-medium text-green-600">₹${evCostPerKm.toFixed(2)}</td>
          <td class="px-6 py-4 whitespace-nowrap text-sm text-center text-gray-900">₹${calculations.inputs.iceRunningCost.toFixed(2)}</td>
          <td class="px-6 py-4 whitespace-nowrap text-sm text-center font-semibold ${savingsClass}">₹${savingsPerKm.toFixed(2)}</td>
          <td class="px-6 py-4 whitespace-nowrap text-sm text-center font-semibold ${savingsClass}">${formatCurrency(monthlySavings)}</td>
          <td class="px-6 py-4 whitespace-nowrap text-sm text-center font-semibold ${savingsClass}">${formatCurrency(annualSavings)}</td>
        </tr>
      `
    }).join('')

    this.comparisonTableBody.innerHTML = rows
    feather.replace()
  }
}
