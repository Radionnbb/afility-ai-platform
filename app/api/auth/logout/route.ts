import { NextResponse } from "next/server"

export async function POST() {
  try {
    const response = NextResponse.json({
      success: true,
      message: "Logged out successfully",
    })

    // Clear auth cookie
    response.cookies.delete("auth-token")

    return response
  } catch (error) {
    console.error("Logout Error:", error)
    return NextResponse.json({ success: false, message: "Logout failed" }, { status: 500 })
  }
}
