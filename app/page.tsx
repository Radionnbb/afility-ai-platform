import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Search, LinkIcon, ImageIcon, Zap, Shield, TrendingUp, Sparkles } from "lucide-react"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-black">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-black via-gray-900 to-black py-20 sm:py-32">
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-600/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-blue-500/5 to-transparent rounded-full blur-3xl"></div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="text-center lg:text-left">
              <div className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-blue-500/10 to-blue-600/10 border border-blue-500/20 mb-6">
                <Sparkles className="w-4 h-4 text-blue-400 mr-2" />
                <span className="text-sm text-blue-400 font-medium">AI-Powered Shopping Assistant</span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight mb-6">
                <span className="bg-gradient-to-r from-white via-gray-100 to-gray-300 bg-clip-text text-transparent">
                  Find Cheaper Alternatives
                </span>
                <br />
                <span className="bg-gradient-to-r from-blue-400 via-blue-500 to-blue-600 bg-clip-text text-transparent">
                  Instantly with AI
                </span>
              </h1>

              <p className="mt-6 text-xl text-gray-400 leading-relaxed">
                Paste a product link, enter a name, or upload an image – we'll find you the best deal with our advanced
                AI technology.
              </p>

              <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Button
                  size="lg"
                  className="text-lg px-8 py-6 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-400 hover:to-blue-500 shadow-lg hover:shadow-blue-500/25 transition-all duration-300 transform hover:scale-105"
                  asChild
                >
                  <Link href="/signup">Start Free Search</Link>
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="text-lg px-8 py-6 border-gray-600 text-gray-300 hover:text-white hover:bg-gray-800 hover:border-gray-500 transition-all duration-300 bg-transparent"
                  asChild
                >
                  <Link href="/login">Login</Link>
                </Button>
              </div>
            </div>

            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-blue-600/20 rounded-3xl blur-xl"></div>
              <Card className="relative p-8 shadow-2xl border-gray-800 bg-gradient-to-br from-gray-900/80 to-black/80 backdrop-blur-xl hover:shadow-blue-500/10 transition-all duration-500 transform hover:scale-105">
                <CardContent className="p-0">
                  <div className="text-center space-y-6">
                    <div className="w-20 h-20 mx-auto bg-gradient-to-r from-blue-500 to-blue-600 rounded-full flex items-center justify-center shadow-lg">
                      <Search className="w-10 h-10 text-white" />
                    </div>
                    <h3 className="text-2xl font-semibold text-white">AI-Powered Search</h3>
                    <p className="text-gray-400">
                      Upload, paste, or type - our AI finds the best alternatives instantly
                    </p>
                    <div className="flex justify-center space-x-4">
                      <div className="w-12 h-12 bg-gradient-to-r from-gray-800 to-gray-700 rounded-lg flex items-center justify-center hover:from-gray-700 hover:to-gray-600 transition-all duration-300 cursor-pointer">
                        <LinkIcon className="w-6 h-6 text-gray-300" />
                      </div>
                      <div className="w-12 h-12 bg-gradient-to-r from-gray-800 to-gray-700 rounded-lg flex items-center justify-center hover:from-gray-700 hover:to-gray-600 transition-all duration-300 cursor-pointer">
                        <ImageIcon className="w-6 h-6 text-gray-300" />
                      </div>
                      <div className="w-12 h-12 bg-gradient-to-r from-gray-800 to-gray-700 rounded-lg flex items-center justify-center hover:from-gray-700 hover:to-gray-600 transition-all duration-300 cursor-pointer">
                        <Search className="w-6 h-6 text-gray-300" />
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gradient-to-b from-black to-gray-900">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">Why Choose Afility.AI?</h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Save money effortlessly with our AI-powered alternative finder
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="text-center p-8 border-gray-800 bg-gradient-to-br from-gray-900/50 to-black/50 backdrop-blur-xl hover:shadow-xl hover:shadow-blue-500/10 transition-all duration-500 transform hover:scale-105 group">
              <CardContent className="p-0">
                <div className="w-16 h-16 mx-auto bg-gradient-to-r from-blue-500/20 to-blue-600/20 rounded-full flex items-center justify-center mb-6 group-hover:from-blue-500/30 group-hover:to-blue-600/30 transition-all duration-300">
                  <Zap className="w-8 h-8 text-blue-400" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-4">Lightning Fast</h3>
                <p className="text-gray-400">Get results in seconds with our advanced AI algorithms</p>
              </CardContent>
            </Card>

            <Card className="text-center p-8 border-gray-800 bg-gradient-to-br from-gray-900/50 to-black/50 backdrop-blur-xl hover:shadow-xl hover:shadow-blue-500/10 transition-all duration-500 transform hover:scale-105 group">
              <CardContent className="p-0">
                <div className="w-16 h-16 mx-auto bg-gradient-to-r from-blue-500/20 to-blue-600/20 rounded-full flex items-center justify-center mb-6 group-hover:from-blue-500/30 group-hover:to-blue-600/30 transition-all duration-300">
                  <Shield className="w-8 h-8 text-blue-400" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-4">Trusted Sources</h3>
                <p className="text-gray-400">We only show results from verified retailers and marketplaces</p>
              </CardContent>
            </Card>

            <Card className="text-center p-8 border-gray-800 bg-gradient-to-br from-gray-900/50 to-black/50 backdrop-blur-xl hover:shadow-xl hover:shadow-blue-500/10 transition-all duration-500 transform hover:scale-105 group">
              <CardContent className="p-0">
                <div className="w-16 h-16 mx-auto bg-gradient-to-r from-blue-500/20 to-blue-600/20 rounded-full flex items-center justify-center mb-6 group-hover:from-blue-500/30 group-hover:to-blue-600/30 transition-all duration-300">
                  <TrendingUp className="w-8 h-8 text-blue-400" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-4">Save More</h3>
                <p className="text-gray-400">Find deals up to 70% cheaper than original prices</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 via-blue-500 to-blue-600 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/90 to-blue-500/90"></div>
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-transparent via-white/5 to-transparent"></div>
        </div>
        <div className="container mx-auto px-4 text-center relative z-10">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">Ready to Start Saving?</h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Join thousands of smart shoppers who save money every day with Afility.AI
          </p>
          <Button
            size="lg"
            variant="secondary"
            className="text-lg px-8 py-6 bg-white text-blue-600 hover:bg-gray-100 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
            asChild
          >
            <Link href="/search">Start Searching Now</Link>
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black border-t border-gray-800 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-r from-blue-500 to-blue-600">
                  <Zap className="h-5 w-5 text-white" />
                </div>
                <span className="text-xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                  Afility.AI
                </span>
              </div>
              <p className="text-gray-400">AI-powered platform to find cheaper product alternatives instantly.</p>
            </div>

            <div>
              <h3 className="font-semibold mb-4 text-white">Product</h3>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link href="/search" className="hover:text-blue-400 transition-colors">
                    Search
                  </Link>
                </li>
                <li>
                  <Link href="/about" className="hover:text-blue-400 transition-colors">
                    About
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-4 text-white">Company</h3>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link href="/about" className="hover:text-blue-400 transition-colors">
                    About
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="hover:text-blue-400 transition-colors">
                    Contact
                  </Link>
                </li>
                <li>
                  <Link href="/privacy" className="hover:text-blue-400 transition-colors">
                    Privacy
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-4 text-white">Connect</h3>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <a href="#" className="hover:text-blue-400 transition-colors">
                    Twitter
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-blue-400 transition-colors">
                    LinkedIn
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-blue-400 transition-colors">
                    Discord
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 Afility.AI. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
