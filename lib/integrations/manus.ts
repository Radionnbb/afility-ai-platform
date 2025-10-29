// Manus API Integration for product analysis
interface ManusProductData {
  title: string
  price: number
  image: string
  description: string
  rating: number
  reviews: number
  store: string
  url: string
}

interface ManusAnalysisResult {
  success: boolean
  product?: ManusProductData
  error?: string
}

export async function fetchManusProduct(url: string): Promise<ManusAnalysisResult> {
  try {
    const manusApiKey = process.env.MANUS_API_KEY
    if (!manusApiKey) {
      console.error("[v0] MANUS_API_KEY not configured")
      return { success: false, error: "Manus API key not configured" }
    }

    // Manus API endpoint for product extraction
    const response = await fetch("https://api.manus.ai/extract", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${manusApiKey}`,
      },
      body: JSON.stringify({ url }),
    })

    if (!response.ok) {
      console.error("[v0] Manus API error:", response.status)
      return { success: false, error: `Manus API error: ${response.status}` }
    }

    const data = await response.json()

    return {
      success: true,
      product: {
        title: data.title || "Product",
        price: data.price || 0,
        image: data.image || "/placeholder.svg",
        description: data.description || "",
        rating: data.rating || 0,
        reviews: data.reviews || 0,
        store: data.store || "Unknown Store",
        url: url,
      },
    }
  } catch (error) {
    console.error("[v0] Manus integration error:", error)
    return { success: false, error: "Failed to fetch from Manus" }
  }
}

export async function analyzeProductWithManus(url: string) {
  const result = await fetchManusProduct(url)
  if (!result.success) {
    return null
  }
  return result.product
}
