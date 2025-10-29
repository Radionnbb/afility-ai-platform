import { type NextRequest, NextResponse } from "next/server"
import { calculateSavings } from "@/lib/utils/savings"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { query, type, imageData, url } = body

    let searchResults = []
    let productInfo = null

    // Analyze based on search type using OpenAI
    if (type === "text") {
      productInfo = await analyzeWithOpenAI(`Find product information for: ${query}`)
    } else if (type === "image") {
      productInfo = await analyzeWithOpenAI(`Analyze this product image: ${imageData}`)
    } else if (type === "url") {
      productInfo = await analyzeWithOpenAI(`Analyze product from URL: ${url}`)
    }

    // Generate mock search results with 10% discount
    const stores = [
      "Amazon",
      "eBay",
      "AliExpress",
      "Walmart",
      "Best Buy",
      "Target",
      "Newegg",
      "B&H",
      "Costco",
      "Home Depot",
    ]

    searchResults = stores
      .map((store, index) => {
        const basePrice = Math.floor(Math.random() * 500) + 50
        const discountedPrice = Math.floor(basePrice * 0.9) // 10% discount

        return {
          id: `product-${index}`,
          title: query || "Product Alternative",
          store,
          originalPrice: basePrice,
          discountedPrice,
          discount: "10%",
          rating: (Math.random() * 2 + 3).toFixed(1),
          reviews: Math.floor(Math.random() * 1000) + 100,
          image: `/placeholder.svg?height=200&width=200&text=${store}`,
          url: `https://${store.toLowerCase()}.com/product`,
          shipping: Math.random() > 0.5 ? "Free Shipping" : "$5.99 Shipping",
          availability: Math.random() > 0.2 ? "In Stock" : "Limited Stock",
        }
      })
      .sort((a, b) => a.discountedPrice - b.discountedPrice)

    const cheapestProduct = searchResults[0]
    const originalPrice = searchResults[searchResults.length - 1]?.originalPrice || cheapestProduct.originalPrice
    const savingsData = calculateSavings(originalPrice, cheapestProduct.discountedPrice)

    return NextResponse.json({
      success: true,
      data: {
        query: query || "Product Search",
        results: searchResults,
        totalResults: searchResults.length,
        searchType: type,
        savings: {
          amount: savingsData.saved,
          percent: savingsData.percent,
          originalPrice: originalPrice,
          cheapestPrice: cheapestProduct.discountedPrice,
        },
      },
    })
  } catch (error) {
    console.error("Search API Error:", error)
    return NextResponse.json({ success: false, message: "Search failed" }, { status: 500 })
  }
}

async function analyzeWithOpenAI(prompt: string) {
  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "user",
            content: prompt,
          },
        ],
        temperature: 0.7,
      }),
    })

    const data = await response.json()
    const content = data.choices?.[0]?.message?.content || ""

    try {
      return JSON.parse(content)
    } catch {
      return { analysis: content }
    }
  } catch (error) {
    console.error("OpenAI Error:", error)
    return { error: "AI analysis failed" }
  }
}

export async function GET() {
  return NextResponse.json({
    message: "Search API is working",
    endpoints: {
      POST: "Search for products by text, image, or URL",
    },
  })
}
