import { Skeleton } from "@/components/ui/skeleton"
import { Card, CardContent, CardHeader } from "@/components/ui/card"

export default function SearchLoading() {
  return (
    <div className="min-h-screen py-8 bg-gradient-to-br from-black via-gray-900 to-black">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Header Skeleton */}
        <div className="text-center mb-12">
          <Skeleton className="h-8 w-48 mx-auto mb-4 bg-gray-800" />
          <Skeleton className="h-12 w-96 mx-auto mb-4 bg-gray-800" />
          <Skeleton className="h-6 w-full max-w-2xl mx-auto bg-gray-800" />
        </div>

        {/* Search Card Skeleton */}
        <Card className="border-gray-800 bg-gradient-to-br from-gray-900/80 to-black/80 backdrop-blur-xl">
          <CardHeader>
            <Skeleton className="h-8 w-64 mb-2 bg-gray-800" />
            <Skeleton className="h-4 w-full bg-gray-800" />
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Tabs Skeleton */}
            <div className="flex space-x-2">
              <Skeleton className="h-10 w-32 bg-gray-800" />
              <Skeleton className="h-10 w-32 bg-gray-800" />
              <Skeleton className="h-10 w-32 bg-gray-800" />
            </div>

            {/* Input Skeleton */}
            <div className="space-y-4">
              <Skeleton className="h-6 w-48 bg-gray-800" />
              <Skeleton className="h-14 w-full bg-gray-800" />
              <Skeleton className="h-14 w-full bg-gray-800" />
            </div>

            {/* Features Skeleton */}
            <div className="grid md:grid-cols-3 gap-4 mt-8">
              {[1, 2, 3].map((i) => (
                <div key={i} className="text-center p-4 rounded-lg bg-gray-800/50">
                  <Skeleton className="h-8 w-8 mx-auto mb-2 bg-gray-700" />
                  <Skeleton className="h-4 w-24 mx-auto mb-1 bg-gray-700" />
                  <Skeleton className="h-3 w-32 mx-auto bg-gray-700" />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
