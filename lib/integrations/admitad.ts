// Admitad API Integration for affiliate links and product search
interface AdmitadProduct {
  id: string
  title: string
  price: number
  image: string
  store: string
  deeplink: string
  commission: number
}

interface AdmitadSearchResult {
  success: boolean
  products?: AdmitadProduct[]
  error?: string
}

export async function searchAdmitadProducts(query: string): Promise<AdmitadSearchResult> {
  try {
    const clientId = process.env.ADMITAD_CLIENT_ID
    const clientSecret = process.env.ADMITAD_CLIENT_SECRET
    const base64Header = process.env.ADMITAD_BASE64_HEADER

    if (!clientId || !clientSecret || !base64Header) {
      console.error("[v0] Admitad credentials not configured")
      return { success: false, error: "Admitad credentials not configured" }
    }

    // Get access token
    const tokenResponse = await fetch("https://api.admitad.com/authorize/", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: `Basic ${base64Header}`,
      },
      body: new URLSearchParams({
        grant_type: "client_credentials",
        client_id: clientId,
        client_secret: clientSecret,
        scope: "public",
      }).toString(),
    })

    if (!tokenResponse.ok) {
      console.error("[v0] Admitad token error:", tokenResponse.status)
      return { success: false, error: "Failed to get Admitad token" }
    }

    const tokenData = await tokenResponse.json()
    const accessToken = tokenData.access_token

    // Search for products
    const searchResponse = await fetch(`https://api.admitad.com/products/?q=${encodeURIComponent(query)}&limit=10`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })

    if (!searchResponse.ok) {
      console.error("[v0] Admitad search error:", searchResponse.status)
      return { success: false, error: "Admitad search failed" }
    }

    const searchData = await searchResponse.json()

    const products: AdmitadProduct[] = (searchData.results || []).map((item: any) => ({
      id: item.id,
      title: item.name,
      price: item.price || 0,
      image: item.image || "/placeholder.svg",
      store: item.shop_name || "Unknown Store",
      deeplink: item.deeplink || "",
      commission: item.commission || 0,
    }))

    return { success: true, products }
  } catch (error) {
    console.error("[v0] Admitad integration error:", error)
    return { success: false, error: "Admitad integration failed" }
  }
}

export async function generateAffiliateLink(store: string, url: string, asin?: string): Promise<string> {
  try {
    const amazonTag = process.env.AMAZON_ASSOCIATE_TAG

    // Amazon affiliate link
    if (store.toLowerCase().includes("amazon") && amazonTag) {
      const amazonUrl = new URL(url)
      amazonUrl.searchParams.set("tag", amazonTag)
      return amazonUrl.toString()
    }

    // Admitad deeplink (would need to be generated via API)
    if (store.toLowerCase().includes("admitad")) {
      // This would require additional Admitad API calls
      return url
    }

    // Fallback: return original URL
    return url
  } catch (error) {
    console.error("[v0] Affiliate link generation error:", error)
    return url
  }
}
