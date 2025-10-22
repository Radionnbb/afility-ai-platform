import OpenAI from "openai"
import { GoogleGenerativeAI } from "@google/generative-ai"

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY!,
})

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!)

export interface ProductAnalysis {
  category: string
  brand: string
  model: string
  keyFeatures: string[]
  priceRange: {
    min: number
    max: number
  }
  alternatives: string[]
  confidence: number
  suggestedCoupons: string[]
}

export interface ImageAnalysis {
  detectedProduct: string
  category: string
  brand: string
  confidence: number
  features: string[]
  estimatedPrice: number
}

export class RealAIService {
  // تحليل النص باستخدام OpenAI GPT-4
  static async analyzeProductQuery(query: string): Promise<ProductAnalysis> {
    try {
      const prompt = `
        Analyze this product search query and provide detailed information:
        Query: "${query}"
        
        Please provide a JSON response with:
        - category: product category (e.g., "Smartphone", "Laptop", "Headphones")
        - brand: detected brand name
        - model: specific model if mentioned
        - keyFeatures: array of key features mentioned
        - priceRange: estimated price range {min, max} in USD
        - alternatives: array of 3-5 alternative product suggestions
        - confidence: confidence score (0-100)
        - suggestedCoupons: array of relevant coupon types
        
        Respond only with valid JSON.
      `

      const completion = await openai.chat.completions.create({
        model: "gpt-4",
        messages: [{ role: "user", content: prompt }],
        temperature: 0.3,
        max_tokens: 1000,
      })

      const response = completion.choices[0]?.message?.content
      if (!response) throw new Error("No response from OpenAI")

      return JSON.parse(response) as ProductAnalysis
    } catch (error) {
      console.error("OpenAI analysis error:", error)
      return this.fallbackAnalysis(query)
    }
  }

  // تحليل الصور باستخدام OpenAI Vision
  static async analyzeProductImage(imageBase64: string): Promise<ImageAnalysis> {
    try {
      const response = await openai.chat.completions.create({
        model: "gpt-4-vision-preview",
        messages: [
          {
            role: "user",
            content: [
              {
                type: "text",
                text: `Analyze this product image and provide detailed information as JSON:
                {
                  "detectedProduct": "product name",
                  "category": "product category",
                  "brand": "brand name if visible",
                  "confidence": confidence_score_0_to_100,
                  "features": ["feature1", "feature2"],
                  "estimatedPrice": estimated_price_in_usd
                }`,
              },
              {
                type: "image_url",
                image_url: {
                  url: `data:image/jpeg;base64,${imageBase64}`,
                },
              },
            ],
          },
        ],
        max_tokens: 500,
      })

      const result = response.choices[0]?.message?.content
      if (!result) throw new Error("No response from OpenAI Vision")

      return JSON.parse(result) as ImageAnalysis
    } catch (error) {
      console.error("OpenAI Vision analysis error:", error)
      return {
        detectedProduct: "Unknown Product",
        category: "Unknown",
        brand: "Unknown",
        confidence: 0,
        features: [],
        estimatedPrice: 0,
      }
    }
  }

  // تحليل URL باستخدام Gemini
  static async analyzeProductUrl(url: string): Promise<ProductAnalysis> {
    try {
      const model = genAI.getGenerativeModel({ model: "gemini-pro" })

      const prompt = `
        Analyze this product URL and extract information:
        URL: "${url}"
        
        Based on the URL structure, domain, and any visible product identifiers,
        provide a JSON response with:
        - category: product category
        - brand: detected brand name
        - model: specific model if mentioned
        - keyFeatures: array of key features
        - priceRange: estimated price range {min, max}
        - alternatives: array of alternative suggestions
        - confidence: confidence score (0-100)
        - suggestedCoupons: array of relevant coupon types
        
        Respond only with valid JSON.
      `

      const result = await model.generateContent(prompt)
      const response = await result.response
      const text = response.text()

      return JSON.parse(text) as ProductAnalysis
    } catch (error) {
      console.error("Gemini URL analysis error:", error)
      return this.extractInfoFromUrl(url)
    }
  }

  // توليد كوبونات ذكية
  static async generateSmartCoupons(productCategory: string, brand: string): Promise<any[]> {
    try {
      const prompt = `
        Generate 3 realistic coupon codes for ${brand} ${productCategory} products.
        
        Provide JSON array with:
        [
          {
            "code": "COUPON_CODE",
            "discount": discount_percentage,
            "description": "description",
            "minPurchase": minimum_purchase_amount,
            "validUntil": "date"
          }
        ]
        
        Make the coupons realistic and appealing.
      `

      const completion = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [{ role: "user", content: prompt }],
        temperature: 0.7,
        max_tokens: 500,
      })

      const response = completion.choices[0]?.message?.content
      if (!response) return this.getDefaultCoupons()

      return JSON.parse(response)
    } catch (error) {
      console.error("Coupon generation error:", error)
      return this.getDefaultCoupons()
    }
  }

  // كوبونات افتراضية
  private static getDefaultCoupons() {
    return [
      {
        code: "SAVE10",
        discount: 10,
        description: "Extra 10% off",
        minPurchase: 50,
        validUntil: "2024-12-31",
      },
      {
        code: "WELCOME15",
        discount: 15,
        description: "Welcome discount 15% off",
        minPurchase: 100,
        validUntil: "2024-12-31",
      },
      {
        code: "TECH20",
        discount: 20,
        description: "Tech products 20% off",
        minPurchase: 200,
        validUntil: "2024-12-31",
      },
    ]
  }

  // تحليل احتياطي
  private static fallbackAnalysis(query: string): ProductAnalysis {
    const lowerQuery = query.toLowerCase()
    let category = "Unknown"
    let brand = "Unknown"
    let confidence = 40

    // تحديد الفئة
    if (lowerQuery.includes("iphone") || lowerQuery.includes("phone") || lowerQuery.includes("smartphone")) {
      category = "Smartphone"
      confidence = 70
    } else if (lowerQuery.includes("laptop") || lowerQuery.includes("computer")) {
      category = "Laptop"
      confidence = 70
    } else if (lowerQuery.includes("headphone") || lowerQuery.includes("earphone")) {
      category = "Audio"
      confidence = 70
    }

    // تحديد العلامة التجارية
    if (lowerQuery.includes("apple") || lowerQuery.includes("iphone")) {
      brand = "Apple"
      confidence += 15
    } else if (lowerQuery.includes("samsung")) {
      brand = "Samsung"
      confidence += 15
    } else if (lowerQuery.includes("sony")) {
      brand = "Sony"
      confidence += 15
    }

    return {
      category,
      brand,
      model: "Unknown",
      keyFeatures: [],
      priceRange: { min: 100, max: 2000 },
      alternatives: [],
      confidence,
      suggestedCoupons: ["SAVE10", "TECH15", "WELCOME20"],
    }
  }

  // استخراج معلومات من URL
  private static extractInfoFromUrl(url: string): ProductAnalysis {
    const domain = new URL(url).hostname.toLowerCase()
    let category = "Unknown"
    let brand = "Unknown"
    let confidence = 60

    // تحليل النطاق
    if (domain.includes("amazon")) {
      brand = "Amazon"
      confidence = 80
    } else if (domain.includes("ebay")) {
      brand = "eBay"
      confidence = 75
    } else if (domain.includes("aliexpress")) {
      brand = "AliExpress"
      confidence = 70
    }

    // تحليل المسار للفئة
    const path = url.toLowerCase()
    if (path.includes("phone") || path.includes("iphone") || path.includes("samsung")) {
      category = "Smartphone"
      confidence += 10
    } else if (path.includes("laptop") || path.includes("computer")) {
      category = "Laptop"
      confidence += 10
    } else if (path.includes("headphone") || path.includes("earphone")) {
      category = "Audio"
      confidence += 10
    }

    return {
      category,
      brand,
      model: "Unknown",
      keyFeatures: [],
      priceRange: { min: 0, max: 1000 },
      alternatives: [],
      confidence,
      suggestedCoupons: ["SAVE10", "DISCOUNT15", "DEAL20"],
    }
  }
}
