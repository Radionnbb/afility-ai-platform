"use client"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import {
  Zap,
  Search,
  Shield,
  TrendingUp,
  Users,
  Target,
  Eye,
  CheckCircle,
  ArrowRight,
  Sparkles,
  Brain,
  Globe,
  Award,
} from "lucide-react"

const stats = [
  { label: "Active Users", value: "50K+", icon: Users },
  { label: "Products Analyzed", value: "2M+", icon: Search },
  { label: "Money Saved", value: "$10M+", icon: TrendingUp },
  { label: "Partner Stores", value: "500+", icon: Globe },
]

const features = [
  {
    icon: Brain,
    title: "AI-Powered Analysis",
    description: "Advanced machine learning algorithms analyze products and find the best alternatives instantly.",
  },
  {
    icon: Shield,
    title: "Secure & Private",
    description: "Your data is encrypted and protected. We never share your personal information with third parties.",
  },
  {
    icon: Zap,
    title: "Lightning Fast",
    description: "Get results in seconds with our optimized search algorithms and real-time price comparison.",
  },
  {
    icon: Award,
    title: "Verified Results",
    description: "All products and prices are verified from trusted retailers and updated in real-time.",
  },
]

const team = [
  {
    name: "Ahmed Hassan",
    role: "CEO & Founder",
    description: "Former Google engineer with 10+ years in AI and machine learning.",
    initials: "AH",
  },
  {
    name: "Sarah Johnson",
    role: "CTO",
    description: "Ex-Amazon architect specializing in large-scale e-commerce systems.",
    initials: "SJ",
  },
  {
    name: "Mohamed Ali",
    role: "Head of AI",
    description: "PhD in Computer Science, expert in computer vision and NLP.",
    initials: "MA",
  },
  {
    name: "Lisa Chen",
    role: "Head of Design",
    description: "Award-winning UX designer with experience at top tech companies.",
    initials: "LC",
  },
]

const steps = [
  {
    number: "01",
    title: "Search or Upload",
    description: "Enter a product name, paste a URL, or upload an image of what you're looking for.",
    icon: Search,
  },
  {
    number: "02",
    title: "AI Analysis",
    description: "Our advanced AI analyzes your input and identifies the product specifications and features.",
    icon: Brain,
  },
  {
    number: "03",
    title: "Get Results",
    description: "Receive a curated list of cheaper alternatives from verified retailers with automatic discounts.",
    icon: CheckCircle,
  },
]

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-black">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-black via-gray-900 to-black py-20 sm:py-32">
        {/* Background Effects */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-600/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center max-w-4xl mx-auto">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-blue-500/10 to-blue-600/10 border border-blue-500/20 mb-6">
              <Sparkles className="w-4 h-4 text-blue-400 mr-2" />
              <span className="text-sm text-blue-400 font-medium">About SaveAI</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight mb-6">
              <span className="bg-gradient-to-r from-white via-gray-100 to-gray-300 bg-clip-text text-transparent">
                Revolutionizing Online Shopping
              </span>
              <br />
              <span className="bg-gradient-to-r from-blue-400 via-blue-500 to-blue-600 bg-clip-text text-transparent">
                with Artificial Intelligence
              </span>
            </h1>

            <p className="text-xl text-gray-400 leading-relaxed mb-8 max-w-3xl mx-auto">
              We're on a mission to help millions of shoppers save money by finding cheaper alternatives to any product
              using cutting-edge AI technology. Join the smart shopping revolution.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                className="text-lg px-8 py-6 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-400 hover:to-blue-500 shadow-lg hover:shadow-blue-500/25 transition-all duration-300"
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
                <Link href="/privacy">Learn More</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-gradient-to-b from-black to-gray-900">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <Card
                key={index}
                className="text-center p-6 border-gray-800 bg-gradient-to-br from-gray-900/50 to-black/50 backdrop-blur-xl hover:shadow-xl hover:shadow-blue-500/10 transition-all duration-500"
              >
                <CardContent className="p-0">
                  <div className="w-12 h-12 mx-auto bg-gradient-to-r from-blue-500/20 to-blue-600/20 rounded-full flex items-center justify-center mb-4">
                    <stat.icon className="w-6 h-6 text-blue-400" />
                  </div>
                  <div className="text-2xl sm:text-3xl font-bold text-white mb-2">{stat.value}</div>
                  <div className="text-sm text-gray-400">{stat.label}</div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20 bg-gradient-to-b from-gray-900 to-black">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-blue-500/10 to-blue-600/10 border border-blue-500/20 mb-6">
                <Target className="w-4 h-4 text-blue-400 mr-2" />
                <span className="text-sm text-blue-400 font-medium">Our Mission</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
                Making Smart Shopping Accessible to Everyone
              </h2>
              <p className="text-lg text-gray-400 leading-relaxed mb-6">
                We believe everyone deserves to find the best deals without spending hours searching. Our AI-powered
                platform democratizes smart shopping by instantly finding cheaper alternatives to any product.
              </p>
              <ul className="space-y-3">
                <li className="flex items-center text-gray-300">
                  <CheckCircle className="w-5 h-5 text-green-400 mr-3 flex-shrink-0" />
                  Save time with instant AI-powered product analysis
                </li>
                <li className="flex items-center text-gray-300">
                  <CheckCircle className="w-5 h-5 text-green-400 mr-3 flex-shrink-0" />
                  Access deals from hundreds of verified retailers
                </li>
                <li className="flex items-center text-gray-300">
                  <CheckCircle className="w-5 h-5 text-green-400 mr-3 flex-shrink-0" />
                  Protect your privacy with secure, encrypted searches
                </li>
              </ul>
            </div>

            <div>
              <div className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-blue-500/10 to-blue-600/10 border border-blue-500/20 mb-6">
                <Eye className="w-4 h-4 text-blue-400 mr-2" />
                <span className="text-sm text-blue-400 font-medium">Our Vision</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">The Future of Intelligent Commerce</h2>
              <p className="text-lg text-gray-400 leading-relaxed mb-6">
                We envision a world where artificial intelligence eliminates the frustration of overpaying. Our
                technology will become the standard for smart shopping, helping consumers make informed decisions
                effortlessly.
              </p>
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-4 bg-gradient-to-br from-gray-900/50 to-black/50 rounded-lg border border-gray-800">
                  <div className="text-2xl font-bold text-blue-400 mb-1">99%</div>
                  <div className="text-sm text-gray-400">Accuracy Rate</div>
                </div>
                <div className="text-center p-4 bg-gradient-to-br from-gray-900/50 to-black/50 rounded-lg border border-gray-800">
                  <div className="text-2xl font-bold text-green-400 mb-1">{"<"}3s</div>
                  <div className="text-sm text-gray-400">Average Response</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-gradient-to-b from-black to-gray-900">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">How SaveAI Works</h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Our advanced AI technology makes finding cheaper alternatives as simple as 1-2-3
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {steps.map((step, index) => (
              <Card
                key={index}
                className="text-center p-8 border-gray-800 bg-gradient-to-br from-gray-900/50 to-black/50 backdrop-blur-xl hover:shadow-xl hover:shadow-blue-500/10 transition-all duration-500 group"
              >
                <CardContent className="p-0">
                  <div className="relative mb-6">
                    <div className="w-16 h-16 mx-auto bg-gradient-to-r from-blue-500/20 to-blue-600/20 rounded-full flex items-center justify-center group-hover:from-blue-500/30 group-hover:to-blue-600/30 transition-all duration-300">
                      <step.icon className="w-8 h-8 text-blue-400" />
                    </div>
                    <div className="absolute -top-2 -right-2 w-8 h-8 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-white text-sm font-bold">
                      {step.number}
                    </div>
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-4">{step.title}</h3>
                  <p className="text-gray-400">{step.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 bg-gradient-to-b from-gray-900 to-black">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">Why Choose SaveAI?</h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Cutting-edge technology meets user-friendly design to deliver the ultimate shopping experience
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <Card
                key={index}
                className="text-center p-6 border-gray-800 bg-gradient-to-br from-gray-900/50 to-black/50 backdrop-blur-xl hover:shadow-xl hover:shadow-blue-500/10 transition-all duration-500 group"
              >
                <CardContent className="p-0">
                  <div className="w-12 h-12 mx-auto bg-gradient-to-r from-blue-500/20 to-blue-600/20 rounded-full flex items-center justify-center mb-4 group-hover:from-blue-500/30 group-hover:to-blue-600/30 transition-all duration-300">
                    <feature.icon className="w-6 h-6 text-blue-400" />
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-3">{feature.title}</h3>
                  <p className="text-sm text-gray-400">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-20 bg-gradient-to-b from-black to-gray-900">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">Meet Our Team</h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Passionate experts from top tech companies working to revolutionize online shopping
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, index) => (
              <Card
                key={index}
                className="text-center p-6 border-gray-800 bg-gradient-to-br from-gray-900/50 to-black/50 backdrop-blur-xl hover:shadow-xl hover:shadow-blue-500/10 transition-all duration-500"
              >
                <CardContent className="p-0">
                  <Avatar className="w-16 h-16 mx-auto mb-4 bg-gradient-to-r from-blue-500 to-blue-600">
                    <AvatarFallback className="text-white font-bold">{member.initials}</AvatarFallback>
                  </Avatar>
                  <h3 className="text-lg font-semibold text-white mb-1">{member.name}</h3>
                  <Badge className="bg-gradient-to-r from-blue-500/20 to-blue-600/20 text-blue-400 border-blue-500/30 mb-3">
                    {member.role}
                  </Badge>
                  <p className="text-sm text-gray-400">{member.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 via-blue-500 to-blue-600 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/90 to-blue-500/90"></div>
        <div className="container mx-auto px-4 text-center relative z-10">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">Ready to Start Saving?</h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Join thousands of smart shoppers who save money every day with SaveAI
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              variant="secondary"
              className="text-lg px-8 py-6 bg-white text-blue-600 hover:bg-gray-100 shadow-lg hover:shadow-xl transition-all duration-300"
              asChild
            >
              <Link href="/search">Start Free Search</Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="text-lg px-8 py-6 border-white/30 text-white hover:bg-white/10 hover:border-white/50 transition-all duration-300 bg-transparent"
              asChild
            >
              <Link href="/signup">Create Account</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
