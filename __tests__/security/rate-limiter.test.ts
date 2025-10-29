// Tests for rate limiting
import { describe, it, expect, beforeEach, vi } from "vitest"
import { checkRateLimit, getRateLimitInfo } from "@/lib/security/rate-limiter"

describe("Rate Limiter", () => {
  beforeEach(() => {
    // Clear rate limit store
    vi.clearAllMocks()
  })

  it("should allow requests within limit", () => {
    const userId = "user-123"

    for (let i = 0; i < 10; i++) {
      const allowed = checkRateLimit(userId, 10, 60000)
      expect(allowed).toBe(true)
    }
  })

  it("should block requests exceeding limit", () => {
    const userId = "user-456"

    for (let i = 0; i < 10; i++) {
      checkRateLimit(userId, 10, 60000)
    }

    const blocked = checkRateLimit(userId, 10, 60000)
    expect(blocked).toBe(false)
  })

  it("should track rate limit info", () => {
    const userId = "user-789"

    checkRateLimit(userId, 10, 60000)
    const info = getRateLimitInfo(userId)

    expect(info).toBeDefined()
    expect(info?.count).toBe(1)
  })
})
