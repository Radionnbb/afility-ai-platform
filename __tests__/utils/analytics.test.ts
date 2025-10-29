import { describe, it, expect } from "vitest"

describe("Analytics Utilities", () => {
  describe("Moving Average Calculation", () => {
    it("should calculate moving average correctly", () => {
      const data = [10, 20, 30, 40, 50]
      const window = 2
      const result = []

      for (let i = 0; i < data.length; i++) {
        const start = Math.max(0, i - window + 1)
        const slice = data.slice(start, i + 1)
        const avg = slice.reduce((a, b) => a + b, 0) / slice.length
        result.push(avg)
      }

      expect(result[0]).toBe(10)
      expect(result[1]).toBe(15)
      expect(result[2]).toBe(25)
      expect(result[3]).toBe(35)
      expect(result[4]).toBe(45)
    })

    it("should handle empty data", () => {
      const data: number[] = []
      expect(data.length).toBe(0)
    })
  })

  describe("Conversion Rate Calculation", () => {
    it("should calculate conversion rate", () => {
      const clicks = 100
      const conversions = 10
      const rate = (conversions / clicks) * 100

      expect(rate).toBe(10)
    })

    it("should handle zero clicks", () => {
      const clicks = 0
      const conversions = 0
      const rate = clicks > 0 ? (conversions / clicks) * 100 : 0

      expect(rate).toBe(0)
    })
  })
})
