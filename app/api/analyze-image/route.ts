import { type NextRequest, NextResponse } from "next/server"
import { analyzeImageWithGemini } from "@/lib/real-ai-services"

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const image = formData.get("image") as File

    if (!image) {
      return NextResponse.json({ success: false, message: "No image provided" }, { status: 400 })
    }

    // Convert image to base64
    const bytes = await image.arrayBuffer()
    const buffer = Buffer.from(bytes)
    const base64Image = buffer.toString("base64")

    // Analyze image with Gemini Vision
    const analysis = await analyzeImageWithGemini(base64Image)

    return NextResponse.json({
      success: true,
      data: {
        productName: analysis.productName || "Unknown Product",
        description: analysis.description || "Product description not available",
        category: analysis.category || "General",
        estimatedPrice: analysis.estimatedPrice || "Price not available",
        features: analysis.features || [],
        confidence: analysis.confidence || 0.8,
      },
    })
  } catch (error) {
    console.error("Image Analysis Error:", error)
    return NextResponse.json({ success: false, message: "Image analysis failed" }, { status: 500 })
  }
}

export async function GET() {
  return NextResponse.json({
    message: "Image Analysis API is working",
    endpoints: {
      POST: "Analyze product images using Gemini Vision AI",
    },
  })
}
