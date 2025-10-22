import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Zap,
  Target,
  Users,
  TrendingUp,
  Shield,
  Brain,
  Search,
  DollarSign,
  Sparkles,
  CheckCircle,
  ArrowRight,
  Globe,
  Clock,
  Award,
  Heart,
} from "lucide-react"

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black">
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-600/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-blue-500/5 to-transparent rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10">
        {/* Hero Section */}
        <section className="py-20 sm:py-32">
          <div className="container mx-auto px-4 text-center">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-blue-500/10 to-blue-600/10 border border-blue-500/20 mb-6">
              <Sparkles className="w-4 h-4 text-blue-400 mr-2" />
              <span className="text-sm text-blue-400 font-medium">About Afility.AI</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight mb-6">
              <span className="bg-gradient-to-r from-white via-gray-100 to-gray-300 bg-clip-text text-transparent">
                Revolutionizing
              </span>
              <br />
              <span className="bg-gradient-to-r from-blue-400 via-blue-500 to-blue-600 bg-clip-text text-transparent">
                Smart Shopping
              </span>
            </h1>

            <p className="text-xl text-gray-400 leading-relaxed max-w-3xl mx-auto mb-8">
              We're on a mission to help millions of people save money by finding the best product alternatives using
              cutting-edge AI technology. Every search, every comparison, every dollar saved brings us closer to a
              smarter shopping world.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                className="text-lg px-8 py-6 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-400 hover:to-blue-500 shadow-lg hover:shadow-blue-500/25 transition-all duration-300 transform hover:scale-105"
                asChild
              >
                <Link href="/search">
                  Start Saving Now
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="text-lg px-8 py-6 border-gray-600 text-gray-300 hover:text-white hover:bg-gray-800 hover:border-gray-500 transition-all duration-300 bg-transparent"
                asChild
              >
                <Link href="/contact">Contact Us</Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Mission & Vision */}
        <section className="py-20 bg-gradient-to-b from-transparent to-gray-900/50">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <div className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-blue-500/10 to-blue-600/10 border border-blue-500/20 mb-6">
                  <Target className="w-4 h-4 text-blue-400 mr-2" />
                  <span className="text-sm text-blue-400 font-medium">Our Mission</span>
                </div>
                <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
                  Making Smart Shopping
                  <span className="bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent">
                    {" "}
                    Accessible to Everyone
                  </span>
                </h2>
                <p className="text-lg text-gray-400 leading-relaxed mb-6">
                  We believe everyone deserves access to the best deals and product alternatives. Our AI-powered
                  platform democratizes smart shopping by instantly analyzing millions of products across the web to
                  find you the perfect match at the best price.
                </p>
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0" />
                    <span className="text-gray-300">Save time with instant AI-powered comparisons</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0" />
                    <span className="text-gray-300">Find better alternatives you never knew existed</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0" />
                    <span className="text-gray-300">Make informed decisions with comprehensive data</span>
                  </div>
                </div>
              </div>

              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-blue-600/20 rounded-3xl blur-xl"></div>
                <Card className="relative p-8 shadow-2xl border-gray-800 bg-gradient-to-br from-gray-900/80 to-black/80 backdrop-blur-xl">
                  <CardContent className="p-0">
                    <div className="grid grid-cols-2 gap-6">
                      <div className="text-center">
                        <div className="w-16 h-16 mx-auto bg-gradient-to-r from-green-500/20 to-green-600/20 rounded-full flex items-center justify-center mb-4">
                          <DollarSign className="w-8 h-8 text-green-400" />
                        </div>
                        <div className="text-2xl font-bold text-white">$2.5M+</div>
                        <div className="text-sm text-gray-400">Total Savings</div>
                      </div>
                      <div className="text-center">
                        <div className="w-16 h-16 mx-auto bg-gradient-to-r from-blue-500/20 to-blue-600/20 rounded-full flex items-center justify-center mb-4">
                          <Users className="w-8 h-8 text-blue-400" />
                        </div>
                        <div className="text-2xl font-bold text-white">50K+</div>
                        <div className="text-sm text-gray-400">Happy Users</div>
                      </div>
                      <div className="text-center">
                        <div className="w-16 h-16 mx-auto bg-gradient-to-r from-purple-500/20 to-purple-600/20 rounded-full flex items-center justify-center mb-4">
                          <Search className="w-8 h-8 text-purple-400" />
                        </div>
                        <div className="text-2xl font-bold text-white">1M+</div>
                        <div className="text-sm text-gray-400">Searches</div>
                      </div>
                      <div className="text-center">
                        <div className="w-16 h-16 mx-auto bg-gradient-to-r from-yellow-500/20 to-yellow-600/20 rounded-full flex items-center justify-center mb-4">
                          <TrendingUp className="w-8 h-8 text-yellow-400" />
                        </div>
                        <div className="text-2xl font-bold text-white">98%</div>
                        <div className="text-sm text-gray-400">Success Rate</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <div className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-blue-500/10 to-blue-600/10 border border-blue-500/20 mb-6">
                <Brain className="w-4 h-4 text-blue-400 mr-2" />
                <span className="text-sm text-blue-400 font-medium">How It Works</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
                AI-Powered Shopping in
                <span className="bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent">
                  {" "}
                  3 Simple Steps
                </span>
              </h2>
              <p className="text-xl text-gray-400 max-w-2xl mx-auto">
                Our advanced AI technology makes finding better alternatives effortless and instant
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <Card className="text-center p-8 border-gray-800 bg-gradient-to-br from-gray-900/50 to-black/50 backdrop-blur-xl hover:shadow-xl hover:shadow-blue-500/10 transition-all duration-500 transform hover:scale-105 group relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <CardContent className="p-0 relative z-10">
                  <div className="w-20 h-20 mx-auto bg-gradient-to-r from-blue-500/20 to-blue-600/20 rounded-full flex items-center justify-center mb-6 group-hover:from-blue-500/30 group-hover:to-blue-600/30 transition-all duration-300">
                    <Search className="w-10 h-10 text-blue-400" />
                  </div>
                  <Badge className="bg-blue-600 text-white mb-4">Step 1</Badge>
                  <h3 className="text-xl font-semibold text-white mb-4">Search Your Product</h3>
                  <p className="text-gray-400">
                    Enter a product name, paste a URL, or upload an image. Our AI understands what you're looking for
                    instantly.
                  </p>
                </CardContent>
              </Card>

              <Card className="text-center p-8 border-gray-800 bg-gradient-to-br from-gray-900/50 to-black/50 backdrop-blur-xl hover:shadow-xl hover:shadow-blue-500/10 transition-all duration-500 transform hover:scale-105 group relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <CardContent className="p-0 relative z-10">
                  <div className="w-20 h-20 mx-auto bg-gradient-to-r from-purple-500/20 to-purple-600/20 rounded-full flex items-center justify-center mb-6 group-hover:from-purple-500/30 group-hover:to-purple-600/30 transition-all duration-300">
                    <Brain className="w-10 h-10 text-purple-400" />
                  </div>
                  <Badge className="bg-purple-600 text-white mb-4">Step 2</Badge>
                  <h3 className="text-xl font-semibold text-white mb-4">AI Analysis</h3>
                  <p className="text-gray-400">
                    Our advanced AI analyzes millions of products across the web to find the best alternatives and deals
                    for you.
                  </p>
                </CardContent>
              </Card>

              <Card className="text-center p-8 border-gray-800 bg-gradient-to-br from-gray-900/50 to-black/50 backdrop-blur-xl hover:shadow-xl hover:shadow-blue-500/10 transition-all duration-500 transform hover:scale-105 group relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-green-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <CardContent className="p-0 relative z-10">
                  <div className="w-20 h-20 mx-auto bg-gradient-to-r from-green-500/20 to-green-600/20 rounded-full flex items-center justify-center mb-6 group-hover:from-green-500/30 group-hover:to-green-600/30 transition-all duration-300">
                    <DollarSign className="w-10 h-10 text-green-400" />
                  </div>
                  <Badge className="bg-green-600 text-white mb-4">Step 3</Badge>
                  <h3 className="text-xl font-semibold text-white mb-4">Save Money</h3>
                  <p className="text-gray-400">
                    Get instant results with better alternatives, lower prices, and detailed comparisons to make the
                    best choice.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Features */}
        <section className="py-20 bg-gradient-to-b from-transparent to-gray-900/50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <div className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-blue-500/10 to-blue-600/10 border border-blue-500/20 mb-6">
                <Zap className="w-4 h-4 text-blue-400 mr-2" />
                <span className="text-sm text-blue-400 font-medium">Features</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
                Why Choose
                <span className="bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent">
                  {" "}
                  Afility.AI?
                </span>
              </h2>
              <p className="text-xl text-gray-400 max-w-2xl mx-auto">
                Advanced features designed to give you the best shopping experience
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              <Card className="p-6 border-gray-800 bg-gradient-to-br from-gray-900/50 to-black/50 backdrop-blur-xl hover:shadow-xl hover:shadow-blue-500/10 transition-all duration-500 transform hover:scale-105">
                <CardContent className="p-0">
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-500/20 to-blue-600/20 rounded-lg flex items-center justify-center mb-4">
                    <Zap className="w-6 h-6 text-blue-400" />
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-3">Lightning Fast</h3>
                  <p className="text-gray-400">
                    Get results in seconds with our optimized AI algorithms and real-time data processing.
                  </p>
                </CardContent>
              </Card>

              <Card className="p-6 border-gray-800 bg-gradient-to-br from-gray-900/50 to-black/50 backdrop-blur-xl hover:shadow-xl hover:shadow-blue-500/10 transition-all duration-500 transform hover:scale-105">
                <CardContent className="p-0">
                  <div className="w-12 h-12 bg-gradient-to-r from-green-500/20 to-green-600/20 rounded-lg flex items-center justify-center mb-4">
                    <Shield className="w-6 h-6 text-green-400" />
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-3">Trusted Sources</h3>
                  <p className="text-gray-400">
                    We only show results from verified retailers and trusted marketplaces worldwide.
                  </p>
                </CardContent>
              </Card>

              <Card className="p-6 border-gray-800 bg-gradient-to-br from-gray-900/50 to-black/50 backdrop-blur-xl hover:shadow-xl hover:shadow-blue-500/10 transition-all duration-500 transform hover:scale-105">
                <CardContent className="p-0">
                  <div className="w-12 h-12 bg-gradient-to-r from-purple-500/20 to-purple-600/20 rounded-lg flex items-center justify-center mb-4">
                    <Brain className="w-6 h-6 text-purple-400" />
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-3">Smart AI</h3>
                  <p className="text-gray-400">
                    Advanced machine learning models that understand context and find the best matches.
                  </p>
                </CardContent>
              </Card>

              <Card className="p-6 border-gray-800 bg-gradient-to-br from-gray-900/50 to-black/50 backdrop-blur-xl hover:shadow-xl hover:shadow-blue-500/10 transition-all duration-500 transform hover:scale-105">
                <CardContent className="p-0">
                  <div className="w-12 h-12 bg-gradient-to-r from-yellow-500/20 to-yellow-600/20 rounded-lg flex items-center justify-center mb-4">
                    <Globe className="w-6 h-6 text-yellow-400" />
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-3">Global Coverage</h3>
                  <p className="text-gray-400">
                    Search across thousands of stores and marketplaces from around the world.
                  </p>
                </CardContent>
              </Card>

              <Card className="p-6 border-gray-800 bg-gradient-to-br from-gray-900/50 to-black/50 backdrop-blur-xl hover:shadow-xl hover:shadow-blue-500/10 transition-all duration-500 transform hover:scale-105">
                <CardContent className="p-0">
                  <div className="w-12 h-12 bg-gradient-to-r from-red-500/20 to-red-600/20 rounded-lg flex items-center justify-center mb-4">
                    <Clock className="w-6 h-6 text-red-400" />
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-3">Real-time Updates</h3>
                  <p className="text-gray-400">
                    Always get the latest prices and availability information in real-time.
                  </p>
                </CardContent>
              </Card>

              <Card className="p-6 border-gray-800 bg-gradient-to-br from-gray-900/50 to-black/50 backdrop-blur-xl hover:shadow-xl hover:shadow-blue-500/10 transition-all duration-500 transform hover:scale-105">
                <CardContent className="p-0">
                  <div className="w-12 h-12 bg-gradient-to-r from-indigo-500/20 to-indigo-600/20 rounded-lg flex items-center justify-center mb-4">
                    <Award className="w-6 h-6 text-indigo-400" />
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-3">Quality Guaranteed</h3>
                  <p className="text-gray-400">
                    Our AI ensures you only see high-quality alternatives that meet your standards.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <div className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-blue-500/10 to-blue-600/10 border border-blue-500/20 mb-6">
                <Heart className="w-4 h-4 text-blue-400 mr-2" />
                <span className="text-sm text-blue-400 font-medium">Our Team</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
                Built by
                <span className="bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent">
                  {" "}
                  Passionate Innovators
                </span>
              </h2>
              <p className="text-xl text-gray-400 max-w-2xl mx-auto">
                We're a team of AI enthusiasts, engineers, and shopping experts dedicated to revolutionizing how people
                discover and buy products online.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
              <Card className="text-center p-8 border-gray-800 bg-gradient-to-br from-gray-900/50 to-black/50 backdrop-blur-xl hover:shadow-xl hover:shadow-blue-500/10 transition-all duration-500 transform hover:scale-105">
                <CardContent className="p-0">
                  <div className="w-20 h-20 mx-auto bg-gradient-to-r from-blue-500 to-blue-600 rounded-full flex items-center justify-center mb-6">
                    <span className="text-2xl font-bold text-white">AI</span>
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-2">AI Engineering</h3>
                  <p className="text-blue-400 mb-4">Machine Learning Experts</p>
                  <p className="text-gray-400 text-sm">
                    Building cutting-edge AI models that understand products, prices, and user preferences.
                  </p>
                </CardContent>
              </Card>

              <Card className="text-center p-8 border-gray-800 bg-gradient-to-br from-gray-900/50 to-black/50 backdrop-blur-xl hover:shadow-xl hover:shadow-blue-500/10 transition-all duration-500 transform hover:scale-105">
                <CardContent className="p-0">
                  <div className="w-20 h-20 mx-auto bg-gradient-to-r from-green-500 to-green-600 rounded-full flex items-center justify-center mb-6">
                    <span className="text-2xl font-bold text-white">UX</span>
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-2">Product Design</h3>
                  <p className="text-green-400 mb-4">User Experience Specialists</p>
                  <p className="text-gray-400 text-sm">
                    Creating intuitive interfaces that make smart shopping accessible to everyone.
                  </p>
                </CardContent>
              </Card>

              <Card className="text-center p-8 border-gray-800 bg-gradient-to-br from-gray-900/50 to-black/50 backdrop-blur-xl hover:shadow-xl hover:shadow-blue-500/10 transition-all duration-500 transform hover:scale-105">
                <CardContent className="p-0">
                  <div className="w-20 h-20 mx-auto bg-gradient-to-r from-purple-500 to-purple-600 rounded-full flex items-center justify-center mb-6">
                    <span className="text-2xl font-bold text-white">DATA</span>
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-2">Data Science</h3>
                  <p className="text-purple-400 mb-4">Analytics & Insights</p>
                  <p className="text-gray-400 text-sm">
                    Analyzing market trends and user behavior to continuously improve our recommendations.
                  </p>
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
              Join thousands of smart shoppers who save money every day with Afility.AI. Start your first search now and
              discover better alternatives instantly.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                variant="secondary"
                className="text-lg px-8 py-6 bg-white text-blue-600 hover:bg-gray-100 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                asChild
              >
                <Link href="/search">
                  Start Searching Now
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="text-lg px-8 py-6 border-white/30 text-white hover:bg-white/10 hover:border-white/50 transition-all duration-300 bg-transparent"
                asChild
              >
                <Link href="/signup">Create Free Account</Link>
              </Button>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}
