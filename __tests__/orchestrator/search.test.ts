// Tests for search orchestrator
import { describe, it, expect, vi, beforeEach } from "vitest"
import { orchestrateSearch } from "@/lib/search-orchestrator"

describe("Search Orchestrator", () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it("should orchestrate text search", async () => {
    const result = await orchestrateSearch({
      type: "text",
      query: "laptop",
    })

    expect(result).toBeDefined()
    expect(result.id).toBeDefined()
    expect(result.query).toBe("laptop")
    expect(result.timestamp).toBeDefined()
  })

  it("should handle URL search", async () => {
    const result = await orchestrateSearch({
      type: "url",
      url: "https://example.com/product",
    })

    expect(result).toBeDefined()
    expect(result.id).toBeDefined()
  })

  it("should include alternatives in results", async () => {
    const result = await orchestrateSearch({
      type: "text",
      query: "test product",
    })

    expect(result.alternatives).toBeDefined()
    expect(Array.isArray(result.alternatives)).toBe(true)
  })

  it("should find cheapest option", async () => {
    const result = await orchestrateSearch({
      type: "text",
      query: "test",
    })

    expect(result.cheapestOption).toBeDefined()
  })
})
