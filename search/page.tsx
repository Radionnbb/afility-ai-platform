"use client"

import type React from "react"

import { useState, useCallback } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Search, LinkIcon, Upload, ImageIcon, Sparkles } from "lucide-react"
import { useRouter } from "next/navigation"

export default function SearchPage() {
  const [activeTab, setActiveTab] = useState("name")
  const [productName, setProductName] = useState("")
  const [productUrl, setProductUrl] = useState("")
  const [dragActive, setDragActive] = useState(false)
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [selectedImage, setSelectedImage] = useState<File | null>(null)

  const handleSearch = async () => {
    if (!productName && !productUrl && activeTab !== "image" && !selectedImage) {
      setError("Please enter a search query")
      return
    }

    setIsLoading(true)
    setError(null)

    try {
      let query: string | null = null
      let formData: FormData | null = null
      const searchType = activeTab

      if (activeTab === "name") {
        query = productName
      } else if (activeTab === "url") {
        query = productUrl
      } else if (activeTab === "image") {
        if (selectedImage) {
          formData = new FormData()
          formData.append("image", selectedImage)
        } else {
          setError("Please select an image to upload.")
          setIsLoading(false)
          return
        }
      }

      let response

      if (formData) {
        response = await fetch("/api/search", {
          method: "POST",
          body: formData,
        })
      } else {
        response = await fetch("/api/search", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            query,
            searchType,
            filters: {}, // Add filters if needed
          }),
        })
      }

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.message || "Search failed")
      }

      const result = await response.json()

      if (result.success) {
        // Store results in sessionStorage for the results page
        sessionStorage.setItem("searchResults", JSON.stringify(result.data))
        router.push("/results")
      } else {
        setError(result.message || "Search failed")
      }
    } catch (err: any) {
      setError(err.message || "Network error. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true)
    } else if (e.type === "dragleave") {
      setDragActive(false)
    }
  }

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)

    const files = e.dataTransfer?.files
    if (files && files.length > 0) {
      const file = files[0]
      if (file.type.startsWith("image/")) {
        setSelectedImage(file)
      } else {
        setError("Invalid file type. Please upload an image.")
      }
    }
  }, [])

  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (files && files.length > 0) {
      const file = files[0]
      if (file.type.startsWith("image/")) {
        setSelectedImage(file)
      } else {
        setError("Invalid file type. Please upload an image.")
      }
    }
  }

  return (
    <div className="min-h-screen py-12 bg-gradient-to-br from-black via-gray-900 to-black">
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-600/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      <div className="container mx-auto px-4 max-w-2xl relative z-10">
        <div className="text-center mb-8">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-blue-500/10 to-blue-600/10 border border-blue-500/20 mb-4">
            <Sparkles className="w-4 h-4 text-blue-400 mr-2" />
            <span className="text-sm text-blue-400 font-medium">AI-Powered Search</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-white mb-4">Find Cheaper Alternatives</h1>
          <p className="text-lg text-gray-400">Search by product name, paste a link, or upload an image</p>
        </div>

        <Card className="shadow-2xl border-gray-800 bg-gradient-to-br from-gray-900/80 to-black/80 backdrop-blur-xl">
          <CardHeader>
            <CardTitle className="text-center text-xl text-white">How would you like to search?</CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid w-full grid-cols-3 mb-6 bg-gray-800 border-gray-700">
                <TabsTrigger
                  value="name"
                  className="flex items-center gap-2 data-[state=active]:bg-blue-600 data-[state=active]:text-white text-gray-300"
                >
                  <Search className="w-4 h-4" />
                  Product Name
                </TabsTrigger>
                <TabsTrigger
                  value="url"
                  className="flex items-center gap-2 data-[state=active]:bg-blue-600 data-[state=active]:text-white text-gray-300"
                >
                  <LinkIcon className="w-4 h-4" />
                  URL
                </TabsTrigger>
                <TabsTrigger
                  value="image"
                  className="flex items-center gap-2 data-[state=active]:bg-blue-600 data-[state=active]:text-white text-gray-300"
                >
                  <ImageIcon className="w-4 h-4" />
                  Image Upload
                </TabsTrigger>
              </TabsList>

              <TabsContent value="name" className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="product-name" className="text-gray-300">
                    Product Name
                  </Label>
                  <Input
                    id="product-name"
                    placeholder="e.g. iPhone 14 Pro, Nike Air Max, Samsung TV"
                    value={productName}
                    onChange={(e) => setProductName(e.target.value)}
                    className="text-lg py-6 bg-gray-800 border-gray-700 text-white placeholder-gray-400 focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>
              </TabsContent>

              <TabsContent value="url" className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="product-url" className="text-gray-300">
                    Product URL
                  </Label>
                  <Input
                    id="product-url"
                    placeholder="Paste product link from Amazon, eBay, etc."
                    value={productUrl}
                    onChange={(e) => setProductUrl(e.target.value)}
                    className="text-lg py-6 bg-gray-800 border-gray-700 text-white placeholder-gray-400 focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>
              </TabsContent>

              <TabsContent value="image" className="space-y-4">
                <div className="space-y-2">
                  <Label className="text-gray-300">Product Image</Label>
                  <div
                    className={`border-2 border-dashed rounded-lg p-8 text-center transition-all duration-300 ${
                      dragActive
                        ? "border-blue-500 bg-blue-500/10"
                        : "border-gray-600 hover:border-gray-500 bg-gray-800/50"
                    }`}
                    onDragEnter={handleDrag}
                    onDragLeave={handleDrag}
                    onDragOver={handleDrag}
                    onDrop={handleDrop}
                  >
                    <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-lg text-gray-300 mb-2">Drag and drop an image here, or click to browse</p>
                    <p className="text-sm text-gray-500 mb-4">Supports JPG, PNG, WebP up to 10MB</p>
                    <input
                      type="file"
                      id="image-upload"
                      accept="image/*"
                      className="hidden"
                      onChange={handleImageSelect}
                    />
                    <label htmlFor="image-upload">
                      <Button
                        variant="outline"
                        className="border-gray-600 text-gray-300 hover:bg-gray-700 hover:text-white bg-transparent"
                      >
                        Choose File
                      </Button>
                    </label>
                    {selectedImage && (
                      <div className="mt-4">
                        <p className="text-sm text-gray-300">Selected Image: {selectedImage.name}</p>
                      </div>
                    )}
                  </div>
                </div>
              </TabsContent>

              <div className="mt-8">
                <Button
                  size="lg"
                  className="w-full text-lg py-6 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-400 hover:to-blue-500 shadow-lg hover:shadow-blue-500/25 transition-all duration-300 transform hover:scale-105"
                  onClick={handleSearch}
                  disabled={isLoading}
                >
                  <Search className="w-5 h-5 mr-2" />
                  {isLoading ? "Searching..." : "Search Now"}
                </Button>
              </div>
              {error && (
                <div className="mt-4 p-4 bg-red-500/10 border border-red-500/20 rounded-lg">
                  <p className="text-red-400 text-sm">{error}</p>
                </div>
              )}
            </Tabs>
          </CardContent>
        </Card>

        {/* Recent Searches */}
        <Card className="mt-8 border-gray-800 bg-gradient-to-br from-gray-900/50 to-black/50 backdrop-blur-xl">
          <CardHeader>
            <CardTitle className="text-lg text-white">Recent Searches</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <Button
                variant="ghost"
                className="w-full justify-start text-left text-gray-300 hover:text-white hover:bg-gray-800"
              >
                iPhone 14 Pro Max 256GB
              </Button>
              <Button
                variant="ghost"
                className="w-full justify-start text-left text-gray-300 hover:text-white hover:bg-gray-800"
              >
                Sony WH-1000XM4 Headphones
              </Button>
              <Button
                variant="ghost"
                className="w-full justify-start text-left text-gray-300 hover:text-white hover:bg-gray-800"
              >
                MacBook Air M2
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
