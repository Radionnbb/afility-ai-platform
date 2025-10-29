// Tests for input validation
import { describe, it, expect } from "vitest"
import { validateSearchInput, isValidUrl, isValidEmail, isValidPrice } from "@/lib/security/validation"

describe("Input Validation", () => {
  it("should validate search input", () => {
    const validInput = {
      type: "text",
      query: "laptop",
    }

    const result = validateSearchInput(validInput)
    expect(result).toBeDefined()
    expect(result?.type).toBe("text")
  })

  it("should reject invalid search type", () => {
    const invalidInput = {
      type: "invalid",
      query: "laptop",
    }

    const result = validateSearchInput(invalidInput)
    expect(result).toBeNull()
  })

  it("should validate URLs", () => {
    expect(isValidUrl("https://example.com")).toBe(true)
    expect(isValidUrl("not-a-url")).toBe(false)
  })

  it("should validate emails", () => {
    expect(isValidEmail("test@example.com")).toBe(true)
    expect(isValidEmail("invalid-email")).toBe(false)
  })

  it("should validate prices", () => {
    expect(isValidPrice(99.99)).toBe(true)
    expect(isValidPrice(-10)).toBe(false)
    expect(isValidPrice(Number.POSITIVE_INFINITY)).toBe(false)
  })
})
