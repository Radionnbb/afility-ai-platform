// Input validation utilities
import { z } from "zod"

// Search input validation
export const searchInputSchema = z.object({
  type: z.enum(["text", "url", "image"]),
  query: z.string().optional(),
  url: z.string().url().optional(),
  imageData: z.string().optional(),
  userId: z.string().optional(),
})

export type SearchInput = z.infer<typeof searchInputSchema>

// Validate search input
export function validateSearchInput(data: unknown): SearchInput | null {
  try {
    return searchInputSchema.parse(data)
  } catch (error) {
    console.error("[v0] Validation error:", error)
    return null
  }
}

// URL validation
export function isValidUrl(url: string): boolean {
  try {
    new URL(url)
    return true
  } catch {
    return false
  }
}

// Email validation
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

// Price validation
export function isValidPrice(price: number): boolean {
  return price >= 0 && price <= 1000000 && Number.isFinite(price)
}
