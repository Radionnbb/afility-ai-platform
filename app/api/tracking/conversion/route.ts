import { createServerClient } from "@supabase/ssr"
import { cookies } from "next/headers"
import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { user_id, search_id, product_url, affiliate_url, store, amount, currency, provider_reference, metadata } =
      body

    if (!product_url || !store || !amount) {
      return NextResponse.json({ error: "Missing required fields: product_url, store, amount" }, { status: 400 })
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

    // Get authenticated user
    const {
      data: { user },
    } = await supabase.auth.getUser()

    // Insert transaction record with pending status
    const { data, error } = await supabase.from("transactions").insert({
      user_id: user?.id || user_id,
      search_id,
      product_url,
      affiliate_url,
      store,
      amount: Number.parseFloat(amount),
      currency: currency || "USD",
      status: "pending",
      provider_reference,
      metadata: metadata || {},
    })

    if (error) {
      console.error("[v0] Conversion tracking error:", error)
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json({
      success: true,
      transaction_id: data?.[0]?.id,
      status: "pending",
    })
  } catch (error) {
    console.error("[v0] Conversion tracking exception:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
