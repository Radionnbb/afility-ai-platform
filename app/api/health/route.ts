// Health check endpoint
import { type NextRequest, NextResponse } from "next/server"
import { validateEnv, isIntegrationConfigured } from "@/lib/config/env"

export async function GET(request: NextRequest) {
  try {
    const envValid = validateEnv()

    const integrations = {
      manus: isIntegrationConfigured("manus"),
      admitad: isIntegrationConfigured("admitad"),
      openai: isIntegrationConfigured("openai"),
      amazon: isIntegrationConfigured("amazon"),
      gemini: isIntegrationConfigured("gemini"),
    }

    return NextResponse.json({
      status: "healthy",
      timestamp: new Date().toISOString(),
      environment: {
        valid: envValid,
        integrations,
      },
    })
  } catch (error) {
    return NextResponse.json(
      {
        status: "unhealthy",
        error: String(error),
      },
      { status: 500 },
    )
  }
}
