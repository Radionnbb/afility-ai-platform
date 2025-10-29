"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Star,
  ExternalLink,
  Filter,
  Search,
  ShoppingCart,
  Truck,
  ArrowLeft,
  Sparkles,
  DollarSign,
  TrendingUp,
  ThumbsUp,
  ThumbsDown,
  Lightbulb,
} from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"

interface SearchResult {
  id: string
  title: string
  store: string
  originalPrice: number
  discountedPrice: number
  discount: string
  rating: string
  reviews: number
  image: string
  url: string
  shipping: string
  availability: string
}

interface SearchData {
  query: string
  results: SearchResult[]
  totalResults: number
  searchType: string
  analysis?: {
    summary: string
    pros: string[]
    cons: string[]
    alternatives: string[]
    recommendation: string
  }
  cheapestOption?: SearchResult
  affiliateLinks?: Array<{
    store: string
    originalUrl: string
    affiliateUrl: string
  }>
  savings?: {
    amount: string
    percent: string
    originalPrice: number
    cheapestPrice: number
  }
}

export default function ResultsPage() {
  const [searchData, setSearchData] = useState<SearchData | null>(null)
  const [filteredResults, setFilteredResults] = useState<SearchResult[]>([])
  const [sortBy, setSortBy] = useState("price-low")
  const [filterStore, setFilterStore] = useState("all")
  const [priceRange, setPriceRange] = useState({ min: "", max: "" })
  const [copiedLink, setCopiedLink] = useState<string | null>(null)
  const router = useRouter()

  useEffect(() => {
    // Get search results from sessionStorage
    const results = sessionStorage.getItem("searchResults")
    if (results) {
      const data = JSON.parse(results)
      setSearchData(data)
      setFilteredResults(data.results || data.data?.results || [])
    } else {
      // Redirect to search if no results
      router.push("/search")
    }
  }, [router])

  useEffect(() => {
    if (!searchData) return

    let filtered = [...(searchData.results || searchData.data?.results || [])]

    // Filter by store
    if (filterStore !== "all") {
      filtered = filtered.filter((result) => result.store === filterStore)
    }

    // Filter by price range
    if (priceRange.min) {
      filtered = filtered.filter((result) => result.discountedPrice >= Number.parseInt(priceRange.min))
    }
    if (priceRange.max) {
      filtered = filtered.filter((result) => result.discountedPrice <= Number.parseInt(priceRange.max))
    }

    // Sort results
    switch (sortBy) {
      case "price-low":
        filtered.sort((a, b) => a.discountedPrice - b.discountedPrice)
        break
      case "price-high":
        filtered.sort((a, b) => b.discountedPrice - a.discountedPrice)
        break
      case "rating":
        filtered.sort((a, b) => Number.parseFloat(b.rating) - Number.parseFloat(a.rating))
        break
      case "reviews":
        filtered.sort((a, b) => b.reviews - a.reviews)
        break
    }

    setFilteredResults(filtered)
  }, [searchData, sortBy, filterStore, priceRange])

  const copyToClipboard = (text: string, linkId: string) => {
    navigator.clipboard.writeText(text)
    setCopiedLink(linkId)
    setTimeout(() => setCopiedLink(null), 2000)
  }

  if (!searchData) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-black via-gray-900 to-black">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-gray-400">Loading results...</p>
        </div>
      </div>
    )
  }

  const stores = Array.from(
    new Set((searchData.results || searchData.data?.results || []).map((result) => result.store)),
  )
  const totalSavings = (searchData.results || searchData.data?.results || []).reduce(
    (sum, result) => sum + (result.originalPrice - result.discountedPrice),
    0,
  )

  const cheapestProduct = (searchData.results || searchData.data?.results || []).reduce((prev, current) =>
    (current.discountedPrice || Number.POSITIVE_INFINITY) < (prev.discountedPrice || Number.POSITIVE_INFINITY)
      ? current
      : prev,
  )

  return (
    <div className="min-h-screen py-8 bg-gradient-to-br from-black via-gray-900 to-black">
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-600/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-4 mb-6">
            <Button variant="ghost" className="text-gray-400 hover:text-white" asChild>
              <Link href="/search">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Search
              </Link>
            </Button>
          </div>

          <div className="text-center mb-8">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-blue-500/10 to-blue-600/10 border border-blue-500/20 mb-4">
              <Sparkles className="w-4 h-4 text-blue-400 mr-2" />
              <span className="text-sm text-blue-400 font-medium">Search Results</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold text-white mb-2">Results for "{searchData.query}"</h1>
            <p className="text-lg text-gray-400">
              Found {filteredResults.length} alternatives • Potential savings: ${totalSavings.toFixed(2)}
            </p>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <Card className="border-gray-800 bg-gradient-to-br from-gray-900/80 to-black/80 backdrop-blur-xl">
              <CardContent className="p-4 text-center">
                <div className="w-12 h-12 mx-auto bg-gradient-to-r from-green-500/20 to-green-600/20 rounded-full flex items-center justify-center mb-3">
                  <DollarSign className="w-6 h-6 text-green-400" />
                </div>
                <div className="text-2xl font-bold text-white">
                  ${searchData.savings?.amount || totalSavings.toFixed(2)}
                </div>
                <div className="text-sm text-gray-400">Total Savings</div>
                {searchData.savings && (
                  <div className="text-xs text-green-400 mt-1">{searchData.savings.percent}% off</div>
                )}
              </CardContent>
            </Card>

            <Card className="border-gray-800 bg-gradient-to-br from-gray-900/80 to-black/80 backdrop-blur-xl">
              <CardContent className="p-4 text-center">
                <div className="w-12 h-12 mx-auto bg-gradient-to-r from-blue-500/20 to-blue-600/20 rounded-full flex items-center justify-center mb-3">
                  <ShoppingCart className="w-6 h-6 text-blue-400" />
                </div>
                <div className="text-2xl font-bold text-white">{filteredResults.length}</div>
                <div className="text-sm text-gray-400">Alternatives Found</div>
              </CardContent>
            </Card>

            <Card className="border-gray-800 bg-gradient-to-br from-gray-900/80 to-black/80 backdrop-blur-xl">
              <CardContent className="p-4 text-center">
                <div className="w-12 h-12 mx-auto bg-gradient-to-r from-purple-500/20 to-purple-600/20 rounded-full flex items-center justify-center mb-3">
                  <TrendingUp className="w-6 h-6 text-purple-400" />
                </div>
                <div className="text-2xl font-bold text-white">{searchData.savings?.percent || "10"}%</div>
                <div className="text-sm text-gray-400">Average Discount</div>
              </CardContent>
            </Card>
          </div>
        </div>

        <div className="grid lg:grid-cols-4 gap-8">
          {/* Filters Sidebar */}
          <div className="lg:col-span-1">
            <Card className="border-gray-800 bg-gradient-to-br from-gray-900/80 to-black/80 backdrop-blur-xl sticky top-24">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-white">
                  <Filter className="w-5 h-5" />
                  Filters & Sort
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Sort */}
                <div>
                  <label className="text-sm font-medium text-gray-300 mb-2 block">Sort By</label>
                  <Select value={sortBy} onValueChange={setSortBy}>
                    <SelectTrigger className="bg-gray-800 border-gray-700 text-white">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-gray-800 border-gray-700">
                      <SelectItem value="price-low">Price: Low to High</SelectItem>
                      <SelectItem value="price-high">Price: High to Low</SelectItem>
                      <SelectItem value="rating">Highest Rated</SelectItem>
                      <SelectItem value="reviews">Most Reviews</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <Separator className="bg-gray-700" />

                {/* Store Filter */}
                <div>
                  <label className="text-sm font-medium text-gray-300 mb-2 block">Store</label>
                  <Select value={filterStore} onValueChange={setFilterStore}>
                    <SelectTrigger className="bg-gray-800 border-gray-700 text-white">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-gray-800 border-gray-700">
                      <SelectItem value="all">All Stores</SelectItem>
                      {stores.map((store) => (
                        <SelectItem key={store} value={store}>
                          {store}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <Separator className="bg-gray-700" />

                {/* Price Range */}
                <div>
                  <label className="text-sm font-medium text-gray-300 mb-2 block">Price Range</label>
                  <div className="grid grid-cols-2 gap-2">
                    <Input
                      placeholder="Min"
                      type="number"
                      value={priceRange.min}
                      onChange={(e) => setPriceRange((prev) => ({ ...prev, min: e.target.value }))}
                      className="bg-gray-800 border-gray-700 text-white placeholder-gray-400"
                    />
                    <Input
                      placeholder="Max"
                      type="number"
                      value={priceRange.max}
                      onChange={(e) => setPriceRange((prev) => ({ ...prev, max: e.target.value }))}
                      className="bg-gray-800 border-gray-700 text-white placeholder-gray-400"
                    />
                  </div>
                </div>

                <Button
                  variant="outline"
                  className="w-full border-gray-600 text-gray-300 hover:bg-gray-800 bg-transparent"
                  onClick={() => {
                    setSortBy("price-low")
                    setFilterStore("all")
                    setPriceRange({ min: "", max: "" })
                  }}
                >
                  Clear Filters
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Results Grid */}
          <div className="lg:col-span-3">
            <Tabs defaultValue="results" className="w-full">
              <TabsList className="grid w-full grid-cols-2 bg-gray-800/50 border border-gray-700 mb-6">
                <TabsTrigger value="results" className="data-[state=active]:bg-blue-600 data-[state=active]:text-white">
                  <ShoppingCart className="w-4 h-4 mr-2" />
                  Results
                </TabsTrigger>
                <TabsTrigger
                  value="analysis"
                  className="data-[state=active]:bg-blue-600 data-[state=active]:text-white"
                >
                  <Lightbulb className="w-4 h-4 mr-2" />
                  AI Analysis
                </TabsTrigger>
              </TabsList>

              {/* Results Tab */}
              <TabsContent value="results" className="space-y-6">
                {cheapestProduct && (
                  <Card className="border-green-600/50 bg-gradient-to-br from-green-900/20 to-green-800/10 backdrop-blur-xl">
                    <CardContent className="p-6">
                      <div className="flex items-center gap-3 mb-4">
                        <TrendingUp className="w-6 h-6 text-green-400" />
                        <h3 className="text-lg font-semibold text-white">Best Deal</h3>
                      </div>
                      <div className="grid md:grid-cols-4 gap-6 items-center">
                        <div className="md:col-span-1">
                          <img
                            src={cheapestProduct.image || "/placeholder.svg"}
                            alt={cheapestProduct.title}
                            className="w-full h-32 object-cover rounded-lg bg-gray-800"
                          />
                        </div>
                        <div className="md:col-span-2">
                          <h4 className="text-lg font-semibold text-white mb-2">{cheapestProduct.title}</h4>
                          <Badge className="bg-green-600 text-white">{cheapestProduct.store}</Badge>
                        </div>
                        <div className="md:col-span-1 text-center md:text-right">
                          <div className="text-3xl font-bold text-green-400 mb-2">
                            ${cheapestProduct.discountedPrice}
                          </div>
                          <Button
                            className="w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-400 hover:to-green-500"
                            asChild
                          >
                            <a href={cheapestProduct.url} target="_blank" rel="noopener noreferrer">
                              Buy Now
                            </a>
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )}

                <div className="grid gap-6">
                  {filteredResults.map((result) => (
                    <Card
                      key={result.id}
                      className={`border-gray-800 bg-gradient-to-br backdrop-blur-xl hover:shadow-xl transition-all duration-300 ${
                        result.id === cheapestProduct?.id
                          ? "from-green-900/20 to-green-800/10 border-green-600/30 hover:shadow-green-500/10"
                          : "from-gray-900/80 to-black/80 hover:shadow-blue-500/10"
                      }`}
                    >
                      <CardContent className="p-6">
                        <div className="grid md:grid-cols-4 gap-6 items-center">
                          {/* Product Image */}
                          <div className="md:col-span-1">
                            <img
                              src={result.image || "/placeholder.svg"}
                              alt={result.title}
                              className="w-full h-32 object-cover rounded-lg bg-gray-800"
                            />
                          </div>

                          {/* Product Info */}
                          <div className="md:col-span-2 space-y-3">
                            <div>
                              <h3 className="text-lg font-semibold text-white mb-1">{result.title}</h3>
                              <Badge className="bg-blue-600 text-white text-xs">{result.store}</Badge>
                            </div>

                            <div className="flex items-center gap-2">
                              <div className="flex items-center">
                                <Star className="w-4 h-4 text-yellow-400 fill-current" />
                                <span className="text-sm text-gray-300 ml-1">{result.rating}</span>
                              </div>
                              <span className="text-sm text-gray-500">({result.reviews} reviews)</span>
                            </div>

                            <div className="flex items-center gap-4 text-sm">
                              <div className="flex items-center gap-1 text-green-400">
                                <Truck className="w-4 h-4" />
                                {result.shipping}
                              </div>
                              <div className="text-gray-400">{result.availability}</div>
                            </div>
                          </div>

                          {/* Price & Action */}
                          <div className="md:col-span-1 text-center md:text-right space-y-3">
                            <div>
                              <div className="text-sm text-gray-500 line-through">${result.originalPrice}</div>
                              <div className="text-2xl font-bold text-white">${result.discountedPrice}</div>
                              <Badge className="bg-green-600 text-white text-xs">{result.discount} OFF</Badge>
                            </div>

                            <Button
                              className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-400 hover:to-blue-500 shadow-lg hover:shadow-blue-500/25 transition-all duration-300"
                              asChild
                            >
                              <a href={result.url} target="_blank" rel="noopener noreferrer">
                                <ExternalLink className="w-4 h-4 mr-2" />
                                View Deal
                              </a>
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>

                {filteredResults.length === 0 && (
                  <Card className="border-gray-800 bg-gradient-to-br from-gray-900/80 to-black/80 backdrop-blur-xl">
                    <CardContent className="p-12 text-center">
                      <Search className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                      <h3 className="text-xl font-semibold text-white mb-2">No Results Found</h3>
                      <p className="text-gray-400 mb-6">Try adjusting your filters or search for something else.</p>
                      <Button
                        className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-400 hover:to-blue-500"
                        asChild
                      >
                        <Link href="/search">New Search</Link>
                      </Button>
                    </CardContent>
                  </Card>
                )}
              </TabsContent>

              <TabsContent value="analysis" className="space-y-6">
                {searchData.analysis ? (
                  <>
                    {/* Summary */}
                    <Card className="border-gray-800 bg-gradient-to-br from-gray-900/80 to-black/80 backdrop-blur-xl">
                      <CardHeader>
                        <CardTitle className="text-white flex items-center gap-2">
                          <Lightbulb className="w-5 h-5 text-yellow-400" />
                          Product Summary
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-gray-300 leading-relaxed">{searchData.analysis.summary}</p>
                      </CardContent>
                    </Card>

                    {/* Pros & Cons */}
                    <div className="grid md:grid-cols-2 gap-6">
                      <Card className="border-gray-800 bg-gradient-to-br from-gray-900/80 to-black/80 backdrop-blur-xl">
                        <CardHeader>
                          <CardTitle className="text-white flex items-center gap-2">
                            <ThumbsUp className="w-5 h-5 text-green-400" />
                            Pros
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <ul className="space-y-2">
                            {searchData.analysis.pros.map((pro, i) => (
                              <li key={i} className="text-gray-300 flex items-start gap-2">
                                <span className="text-green-400 mt-1">+</span>
                                <span>{pro}</span>
                              </li>
                            ))}
                          </ul>
                        </CardContent>
                      </Card>

                      <Card className="border-gray-800 bg-gradient-to-br from-gray-900/80 to-black/80 backdrop-blur-xl">
                        <CardHeader>
                          <CardTitle className="text-white flex items-center gap-2">
                            <ThumbsDown className="w-5 h-5 text-red-400" />
                            Cons
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <ul className="space-y-2">
                            {searchData.analysis.cons.map((con, i) => (
                              <li key={i} className="text-gray-300 flex items-start gap-2">
                                <span className="text-red-400 mt-1">-</span>
                                <span>{con}</span>
                              </li>
                            ))}
                          </ul>
                        </CardContent>
                      </Card>
                    </div>

                    {/* Recommendation */}
                    <Card className="border-blue-600/50 bg-gradient-to-br from-blue-900/20 to-blue-800/10 backdrop-blur-xl">
                      <CardHeader>
                        <CardTitle className="text-white">AI Recommendation</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-gray-300 leading-relaxed">{searchData.analysis.recommendation}</p>
                      </CardContent>
                    </Card>
                  </>
                ) : (
                  <Card className="border-gray-800 bg-gradient-to-br from-gray-900/80 to-black/80 backdrop-blur-xl">
                    <CardContent className="p-12 text-center">
                      <Lightbulb className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                      <h3 className="text-xl font-semibold text-white mb-2">No Analysis Available</h3>
                      <p className="text-gray-400">AI analysis will be available for URL and image searches.</p>
                    </CardContent>
                  </Card>
                )}
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  )
}
