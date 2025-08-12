export function formatCurrency(amount) {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(Math.abs(amount)).replace('₹', '₹')
}

export function formatTime(hours) {
  const h = Math.floor(hours)
  const m = Math.round((hours - h) * 60)
  if (h === 0) return `${m} min`
  if (m === 0) return `${h} hr`
  return `${h} hr ${m} min`
}

export function formatNumber(number, decimals = 2) {
  return Number(number).toFixed(decimals)
}

export function formatPercentage(number, decimals = 1) {
  return `${Number(number).toFixed(decimals)}%`
}
