import { createServerClient } from "@supabase/ssr"
import { cookies } from "next/headers"
import { type NextRequest, NextResponse } from "next/server"

// Simple moving average forecast
function calculateMovingAverage(data: number[], window: number): number[] {
  const result: number[] = []
  for (let i = 0; i < data.length; i++) {
    const start = Math.max(0, i - window + 1)
    const slice = data.slice(start, i + 1)
    const avg = slice.reduce((a, b) => a + b, 0) / slice.length
    result.push(avg)
  }
  return result
}

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const forecastDays = Number.parseInt(searchParams.get("forecast_days") || "7")
    const historyDays = Number.parseInt(searchParams.get("history_days") || "30")

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

    const startDate = new Date(Date.now() - historyDays * 24 * 60 * 60 * 1000).toISOString()

    // Get historical conversions
    const { data: conversionsData } = await supabase
      .from("transactions")
      .select("created_at, commission_amount")
      .eq("user_id", user.id)
      .eq("status", "confirmed")
      .gte("created_at", startDate)

    // Aggregate by date
    const dailyCommissions: Record<string, number> = {}
    conversionsData?.forEach((conversion) => {
      const date = new Date(conversion.created_at).toISOString().split("T")[0]
      dailyCommissions[date] = (dailyCommissions[date] || 0) + (conversion.commission_amount || 0)
    })

    // Get all dates in range
    const commissionValues: number[] = []
    for (let i = 0; i < historyDays; i++) {
      const date = new Date(Date.now() - i * 24 * 60 * 60 * 1000).toISOString().split("T")[0]
      commissionValues.unshift(dailyCommissions[date] || 0)
    }

    // Calculate moving average
    const movingAvg = calculateMovingAverage(commissionValues, 7)
    const lastAvg = movingAvg[movingAvg.length - 1] || 0

    // Generate forecast
    const forecast = []
    for (let i = 1; i <= forecastDays; i++) {
      const forecastDate = new Date(Date.now() + i * 24 * 60 * 60 * 1000).toISOString().split("T")[0]
      forecast.push({
        date: forecastDate,
        commission: Number.parseFloat((lastAvg * (0.95 + Math.random() * 0.1)).toFixed(2)), // Add slight variance
        is_forecast: true,
      })
    }

    return NextResponse.json({
      history: commissionValues.map((v, i) => ({
        date: new Date(Date.now() - (historyDays - i) * 24 * 60 * 60 * 1000).toISOString().split("T")[0],
        commission: Number.parseFloat(v.toFixed(2)),
        is_forecast: false,
      })),
      forecast,
      average_daily_commission: Number.parseFloat(lastAvg.toFixed(2)),
    })
  } catch (error) {
    console.error("[v0] Analytics forecast error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
