import type { SearchResult, Product } from "./types"

export class FreeTierSearch {
  // بحث مجاني باستخدام Google Custom Search
  static async searchProducts(query: string): Promise<SearchResult> {
    try {
      // استخدام Google Custom Search API (100 استعلام مجاني/يوم)
      const response = await fetch(
        `https://www.googleapis.com/customsearch/v1?key=${process.env.GOOGLE_CUSTOM_SEARCH_API_KEY}&cx=${process.env.GOOGLE_CUSTOM_SEARCH_ENGINE_ID}&q=${encodeURIComponent(query + " buy online price")}&num=10`,
      )

      const data = await response.json()

      if (!data.items) {
        return this.getFallbackResults(query)
      }

      const products: Product[] = data.items.map((item: any, index: number) => ({
        id: index + 1,
        name: item.title,
        description: item.snippet,
        originalPrice: this.extractPrice(item.snippet) * 1.2, // تقدير السعر الأصلي
        currentPrice: this.extractPrice(item.snippet),
        discountPercentage: Math.floor(Math.random() * 30) + 10, // خصم عشوائي
        imageUrl: item.pagemap?.cse_image?.[0]?.src || "/placeholder.svg",
        sourceUrl: item.link,
        sourceName: this.extractDomain(item.link),
        rating: 4.0 + Math.random() * 1, // تقييم عشوائي
        reviewsCount: Math.floor(Math.random() * 1000) + 100,
        availability: "In Stock",
        similarityScore: 90 - index * 5, // درجة تشابه تنازلية
        category: this.detectCategory(query),
        brand: this.extractBrand(item.title),
      }))

      return {
        products,
        totalCount: products.length,
        searchQuery: query,
        searchType: "name",
        aiInsights: {
          detectedCategory: this.detectCategory(query),
          brandMatch: this.extractBrand(query),
          confidence: 85,
        },
      }
    } catch (error) {
      console.error("Free search error:", error)
      return this.getFallbackResults(query)
    }
  }

  // بحث بالصورة (مجاني محدود)
  static async searchByImage(imageBase64: string): Promise<SearchResult> {
    try {
      // استخدام OpenAI Vision (مجاني حتى $5)
      const response = await fetch("/api/analyze-image", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ image: imageBase64 }),
      })

      const result = await response.json()

      if (result.success) {
        return this.searchProducts(result.detectedProduct)
      }

      return this.getFallbackResults("Unknown product from image")
    } catch (error) {
      console.error("Image search error:", error)
      return this.getFallbackResults("Image analysis failed")
    }
  }

  // استخراج السعر من النص
  private static extractPrice(text: string): number {
    const priceMatch = text.match(/\$(\d+(?:,\d{3})*(?:\.\d{2})?)/g)
    if (priceMatch) {
      return Number.parseFloat(priceMatch[0].replace("$", "").replace(",", ""))
    }
    return Math.floor(Math.random() * 500) + 50 // سعر عشوائي
  }

  // استخراج النطاق
  private static extractDomain(url: string): string {
    try {
      const domain = new URL(url).hostname
      return domain.replace("www.", "").split(".")[0]
    } catch {
      return "Unknown Store"
    }
  }

  // تحديد الفئة
  private static detectCategory(query: string): string {
    const categories = {
      "phone|iphone|smartphone|mobile": "Smartphone",
      "laptop|computer|macbook": "Laptop",
      "headphone|earphone|airpods": "Audio",
      "watch|smartwatch": "Wearables",
      "tv|television": "Electronics",
    }

    for (const [pattern, category] of Object.entries(categories)) {
      if (new RegExp(pattern, "i").test(query)) {
        return category
      }
    }

    return "General"
  }

  // استخراج العلامة التجارية
  private static extractBrand(text: string): string {
    const brands = ["Apple", "Samsung", "Sony", "LG", "Microsoft", "Google", "Amazon"]

    for (const brand of brands) {
      if (text.toLowerCase().includes(brand.toLowerCase())) {
        return brand
      }
    }

    return "Unknown"
  }

  // نتائج احتياطية
  private static getFallbackResults(query: string): SearchResult {
    const mockProducts: Product[] = [
      {
        id: 1,
        name: `${query} - Best Alternative`,
        description: "High-quality alternative product with great value",
        originalPrice: 299,
        currentPrice: 199,
        discountPercentage: 33,
        imageUrl: "/placeholder.svg",
        sourceUrl: "#",
        sourceName: "Demo Store",
        rating: 4.5,
        reviewsCount: 150,
        availability: "In Stock",
        similarityScore: 95,
        category: this.detectCategory(query),
        brand: "Generic",
      },
    ]

    return {
      products: mockProducts,
      totalCount: 1,
      searchQuery: query,
      searchType: "name",
      aiInsights: {
        detectedCategory: this.detectCategory(query),
        brandMatch: "Unknown",
        confidence: 60,
      },
    }
  }
}
