// Environment configuration with validation
export const env = {
  // Supabase
  supabaseUrl: process.env.NEXT_PUBLIC_SUPABASE_URL,
  supabaseAnonKey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
  supabaseServiceRoleKey: process.env.SUPABASE_SERVICE_ROLE_KEY,

  // API Keys
  manusApiKey: process.env.MANUS_API_KEY,
  admitadClientId: process.env.ADMITAD_CLIENT_ID,
  admitadClientSecret: process.env.ADMITAD_CLIENT_SECRET,
  admitadBase64Header: process.env.ADMITAD_BASE64_HEADER,
  openaiApiKey: process.env.OPENAI_API_KEY,
  geminiApiKey: process.env.GEMINI_API_KEY,

  // Affiliate
  amazonAssociateTag: process.env.AMAZON_ASSOCIATE_TAG,

  // Configuration
  cacheTtlHours: Number(process.env.CACHE_TTL_HOURS || 24),
  nodeEnv: process.env.NODE_ENV || "development",
  sentryDsn: process.env.SENTRY_DSN,

  // Rate Limiting
  rateLimitWindowMs: Number(process.env.RATE_LIMIT_WINDOW_MS || 60000),
  rateLimitMaxRequests: Number(process.env.RATE_LIMIT_MAX_REQUESTS || 10),
}

// Validate required environment variables
export function validateEnv() {
  const required = ["NEXT_PUBLIC_SUPABASE_URL", "NEXT_PUBLIC_SUPABASE_ANON_KEY", "OPENAI_API_KEY", "GEMINI_API_KEY"]

  const missing = required.filter((key) => !process.env[key])

  if (missing.length > 0) {
    console.warn("[v0] Missing environment variables:", missing)
  }

  return missing.length === 0
}

// Check if specific integration is configured
export function isIntegrationConfigured(integration: string): boolean {
  switch (integration) {
    case "manus":
      return !!env.manusApiKey
    case "admitad":
      return !!(env.admitadClientId && env.admitadClientSecret && env.admitadBase64Header)
    case "openai":
      return !!env.openaiApiKey
    case "amazon":
      return !!env.amazonAssociateTag
    case "gemini":
      return !!env.geminiApiKey
    default:
      return false
  }
}
