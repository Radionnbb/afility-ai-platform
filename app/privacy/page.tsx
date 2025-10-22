"use client"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Shield,
  Lock,
  Eye,
  UserCheck,
  Database,
  Settings,
  Mail,
  Phone,
  MapPin,
  Clock,
  CheckCircle,
  AlertTriangle,
} from "lucide-react"

const privacyPrinciples = [
  {
    icon: Shield,
    title: "Data Protection",
    description: "Your personal information is encrypted and stored securely using industry-standard protocols.",
  },
  {
    icon: Eye,
    title: "Transparency",
    description: "We clearly explain what data we collect, how we use it, and who we share it with.",
  },
  {
    icon: UserCheck,
    title: "User Control",
    description: "You have full control over your data with options to view, edit, or delete your information.",
  },
  {
    icon: Lock,
    title: "Secure Processing",
    description: "All data processing is done through secure, encrypted channels with regular security audits.",
  },
]

const dataTypes = [
  {
    category: "Account Information",
    items: ["Email address", "Username", "Profile preferences", "Account settings"],
    icon: UserCheck,
    color: "blue",
  },
  {
    category: "Search Data",
    items: ["Search queries", "Product images uploaded", "URLs analyzed", "Search history"],
    icon: Database,
    color: "green",
  },
  {
    category: "Usage Analytics",
    items: ["Page views", "Feature usage", "Performance metrics", "Error logs"],
    icon: Settings,
    color: "purple",
  },
  {
    category: "Technical Data",
    items: ["IP address", "Browser type", "Device information", "Session data"],
    icon: Lock,
    color: "orange",
  },
]

const userRights = [
  {
    right: "Access Your Data",
    description: "Request a copy of all personal data we have about you",
    icon: Eye,
  },
  {
    right: "Correct Your Data",
    description: "Update or correct any inaccurate personal information",
    icon: Settings,
  },
  {
    right: "Delete Your Data",
    description: "Request deletion of your personal data and account",
    icon: AlertTriangle,
  },
  {
    right: "Data Portability",
    description: "Export your data in a machine-readable format",
    icon: Database,
  },
]

export default function PrivacyPage() {
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
              <Shield className="w-4 h-4 text-blue-400 mr-2" />
              <span className="text-sm text-blue-400 font-medium">Privacy Policy</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight mb-6">
              <span className="bg-gradient-to-r from-white via-gray-100 to-gray-300 bg-clip-text text-transparent">
                Your Privacy is
              </span>
              <br />
              <span className="bg-gradient-to-r from-blue-400 via-blue-500 to-blue-600 bg-clip-text text-transparent">
                Our Priority
              </span>
            </h1>

            <p className="text-xl text-gray-400 leading-relaxed mb-8 max-w-3xl mx-auto">
              We're committed to protecting your personal information and being transparent about how we collect, use,
              and safeguard your data. Learn about our privacy practices and your rights.
            </p>

            <div className="flex items-center justify-center gap-4 text-sm text-gray-400">
              <div className="flex items-center">
                <Clock className="w-4 h-4 mr-2" />
                Last updated: January 2024
              </div>
              <div className="flex items-center">
                <CheckCircle className="w-4 h-4 mr-2 text-green-400" />
                GDPR Compliant
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Privacy Principles */}
      <section className="py-20 bg-gradient-to-b from-black to-gray-900">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">Our Privacy Principles</h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              These core principles guide how we handle your personal information
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {privacyPrinciples.map((principle, index) => (
              <Card
                key={index}
                className="text-center p-6 border-gray-800 bg-gradient-to-br from-gray-900/50 to-black/50 backdrop-blur-xl hover:shadow-xl hover:shadow-blue-500/10 transition-all duration-500 group"
              >
                <CardContent className="p-0">
                  <div className="w-12 h-12 mx-auto bg-gradient-to-r from-blue-500/20 to-blue-600/20 rounded-full flex items-center justify-center mb-4 group-hover:from-blue-500/30 group-hover:to-blue-600/30 transition-all duration-300">
                    <principle.icon className="w-6 h-6 text-blue-400" />
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-3">{principle.title}</h3>
                  <p className="text-sm text-gray-400">{principle.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Information We Collect */}
      <section className="py-20 bg-gradient-to-b from-gray-900 to-black">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">Information We Collect</h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              We collect only the information necessary to provide you with the best shopping experience
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {dataTypes.map((dataType, index) => (
              <Card
                key={index}
                className="p-6 border-gray-800 bg-gradient-to-br from-gray-900/50 to-black/50 backdrop-blur-xl hover:shadow-xl hover:shadow-blue-500/10 transition-all duration-500"
              >
                <CardHeader className="pb-4">
                  <CardTitle className="flex items-center gap-3 text-white">
                    <div className="w-10 h-10 bg-gradient-to-r from-blue-500/20 to-blue-600/20 rounded-lg flex items-center justify-center">
                      <dataType.icon className="w-5 h-5 text-blue-400" />
                    </div>
                    {dataType.category}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {dataType.items.map((item, itemIndex) => (
                      <li key={itemIndex} className="flex items-center text-gray-300">
                        <CheckCircle className="w-4 h-4 text-green-400 mr-3 flex-shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How We Use Your Data */}
      <section className="py-20 bg-gradient-to-b from-black to-gray-900">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-blue-500/10 to-blue-600/10 border border-blue-500/20 mb-6">
                <Database className="w-4 h-4 text-blue-400 mr-2" />
                <span className="text-sm text-blue-400 font-medium">Data Usage</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">How We Use Your Information</h2>
              <p className="text-lg text-gray-400 leading-relaxed mb-6">
                We use your information solely to provide and improve our services. We never sell your personal data to
                third parties or use it for purposes other than those outlined below.
              </p>
              <ul className="space-y-4">
                <li className="flex items-start text-gray-300">
                  <CheckCircle className="w-5 h-5 text-green-400 mr-3 flex-shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-white">Service Delivery:</strong> Process your searches and provide
                    personalized product recommendations
                  </div>
                </li>
                <li className="flex items-start text-gray-300">
                  <CheckCircle className="w-5 h-5 text-green-400 mr-3 flex-shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-white">Account Management:</strong> Maintain your account, preferences, and
                    search history
                  </div>
                </li>
                <li className="flex items-start text-gray-300">
                  <CheckCircle className="w-5 h-5 text-green-400 mr-3 flex-shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-white">Service Improvement:</strong> Analyze usage patterns to enhance our
                    AI algorithms and user experience
                  </div>
                </li>
                <li className="flex items-start text-gray-300">
                  <CheckCircle className="w-5 h-5 text-green-400 mr-3 flex-shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-white">Communication:</strong> Send important updates about your account or
                    our services
                  </div>
                </li>
              </ul>
            </div>

            <div className="space-y-6">
              <Card className="p-6 border-gray-800 bg-gradient-to-br from-gray-900/50 to-black/50 backdrop-blur-xl">
                <CardHeader className="pb-4">
                  <CardTitle className="flex items-center gap-3 text-white">
                    <Shield className="w-6 h-6 text-green-400" />
                    Data Protection Measures
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3 text-gray-300">
                    <li className="flex items-center">
                      <Lock className="w-4 h-4 text-blue-400 mr-3" />
                      End-to-end encryption
                    </li>
                    <li className="flex items-center">
                      <Shield className="w-4 h-4 text-blue-400 mr-3" />
                      Regular security audits
                    </li>
                    <li className="flex items-center">
                      <Database className="w-4 h-4 text-blue-400 mr-3" />
                      Secure data centers
                    </li>
                    <li className="flex items-center">
                      <UserCheck className="w-4 h-4 text-blue-400 mr-3" />
                      Access controls
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="p-6 border-gray-800 bg-gradient-to-br from-gray-900/50 to-black/50 backdrop-blur-xl">
                <CardHeader className="pb-4">
                  <CardTitle className="flex items-center gap-3 text-white">
                    <AlertTriangle className="w-6 h-6 text-orange-400" />
                    What We Don't Do
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3 text-gray-300">
                    <li className="flex items-center">
                      <CheckCircle className="w-4 h-4 text-red-400 mr-3" />
                      Sell your personal data
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="w-4 h-4 text-red-400 mr-3" />
                      Share data without consent
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="w-4 h-4 text-red-400 mr-3" />
                      Use data for advertising
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="w-4 h-4 text-red-400 mr-3" />
                      Track you across websites
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Your Rights */}
      <section className="py-20 bg-gradient-to-b from-gray-900 to-black">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">Your Rights & Controls</h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              You have full control over your personal information. Here's what you can do:
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {userRights.map((right, index) => (
              <Card
                key={index}
                className="text-center p-6 border-gray-800 bg-gradient-to-br from-gray-900/50 to-black/50 backdrop-blur-xl hover:shadow-xl hover:shadow-blue-500/10 transition-all duration-500 group"
              >
                <CardContent className="p-0">
                  <div className="w-12 h-12 mx-auto bg-gradient-to-r from-blue-500/20 to-blue-600/20 rounded-full flex items-center justify-center mb-4 group-hover:from-blue-500/30 group-hover:to-blue-600/30 transition-all duration-300">
                    <right.icon className="w-6 h-6 text-blue-400" />
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-3">{right.right}</h3>
                  <p className="text-sm text-gray-400">{right.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-12">
            <p className="text-gray-400 mb-6">
              To exercise any of these rights, please contact our privacy team using the information below.
            </p>
            <Button
              className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-400 hover:to-blue-500 shadow-lg hover:shadow-blue-500/25 transition-all duration-300"
              asChild
            >
              <Link href="#contact">Contact Privacy Team</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-gradient-to-b from-black to-gray-900">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">Questions About Privacy?</h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Our privacy team is here to help. Contact us with any questions or concerns about your data.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <Card className="text-center p-6 border-gray-800 bg-gradient-to-br from-gray-900/50 to-black/50 backdrop-blur-xl">
              <CardContent className="p-0">
                <div className="w-12 h-12 mx-auto bg-gradient-to-r from-blue-500/20 to-blue-600/20 rounded-full flex items-center justify-center mb-4">
                  <Mail className="w-6 h-6 text-blue-400" />
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">Email</h3>
                <p className="text-gray-400">privacy@afility.ai</p>
              </CardContent>
            </Card>

            <Card className="text-center p-6 border-gray-800 bg-gradient-to-br from-gray-900/50 to-black/50 backdrop-blur-xl">
              <CardContent className="p-0">
                <div className="w-12 h-12 mx-auto bg-gradient-to-r from-blue-500/20 to-blue-600/20 rounded-full flex items-center justify-center mb-4">
                  <Phone className="w-6 h-6 text-blue-400" />
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">Phone</h3>
                <p className="text-gray-400">+1 (555) 123-4567</p>
              </CardContent>
            </Card>

            <Card className="text-center p-6 border-gray-800 bg-gradient-to-br from-gray-900/50 to-black/50 backdrop-blur-xl">
              <CardContent className="p-0">
                <div className="w-12 h-12 mx-auto bg-gradient-to-r from-blue-500/20 to-blue-600/20 rounded-full flex items-center justify-center mb-4">
                  <MapPin className="w-6 h-6 text-blue-400" />
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">Address</h3>
                <p className="text-gray-400">123 Tech Street, San Francisco, CA 94105</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 via-blue-500 to-blue-600 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/90 to-blue-500/90"></div>
        <div className="container mx-auto px-4 text-center relative z-10">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">Ready to Shop Securely?</h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Your privacy is protected. Start finding better deals with confidence using Afility.AI
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              variant="secondary"
              className="text-lg px-8 py-6 bg-white text-blue-600 hover:bg-gray-100 shadow-lg hover:shadow-xl transition-all duration-300"
              asChild
            >
              <Link href="/search">Start Searching</Link>
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
