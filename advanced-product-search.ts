import { AIService, type ProductAnalysis } from "./ai-services"
import { AdmitadService } from "./affiliate-services"
import type { Product, SearchResult, SearchFilters } from "./types"

interface AmazonProduct {
  ASIN: string
  title: string
  price: string
  image: string
  rating: number
  reviewsCount: number
  url: string
}

interface EbayProduct {
  itemId: string
  title: string
  price: string
  image: string
  condition: string
  url: string
}

export class AdvancedProductSearch {
  // البحث الموحد عبر جميع المنصات
  static async searchAllPlatforms(query: string, filters: SearchFilters = {}): Promise<SearchResult> {
    try {
      // تحليل الاستعلام بالذكاء الاصطناعي
      const aiAnalysis = await AIService.analyzeProductQuery(query)

      // البحث المتوازي عبر جميع المنصات
      const [amazonResults, ebayResults, admitadResults, googleResults] = await Promise.allSettled([
        this.searchAmazon(query, aiAnalysis),
        this.searchEbay(query, aiAnalysis),
        AdmitadService.searchProducts(query, aiAnalysis.category),
        this.searchGoogleShopping(query, aiAnalysis),
      ])

      // دمج النتائج
      let allProducts: Product[] = []

      if (amazonResults.status === "fulfilled") {
        allProducts.push(...amazonResults.value)
      }

      if (ebayResults.status === "fulfilled") {
        allProducts.push(...ebayResults.value)
      }

      if (admitadResults.status === "fulfilled") {
        allProducts.push(...this.convertAdmitadProducts(admitadResults.value.products))
      }

      if (googleResults.status === "fulfilled") {
        allProducts.push(...googleResults.value)
      }

      // تطبيق الفلاتر
      allProducts = this.applyFilters(allProducts, filters)

      // ترتيب النتائج
      allProducts = this.sortProducts(allProducts, filters.sortBy || "similarity")

      // حساب درجة التشابه باستخدام AI
      allProducts = await this.calculateSimilarityScores(allProducts, aiAnalysis)

      return {
        products: allProducts.slice(0, 50), // حد أقصى 50 منتج
        totalCount: allProducts.length,
        searchQuery: query,
        searchType: "name",
        aiInsights: {
          detectedCategory: aiAnalysis.category,
          brandMatch: aiAnalysis.brand,
          confidence: aiAnalysis.confidence,
        },
      }
    } catch (error) {
      console.error("Advanced search error:", error)
      throw new Error("Search failed")
    }
  }

  // البحث في Amazon
  private static async searchAmazon(query: string, analysis: ProductAnalysis): Promise<Product[]> {
    try {
      // استخدام Amazon Product Advertising API
      const params = new URLSearchParams({
        Service: "AWSECommerceService",
        Operation: "ItemSearch",
        SearchIndex: this.getAmazonSearchIndex(analysis.category),
        Keywords: query,
        ResponseGroup: "Images,ItemAttributes,Offers",
        AssociateTag: process.env.AMAZON_ASSOCIATE_TAG!,
      })

      // في التطبيق الحقيقي، ستحتاج لتوقيع الطلب
      const response = await this.makeAmazonRequest(params)

      return this.parseAmazonResponse(response)
    } catch (error) {
      console.error("Amazon search error:", error)
      return []
    }
  }

  // البحث في eBay
  private static async searchEbay(query: string, analysis: ProductAnalysis): Promise<Product[]> {
    try {
      const params = new URLSearchParams({
        "OPERATION-NAME": "findItemsByKeywords",
        "SERVICE-VERSION": "1.0.0",
        "SECURITY-APPNAME": process.env.EBAY_APP_ID!,
        "RESPONSE-DATA-FORMAT": "JSON",
        keywords: query,
        "paginationInput.entriesPerPage": "25",
      })

      const response = await fetch(`https://svcs.ebay.com/services/search/FindingService/v1?${params}`)
      const data = await response.json()

      return this.parseEbayResponse(data)
    } catch (error) {
      console.error("eBay search error:", error)
      return []
    }
  }

  // البحث في Google Shopping
  private static async searchGoogleShopping(query: string, analysis: ProductAnalysis): Promise<Product[]> {
    try {
      const params = new URLSearchParams({
        key: process.env.GOOGLE_SHOPPING_API_KEY!,
        cx: process.env.GOOGLE_CUSTOM_SEARCH_ENGINE_ID!,
        q: query,
        searchType: "image",
        num: "10",
      })

      const response = await fetch(`https://www.googleapis.com/customsearch/v1?${params}`)
      const data = await response.json()

      return this.parseGoogleShoppingResponse(data)
    } catch (error) {
      console.error("Google Shopping search error:", error)
      return []
    }
  }

  // البحث بالصورة
  static async searchByImage(imageBase64: string): Promise<SearchResult> {
    try {
      // تحليل الصورة بالذكاء الاصطناعي
      const imageAnalysis = await AIService.analyzeProductImage(imageBase64)

      // البحث بناءً على المنتج المكتشف
      return this.searchAllPlatforms(imageAnalysis.detectedProduct)
    } catch (error) {
      console.error("Image search error:", error)
      throw new Error("Image search failed")
    }
  }

  // البحث بالرابط
  static async searchByUrl(url: string): Promise<SearchResult> {
    try {
      // تحليل الرابط بالذكاء الاصطناعي
      const urlAnalysis = await AIService.analyzeProductUrl(url)

      // استخراج معلومات المنتج من الصفحة
      const productInfo = await this.scrapeProductInfo(url)

      // البحث بناءً على المعلومات المستخرجة
      const searchQuery = productInfo.name || `${urlAnalysis.brand} ${urlAnalysis.model}`
      return this.searchAllPlatforms(searchQuery)
    } catch (error) {
      console.error("URL search error:", error)
      throw new Error("URL search failed")
    }
  }

  // استخراج معلومات المنتج من الصفحة
  private static async scrapeProductInfo(url: string) {
    try {
      const response = await fetch(
        `https://api.scrapfly.io/scrape?key=${process.env.SCRAPFLY_API_KEY}&url=${encodeURIComponent(url)}`,
      )
      const data = await response.json()

      // تحليل HTML لاستخراج معلومات المنتج
      return this.parseProductPage(data.result.content)
    } catch (error) {
      console.error("Scraping error:", error)
      return { name: "", price: 0, description: "" }
    }
  }

  // تحويل منتجات Admitad إلى تنسيق موحد
  private static convertAdmitadProducts(admitadProducts: any[]): Product[] {
    return admitadProducts.map((product, index) => ({
      id: Number.parseInt(product.id) || index,
      name: product.name,
      description: product.description || "",
      originalPrice: product.oldPrice || product.price,
      currentPrice: product.price,
      discountPercentage: product.oldPrice
        ? Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100)
        : 0,
      imageUrl: product.imageUrl,
      sourceUrl: product.deeplink,
      sourceName: product.merchant,
      rating: product.rating || 4.0,
      reviewsCount: product.reviewsCount || 0,
      availability: "In Stock",
      similarityScore: 85,
      category: product.category,
      brand: this.extractBrandFromName(product.name),
    }))
  }

  // تطبيق الفلاتر
  private static applyFilters(products: Product[], filters: SearchFilters): Product[] {
    let filtered = [...products]

    if (filters.priceRange) {
      filtered = filtered.filter(
        (p) => p.currentPrice >= filters.priceRange![0] && p.currentPrice <= filters.priceRange![1],
      )
    }

    if (filters.sources && filters.sources.length > 0) {
      filtered = filtered.filter((p) => filters.sources!.includes(p.sourceName))
    }

    if (filters.category) {
      filtered = filtered.filter((p) => p.category === filters.category)
    }

    if (filters.brand) {
      filtered = filtered.filter((p) => p.brand === filters.brand)
    }

    return filtered
  }

  // ترتيب المنتجات
  private static sortProducts(products: Product[], sortBy: string): Product[] {
    return products.sort((a, b) => {
      switch (sortBy) {
        case "price":
          return a.currentPrice - b.currentPrice
        case "price-desc":
          return b.currentPrice - a.currentPrice
        case "discount":
          return b.discountPercentage - a.discountPercentage
        case "rating":
          return b.rating - a.rating
        case "similarity":
        default:
          return b.similarityScore - a.similarityScore
      }
    })
  }

  // حساب درجة التشابه باستخدام AI
  private static async calculateSimilarityScores(products: Product[], analysis: ProductAnalysis): Promise<Product[]> {
    // في التطبيق الحقيقي، ستستخدم AI لحساب التشابه
    return products.map((product) => ({
      ...product,
      similarityScore: this.calculateBasicSimilarity(product, analysis),
    }))
  }

  // حساب التشابه الأساسي
  private static calculateBasicSimilarity(product: Product, analysis: ProductAnalysis): number {
    let score = 50 // نقطة البداية

    // تطابق الفئة
    if (product.category?.toLowerCase() === analysis.category.toLowerCase()) {
      score += 20
    }

    // تطابق العلامة التجارية
    if (product.brand?.toLowerCase() === analysis.brand.toLowerCase()) {
      score += 15
    }

    // تطابق الكلمات المفتاحية
    const productWords = product.name.toLowerCase().split(" ")
    const analysisWords = analysis.keyFeatures.join(" ").toLowerCase().split(" ")
    const commonWords = productWords.filter((word) => analysisWords.includes(word))
    score += Math.min(commonWords.length * 3, 15)

    return Math.min(score, 100)
  }

  // استخراج العلامة التجارية من اسم المنتج
  private static extractBrandFromName(name: string): string {
    const brands = ["Apple", "Samsung", "Sony", "LG", "Huawei", "Xiaomi", "OnePlus", "Google", "Microsoft"]
    const nameLower = name.toLowerCase()

    for (const brand of brands) {
      if (nameLower.includes(brand.toLowerCase())) {
        return brand
      }
    }

    return "Unknown"
  }

  // مساعدات Amazon
  private static getAmazonSearchIndex(category: string): string {
    const categoryMap: Record<string, string> = {
      Smartphone: "Electronics",
      Laptop: "Computers",
      Audio: "Electronics",
      Fashion: "Apparel",
      Home: "HomeGarden",
    }
    return categoryMap[category] || "All"
  }

  private static async makeAmazonRequest(params: URLSearchParams) {
    // تنفيذ توقيع Amazon API
    // هذا مثال مبسط - في التطبيق الحقيقي تحتاج لتوقيع كامل
    throw new Error("Amazon API integration needed")
  }

  private static parseAmazonResponse(response: any): Product[] {
    // تحليل استجابة Amazon
    return []
  }

  private static parseEbayResponse(data: any): Product[] {
    try {
      const items = data.findItemsByKeywordsResponse?.[0]?.searchResult?.[0]?.item || []

      return items.map((item: any, index: number) => ({
        id: index,
        name: item.title?.[0] || "Unknown Product",
        description: item.subtitle?.[0] || "",
        originalPrice: Number.parseFloat(item.sellingStatus?.[0]?.currentPrice?.[0]?.__value__ || "0"),
        currentPrice: Number.parseFloat(item.sellingStatus?.[0]?.currentPrice?.[0]?.__value__ || "0"),
        discountPercentage: 0,
        imageUrl: item.galleryURL?.[0] || "/placeholder.svg",
        sourceUrl: item.viewItemURL?.[0] || "",
        sourceName: "eBay",
        rating: 4.0,
        reviewsCount: 0,
        availability: "In Stock",
        similarityScore: 80,
        category: item.primaryCategory?.[0]?.categoryName?.[0] || "Unknown",
        brand: this.extractBrandFromName(item.title?.[0] || ""),
      }))
    } catch (error) {
      console.error("eBay response parsing error:", error)
      return []
    }
  }

  private static parseGoogleShoppingResponse(data: any): Product[] {
    // تحليل استجابة Google Shopping
    return []
  }

  private static parseProductPage(html: string) {
    // تحليل صفحة المنتج لاستخراج المعلومات
    return { name: "", price: 0, description: "" }
  }
}
