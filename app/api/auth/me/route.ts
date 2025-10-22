import { type NextRequest, NextResponse } from "next/server"
import jwt from "jsonwebtoken"
import { createClient } from "@supabase/supabase-js"

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!)

export async function GET(request: NextRequest) {
  try {
    const token = request.cookies.get("auth-token")?.value

    if (!token) {
      return NextResponse.json({ success: false, message: "No token provided" }, { status: 401 })
    }

    // Verify JWT token
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as any

    // Get user from database
    const { data: user, error } = await supabase
      .from("users")
      .select("id, first_name, last_name, email, created_at")
      .eq("id", decoded.userId)
      .single()

    if (error || !user) {
      return NextResponse.json({ success: false, message: "User not found" }, { status: 404 })
    }

    return NextResponse.json({
      success: true,
      user: {
        id: user.id,
        firstName: user.first_name,
        lastName: user.last_name,
        email: user.email,
        createdAt: user.created_at,
      },
    })
  } catch (error) {
    console.error("Auth Check Error:", error)
    return NextResponse.json({ success: false, message: "Invalid token" }, { status: 401 })
  }
}
