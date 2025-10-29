// OpenAI Integration for product analysis and comparison
import { OpenAI } from "openai"

interface ProductAnalysis {
  summary: string
  pros: string[]
  cons: string[]
  alternatives: string[]
  recommendation: string
}

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

export async function analyzeProductWithOpenAI(productInfo: {
  title: string
  description: string
  price: number
  store: string
}): Promise<ProductAnalysis | null> {
  try {
    if (!process.env.OPENAI_API_KEY) {
      console.error("[v0] OPENAI_API_KEY not configured")
      return null
    }

    const prompt = `Analyze this product and provide insights:
    
Product: ${productInfo.title}
Description: ${productInfo.description}
Price: $${productInfo.price}
Store: ${productInfo.store}

Please provide a JSON response with:
{
  "summary": "Brief product summary",
  "pros": ["pro1", "pro2", "pro3"],
  "cons": ["con1", "con2"],
  "alternatives": ["alternative1", "alternative2"],
  "recommendation": "Your recommendation"
}`

    const message = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "user",
          content: prompt,
        },
      ],
      temperature: 0.7,
      max_tokens: 500,
    })

    const responseText = message.choices[0]?.message?.content || ""

    try {
      // Extract JSON from response
      const jsonMatch = responseText.match(/\{[\s\S]*\}/)
      if (jsonMatch) {
        return JSON.parse(jsonMatch[0])
      }
    } catch (parseError) {
      console.error("[v0] Failed to parse OpenAI response:", parseError)
    }

    return {
      summary: responseText,
      pros: [],
      cons: [],
      alternatives: [],
      recommendation: "See summary for details",
    }
  } catch (error) {
    console.error("[v0] OpenAI analysis error:", error)
    return null
  }
}

export async function compareProducts(products: any[]): Promise<string> {
  try {
    if (!process.env.OPENAI_API_KEY) {
      return "OpenAI API not configured"
    }

    const productList = products
      .map((p, i) => `${i + 1}. ${p.title} - $${p.price} at ${p.store} (Rating: ${p.rating}/5)`)
      .join("\n")

    const prompt = `Compare these products and recommend the best value:

${productList}

Provide a brief comparison and recommendation.`

    const message = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "user",
          content: prompt,
        },
      ],
      temperature: 0.7,
      max_tokens: 300,
    })

    return message.choices[0]?.message?.content || "Comparison failed"
  } catch (error) {
    console.error("[v0] Product comparison error:", error)
    return "Comparison failed"
  }
}
