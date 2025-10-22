import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Shield, Eye, Lock, Database, UserCheck, FileText, ArrowLeft, Sparkles } from "lucide-react"

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black">
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-600/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      <div className="relative z-10 py-12">
        <div className="container mx-auto px-4 max-w-4xl">
          {/* Back Button */}
          <div className="mb-8">
            <Button variant="ghost" className="text-gray-400 hover:text-white transition-colors" asChild>
              <Link href="/">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Home
              </Link>
            </Button>
          </div>

          {/* Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-blue-500/10 to-blue-600/10 border border-blue-500/20 mb-6">
              <Shield className="w-4 h-4 text-blue-400 mr-2" />
              <span className="text-sm text-blue-400 font-medium">Privacy Policy</span>
            </div>
            <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4">
              Your Privacy
              <span className="bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent"> Matters</span>
            </h1>
            <p className="text-xl text-gray-400 leading-relaxed">
              We're committed to protecting your privacy and being transparent about how we collect, use, and protect
              your data.
            </p>
            <div className="text-sm text-gray-500 mt-4">Last updated: January 2024</div>
          </div>

          {/* Quick Overview */}
          <Card className="mb-12 border-gray-800 bg-gradient-to-r from-blue-500/10 via-blue-600/10 to-blue-500/10 backdrop-blur-xl">
            <CardHeader>
              <CardTitle className="text-xl text-white flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-blue-400" />
                Privacy at a Glance
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="text-center p-4 rounded-lg bg-gradient-to-br from-gray-800/50 to-gray-900/50">
                  <Eye className="w-8 h-8 text-blue-400 mx-auto mb-3" />
                  <h3 className="font-semibold text-white mb-2">Transparent</h3>
                  <p className="text-sm text-gray-400">We clearly explain what data we collect and why</p>
                </div>
                <div className="text-center p-4 rounded-lg bg-gradient-to-br from-gray-800/50 to-gray-900/50">
                  <Lock className="w-8 h-8 text-green-400 mx-auto mb-3" />
                  <h3 className="font-semibold text-white mb-2">Secure</h3>
                  <p className="text-sm text-gray-400">Your data is encrypted and protected</p>
                </div>
                <div className="text-center p-4 rounded-lg bg-gradient-to-br from-gray-800/50 to-gray-900/50">
                  <UserCheck className="w-8 h-8 text-purple-400 mx-auto mb-3" />
                  <h3 className="font-semibold text-white mb-2">Your Control</h3>
                  <p className="text-sm text-gray-400">You control your data and can delete it anytime</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Privacy Sections */}
          <div className="space-y-8">
            {/* Information We Collect */}
            <Card className="border-gray-800 bg-gradient-to-br from-gray-900/80 to-black/80 backdrop-blur-xl">
              <CardHeader>
                <CardTitle className="text-xl text-white flex items-center gap-2">
                  <Database className="w-5 h-5 text-blue-400" />
                  Information We Collect
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-white mb-3">Account Information</h3>
                  <ul className="space-y-2 text-gray-400">
                    <li className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 bg-blue-400 rounded-full mt-2 flex-shrink-0"></div>
                      <span>Email address and name when you create an account</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 bg-blue-400 rounded-full mt-2 flex-shrink-0"></div>
                      <span>Profile information you choose to provide</span>
                    </li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-white mb-3">Usage Information</h3>
                  <ul className="space-y-2 text-gray-400">
                    <li className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 bg-green-400 rounded-full mt-2 flex-shrink-0"></div>
                      <span>Search queries and product preferences</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 bg-green-400 rounded-full mt-2 flex-shrink-0"></div>
                      <span>Pages visited and features used</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 bg-green-400 rounded-full mt-2 flex-shrink-0"></div>
                      <span>Device information and IP address</span>
                    </li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            {/* How We Use Information */}
            <Card className="border-gray-800 bg-gradient-to-br from-gray-900/80 to-black/80 backdrop-blur-xl">
              <CardHeader>
                <CardTitle className="text-xl text-white flex items-center gap-2">
                  <FileText className="w-5 h-5 text-green-400" />
                  How We Use Your Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-3">
                    <h3 className="text-lg font-semibold text-white">Service Delivery</h3>
                    <ul className="space-y-2 text-gray-400">
                      <li className="flex items-start gap-2">
                        <div className="w-1.5 h-1.5 bg-blue-400 rounded-full mt-2 flex-shrink-0"></div>
                        <span>Provide product search and comparison services</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="w-1.5 h-1.5 bg-blue-400 rounded-full mt-2 flex-shrink-0"></div>
                        <span>Personalize search results and recommendations</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="w-1.5 h-1.5 bg-blue-400 rounded-full mt-2 flex-shrink-0"></div>
                        <span>Maintain and improve our AI algorithms</span>
                      </li>
                    </ul>
                  </div>
                  <div className="space-y-3">
                    <h3 className="text-lg font-semibold text-white">Communication</h3>
                    <ul className="space-y-2 text-gray-400">
                      <li className="flex items-start gap-2">
                        <div className="w-1.5 h-1.5 bg-green-400 rounded-full mt-2 flex-shrink-0"></div>
                        <span>Send important service updates</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="w-1.5 h-1.5 bg-green-400 rounded-full mt-2 flex-shrink-0"></div>
                        <span>Respond to your support requests</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="w-1.5 h-1.5 bg-green-400 rounded-full mt-2 flex-shrink-0"></div>
                        <span>Share product updates (with your consent)</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Data Protection */}
            <Card className="border-gray-800 bg-gradient-to-br from-gray-900/80 to-black/80 backdrop-blur-xl">
              <CardHeader>
                <CardTitle className="text-xl text-white flex items-center gap-2">
                  <Shield className="w-5 h-5 text-purple-400" />
                  How We Protect Your Data
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="p-4 rounded-lg bg-gradient-to-br from-gray-800/50 to-gray-900/50 border border-gray-700/50">
                    <Lock className="w-8 h-8 text-blue-400 mb-3" />
                    <h3 className="text-lg font-semibold text-white mb-2">Encryption</h3>
                    <p className="text-gray-400 text-sm">
                      All data is encrypted in transit and at rest using industry-standard encryption protocols.
                    </p>
                  </div>
                  <div className="p-4 rounded-lg bg-gradient-to-br from-gray-800/50 to-gray-900/50 border border-gray-700/50">
                    <Database className="w-8 h-8 text-green-400 mb-3" />
                    <h3 className="text-lg font-semibold text-white mb-2">Secure Storage</h3>
                    <p className="text-gray-400 text-sm">
                      Your data is stored in secure, SOC 2 compliant data centers with regular security audits.
                    </p>
                  </div>
                  <div className="p-4 rounded-lg bg-gradient-to-br from-gray-800/50 to-gray-900/50 border border-gray-700/50">
                    <UserCheck className="w-8 h-8 text-purple-400 mb-3" />
                    <h3 className="text-lg font-semibold text-white mb-2">Access Control</h3>
                    <p className="text-gray-400 text-sm">
                      Strict access controls ensure only authorized personnel can access your data.
                    </p>
                  </div>
                  <div className="p-4 rounded-lg bg-gradient-to-br from-gray-800/50 to-gray-900/50 border border-gray-700/50">
                    <Eye className="w-8 h-8 text-yellow-400 mb-3" />
                    <h3 className="text-lg font-semibold text-white mb-2">Monitoring</h3>
                    <p className="text-gray-400 text-sm">
                      24/7 security monitoring and threat detection to protect against unauthorized access.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Your Rights */}
            <Card className="border-gray-800 bg-gradient-to-br from-gray-900/80 to-black/80 backdrop-blur-xl">
              <CardHeader>
                <CardTitle className="text-xl text-white flex items-center gap-2">
                  <UserCheck className="w-5 h-5 text-yellow-400" />
                  Your Rights and Choices
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-4">
                  <div className="flex items-start gap-3 p-4 rounded-lg bg-gradient-to-r from-blue-500/10 to-blue-600/10 border border-blue-500/20">
                    <div className="w-2 h-2 bg-blue-400 rounded-full mt-2 flex-shrink-0"></div>
                    <div>
                      <h3 className="font-semibold text-white mb-1">Access Your Data</h3>
                      <p className="text-gray-400 text-sm">Request a copy of all personal data we have about you</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 p-4 rounded-lg bg-gradient-to-r from-green-500/10 to-green-600/10 border border-green-500/20">
                    <div className="w-2 h-2 bg-green-400 rounded-full mt-2 flex-shrink-0"></div>
                    <div>
                      <h3 className="font-semibold text-white mb-1">Update Information</h3>
                      <p className="text-gray-400 text-sm">Correct or update your personal information at any time</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 p-4 rounded-lg bg-gradient-to-r from-purple-500/10 to-purple-600/10 border border-purple-500/20">
                    <div className="w-2 h-2 bg-purple-400 rounded-full mt-2 flex-shrink-0"></div>
                    <div>
                      <h3 className="font-semibold text-white mb-1">Delete Your Data</h3>
                      <p className="text-gray-400 text-sm">Request deletion of your account and associated data</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 p-4 rounded-lg bg-gradient-to-r from-yellow-500/10 to-yellow-600/10 border border-yellow-500/20">
                    <div className="w-2 h-2 bg-yellow-400 rounded-full mt-2 flex-shrink-0"></div>
                    <div>
                      <h3 className="font-semibold text-white mb-1">Control Communications</h3>
                      <p className="text-gray-400 text-sm">
                        Opt out of marketing emails and choose your communication preferences
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Contact */}
            <Card className="border-gray-800 bg-gradient-to-r from-blue-600/20 via-blue-500/20 to-blue-600/20 backdrop-blur-xl">
              <CardContent className="p-8 text-center">
                <h2 className="text-2xl font-bold text-white mb-4">Questions About Privacy?</h2>
                <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
                  We're here to help. If you have any questions about this privacy policy or how we handle your data,
                  please don't hesitate to contact us.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button
                    size="lg"
                    variant="secondary"
                    className="bg-white text-blue-600 hover:bg-gray-100 shadow-lg hover:shadow-xl transition-all duration-300"
                    asChild
                  >
                    <Link href="/contact">Contact Us</Link>
                  </Button>
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-white/30 text-white hover:bg-white/10 hover:border-white/50 transition-all duration-300 bg-transparent"
                    asChild
                  >
                    <Link href="mailto:privacy@afility.ai">privacy@afility.ai</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
