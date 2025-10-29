import { createServerClient } from "@supabase/ssr"
import { cookies } from "next/headers"
import { type NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const startDate = searchParams.get("start") || new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString()
    const endDate = searchParams.get("end") || new Date().toISOString()

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

    // Get clicks count
    const { count: clicksCount } = await supabase
      .from("clicks")
      .select("*", { count: "exact", head: true })
      .eq("user_id", user.id)
      .gte("created_at", startDate)
      .lte("created_at", endDate)

    // Get conversions count and total commission
    const { data: conversions } = await supabase
      .from("transactions")
      .select("amount, commission_amount, status")
      .eq("user_id", user.id)
      .eq("status", "confirmed")
      .gte("created_at", startDate)
      .lte("created_at", endDate)

    const conversionsCount = conversions?.length || 0
    const totalCommission = conversions?.reduce((sum, t) => sum + (t.commission_amount || 0), 0) || 0
    const totalAmount = conversions?.reduce((sum, t) => sum + (t.amount || 0), 0) || 0

    const conversionRate = clicksCount && clicksCount > 0 ? ((conversionsCount / clicksCount) * 100).toFixed(2) : "0"

    return NextResponse.json({
      clicks_count: clicksCount || 0,
      conversions_count: conversionsCount,
      total_commission: Number.parseFloat(totalCommission.toFixed(2)),
      total_amount: Number.parseFloat(totalAmount.toFixed(2)),
      conversion_rate: Number.parseFloat(conversionRate),
      period: { start: startDate, end: endDate },
    })
  } catch (error) {
    console.error("[v0] Analytics overview error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
