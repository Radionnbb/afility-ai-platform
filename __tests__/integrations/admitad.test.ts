// Tests for Admitad API integration
import { describe, it, expect, vi, beforeEach } from "vitest"
import { searchAdmitadProducts, generateAffiliateLink } from "@/lib/integrations/admitad"

describe("Admitad Integration", () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it("should search for products on Admitad", async () => {
    const query = "laptop"

    global.fetch = vi
      .fn()
      .mockResolvedValueOnce({
        ok: true,
        json: async () => ({
          access_token: "test_token",
        }),
      })
      .mockResolvedValueOnce({
        ok: true,
        json: async () => ({
          results: [
            {
              id: "1",
              name: "Test Laptop",
              price: 999.99,
              image: "https://example.com/laptop.jpg",
              shop_name: "Test Shop",
              deeplink: "https://example.com/deeplink",
              commission: 5.0,
            },
          ],
        }),
      })

    const result = await searchAdmitadProducts(query)

    expect(result.success).toBe(true)
    expect(result.products).toHaveLength(1)
    expect(result.products?.[0].title).toBe("Test Laptop")
  })

  it("should generate Amazon affiliate links", async () => {
    process.env.AMAZON_ASSOCIATE_TAG = "test-tag"

    const url = "https://amazon.com/dp/B123456789"
    const affiliateUrl = await generateAffiliateLink("Amazon", url)

    expect(affiliateUrl).toContain("tag=test-tag")
  })

  it("should handle missing credentials", async () => {
    process.env.ADMITAD_CLIENT_ID = ""

    const result = await searchAdmitadProducts("test")

    expect(result.success).toBe(false)
    expect(result.error).toContain("not configured")
  })
})
