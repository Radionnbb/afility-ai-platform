// Security utilities for sanitizing logs and data
export function sanitizeLogs(data: any): any {
  const sensitiveKeys = ["api_key", "apiKey", "secret", "password", "token", "authorization", "auth", "key"]

  if (typeof data !== "object" || data === null) {
    return data
  }

  const sanitized = Array.isArray(data) ? [...data] : { ...data }

  for (const key in sanitized) {
    if (sensitiveKeys.some((k) => key.toLowerCase().includes(k))) {
      sanitized[key] = "***REDACTED***"
    } else if (typeof sanitized[key] === "object") {
      sanitized[key] = sanitizeLogs(sanitized[key])
    }
  }

  return sanitized
}

export function sanitizeUrl(url: string): string {
  try {
    const urlObj = new URL(url)
    // Remove sensitive query parameters
    const sensitiveParams = ["token", "key", "secret", "api_key", "auth"]
    sensitiveParams.forEach((param) => {
      urlObj.searchParams.delete(param)
    })
    return urlObj.toString()
  } catch {
    return url
  }
}
