import { createServerClient } from "@supabase/ssr"
import { cookies } from "next/headers"
import { type NextRequest, NextResponse } from "next/server"
import crypto from "crypto"

// Verify Admitad webhook signature
function verifyAdmitadSignature(payload: string, signature: string, secret: string): boolean {
  const hash = crypto.createHmac("sha256", secret).update(payload).digest("hex")
  return hash === signature
}

export async function POST(request: NextRequest) {
  try {
    const signature = request.headers.get("x-admitad-signature")
    const payload = await request.text()

    // Verify webhook signature
    const webhookSecret = process.env.ADMITAD_WEBHOOK_SECRET || "test-secret"
    if (!verifyAdmitadSignature(payload, signature || "", webhookSecret)) {
      console.warn("[v0] Invalid Admitad webhook signature")
      return NextResponse.json({ error: "Invalid signature" }, { status: 401 })
    }

    const body = JSON.parse(payload)
    const { action, data } = body

    if (action !== "conversion") {
      return NextResponse.json({ success: true })
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

    // Update transaction status to confirmed
    const { error } = await supabase
      .from("transactions")
      .update({
        status: "confirmed",
        provider_reference: data.id,
        provider_raw: body,
        commission_amount: data.commission || 0,
        updated_at: new Date().toISOString(),
      })
      .eq("provider_reference", data.id)

    if (error) {
      console.error("[v0] Webhook update error:", error)
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("[v0] Webhook processing error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
