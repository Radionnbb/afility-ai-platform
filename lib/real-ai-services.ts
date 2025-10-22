import { GoogleGenerativeAI } from "@google/generative-ai"

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!)

export async function analyzeWithGemini(prompt: string) {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-pro" })
    const result = await model.generateContent(prompt)
    const response = await result.response
    const text = response.text()

    // Try to parse as JSON, fallback to text
    try {
      return JSON.parse(text)
    } catch {
      return { analysis: text }
    }
  } catch (error) {
    console.error("Gemini AI Error:", error)
    return { error: "AI analysis failed" }
  }
}

export async function analyzeImageWithGemini(base64Image: string) {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-pro-vision" })

    const prompt = `Analyze this product image and return JSON with:
    {
      "productName": "name of the product",
      "description": "detailed description",
      "category": "product category",
      "estimatedPrice": "price range",
      "features": ["feature1", "feature2"],
      "confidence": 0.9
    }`

    const result = await model.generateContent([
      prompt,
      {
        inlineData: {
          data: base64Image,
          mimeType: "image/jpeg",
        },
      },
    ])

    const response = await result.response
    const text = response.text()

    try {
      return JSON.parse(text)
    } catch {
      return {
        productName: "Product from Image",
        description: text,
        category: "General",
        confidence: 0.7,
      }
    }
  } catch (error) {
    console.error("Gemini Vision Error:", error)
    return {
      productName: "Unknown Product",
      description: "Image analysis failed",
      category: "General",
      confidence: 0.5,
    }
  }
}

export async function analyzeUrlWithGemini(url: string) {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-pro" })

    const prompt = `Analyze this product URL and extract information: ${url}
    Return JSON with:
    {
      "productName": "name of the product",
      "description": "product description",
      "price": "product price",
      "category": "product category",
      "features": ["feature1", "feature2"],
      "store": "store name",
      "availability": "availability status"
    }`

    const result = await model.generateContent(prompt)
    const response = await result.response
    const text = response.text()

    try {
      return JSON.parse(text)
    } catch {
      return {
        productName: "Product from URL",
        description: text,
        category: "General",
        store: "Online Store",
      }
    }
  } catch (error) {
    console.error("URL Analysis Error:", error)
    return {
      productName: "Product from URL",
      description: "URL analysis failed",
      category: "General",
      store: "Unknown Store",
    }
  }
}
