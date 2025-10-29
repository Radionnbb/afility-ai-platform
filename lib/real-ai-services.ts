export async function analyzeWithOpenAI(prompt: string) {
  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "user",
            content: prompt,
          },
        ],
        temperature: 0.7,
        max_tokens: 1000,
      }),
    })

    if (!response.ok) {
      throw new Error(`OpenAI API error: ${response.statusText}`)
    }

    const data = await response.json()
    const content = data.choices?.[0]?.message?.content || ""

    try {
      return JSON.parse(content)
    } catch {
      return { analysis: content }
    }
  } catch (error) {
    console.error("OpenAI Error:", error)
    return { error: "AI analysis failed" }
  }
}

export async function analyzeImageWithOpenAI(base64Image: string) {
  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: "gpt-4-vision-preview",
        messages: [
          {
            role: "user",
            content: [
              {
                type: "text",
                text: `Analyze this product image and return JSON with:
                {
                  "productName": "name of the product",
                  "description": "detailed description",
                  "category": "product category",
                  "estimatedPrice": "price range",
                  "features": ["feature1", "feature2"],
                  "confidence": 0.9
                }`,
              },
              {
                type: "image_url",
                image_url: {
                  url: `data:image/jpeg;base64,${base64Image}`,
                },
              },
            ],
          },
        ],
        max_tokens: 1000,
      }),
    })

    if (!response.ok) {
      throw new Error(`OpenAI Vision API error: ${response.statusText}`)
    }

    const data = await response.json()
    const content = data.choices?.[0]?.message?.content || ""

    try {
      return JSON.parse(content)
    } catch {
      return {
        productName: "Product from Image",
        description: content,
        category: "General",
        confidence: 0.7,
      }
    }
  } catch (error) {
    console.error("OpenAI Vision Error:", error)
    return {
      productName: "Unknown Product",
      description: "Image analysis failed",
      category: "General",
      confidence: 0.5,
    }
  }
}

export async function analyzeUrlWithOpenAI(url: string) {
  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "user",
            content: `Analyze this product URL and extract information: ${url}
            Return JSON with:
            {
              "productName": "name of the product",
              "description": "product description",
              "price": "product price",
              "category": "product category",
              "features": ["feature1", "feature2"],
              "store": "store name",
              "availability": "availability status"
            }`,
          },
        ],
        temperature: 0.7,
        max_tokens: 1000,
      }),
    })

    if (!response.ok) {
      throw new Error(`OpenAI API error: ${response.statusText}`)
    }

    const data = await response.json()
    const content = data.choices?.[0]?.message?.content || ""

    try {
      return JSON.parse(content)
    } catch {
      return {
        productName: "Product from URL",
        description: content,
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

export const analyzeWithGemini = analyzeWithOpenAI
export const analyzeImageWithGemini = analyzeImageWithOpenAI
export const analyzeUrlWithGemini = analyzeUrlWithOpenAI
