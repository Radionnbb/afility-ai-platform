"use client"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import {
  User,
  Mail,
  Calendar,
  DollarSign,
  Package,
  Settings,
  LogOut,
  Sparkles,
  TrendingUp,
  ShoppingCart,
  Edit,
  BarChart3,
  Link2,
} from "lucide-react"
import { useEffect, useState } from "react"
import { calculateTotalSavings } from "@/lib/utils/savings"
import Link from "next/link"

interface SearchRecord {
  id: string
  query: string
  created_at: string
  savings?: number
  savings_percent?: number
}

interface TrackingData {
  totalClicks: number
  totalConversions: number
  totalCommission: number
  conversionRate: number
  recentActivity: Array<{
    date: string
    action: string
    details: string
    savings: string
  }>
}

const mockTrackingData: TrackingData = {
  totalClicks: 47,
  totalConversions: 12,
  totalCommission: 156.75,
  conversionRate: 25.5,
  recentActivity: [
    { date: "2024-01-15", action: "Purchase Confirmed", details: "iPhone 15 Pro Max", savings: "$89.99" },
    { date: "2024-01-12", action: "Click Tracked", details: "Samsung Galaxy Buds", savings: "$45.00" },
    { date: "2024-01-08", action: "Purchase Confirmed", details: "MacBook Air M3", savings: "$120.50" },
    { date: "2024-01-05", action: "Click Tracked", details: "Wireless mouse", savings: "$8.99" },
    { date: "2024-01-03", action: "Purchase Confirmed", details: "iPad Pro 12.9", savings: "$95.00" },
  ],
}

export default function ProfilePage() {
  const [totalSavings, setTotalSavings] = useState<number>(0)
  const [trackingData, setTrackingData] = useState<TrackingData>(mockTrackingData)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const mockSearches = mockTrackingData.recentActivity.map((activity) => ({
      savings: Number.parseFloat(activity.savings.replace("$", "")),
    }))
    const total = calculateTotalSavings(mockSearches)
    setTotalSavings(total)
    setIsLoading(false)
  }, [])

  return (
    <div className="min-h-screen py-6 sm:py-8 lg:py-12 bg-gradient-to-br from-black via-gray-900 to-black">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-10 sm:top-20 right-10 sm:right-20 w-40 sm:w-60 h-40 sm:h-60 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-10 sm:bottom-20 left-10 sm:left-20 w-40 sm:w-60 h-40 sm:h-60 bg-blue-600/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl relative z-10">
        <div className="mb-8 sm:mb-12">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-4">
            <Avatar className="h-12 w-12 sm:h-16 sm:w-16 bg-gradient-to-r from-blue-500 to-blue-600 flex-shrink-0">
              <AvatarFallback className="text-white text-lg sm:text-xl font-bold">JD</AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              <div className="inline-flex items-center px-3 sm:px-4 py-1.5 sm:py-2 rounded-full bg-gradient-to-r from-blue-500/10 to-blue-600/10 border border-blue-500/20 mb-2">
                <Sparkles className="w-3 h-3 sm:w-4 sm:h-4 text-blue-400 mr-2 flex-shrink-0" />
                <span className="text-xs sm:text-sm text-blue-400 font-medium">Welcome Back</span>
              </div>
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white truncate">John Doe</h1>
              <p className="text-base sm:text-lg text-gray-400 mt-1">Here's your account summary and activity</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
          <div className="lg:col-span-2 space-y-6 lg:space-y-8">
            <Card className="border-green-600/50 bg-gradient-to-br from-green-900/20 to-green-800/10 backdrop-blur-xl">
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center gap-2 text-white text-lg sm:text-xl">
                  <DollarSign className="w-5 h-5 text-green-400" />
                  Total Money Saved
                </CardTitle>
                <CardDescription className="text-green-300/70">
                  Your cumulative savings across all searches and purchases
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-4xl sm:text-5xl font-bold text-green-400 mb-2">
                  ${isLoading ? "0.00" : totalSavings.toFixed(2)}
                </div>
                <p className="text-sm text-gray-400">Based on {trackingData.recentActivity.length} transactions</p>
              </CardContent>
            </Card>

            {/* Profile Info Card */}
            <Card className="border-gray-800 bg-gradient-to-br from-gray-900/80 to-black/80 backdrop-blur-xl">
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center gap-2 text-white text-lg sm:text-xl">
                  <User className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0" />
                  Profile Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 sm:space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-gray-300">
                      <User className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0" />
                      <span className="text-xs sm:text-sm">Full Name</span>
                    </div>
                    <p className="text-white font-medium text-sm sm:text-base">John Doe</p>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-gray-300">
                      <Mail className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0" />
                      <span className="text-xs sm:text-sm">Email</span>
                    </div>
                    <p className="text-white font-medium text-sm sm:text-base break-all">john.doe@email.com</p>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-gray-300">
                      <Calendar className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0" />
                      <span className="text-xs sm:text-sm">Joined Date</span>
                    </div>
                    <p className="text-white font-medium text-sm sm:text-base">January 1, 2024</p>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-gray-300">
                      <Settings className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0" />
                      <span className="text-xs sm:text-sm">Account Status</span>
                    </div>
                    <Badge className="bg-gradient-to-r from-green-500 to-green-600 text-white text-xs sm:text-sm">
                      Active
                    </Badge>
                  </div>
                </div>
                <Button className="w-full sm:w-auto bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-400 hover:to-blue-500 transition-all duration-300 text-sm sm:text-base">
                  <Edit className="w-3 h-3 sm:w-4 sm:h-4 mr-2" />
                  Edit Profile
                </Button>
              </CardContent>
            </Card>

            {/* Stats Overview */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Card className="border-gray-800 bg-gradient-to-br from-gray-900/80 to-black/80 backdrop-blur-xl hover:shadow-lg hover:shadow-blue-500/10 transition-all duration-300">
                <CardContent className="p-4 sm:p-6 text-center">
                  <div className="w-12 h-12 sm:w-14 sm:h-14 mx-auto bg-gradient-to-r from-green-500/20 to-green-600/20 rounded-full flex items-center justify-center mb-3 sm:mb-4">
                    <DollarSign className="w-6 h-6 sm:w-7 sm:h-7 text-green-400" />
                  </div>
                  <div className="text-2xl sm:text-3xl font-bold text-white">
                    ${isLoading ? "0.00" : totalSavings.toFixed(2)}
                  </div>
                  <div className="text-sm sm:text-base text-gray-400">Total Money Saved</div>
                </CardContent>
              </Card>

              <Card className="border-gray-800 bg-gradient-to-br from-gray-900/80 to-black/80 backdrop-blur-xl hover:shadow-lg hover:shadow-blue-500/10 transition-all duration-300">
                <CardContent className="p-4 sm:p-6 text-center">
                  <div className="w-12 h-12 sm:w-14 sm:h-14 mx-auto bg-gradient-to-r from-blue-500/20 to-blue-600/20 rounded-full flex items-center justify-center mb-3 sm:mb-4">
                    <Package className="w-6 h-6 sm:w-7 sm:h-7 text-blue-400" />
                  </div>
                  <div className="text-2xl sm:text-3xl font-bold text-white">{trackingData.recentActivity.length}</div>
                  <div className="text-sm sm:text-base text-gray-400">Successful Purchases</div>
                </CardContent>
              </Card>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <Card className="border-gray-800 bg-gradient-to-br from-gray-900/80 to-black/80 backdrop-blur-xl hover:shadow-lg hover:shadow-blue-500/10 transition-all duration-300">
                <CardContent className="p-4 sm:p-6 text-center">
                  <div className="w-12 h-12 sm:w-14 sm:h-14 mx-auto bg-gradient-to-r from-blue-500/20 to-blue-600/20 rounded-full flex items-center justify-center mb-3 sm:mb-4">
                    <Link2 className="w-6 h-6 sm:w-7 sm:h-7 text-blue-400" />
                  </div>
                  <div className="text-2xl sm:text-3xl font-bold text-white">{trackingData.totalClicks}</div>
                  <div className="text-sm sm:text-base text-gray-400">Total Clicks</div>
                </CardContent>
              </Card>

              <Card className="border-gray-800 bg-gradient-to-br from-gray-900/80 to-black/80 backdrop-blur-xl hover:shadow-lg hover:shadow-blue-500/10 transition-all duration-300">
                <CardContent className="p-4 sm:p-6 text-center">
                  <div className="w-12 h-12 sm:w-14 sm:h-14 mx-auto bg-gradient-to-r from-green-500/20 to-green-600/20 rounded-full flex items-center justify-center mb-3 sm:mb-4">
                    <ShoppingCart className="w-6 h-6 sm:w-7 sm:h-7 text-green-400" />
                  </div>
                  <div className="text-2xl sm:text-3xl font-bold text-white">{trackingData.totalConversions}</div>
                  <div className="text-sm sm:text-base text-gray-400">Conversions</div>
                </CardContent>
              </Card>

              <Card className="border-gray-800 bg-gradient-to-br from-gray-900/80 to-black/80 backdrop-blur-xl hover:shadow-lg hover:shadow-blue-500/10 transition-all duration-300">
                <CardContent className="p-4 sm:p-6 text-center">
                  <div className="w-12 h-12 sm:w-14 sm:h-14 mx-auto bg-gradient-to-r from-purple-500/20 to-purple-600/20 rounded-full flex items-center justify-center mb-3 sm:mb-4">
                    <TrendingUp className="w-6 h-6 sm:w-7 sm:h-7 text-purple-400" />
                  </div>
                  <div className="text-2xl sm:text-3xl font-bold text-white">
                    {trackingData.conversionRate.toFixed(1)}%
                  </div>
                  <div className="text-sm sm:text-base text-gray-400">Conversion Rate</div>
                </CardContent>
              </Card>
            </div>

            {/* Activity Table */}
            <Card className="border-gray-800 bg-gradient-to-br from-gray-900/80 to-black/80 backdrop-blur-xl">
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center gap-2 text-white text-lg sm:text-xl">
                  <TrendingUp className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0" />
                  Recent Activity
                </CardTitle>
                <CardDescription className="text-gray-400 text-sm sm:text-base">
                  Your latest transactions and savings
                </CardDescription>
              </CardHeader>
              <CardContent className="p-0 sm:p-6">
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow className="border-gray-700">
                        <TableHead className="text-gray-300 text-xs sm:text-sm px-2 sm:px-4">Date</TableHead>
                        <TableHead className="text-gray-300 text-xs sm:text-sm px-2 sm:px-4">Action</TableHead>
                        <TableHead className="text-gray-300 text-xs sm:text-sm px-2 sm:px-4 hidden sm:table-cell">
                          Details
                        </TableHead>
                        <TableHead className="text-right text-gray-300 text-xs sm:text-sm px-2 sm:px-4">
                          Savings
                        </TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {trackingData.recentActivity.map((activity, index) => (
                        <TableRow key={index} className="border-gray-700 hover:bg-gray-800/50">
                          <TableCell className="text-gray-400 text-xs sm:text-sm px-2 sm:px-4">
                            <div className="sm:hidden">
                              {new Date(activity.date).toLocaleDateString("en-US", { month: "short", day: "numeric" })}
                            </div>
                            <div className="hidden sm:block">{new Date(activity.date).toLocaleDateString()}</div>
                          </TableCell>
                          <TableCell className="text-white font-medium text-xs sm:text-sm px-2 sm:px-4">
                            <div className="flex items-center gap-1 sm:gap-2">
                              <ShoppingCart className="w-3 h-3 sm:w-4 sm:h-4 text-blue-400 flex-shrink-0" />
                              <span className="truncate">{activity.action}</span>
                            </div>
                            <div className="sm:hidden text-xs text-gray-400 mt-1 truncate">{activity.details}</div>
                          </TableCell>
                          <TableCell className="text-gray-400 text-xs sm:text-sm px-2 sm:px-4 hidden sm:table-cell">
                            <div className="truncate">{activity.details}</div>
                          </TableCell>
                          <TableCell className="text-right font-medium text-green-400 text-xs sm:text-sm px-2 sm:px-4">
                            {activity.savings}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column */}
          <div className="space-y-6 lg:space-y-8">
            <Card className="border-gray-800 bg-gradient-to-br from-gray-900/80 to-black/80 backdrop-blur-xl">
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center gap-2 text-white text-lg sm:text-xl">
                  <Settings className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0" />
                  Account Settings
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button
                  variant="outline"
                  className="w-full border-gray-600 text-gray-300 hover:bg-gray-800 hover:text-white hover:border-gray-500 transition-all duration-300 bg-transparent text-sm sm:text-base"
                >
                  <BarChart3 className="w-3 h-3 sm:w-4 sm:h-4 mr-2" />
                  View Analytics
                </Button>
                <Button
                  variant="outline"
                  className="w-full border-gray-600 text-gray-300 hover:bg-gray-800 hover:text-white hover:border-gray-500 transition-all duration-300 bg-transparent text-sm sm:text-base"
                  asChild
                >
                  <Link href="/notifications">
                    <Sparkles className="w-3 h-3 sm:w-4 sm:h-4 mr-2" />
                    Notifications
                  </Link>
                </Button>
                <Button
                  variant="outline"
                  className="w-full border-red-600 text-red-400 hover:bg-red-600 hover:text-white hover:border-red-500 transition-all duration-300 bg-transparent text-sm sm:text-base"
                >
                  <LogOut className="w-3 h-3 sm:w-4 sm:h-4 mr-2" />
                  Sign Out
                </Button>
              </CardContent>
            </Card>

            <Card className="border-gray-800 bg-gradient-to-br from-gray-900/80 to-black/80 backdrop-blur-xl">
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center gap-2 text-white text-lg sm:text-xl">
                  <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0" />
                  Quick Actions
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button
                  className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-400 hover:to-blue-500 transition-all duration-300 text-sm sm:text-base"
                  asChild
                >
                  <Link href="/search">
                    <Package className="w-3 h-3 sm:w-4 sm:h-4 mr-2" />
                    Start New Search
                  </Link>
                </Button>
                <Button
                  variant="outline"
                  className="w-full border-gray-600 text-gray-300 hover:bg-gray-800 hover:text-white hover:border-gray-500 transition-all duration-300 bg-transparent text-sm sm:text-base"
                >
                  <TrendingUp className="w-3 h-3 sm:w-4 sm:h-4 mr-2" />
                  View Search History
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
