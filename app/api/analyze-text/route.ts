import { type NextRequest, NextResponse } from "next/server"
import { analyzeWithGemini } from "@/lib/real-ai-services"

export async function POST(request: NextRequest) {
  try {
    const { text } = await request.json()

    if (!text) {
      return NextResponse.json({ success: false, message: "No text provided" }, { status: 400 })
    }

    // Analyze and improve search text with Gemini
    const analysis = await analyzeWithGemini(`Improve this search query and suggest better keywords: ${text}`)

    return NextResponse.json({
      success: true,
      data: {
        originalQuery: text,
        improvedQuery: analysis.improvedQuery || text,
        suggestions: analysis.suggestions || [text],
        category: analysis.category || "General",
        keywords: analysis.keywords || [text],
        confidence: analysis.confidence || 0.8,
      },
    })
  } catch (error) {
    console.error("Text Analysis Error:", error)
    return NextResponse.json({ success: false, message: "Text analysis failed" }, { status: 500 })
  }
}

export async function GET() {
  return NextResponse.json({
    message: "Text Analysis API is working",
    endpoints: {
      POST: "Analyze and improve search text queries",
    },
  })
}
