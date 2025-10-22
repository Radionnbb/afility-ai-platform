import OpenAI from "openai"
import { GoogleGenerativeAI } from "@google/generative-ai"

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY!,
})

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_GEMINI_API_KEY!)

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
}

export interface ImageAnalysis {
  detectedProduct: string
  category: string
  brand: string
  confidence: number
  features: string[]
}

export class AIService {
  // تحليل النص لاستخراج معلومات المنتج
  static async analyzeProductQuery(query: string): Promise<ProductAnalysis> {
    try {
      const prompt = `
        Analyze this product query and extract structured information:
        Query: "${query}"
        
        Please provide a JSON response with:
        - category: product category
        - brand: detected brand name
        - model: specific model if mentioned
        - keyFeatures: array of key features mentioned
        - priceRange: estimated price range {min, max}
        - alternatives: array of alternative product suggestions
        - confidence: confidence score (0-100)
        
        Respond only with valid JSON.
      `

      const completion = await openai.chat.completions.create({
        model: "gpt-4",
        messages: [{ role: "user", content: prompt }],
        temperature: 0.3,
      })

      const response = completion.choices[0]?.message?.content
      if (!response) throw new Error("No response from OpenAI")

      return JSON.parse(response) as ProductAnalysis
    } catch (error) {
      console.error("AI analysis error:", error)
      // Fallback analysis
      return this.fallbackAnalysis(query)
    }
  }

  // تحليل الصور باستخدام Google Vision
  static async analyzeProductImage(imageBase64: string): Promise<ImageAnalysis> {
    try {
      const model = genAI.getGenerativeModel({ model: "gemini-pro-vision" })

      const prompt = `
        Analyze this product image and identify:
        1. What product is this?
        2. What category does it belong to?
        3. Can you identify the brand?
        4. What are the key visual features?
        
        Provide response as JSON with: detectedProduct, category, brand, confidence (0-100), features (array)
      `

      const imagePart = {
        inlineData: {
          data: imageBase64,
          mimeType: "image/jpeg",
        },
      }

      const result = await model.generateContent([prompt, imagePart])
      const response = await result.response
      const text = response.text()

      return JSON.parse(text) as ImageAnalysis
    } catch (error) {
      console.error("Image analysis error:", error)
      return {
        detectedProduct: "Unknown Product",
        category: "Unknown",
        brand: "Unknown",
        confidence: 0,
        features: [],
      }
    }
  }

  // تحليل URL لاستخراج معلومات المنتج
  static async analyzeProductUrl(url: string): Promise<ProductAnalysis> {
    try {
      // استخراج معلومات من URL
      const urlAnalysis = this.extractInfoFromUrl(url)

      // استخدام AI لتحليل أعمق
      const prompt = `
        Analyze this product URL and extract information:
        URL: "${url}"
        
        Based on the URL structure, domain, and any visible product identifiers,
        provide a JSON response with product details including category, brand, model, etc.
        
        Respond only with valid JSON.
      `

      const completion = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [{ role: "user", content: prompt }],
        temperature: 0.2,
      })

      const response = completion.choices[0]?.message?.content
      if (!response) throw new Error("No response from OpenAI")

      const aiAnalysis = JSON.parse(response) as ProductAnalysis

      // دمج التحليل من URL مع تحليل AI
      return {
        ...aiAnalysis,
        ...urlAnalysis,
        confidence: Math.min(aiAnalysis.confidence, urlAnalysis.confidence),
      }
    } catch (error) {
      console.error("URL analysis error:", error)
      return this.extractInfoFromUrl(url)
    }
  }

  // استخراج معلومات أساسية من URL
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
    }
  }

  // تحليل احتياطي عند فشل AI
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
    }
  }
}
