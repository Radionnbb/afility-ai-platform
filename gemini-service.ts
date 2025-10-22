import { GoogleGenerativeAI } from "@google/generative-ai"

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!)

export class GeminiService {
  // تحليل المنتج باستخدام Gemini
  static async analyzeProduct(query: string) {
    try {
      const model = genAI.getGenerativeModel({ model: "gemini-pro" })

      const prompt = `
        تحليل استعلام المنتج التالي وتقديم معلومات مفصلة:
        الاستعلام: "${query}"
        
        يرجى تقديم استجابة JSON مع:
        - category: فئة المنتج (مثل "Smartphone", "Laptop", "Headphones")
        - brand: اسم العلامة التجارية المكتشفة
        - model: الطراز المحدد إذا ذُكر
        - keyFeatures: مصفوفة من الميزات الرئيسية المذكورة
        - priceRange: نطاق السعر المقدر {min, max} بالدولار الأمريكي
        - alternatives: مصفوفة من 3-5 اقتراحات منتجات بديلة
        - confidence: درجة الثقة (0-100)
        - suggestedStores: مصفوفة من المتاجر المقترحة
        
        الرد بـ JSON صالح فقط.
      `

      const result = await model.generateContent(prompt)
      const response = await result.response
      const text = response.text()

      // تنظيف النص وإزالة أي تنسيق markdown
      const cleanText = text.replace(/```json\n?|\n?```/g, '').trim()
      
      return JSON.parse(cleanText)
    } catch (error) {
      console.error("Gemini analysis error:", error)
      return this.getFallbackAnalysis(query)
    }
  }

  // تحليل الصورة باستخدام Gemini Vision
  static async analyzeImage(imageBase64: string) {
    try {
      const model = genAI.getGenerativeModel({ model: "gemini-pro-vision" })

      const prompt = `
        حلل هذه الصورة للمنتج وقدم معلومات مفصلة كـ JSON:
        {
          "detectedProduct": "اسم المنتج",
          "category": "فئة المنتج",
          "brand": "اسم العلامة التجارية إذا كانت مرئية",
          "confidence": درجة_الثقة_من_0_إلى_100,
          "features": ["ميزة1", "ميزة2"],
          "estimatedPrice": السعر_المقدر_بالدولار,
          "suggestedStores": ["متجر1", "متجر2"]
        }
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

      const cleanText = text.replace(/```json\n?|\n?```/g, '').trim()
      return JSON.parse(cleanText)
    } catch (error) {
      console.error("Gemini image analysis error:", error)
      return {
        detectedProduct: "منتج غير معروف",
        category: "غير معروف",
        brand: "غير معروف",
        confidence: 0,
        features: [],
        estimatedPrice: 0,
        suggestedStores: [],
      }
    }
  }

  // توليد كوبونات ذكية
  static async generateCoupons(productCategory: string, brand: string) {
    try {
      const model = genAI.getGenerativeModel({ model: "gemini-pro" })

      const prompt = `
        أنشئ 3 كوبونات خصم واقعية لمنتجات ${brand} في فئة ${productCategory}.
        
        قدم مصفوفة JSON مع:
        [
          {
            "code": "كود_الكوبون",
            "discount": نسبة_الخصم,
            "description": "الوصف",
            "minPurchase": الحد_الأدنى_للشراء,
            "validUntil": "التاريخ",
            "store": "اسم المتجر"
          }
        ]
        
        اجعل الكوبونات واقعية وجذابة.
      `

      const result = await model.generateContent(prompt)
      const response = await result.response
      const text = response.text()

      const cleanText = text.replace(/```json\n?|\n?```/g, '').trim()
      return JSON.parse(cleanText)
    } catch (error) {
      console.error("Gemini coupon generation error:", error)
      return this.getDefaultCoupons()
    }
  }

  // تحليل احتياطي
  private static getFallbackAnalysis(query: string) {
    const lowerQuery = query.toLowerCase()
    let category = "Unknown"
    let brand = "Unknown"
    let confidence = 40

    if (lowerQuery.includes("iphone") || lowerQuery.includes("phone")) {
      category = "Smartphone"
      brand = "Apple"
      confidence = 70
    } else if (lowerQuery.includes("laptop") || lowerQuery.includes("computer")) {
      category = "Laptop"
      confidence = 70
    }

    return {
      category,
      brand,
      model: "Unknown",
      keyFeatures: [],
      priceRange: { min: 100, max: 2000 },
      alternatives: [],
      confidence,
      suggestedStores: ["Amazon", "eBay", "Best Buy"],
    }
  }

  // كوبونات افتراضية
  private static getDefaultCoupons() {
    return [
      {
        code: "SAVE10",
        discount: 10,
        description: "خصم إضافي 10%",
        minPurchase: 50,
        validUntil: "2024-12-31",
        store: "متجر إلكتروني",
      },
      {
        code: "TECH15",
        discount: 15,
        description: "خصم 15% على الإلكترونيات",
        minPurchase: 100,
        validUntil: "2024-12-31",
        store: "متجر التقنية",
      },
      {
        code: "WELCOME20",
        discount: 20,
        description: "خصم ترحيبي 20%",
        minPurchase: 200,
        validUntil: "2024-12-31",
        store: "المتجر الرئيسي",
      },
    ]
  }
}
