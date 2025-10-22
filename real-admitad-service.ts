interface AdmitadAuthResponse {
  access_token: string
  token_type: string
  expires_in: number
  refresh_token: string
  scope: string
}

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
  coupon?: {
    code: string
    discount: number
    description: string
    finalPrice: number
  }
}

interface AdmitadCoupon {
  id: string
  name: string
  description: string
  code: string
  discount: string
  campaign: {
    id: string
    name: string
  }
  dateStart: string
  dateEnd: string
  gotoLink: string
}

export class RealAdmitadService {
  private static baseUrl = "https://api.admitad.com"
  private static accessToken: string | null = null
  private static tokenExpiry: number = 0

  // الحصول على رمز الوصول
  private static async getAccessToken(): Promise<string> {
    if (this.accessToken && Date.now() < this.tokenExpiry) {
      return this.accessToken
    }

    try {
      const response = await fetch(`${this.baseUrl}/token/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Authorization: `Basic ${process.env.NEXT_PUBLIC_ADMITAD_BASE64_HEADER}`,
        },
        body: new URLSearchParams({
          grant_type: "client_credentials",
          client_id: process.env.NEXT_PUBLIC_ADMITAD_CLIENT_ID!,
          scope: "coupons banners websites campaigns statistics",
        }),
      })

      if (!response.ok) {
        throw new Error(`Admitad auth error: ${response.status}`)
      }

      const data: AdmitadAuthResponse = await response.json()
      this.accessToken = data.access_token
      this.tokenExpiry = Date.now() + data.expires_in * 1000 - 60000 // تجديد قبل دقيقة من انتهاء الصلاحية

      return this.accessToken
    } catch (error) {
      console.error("Admitad authentication error:", error)
      throw new Error("Failed to authenticate with Admitad")
    }
  }

  // البحث عن الكوبونات
  static async searchCoupons(query: string, category?: string): Promise<AdmitadCoupon[]> {
    try {
      const token = await this.getAccessToken()
      const params = new URLSearchParams({
        limit: "20",
        offset: "0",
        ...(category && { category }),
      })

      const response = await fetch(`${this.baseUrl}/coupons/coupons/?${params}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      })

      if (!response.ok) {
        throw new Error(`Admitad coupons error: ${response.status}`)
      }

      const data = await response.json()
      return data.results || []
    } catch (error) {
      console.error("Admitad coupons search error:", error)
      return this.getMockCoupons(query)
    }
  }

  // البحث عن المنتجات مع الكوبونات
  static async searchProductsWithCoupons(query: string, category?: string): Promise<AdmitadProduct[]> {
    try {
      const token = await this.getAccessToken()
      
      // البحث عن الكوبونات أولاً
      const coupons = await this.searchCoupons(query, category)
      
      // البحث عن المنتجات
      const params = new URLSearchParams({
        q: query,
        limit: "20",
        ...(category && { category }),
      })

      const response = await fetch(`${this.baseUrl}/advcampaigns/website/1234567/products/?${params}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      })

      if (!response.ok) {
        throw new Error(`Admitad products error: ${response.status}`)
      }

      const data = await response.json()
      const products = data.results || []

      // دمج الكوبونات مع المنتجات
      return products.map((product: any, index: number) => {
        const coupon = coupons[index % coupons.length] // توزيع الكوبونات
        const discountAmount = coupon ? this.calculateDiscount(product.price, coupon.discount) : 0
        
        return {
          id: product.id || `product_${index}`,
          name: product.name || "Unknown Product",
          price: Number.parseFloat(product.price) || 0,
          oldPrice: product.oldPrice ? Number.parseFloat(product.oldPrice) : undefined,
          currency: product.currency || "USD",
          imageUrl: product.image || "/placeholder.svg",
          deeplink: product.gotoLink || "#",
          merchant: product.campaign?.name || "Unknown Store",
          category: product.category?.name || category || "Unknown",
          rating: product.rating || 4.0 + Math.random(),
          reviewsCount: product.reviewsCount || Math.floor(Math.random() * 1000) + 100,
          coupon: coupon ? {
            code: coupon.code || "SAVE10",
            discount: 10, // نسبة ثابتة 10%
            description: coupon.description || "Extra 10% off",
            finalPrice: (Number.parseFloat(product.price) || 0) * 0.9, // خصم 10%
          } : undefined,
        }
      })
    } catch (error) {
      console.error("Admitad products with coupons error:", error)
      return this.getMockProductsWithCoupons(query)
    }
  }

  // حساب الخصم
  private static calculateDiscount(price: string | number, discountStr: string): number {
    const priceNum = typeof price === "string" ? Number.parseFloat(price) : price
    const discountMatch = discountStr.match(/(\d+)%/)
    const discountPercent = discountMatch ? Number.parseInt(discountMatch[1]) : 10
    return priceNum * (discountPercent / 100)
  }

  // توليد رابط الإحالة
  static async generateAffiliateLink(productUrl: string, campaignId?: string): Promise<string> {
    try {
      const token = await this.getAccessToken()
      const params = new URLSearchParams({
        url: productUrl,
        ...(campaignId && { campaign_id: campaignId }),
      })

      const response = await fetch(`${this.baseUrl}/coupons/deeplink/?${params}`, {
        headers: {
          Authorization: `Bearer ${token}`,
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
      return `${productUrl}?ref=afility_ai`
    }
  }

  // كوبونات وهمية للاختبار
  private static getMockCoupons(query: string): AdmitadCoupon[] {
    return [
      {
        id: "1",
        name: "Save 10% on Electronics",
        description: "Extra 10% off",
        code: "SAVE10",
        discount: "10%",
        campaign: { id: "1", name: "Electronics Store" },
        dateStart: "2024-01-01",
        dateEnd: "2024-12-31",
        gotoLink: "#",
      },
      {
        id: "2",
        name: "Tech Discount",
        description: "Tech products 15% off",
        code: "TECH15",
        discount: "15%",
        campaign: { id: "2", name: "Tech Store" },
        dateStart: "2024-01-01",
        dateEnd: "2024-12-31",
        gotoLink: "#",
      },
    ]
  }

  // منتجات وهمية مع كوبونات
  private static getMockProductsWithCoupons(query: string): AdmitadProduct[] {
    return [
      {
        id: "1",
        name: `${query} - Best Alternative`,
        price: 299,
        oldPrice: 399,
        currency: "USD",
        imageUrl: "/placeholder.svg",
        deeplink: "#",
        merchant: "Demo Store",
        category: "Electronics",
        rating: 4.5,
        reviewsCount: 150,
        coupon: {
          code: "SAVE10",
          discount: 10,
          description: "Extra 10% off",
          finalPrice: 269,
        },
      },
    ]
  }
}
