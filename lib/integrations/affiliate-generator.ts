// Affiliate Link Generator
import { generateAffiliateLink } from "./admitad"

interface AffiliateLink {
  store: string
  originalUrl: string
  affiliateUrl: string
  commission?: number
}

export async function generateAffiliateLinks(products: any[]): Promise<AffiliateLink[]> {
  try {
    const affiliateLinks: AffiliateLink[] = []

    for (const product of products) {
      const affiliateUrl = await generateAffiliateLink(product.store, product.url, product.asin)

      affiliateLinks.push({
        store: product.store,
        originalUrl: product.url,
        affiliateUrl,
        commission: product.commission,
      })
    }

    return affiliateLinks
  } catch (error) {
    console.error("[v0] Affiliate link generation error:", error)
    return []
  }
}

export function addAmazonTag(url: string, tag: string): string {
  try {
    const amazonUrl = new URL(url)
    amazonUrl.searchParams.set("tag", tag)
    return amazonUrl.toString()
  } catch {
    return url
  }
}

export function addAffiliateParams(url: string, params: Record<string, string>): string {
  try {
    const urlObj = new URL(url)
    Object.entries(params).forEach(([key, value]) => {
      urlObj.searchParams.set(key, value)
    })
    return urlObj.toString()
  } catch {
    return url
  }
}
