"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Star, ExternalLink, Brain, TrendingDown, Sparkles, Award, ShoppingCart, Ticket, Copy } from "lucide-react"
import Link from "next/link"
import { useToast } from "@/hooks/use-toast"

const mockResults = [
  {
    id: 1,
    name: "iPhone 14 Pro 128GB - Space Black",
    originalPrice: 999,
    price: 749,
    discount: 25,
    image: "/iphone-14-pro-black.png",
    source: "eBay",
    rating: 4.6,
    reviewsCount: 1847,
    availability: "In Stock",
    similarity: 100,
    savings: 250,
    verified: true,
    coupon: {
      code: "SAVE10",
      discount: 10,
      description: "Extra 10% off",
      finalPrice: 674,
    },
    affiliateLink: "https://ebay.com/affiliate/iphone-14-pro?ref=afility",
  },
  {
    id: 2,
    name: "iPhone 14 Pro 128GB - Space Black",
    originalPrice: 999,
    price: 799,
    discount: 20,
    image: "/iphone-14-pro-black.png",
    source: "Best Buy",
    rating: 4.8,
    reviewsCount: 2341,
    availability: "In Stock",
    similarity: 100,
    savings: 200,
    verified: true,
    coupon: {
      code: "TECH10",
      discount: 10,
      description: "Extra 10% off electronics",
      finalPrice: 719,
    },
    affiliateLink: "https://bestbuy.com/affiliate/iphone-14-pro?ref=afility",
  },
  {
    id: 3,
    name: "iPhone 14 Pro 128GB - Space Black",
    originalPrice: 999,
    price: 849,
    discount: 15,
    image: "/iphone-14-pro-black.png",
    source: "Amazon",
    rating: 4.7,
    reviewsCount: 3421,
    availability: "In Stock",
    similarity: 100,
    savings: 150,
    verified: true,
    coupon: {
      code: "PRIME10",
      discount: 10,
      description: "Prime member 10% off",
      finalPrice: 764,
    },
    affiliateLink: "https://amazon.com/affiliate/iphone-14-pro?ref=afility",
  },
  {
    id: 4,
    name: "iPhone 14 Pro 128GB - Space Black",
    originalPrice: 999,
    price: 879,
    discount: 12,
    image: "/iphone-14-pro-black.png",
    source: "Walmart",
    rating: 4.5,
    reviewsCount: 1654,
    availability: "Limited Stock",
    similarity: 100,
    savings: 120,
    verified: true,
    coupon: {
      code: "MOBILE10",
      discount: 10,
      description: "Mobile app 10% off",
      finalPrice: 791,
    },
    affiliateLink: "https://walmart.com/affiliate/iphone-14-pro?ref=afility",
  },
  {
    id: 5,
    name: "iPhone 14 Pro 128GB - Space Black",
    originalPrice: 999,
    price: 899,
    discount: 10,
    image: "/iphone-14-pro-black.png",
    source: "Target",
    rating: 4.4,
    reviewsCount: 987,
    availability: "In Stock",
    similarity: 100,
    savings: 100,
    verified: true,
    coupon: {
      code: "TARGET10",
      discount: 10,
      description: "Target Circle 10% off",
      finalPrice: 809,
    },
    affiliateLink: "https://target.com/affiliate/iphone-14-pro?ref=afility",
  },
]

export default function ResultsPage() {
  const [results, setResults] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(true)
  const { toast } = useToast()

  useEffect(() => {
    const searchResults = sessionStorage.getItem("searchResults")
    if (searchResults) {
      setResults(JSON.parse(searchResults))
    }
    setIsLoading(false)
  }, [])

  const copyCouponCode = (code: string) => {
    navigator.clipboard.writeText(code)
    toast({
      title: "Coupon Code Copied!",
      description: `Code "${code}" has been copied to your clipboard.`,
    })
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-black via-gray-900 to-black">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <div className="text-white text-lg">Analyzing product and finding better deals...</div>
        </div>
      </div>
    )
  }

  if (!results || !results.products || results.products.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-black via-gray-900 to-black">
        <div className="text-center">
          <div className="text-white text-xl mb-4">No alternatives found</div>
          <Button asChild>
            <Link href="/search">Try Another Search</Link>
          </Button>
        </div>
      </div>
    )
  }

  const displayResults = results?.products || mockResults
  const totalSavings = displayResults.reduce((sum: number, product: any) => sum + (product.savings || 0), 0)
  const bestDeal = displayResults[0]

  return (
    <div className="min-h-screen py-8 bg-gradient-to-br from-black via-gray-900 to-black">
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 right-20 w-60 h-60 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 left-20 w-60 h-60 bg-blue-600/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10 max-w-6xl">
        {/* AI Analysis Results */}
        <Card className="mb-8 border-gray-800 bg-gradient-to-r from-blue-500/10 via-blue-600/10 to-blue-500/10 backdrop-blur-xl">
          <CardHeader>
            <div className="flex items-center gap-2">
              <div className="p-2 rounded-lg bg-gradient-to-r from-blue-500 to-blue-600">
                <Brain className="w-6 h-6 text-white" />
              </div>
              <CardTitle className="text-xl text-white flex items-center gap-2">
                AI Analysis Complete
                <Sparkles className="w-5 h-5 text-blue-400" />
              </CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-4 gap-4">
              <div className="text-center p-4 rounded-lg bg-gradient-to-br from-gray-800/50 to-gray-900/50">
                <div className="text-2xl font-bold text-green-400">${totalSavings}</div>
                <div className="text-sm text-gray-400">Max Savings Available</div>
              </div>
              <div className="text-center p-4 rounded-lg bg-gradient-to-br from-gray-800/50 to-gray-900/50">
                <div className="text-2xl font-bold text-blue-400">{displayResults.length}</div>
                <div className="text-sm text-gray-400">Stores Found</div>
              </div>
              <div className="text-center p-4 rounded-lg bg-gradient-to-br from-gray-800/50 to-gray-900/50">
                <div className="text-2xl font-bold text-purple-400">{bestDeal?.source}</div>
                <div className="text-sm text-gray-400">Best Deal Store</div>
              </div>
              <div className="text-center p-4 rounded-lg bg-gradient-to-br from-gray-800/50 to-gray-900/50">
                <div className="text-2xl font-bold text-yellow-400">{bestDeal?.discount}%</div>
                <div className="text-sm text-gray-400">Best Discount</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Results Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-3xl font-bold text-white">Found {displayResults.length} stores selling this product</h1>
          </div>
          <p className="text-gray-400 text-lg">Sorted by price - cheapest first. All stores verified and trusted.</p>
        </div>

        {/* Best Deal Highlight */}
        {bestDeal && (
          <Card className="mb-8 border-2 border-green-500/30 bg-gradient-to-r from-green-500/10 via-green-600/10 to-green-500/10 backdrop-blur-xl relative overflow-hidden">
            <div className="absolute top-4 right-4">
              <Badge className="bg-green-600 text-white flex items-center gap-1">
                <Award className="w-3 h-3" />
                Best Deal
              </Badge>
            </div>
            <CardContent className="p-6">
              <div className="flex flex-col md:flex-row gap-6">
                <div className="md:w-48 flex-shrink-0">
                  <img
                    src={bestDeal.image || "/placeholder.svg"}
                    alt={bestDeal.name}
                    className="w-full h-48 object-cover rounded-lg"
                  />
                </div>
                <div className="flex-1 space-y-4">
                  <div>
                    <h3 className="text-2xl font-bold text-white mb-2">{bestDeal.name}</h3>
                    <div className="flex items-center gap-2 mb-3">
                      <Badge className="bg-green-600 text-white text-lg px-3 py-1">{bestDeal.source}</Badge>
                      <Badge variant="outline" className="text-green-400 border-green-400">
                        Verified Store
                      </Badge>
                      <Badge className="bg-green-600 text-white">{bestDeal.availability}</Badge>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="flex items-center">
                        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        <span className="ml-1 text-sm font-medium text-gray-300">{bestDeal.rating}</span>
                      </div>
                      <span className="text-sm text-gray-400">
                        ({(bestDeal.reviewsCount || 0).toLocaleString()} reviews)
                      </span>
                    </div>
                  </div>

                  {/* Coupon for Best Deal */}
                  {bestDeal.coupon && (
                    <div className="p-4 rounded-lg bg-gradient-to-r from-yellow-500/20 to-yellow-600/20 border border-yellow-500/30">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <Ticket className="w-5 h-5 text-yellow-400" />
                          <div>
                            <div className="text-yellow-400 font-semibold">{bestDeal.coupon.description}</div>
                            <div className="text-sm text-gray-300">
                              Final Price:{" "}
                              <span className="font-bold text-green-400">${bestDeal.coupon.finalPrice}</span>
                            </div>
                          </div>
                        </div>
                        <Button
                          size="sm"
                          variant="outline"
                          className="border-yellow-500/50 text-yellow-400 hover:bg-yellow-500/10 bg-transparent"
                          onClick={() => copyCouponCode(bestDeal.coupon.code)}
                        >
                          <Copy className="w-3 h-3 mr-1" />
                          {bestDeal.coupon.code}
                        </Button>
                      </div>
                    </div>
                  )}

                  <div className="flex items-center justify-between">
                    <div className="space-y-2">
                      <div className="flex items-center gap-3">
                        <span className="text-3xl font-bold text-green-400">
                          ${bestDeal.coupon ? bestDeal.coupon.finalPrice : bestDeal.price}
                        </span>
                        {bestDeal.coupon && (
                          <span className="text-xl text-gray-500 line-through">${bestDeal.price}</span>
                        )}
                        <span className="text-xl text-gray-500 line-through">${bestDeal.originalPrice}</span>
                        <Badge className="bg-red-600 text-white flex items-center gap-1 text-lg px-3 py-1">
                          <TrendingDown className="w-4 h-4" />
                          {bestDeal.discount}% off
                        </Badge>
                      </div>
                      <div className="text-lg text-green-400 font-bold">
                        💰 You save $
                        {bestDeal.coupon ? bestDeal.originalPrice - bestDeal.coupon.finalPrice : bestDeal.savings}!
                      </div>
                    </div>

                    <Button
                      size="lg"
                      className="flex items-center gap-2 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-400 hover:to-green-500 shadow-lg hover:shadow-green-500/25 transition-all duration-300 text-lg px-8 py-4"
                      asChild
                    >
                      <a href={bestDeal.affiliateLink} target="_blank" rel="noopener noreferrer">
                        <ShoppingCart className="w-5 h-5" />
                        Buy Now - Best Price
                      </a>
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* All Results */}
        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-white mb-6">All Available Stores</h2>

          {displayResults.map((product: any, index: number) => (
            <Card
              key={product.id}
              className={`border-gray-800 bg-gradient-to-br from-gray-900/80 to-black/80 backdrop-blur-xl hover:shadow-xl hover:shadow-blue-500/10 transition-all duration-500 transform hover:scale-[1.01] ${
                index === 0 ? "ring-2 ring-green-500/30" : ""
              }`}
            >
              <CardContent className="p-6">
                <div className="flex flex-col md:flex-row gap-6">
                  <div className="md:w-40 flex-shrink-0">
                    <img
                      src={product.image || "/placeholder.svg"}
                      alt={product.name}
                      className="w-full h-40 object-cover rounded-lg"
                    />
                  </div>

                  <div className="flex-1 space-y-4">
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-2xl font-bold text-white">#{index + 1}</span>
                        {index === 0 && <Badge className="bg-green-600 text-white">Cheapest</Badge>}
                        {product.verified && (
                          <Badge variant="outline" className="text-blue-400 border-blue-400">
                            ✓ Verified
                          </Badge>
                        )}
                      </div>

                      <h3 className="text-lg font-semibold text-white mb-2">{product.name}</h3>

                      <div className="flex items-center gap-2 mb-2">
                        <Badge variant="secondary" className="bg-gray-700 text-gray-300 text-base px-3 py-1">
                          {product.source}
                        </Badge>
                        {product.availability === "In Stock" ? (
                          <Badge className="bg-green-600 text-white">In Stock</Badge>
                        ) : (
                          <Badge variant="outline" className="text-orange-400 border-orange-400">
                            Limited Stock
                          </Badge>
                        )}
                      </div>

                      <div className="flex items-center gap-2">
                        <div className="flex items-center">
                          <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                          <span className="ml-1 text-sm font-medium text-gray-300">{product.rating}</span>
                        </div>
                        <span className="text-sm text-gray-400">
                          ({(product.reviewsCount || 0).toLocaleString()} reviews)
                        </span>
                      </div>
                    </div>

                    {/* Coupon Section - يجب أن يظهر هنا */}
                    {product.coupon && (
                      <div className="p-3 rounded-lg bg-gradient-to-r from-yellow-500/10 to-yellow-600/10 border border-yellow-500/20 mb-3">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <Ticket className="w-4 h-4 text-yellow-400" />
                            <div>
                              <div className="text-yellow-400 font-medium text-sm">{product.coupon.description}</div>
                              <div className="text-xs text-gray-400">
                                Final: <span className="font-bold text-green-400">${product.coupon.finalPrice}</span>
                              </div>
                            </div>
                          </div>
                          <Button
                            size="sm"
                            variant="outline"
                            className="border-yellow-500/50 text-yellow-400 hover:bg-yellow-500/10 text-xs px-2 py-1 bg-transparent"
                            onClick={() => copyCouponCode(product.coupon.code)}
                          >
                            <Copy className="w-3 h-3 mr-1" />
                            {product.coupon.code}
                          </Button>
                        </div>
                      </div>
                    )}

                    <div className="flex items-center justify-between">
                      <div className="space-y-1">
                        <div className="flex items-center gap-3">
                          <span className="text-2xl font-bold text-white">
                            ${product.coupon ? product.coupon.finalPrice : product.price}
                          </span>
                          {product.coupon && (
                            <span className="text-lg text-gray-500 line-through">${product.price}</span>
                          )}
                          <span className="text-lg text-gray-500 line-through">${product.originalPrice}</span>
                          <Badge className="bg-red-600 text-white flex items-center gap-1">
                            <TrendingDown className="w-3 h-3" />
                            {product.discount}% off
                          </Badge>
                        </div>
                        <div className="text-sm text-green-400 font-medium">
                          💰 Save $
                          {product.coupon ? product.originalPrice - product.coupon.finalPrice : product.savings} vs
                          original price
                        </div>
                      </div>

                      <Button
                        size="lg"
                        className="flex items-center gap-2 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-400 hover:to-blue-500 shadow-lg hover:shadow-blue-500/25 transition-all duration-300"
                        asChild
                      >
                        <a href={product.affiliateLink} target="_blank" rel="noopener noreferrer">
                          <ExternalLink className="w-4 h-4" />
                          Buy Now
                        </a>
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Summary */}
        <Card className="mt-12 border-gray-800 bg-gradient-to-r from-blue-600/20 via-blue-500/20 to-blue-600/20 backdrop-blur-xl">
          <CardContent className="p-8 text-center">
            <h2 className="text-2xl font-bold text-white mb-4">💡 Smart Shopping Summary</h2>
            <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
              Our AI found {displayResults.length} verified stores selling this exact product. The cheapest option saves
              you ${bestDeal?.savings} compared to the original price!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                variant="secondary"
                className="bg-white text-blue-600 hover:bg-gray-100 shadow-lg hover:shadow-xl transition-all duration-300"
                asChild
              >
                <Link href="/search">Search Another Product</Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-white/30 text-white hover:bg-white/10 hover:border-white/50 transition-all duration-300 bg-transparent"
                asChild
              >
                <Link href="/profile">View Search History</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
