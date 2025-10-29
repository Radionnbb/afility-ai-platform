// Tests for Manus API integration
import { describe, it, expect, vi, beforeEach } from "vitest"
import { fetchManusProduct } from "@/lib/integrations/manus"

describe("Manus Integration", () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it("should fetch product data from Manus API", async () => {
    const mockUrl = "https://example.com/product"

    // Mock fetch
    global.fetch = vi.fn().mockResolvedValueOnce({
      ok: true,
      json: async () => ({
        title: "Test Product",
        price: 99.99,
        image: "https://example.com/image.jpg",
        description: "Test description",
        rating: 4.5,
        reviews: 100,
        store: "Test Store",
      }),
    })

    const result = await fetchManusProduct(mockUrl)

    expect(result.success).toBe(true)
    expect(result.product?.title).toBe("Test Product")
    expect(result.product?.price).toBe(99.99)
  })

  it("should handle API errors gracefully", async () => {
    const mockUrl = "https://example.com/product"

    global.fetch = vi.fn().mockResolvedValueOnce({
      ok: false,
      status: 500,
    })

    const result = await fetchManusProduct(mockUrl)

    expect(result.success).toBe(false)
    expect(result.error).toBeDefined()
  })

  it("should handle missing API key", async () => {
    const mockUrl = "https://example.com/product"
    process.env.MANUS_API_KEY = ""

    const result = await fetchManusProduct(mockUrl)

    expect(result.success).toBe(false)
    expect(result.error).toContain("not configured")
  })
})
