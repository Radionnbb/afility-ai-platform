import { createServerClient } from "@supabase/ssr"
import { cookies } from "next/headers"
import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    // Verify authorization (should be called from internal service or with API key)
    const authHeader = request.headers.get("authorization")
    if (authHeader !== `Bearer ${process.env.INTERNAL_API_KEY}`) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

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

    // Find pending transactions older than 1 hour
    const oneHourAgo = new Date(Date.now() - 60 * 60 * 1000).toISOString()

    const { data: pendingTransactions, error: fetchError } = await supabase
      .from("transactions")
      .select("*")
      .eq("status", "pending")
      .lt("created_at", oneHourAgo)
      .limit(100)

    if (fetchError) {
      console.error("[v0] Reconciliation fetch error:", fetchError)
      return NextResponse.json({ error: fetchError.message }, { status: 500 })
    }

    let reconciled = 0
    let failed = 0

    // Process each pending transaction
    for (const transaction of pendingTransactions || []) {
      try {
        // In a real scenario, you would call the provider API here
        // For now, we'll mark old pending transactions as rejected
        const { error: updateError } = await supabase
          .from("transactions")
          .update({
            status: "rejected",
            updated_at: new Date().toISOString(),
          })
          .eq("id", transaction.id)

        if (updateError) {
          failed++
          console.error("[v0] Reconciliation update error:", updateError)
        } else {
          reconciled++
        }
      } catch (error) {
        failed++
        console.error("[v0] Reconciliation processing error:", error)
      }
    }

    return NextResponse.json({
      success: true,
      reconciled,
      failed,
      total: pendingTransactions?.length || 0,
    })
  } catch (error) {
    console.error("[v0] Reconciliation exception:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
