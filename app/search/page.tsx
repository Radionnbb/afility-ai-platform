"use client"

import type React from "react"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Search, Upload, LinkIcon, Sparkles, Zap, ImageIcon, Loader2, Camera, Globe, Type } from "lucide-react"
import { useRouter } from "next/navigation"
import { AnimatePresence } from "framer-motion"
import { WebPreview } from "@/components/web-preview"
import { LiveAgentView } from "@/components/live-agent-view"

export default function SearchPage() {
  const [isLoading, setIsLoading] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [imageFile, setImageFile] = useState<File | null>(null)
  const [imagePreview, setImagePreview] = useState<string | null>(null)
  const [urlInput, setUrlInput] = useState("")
  const [activeTab, setActiveTab] = useState("text")
  const fileInputRef = useRef<HTMLInputElement>(null)
  const router = useRouter()

  const [showPreview, setShowPreview] = useState(false)
  const [previewUrl, setPreviewUrl] = useState("")
  const [isPreviewExpanded, setIsPreviewExpanded] = useState(false)
  const [showLiveAgent, setShowLiveAgent] = useState(false)

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      setImageFile(file)
      const reader = new FileReader()
      reader.onload = (e) => {
        setImagePreview(e.target?.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleSearch = async (type: "text" | "image" | "url") => {
    setIsLoading(true)

    try {
      const searchData: any = { type }

      if (type === "text") {
        if (!searchQuery.trim()) {
          alert("Please enter a search query")
          return
        }
        searchData.query = searchQuery
      } else if (type === "image") {
        if (!imageFile) {
          alert("Please select an image")
          return
        }
        const reader = new FileReader()
        reader.onload = async (e) => {
          searchData.imageData = e.target?.result as string
          await performSearch(searchData, type)
        }
        reader.readAsDataURL(imageFile)
        return
      } else if (type === "url") {
        if (!urlInput.trim()) {
          alert("Please enter a URL")
          return
        }
        searchData.url = urlInput
        setPreviewUrl(urlInput)
        setShowPreview(true)
        setIsPreviewExpanded(true)
      }

      await performSearch(searchData, type)
    } catch (error) {
      console.error("Search error:", error)
      alert("Search failed. Please try again.")
      setIsLoading(false)
      setShowPreview(false)
      setShowLiveAgent(false)
    }
  }

  const performSearch = async (searchData: any, type: string) => {
    try {
      const response = await fetch("/api/search", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(searchData),
      })

      if (response.ok) {
        const results = await response.json()

        // Animate sequence: collapse preview → show live agent → navigate
        setTimeout(() => {
          setIsPreviewExpanded(false)
        }, 1000)

        setTimeout(() => {
          setShowPreview(false)
          setShowLiveAgent(true)
        }, 1600)

        setTimeout(() => {
          setShowLiveAgent(false)
          sessionStorage.setItem("searchResults", JSON.stringify(results))
          router.push("/results")
        }, 4000)
      } else {
        throw new Error("Search failed")
      }
    } catch (error) {
      console.error("Search error:", error)
      alert("Search failed. Please try again.")
      setIsLoading(false)
      setShowPreview(false)
      setShowLiveAgent(false)
    }
  }

  return (
    <div className="min-h-screen py-8 bg-gradient-to-br from-black via-gray-900 to-black">
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-600/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      <div className="container mx-auto px-4 max-w-4xl relative z-10">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-blue-500/10 to-blue-600/10 border border-blue-500/20 mb-6">
            <Sparkles className="w-4 h-4 text-blue-400 mr-2" />
            <span className="text-sm text-blue-400 font-medium">AI-Powered Search</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4">
            Find Better
            <span className="bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent">
              {" "}
              Alternatives
            </span>
          </h1>
          <p className="text-xl text-gray-400 leading-relaxed max-w-2xl mx-auto">
            Search by text, upload an image, or paste a product URL. Our AI will find you the best deals instantly.
          </p>
        </div>

        <AnimatePresence>
          {showPreview && (
            <div className="mb-8 flex justify-center">
              <WebPreview
                url={previewUrl}
                isExpanded={isPreviewExpanded}
                onClose={() => {
                  setShowPreview(false)
                  setIsPreviewExpanded(false)
                }}
              />
            </div>
          )}
        </AnimatePresence>

        <AnimatePresence>{showLiveAgent && <LiveAgentView isVisible={showLiveAgent} />}</AnimatePresence>

        {/* Search Interface */}
        <Card className="border-gray-800 bg-gradient-to-br from-gray-900/80 to-black/80 backdrop-blur-xl shadow-2xl">
          <CardHeader>
            <CardTitle className="text-2xl text-white flex items-center gap-2">
              <Search className="w-6 h-6 text-blue-400" />
              Smart Product Search
            </CardTitle>
            <CardDescription className="text-gray-400">
              Choose your preferred search method and let our AI find the best alternatives
            </CardDescription>
          </CardHeader>

          <CardContent>
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid w-full grid-cols-3 bg-gray-800/50 border border-gray-700">
                <TabsTrigger
                  value="text"
                  className="data-[state=active]:bg-blue-600 data-[state=active]:text-white flex items-center gap-2"
                >
                  <Type className="w-4 h-4" />
                  Text Search
                </TabsTrigger>
                <TabsTrigger
                  value="image"
                  className="data-[state=active]:bg-blue-600 data-[state=active]:text-white flex items-center gap-2"
                >
                  <ImageIcon className="w-4 h-4" />
                  Image Search
                </TabsTrigger>
                <TabsTrigger
                  value="url"
                  className="data-[state=active]:bg-blue-600 data-[state=active]:text-white flex items-center gap-2"
                >
                  <Globe className="w-4 h-4" />
                  URL Search
                </TabsTrigger>
              </TabsList>

              {/* Text Search */}
              <TabsContent value="text" className="space-y-6 mt-6">
                <div className="space-y-4">
                  <Label htmlFor="search-input" className="text-gray-300 text-lg">
                    What are you looking for?
                  </Label>
                  <div className="relative">
                    <Input
                      id="search-input"
                      type="text"
                      placeholder="e.g., wireless headphones, running shoes, laptop..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="h-14 text-lg bg-gray-800 border-gray-700 text-white placeholder-gray-400 focus:border-blue-500 focus:ring-blue-500 pr-12"
                      onKeyPress={(e) => e.key === "Enter" && handleSearch("text")}
                    />
                    <Search className="absolute right-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  </div>
                  <Button
                    onClick={() => handleSearch("text")}
                    disabled={isLoading || !searchQuery.trim()}
                    className="w-full h-14 text-lg bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-400 hover:to-blue-500 shadow-lg hover:shadow-blue-500/25 transition-all duration-300"
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                        Searching...
                      </>
                    ) : (
                      <>
                        <Zap className="w-5 h-5 mr-2" />
                        Search Products
                      </>
                    )}
                  </Button>
                </div>
              </TabsContent>

              {/* Image Search */}
              <TabsContent value="image" className="space-y-6 mt-6">
                <div className="space-y-4">
                  <Label className="text-gray-300 text-lg">Upload Product Image</Label>

                  <div className="border-2 border-dashed border-gray-700 rounded-lg p-8 text-center hover:border-blue-500 transition-colors">
                    {imagePreview ? (
                      <div className="space-y-4">
                        <img
                          src={imagePreview || "/placeholder.svg"}
                          alt="Preview"
                          className="max-w-full max-h-64 mx-auto rounded-lg shadow-lg"
                        />
                        <div className="flex gap-2 justify-center">
                          <Button
                            variant="outline"
                            onClick={() => {
                              setImageFile(null)
                              setImagePreview(null)
                              if (fileInputRef.current) {
                                fileInputRef.current.value = ""
                              }
                            }}
                            className="border-gray-600 text-gray-300 hover:bg-gray-800"
                          >
                            Remove Image
                          </Button>
                        </div>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        <Camera className="w-16 h-16 text-gray-400 mx-auto" />
                        <div>
                          <p className="text-gray-300 text-lg mb-2">Drop your image here or click to browse</p>
                          <p className="text-gray-500 text-sm">Supports JPG, PNG, WebP up to 10MB</p>
                        </div>
                      </div>
                    )}

                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="hidden"
                    />

                    {!imagePreview && (
                      <Button
                        variant="outline"
                        onClick={() => fileInputRef.current?.click()}
                        className="mt-4 border-gray-600 text-gray-300 hover:bg-gray-800"
                      >
                        <Upload className="w-4 h-4 mr-2" />
                        Choose Image
                      </Button>
                    )}
                  </div>

                  <Button
                    onClick={() => handleSearch("image")}
                    disabled={isLoading || !imageFile}
                    className="w-full h-14 text-lg bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-400 hover:to-blue-500 shadow-lg hover:shadow-blue-500/25 transition-all duration-300"
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                        Analyzing Image...
                      </>
                    ) : (
                      <>
                        <ImageIcon className="w-5 h-5 mr-2" />
                        Search by Image
                      </>
                    )}
                  </Button>
                </div>
              </TabsContent>

              {/* URL Search */}
              <TabsContent value="url" className="space-y-6 mt-6">
                <div className="space-y-4">
                  <Label htmlFor="url-input" className="text-gray-300 text-lg">
                    Product URL
                  </Label>
                  <div className="relative">
                    <Input
                      id="url-input"
                      type="url"
                      placeholder="https://example.com/product-page"
                      value={urlInput}
                      onChange={(e) => setUrlInput(e.target.value)}
                      className="h-14 text-lg bg-gray-800 border-gray-700 text-white placeholder-gray-400 focus:border-blue-500 focus:ring-blue-500 pr-12"
                      onKeyPress={(e) => e.key === "Enter" && handleSearch("url")}
                    />
                    <LinkIcon className="absolute right-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  </div>
                  <div className="text-sm text-gray-500">
                    Paste any product URL from Amazon, eBay, AliExpress, or other stores
                  </div>
                  <Button
                    onClick={() => handleSearch("url")}
                    disabled={isLoading || !urlInput.trim()}
                    className="w-full h-14 text-lg bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-400 hover:to-blue-500 shadow-lg hover:shadow-blue-500/25 transition-all duration-300"
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                        Analyzing URL...
                      </>
                    ) : (
                      <>
                        <Globe className="w-5 h-5 mr-2" />
                        Analyze URL
                      </>
                    )}
                  </Button>
                </div>
              </TabsContent>
            </Tabs>

            <Separator className="my-8 bg-gray-700" />

            {/* Features */}
            <div className="grid md:grid-cols-3 gap-4">
              <div className="text-center p-4 rounded-lg bg-gradient-to-br from-gray-800/50 to-gray-900/50">
                <Zap className="w-8 h-8 text-blue-400 mx-auto mb-2" />
                <h3 className="font-semibold text-white mb-1">Lightning Fast</h3>
                <p className="text-sm text-gray-400">Get results in seconds</p>
              </div>
              <div className="text-center p-4 rounded-lg bg-gradient-to-br from-gray-800/50 to-gray-900/50">
                <Badge className="bg-green-600 text-white mb-2">10% OFF</Badge>
                <h3 className="font-semibold text-white mb-1">Auto Discounts</h3>
                <p className="text-sm text-gray-400">Automatic coupons applied</p>
              </div>
              <div className="text-center p-4 rounded-lg bg-gradient-to-br from-gray-800/50 to-gray-900/50">
                <Sparkles className="w-8 h-8 text-purple-400 mx-auto mb-2" />
                <h3 className="font-semibold text-white mb-1">AI Powered</h3>
                <p className="text-sm text-gray-400">Smart recommendations</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
