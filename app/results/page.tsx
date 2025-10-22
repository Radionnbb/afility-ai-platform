"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
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
}

export default function ResultsPage() {
  const [searchData, setSearchData] = useState<SearchData | null>(null)
  const [filteredResults, setFilteredResults] = useState<SearchResult[]>([])
  const [sortBy, setSortBy] = useState("price-low")
  const [filterStore, setFilterStore] = useState("all")
  const [priceRange, setPriceRange] = useState({ min: "", max: "" })
  const router = useRouter()

  useEffect(() => {
    // Get search results from sessionStorage
    const results = sessionStorage.getItem("searchResults")
    if (results) {
      const data = JSON.parse(results)
      setSearchData(data)
      setFilteredResults(data.results)
    } else {
      // Redirect to search if no results
      router.push("/search")
    }
  }, [router])

  useEffect(() => {
    if (!searchData) return

    let filtered = [...searchData.results]

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

  const stores = Array.from(new Set(searchData.results.map((result) => result.store)))
  const totalSavings = searchData.results.reduce(
    (sum, result) => sum + (result.originalPrice - result.discountedPrice),
    0,
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
                <div className="text-2xl font-bold text-white">${totalSavings.toFixed(2)}</div>
                <div className="text-sm text-gray-400">Total Savings</div>
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
                <div className="text-2xl font-bold text-white">10%</div>
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
            <div className="grid gap-6">
              {filteredResults.map((result) => (
                <Card
                  key={result.id}
                  className="border-gray-800 bg-gradient-to-br from-gray-900/80 to-black/80 backdrop-blur-xl hover:shadow-xl hover:shadow-blue-500/10 transition-all duration-300"
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
          </div>
        </div>
      </div>
    </div>
  )
}
