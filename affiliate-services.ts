interface AdmitadProduct {
  id: string
  name: string
  price: number
  oldPrice?: number
  currency: string
  imageUrl: string
  deeplink: string
  merchant: string
  category: string
  rating?: number
  reviewsCount?: number
}

interface AdmitadSearchResponse {
  products: AdmitadProduct[]
  totalCount: number
  hasMore: boolean
}

export class AdmitadService {
  private static baseUrl = "https://api.admitad.com/coupons/v1"
  private static accessToken = process.env.ADMITAD_ACCESS_TOKEN!

  // البحث عن المنتجات في Admitad
  static async searchProducts(query: string, category?: string, limit = 20): Promise<AdmitadSearchResponse> {
    try {
      const params = new URLSearchParams({
        q: query,
        limit: limit.toString(),
        ...(category && { category }),
      })

      const response = await fetch(`${this.baseUrl}/coupons/?${params}`, {
        headers: {
          Authorization: `Bearer ${this.accessToken}`,
          "Content-Type": "application/json",
        },
      })

      if (!response.ok) {
        throw new Error(`Admitad API error: ${response.status}`)
      }

      const data = await response.json()

      return {
        products:
          data.results?.map((item: any) => ({
            id: item.id,
            name: item.name,
            price: item.price || 0,
            oldPrice: item.old_price,
            currency: item.currency || "USD",
            imageUrl: item.image || "/placeholder.svg",
            deeplink: item.goto_link,
            merchant: item.campaign?.name || "Unknown",
            category: item.category?.name || "Unknown",
            rating: item.rating,
            reviewsCount: item.reviews_count,
          })) || [],
        totalCount: data.count || 0,
        hasMore: data.next !== null,
      }
    } catch (error) {
      console.error("Admitad search error:", error)
      return {
        products: [],
        totalCount: 0,
        hasMore: false,
      }
    }
  }

  // الحصول على روابط العمولة
  static async generateAffiliateLink(productUrl: string, campaignId?: string): Promise<string> {
    try {
      const params = new URLSearchParams({
        url: productUrl,
        ...(campaignId && { campaign_id: campaignId }),
      })

      const response = await fetch(`${this.baseUrl}/deeplink/?${params}`, {
        headers: {
          Authorization: `Bearer ${this.accessToken}`,
          "Content-Type": "application/json",
        },
      })

      if (!response.ok) {
        throw new Error(`Admitad deeplink error: ${response.status}`)
      }

      const data = await response.json()
      return data.deeplink || productUrl
    } catch (error) {
      console.error("Affiliate link generation error:", error)
      return productUrl
    }
  }

  // الحصول على الكوبونات والعروض
  static async getCoupons(merchantId?: string, category?: string) {
    try {
      const params = new URLSearchParams({
        ...(merchantId && { campaign: merchantId }),
        ...(category && { category }),
        limit: "50",
      })

      const response = await fetch(`${this.baseUrl}/coupons/?${params}`, {
        headers: {
          Authorization: `Bearer ${this.accessToken}`,
          "Content-Type": "application/json",
        },
      })

      if (!response.ok) {
        throw new Error(`Admitad coupons error: ${response.status}`)
      }

      const data = await response.json()
      return data.results || []
    } catch (error) {
      console.error("Coupons fetch error:", error)
      return []
    }
  }
}
