// Rate limiting utility
interface RateLimitStore {
  [key: string]: { count: number; resetTime: number }
}

const rateLimitStore: RateLimitStore = {}

export function checkRateLimit(userId: string, limit = 10, windowMs = 60000): boolean {
  const key = `rate-limit:${userId}`
  const now = Date.now()

  if (!rateLimitStore[key]) {
    rateLimitStore[key] = { count: 1, resetTime: now + windowMs }
    return true
  }

  const record = rateLimitStore[key]

  if (now > record.resetTime) {
    record.count = 1
    record.resetTime = now + windowMs
    return true
  }

  if (record.count >= limit) {
    return false
  }

  record.count++
  return true
}

export function getRateLimitInfo(userId: string) {
  const key = `rate-limit:${userId}`
  return rateLimitStore[key] || null
}
