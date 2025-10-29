import { createServerClient } from "@supabase/ssr"
import { cookies } from "next/headers"
import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { notification_ids, read } = body

    if (!notification_ids || !Array.isArray(notification_ids)) {
      return NextResponse.json({ error: "Missing or invalid notification_ids" }, { status: 400 })
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

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    // Update notifications
    const { error } = await supabase
      .from("notifications")
      .update({ read: read !== false, updated_at: new Date().toISOString() })
      .eq("user_id", user.id)
      .in("id", notification_ids)

    if (error) {
      console.error("[v0] Mark read error:", error)
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("[v0] Mark read exception:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
