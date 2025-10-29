export interface SavingsData {
  saved: string
  percent: string
  originalPrice: number
  cheapestPrice: number
}

export function calculateSavings(originalPrice: number, cheapestPrice: number): SavingsData {
  const saved = originalPrice - cheapestPrice
  const percent = originalPrice > 0 ? (saved / originalPrice) * 100 : 0

  return {
    saved: saved.toFixed(2),
    percent: percent.toFixed(1),
    originalPrice,
    cheapestPrice,
  }
}

export function calculateTotalSavings(searches: Array<{ savings?: number | string }>): number {
  return searches.reduce((total, search) => {
    const savings = Number(search.savings || 0)
    return total + (isNaN(savings) ? 0 : savings)
  }, 0)
}

export function formatSavingsPercentage(percent: number | string): string {
  const num = Number(percent)
  return isNaN(num) ? "0%" : `${num.toFixed(1)}%`
}
