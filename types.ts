export interface User {
  id: number
  email: string
  firstName: string
  lastName: string
  createdAt: string
  updatedAt: string
}

export interface Product {
  id: number
  name: string
  description?: string
  originalPrice: number
  currentPrice: number
  discountPercentage: number
  imageUrl?: string
  sourceUrl?: string
  sourceName: string
  rating: number
  reviewsCount: number
  availability: string
  similarityScore: number
  category?: string
  brand?: string
}

export interface SearchResult {
  products: Product[]
  totalCount: number
  searchQuery: string
  searchType: "name" | "url" | "image"
  aiInsights: {
    detectedCategory: string
    brandMatch: string
    confidence: number
  }
}

export interface UserActivity {
  id: number
  activityType: "search" | "purchase" | "coupon_used"
  activityDetails: string
  savingsAmount: number
  createdAt: string
}

export interface AuthResponse {
  success: boolean
  user?: User
  token?: string
  message?: string
}

export interface SearchFilters {
  sortBy?: "price" | "price-desc" | "similarity" | "discount" | "rating"
  priceRange?: [number, number]
  sources?: string[]
  category?: string
  brand?: string
}
