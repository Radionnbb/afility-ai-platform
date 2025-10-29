// Security middleware for API routes
import { type NextRequest, NextResponse } from "next/server"
import { checkRateLimit } from "./rate-limiter"
import { sanitizeLogs } from "./sanitize"

export interface SecurityContext {
  userId?: string
  ip?: string
  timestamp: number
}

export async function withSecurityMiddleware(
  handler: (req: NextRequest, context: SecurityContext) => Promise<NextResponse>,
  options: {
    requireAuth?: boolean
    rateLimit?: boolean
    rateLimitWindow?: number
    rateLimitMax?: number
  } = {},
) {
  return async (req: NextRequest) => {
    try {
      // Extract security context
      const context: SecurityContext = {
        userId: req.headers.get("x-user-id") || undefined,
        ip: req.headers.get("x-forwarded-for") || req.ip,
        timestamp: Date.now(),
      }

      // Rate limiting
      if (options.rateLimit !== false) {
        const rateLimitKey = context.userId || context.ip || "anonymous"
        const isAllowed = checkRateLimit(rateLimitKey, options.rateLimitMax || 10, options.rateLimitWindow || 60000)

        if (!isAllowed) {
          return NextResponse.json({ success: false, message: "Rate limit exceeded" }, { status: 429 })
        }
      }

      // Call handler
      const response = await handler(req, context)

      // Add security headers
      response.headers.set("X-Content-Type-Options", "nosniff")
      response.headers.set("X-Frame-Options", "DENY")
      response.headers.set("X-XSS-Protection", "1; mode=block")
      response.headers.set("Referrer-Policy", "strict-origin-when-cross-origin")

      return response
    } catch (error) {
      console.error("[v0] Security middleware error:", sanitizeLogs(error))
      return NextResponse.json({ success: false, message: "Internal server error" }, { status: 500 })
    }
  }
}
