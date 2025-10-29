import { createServerClient } from "@supabase/ssr"
import { cookies } from "next/headers"
import { type NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const days = Number.parseInt(searchParams.get("days") || "30")
    const startDate = new Date(Date.now() - days * 24 * 60 * 60 * 1000).toISOString()

    const cookieStore = await cookies()
    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          getAll() {
            return cookieStore.getAll()
          },
          setAll(cookiesToSet) {
            try {
              cookiesToSet.forEach(({ name, value, options }) => cookieStore.set(name, value, options))
            } catch {
              // Handle cookie setting errors
            }
          },
        },
      },
    )

    // Get authenticated user
    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    // Get daily clicks
    const { data: clicksData } = await supabase
      .from("clicks")
      .select("created_at")
      .eq("user_id", user.id)
      .gte("created_at", startDate)

    // Get daily conversions
    const { data: conversionsData } = await supabase
      .from("transactions")
      .select("created_at, commission_amount")
      .eq("user_id", user.id)
      .eq("status", "confirmed")
      .gte("created_at", startDate)

    // Aggregate by date
    const trends: Record<string, any> = {}

    clicksData?.forEach((click) => {
      const date = new Date(click.created_at).toISOString().split("T")[0]
      if (!trends[date]) {
        trends[date] = { date, clicks: 0, conversions: 0, commission: 0 }
      }
      trends[date].clicks++
    })

    conversionsData?.forEach((conversion) => {
      const date = new Date(conversion.created_at).toISOString().split("T")[0]
      if (!trends[date]) {
        trends[date] = { date, clicks: 0, conversions: 0, commission: 0 }
      }
      trends[date].conversions++
      trends[date].commission += conversion.commission_amount || 0
    })

    const result = Object.values(trends)
      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
      .map((t: any) => ({
        ...t,
        commission: Number.parseFloat(t.commission.toFixed(2)),
      }))

    return NextResponse.json(result)
  } catch (error) {
    console.error("[v0] Analytics trends error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
