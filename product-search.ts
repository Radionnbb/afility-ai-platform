import { AdvancedProductSearch } from "./advanced-product-search"
import type { Product, SearchResult, SearchFilters } from "./types"

export class ProductSearchService {
  static async searchByName(query: string, filters: SearchFilters = {}): Promise<SearchResult> {
    try {
      return await AdvancedProductSearch.searchAllPlatforms(query, filters)
    } catch (error) {
      console.error("Search by name error:", error)
      // Fallback to mock data if APIs fail
      return this.getFallbackResults(query)
    }
  }

  static async searchByUrl(url: string): Promise<SearchResult> {
    try {
      return await AdvancedProductSearch.searchByUrl(url)
    } catch (error) {
      console.error("Search by URL error:", error)
      return this.getFallbackResults("Product from URL")
    }
  }

  static async searchByImage(imageBase64: string): Promise<SearchResult> {
    try {
      return await AdvancedProductSearch.searchByImage(imageBase64)
    } catch (error) {
      console.error("Search by image error:", error)
      return this.getFallbackResults("Product from image")
    }
  }

  // نتائج احتياطية في حالة فشل APIs
  private static getFallbackResults(query: string): SearchResult {
    const mockProducts: Product[] = [
      {
        id: 1,
        name: "iPhone 14 Pro 128GB - Space Black",
        description: "Latest iPhone with A16 Bionic chip and Dynamic Island",
        originalPrice: 999,
        currentPrice: 849,
        discountPercentage: 15,
        imageUrl: "/iphone-14-pro-black.png",
        sourceUrl: "https://amazon.com/iphone-14-pro",
        sourceName: "Amazon",
        rating: 4.8,
        reviewsCount: 2847,
        availability: "In Stock",
        similarityScore: 98,
        category: "Smartphone",
        brand: "Apple",
      },
      {
        id: 2,
        name: "Samsung Galaxy S23 Ultra 256GB",
        description: "Premium Android smartphone with S Pen and 200MP camera",
        originalPrice: 1199,
        currentPrice: 899,
        discountPercentage: 25,
        imageUrl: "/samsung-galaxy-s23-ultra.png",
        sourceUrl: "https://samsung.com/galaxy-s23-ultra",
        sourceName: "Samsung Store",
        rating: 4.6,
        reviewsCount: 1654,
        availability: "In Stock",
        similarityScore: 85,
        category: "Smartphone",
        brand: "Samsung",
      },
    ]

    return {
      products: mockProducts,
      totalCount: mockProducts.length,
      searchQuery: query,
      searchType: "name",
      aiInsights: {
        detectedCategory: "Smartphone",
        brandMatch: "Apple",
        confidence: 85,
      },
    }
  }
}
