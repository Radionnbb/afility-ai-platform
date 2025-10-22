import { type NextRequest, NextResponse } from "next/server"
import { analyzeUrlWithGemini } from "@/lib/real-ai-services"

export async function POST(request: NextRequest) {
  try {
    const { url } = await request.json()

    if (!url) {
      return NextResponse.json({ success: false, message: "No URL provided" }, { status: 400 })
    }

    // Analyze URL with Gemini
    const analysis = await analyzeUrlWithGemini(url)

    return NextResponse.json({
      success: true,
      data: {
        productName: analysis.productName || "Product from URL",
        description: analysis.description || "Product description extracted from URL",
        price: analysis.price || "Price not available",
        category: analysis.category || "General",
        features: analysis.features || [],
        store: analysis.store || "Unknown Store",
        availability: analysis.availability || "Check website",
      },
    })
  } catch (error) {
    console.error("URL Analysis Error:", error)
    return NextResponse.json({ success: false, message: "URL analysis failed" }, { status: 500 })
  }
}

export async function GET() {
  return NextResponse.json({
    message: "URL Analysis API is working",
    endpoints: {
      POST: "Analyze product URLs and extract information",
    },
  })
}
