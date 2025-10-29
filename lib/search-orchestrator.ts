// Search Orchestrator - Main logic for coordinating all integrations
import { fetchManusProduct } from "./integrations/manus"
import { searchAdmitadProducts, generateAffiliateLink } from "./integrations/admitad"
import { analyzeProductWithOpenAI } from "./integrations/openai-analysis"

export interface SearchResult {
  id: string
  query: string
  originalProduct: any
  alternatives: any[]
  analysis: any
  cheapestOption: any
  affiliateLinks: any[]
  timestamp: string
}

export async function orchestrateSearch(input: {
  query?: string
  url?: string
  imageData?: string
  type: "text" | "url" | "image"
}): Promise<SearchResult> {
  const startTime = Date.now()
  const searchId = `search-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`

  try {
    console.log("[v0] Starting search orchestration:", { searchId, type: input.type })

    let originalProduct: any = null
    let searchQuery = input.query || ""

    // Step 1: Extract product information based on input type
    if (input.type === "url" && input.url) {
      console.log("[v0] Fetching product from URL via Manus")
      const manusResult = await fetchManusProduct(input.url)
      if (manusResult.success && manusResult.product) {
        originalProduct = manusResult.product
        searchQuery = manusResult.product.title
      }
    } else if (input.type === "text" && input.query) {
      searchQuery = input.query
      originalProduct = {
        title: input.query,
        description: `Search for: ${input.query}`,
        price: 0,
        store: "Search Query",
      }
    }

    // Step 2: Search for alternatives via Admitad
    console.log("[v0] Searching for alternatives via Admitad")
    const admitadResult = await searchAdmitadProducts(searchQuery)
    const alternatives = admitadResult.success ? admitadResult.products || [] : []

    // Step 3: Analyze with OpenAI
    console.log("[v0] Analyzing products with OpenAI")
    const analysis = originalProduct ? await analyzeProductWithOpenAI(originalProduct) : null

    // Step 4: Find cheapest option
    const allProducts = originalProduct ? [originalProduct, ...alternatives] : alternatives
    const cheapestOption = allProducts.reduce((prev, current) =>
      (current.price || Number.POSITIVE_INFINITY) < (prev.price || Number.POSITIVE_INFINITY) ? current : prev,
    )

    // Step 5: Generate affiliate links
    console.log("[v0] Generating affiliate links")
    const affiliateLinks = await Promise.all(
      allProducts.map(async (product) => ({
        store: product.store,
        originalUrl: product.url,
        affiliateUrl: await generateAffiliateLink(product.store, product.url),
      })),
    )

    const result: SearchResult = {
      id: searchId,
      query: searchQuery,
      originalProduct,
      alternatives,
      analysis,
      cheapestOption,
      affiliateLinks,
      timestamp: new Date().toISOString(),
    }

    console.log("[v0] Search completed in", Date.now() - startTime, "ms")
    return result
  } catch (error) {
    console.error("[v0] Search orchestration error:", error)
    throw error
  }
}

export async function getSearchProgress(searchId: string): Promise<{
  status: "pending" | "analyzing" | "searching" | "comparing" | "complete"
  progress: number
  message: string
}> {
  // This would be implemented with a real progress tracking system
  // For now, returning mock progress
  return {
    status: "complete",
    progress: 100,
    message: "Search completed",
  }
}
