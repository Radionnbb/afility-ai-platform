export interface Product {
  id: string
  name: string
  description: string
  price: number
  image: string
  url: string
  store: string
  rating: number
  reviews: number
  category: string
}

const MOCK_STORES = [
  "Amazon",
  "eBay",
  "AliExpress",
  "Walmart",
  "Target",
  "Best Buy",
  "Newegg",
  "Etsy",
  "Shopify",
  "Noon",
]

const CATEGORIES = ["إلكترونيات", "ملابس", "منزل ومطبخ", "رياضة", "جمال", "كتب", "ألعاب", "سيارات", "صحة", "مجوهرات"]

export async function searchProducts(query: string, limit = 20): Promise<Product[]> {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 1000))

  const products: Product[] = []

  for (let i = 0; i < limit; i++) {
    const store = MOCK_STORES[Math.floor(Math.random() * MOCK_STORES.length)]
    const category = CATEGORIES[Math.floor(Math.random() * CATEGORIES.length)]
    const basePrice = Math.floor(Math.random() * 500) + 10

    products.push({
      id: `product_${i + 1}`,
      name: `${query} - منتج عالي الجودة ${i + 1}`,
      description: `${query} ممتاز من ${store} في فئة ${category}. منتج أصلي بضمان كامل وجودة عالية.`,
      price: basePrice,
      image: `/placeholder.svg?height=200&width=200&text=${encodeURIComponent(query)}`,
      url: `https://${store.toLowerCase()}.com/product/${i + 1}`,
      store,
      rating: Math.floor(Math.random() * 2) + 4, // 4-5 stars
      reviews: Math.floor(Math.random() * 1000) + 50,
      category,
    })
  }

  return products
}

export async function analyzeImageWithGemini(base64Image: string) {
  // Mock image analysis
  await new Promise((resolve) => setTimeout(resolve, 2000))

  return {
    success: true,
    productName: "منتج محلل من الصورة",
    description: "تم تحليل الصورة بنجاح باستخدام الذكاء الاصطناعي",
    category: "إلكترونيات",
    estimatedPrice: "100-200 دولار",
    features: ["جودة عالية", "تصميم عصري", "ضمان شامل"],
  }
}
