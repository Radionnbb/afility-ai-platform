// Enhanced search API using orchestrator
import { type NextRequest, NextResponse } from "next/server"
import { orchestrateSearch } from "@/lib/search-orchestrator"
import { checkRateLimit } from "@/lib/security/rate-limiter"
import { sanitizeLogs } from "@/lib/security/sanitize"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { query, type, imageData, url, userId } = body

    // Rate limiting
    if (userId && !checkRateLimit(userId, 10, 60000)) {
      return NextResponse.json(
        { success: false, message: "Rate limit exceeded. Maximum 10 searches per minute." },
        { status: 429 },
      )
    }

    // Validate input
    if (!type || !["text", "url", "image"].includes(type)) {
      return NextResponse.json({ success: false, message: "Invalid search type" }, { status: 400 })
    }

    if (type === "text" && !query) {
      return NextResponse.json({ success: false, message: "Query required for text search" }, { status: 400 })
    }

    if (type === "url" && !url) {
      return NextResponse.json({ success: false, message: "URL required for URL search" }, { status: 400 })
    }

    // Execute search
    const result = await orchestrateSearch({
      query,
      url,
      imageData,
      type,
    })

    return NextResponse.json({
      success: true,
      data: result,
    })
  } catch (error) {
    console.error("[v0] Search API error:", sanitizeLogs(error))
    return NextResponse.json({ success: false, message: "Search failed", error: String(error) }, { status: 500 })
  }
}

export async function GET() {
  return NextResponse.json({
    message: "Search Orchestrator API",
    endpoints: {
      POST: "Execute orchestrated search with text, image, or URL",
    },
  })
}
