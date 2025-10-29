// Tests for OpenAI integration
import { describe, it, expect, vi, beforeEach } from "vitest"
import { analyzeProductWithOpenAI } from "@/lib/integrations/openai-analysis"

describe("OpenAI Integration", () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it("should analyze product with OpenAI", async () => {
    const product = {
      title: "Test Product",
      description: "A great product",
      price: 99.99,
      store: "Test Store",
    }

    global.fetch = vi.fn().mockResolvedValueOnce({
      ok: true,
      json: async () => ({
        choices: [
          {
            message: {
              content: JSON.stringify({
                summary: "Great product",
                pros: ["Good quality", "Affordable"],
                cons: ["Limited warranty"],
                alternatives: ["Alternative 1"],
                recommendation: "Recommended",
              }),
            },
          },
        ],
      }),
    })

    const result = await analyzeProductWithOpenAI(product)

    expect(result).toBeDefined()
    expect(result?.summary).toBe("Great product")
    expect(result?.pros).toContain("Good quality")
  })

  it("should handle missing API key", async () => {
    process.env.OPENAI_API_KEY = ""

    const product = {
      title: "Test",
      description: "Test",
      price: 99.99,
      store: "Test",
    }

    const result = await analyzeProductWithOpenAI(product)

    expect(result).toBeNull()
  })
})
