import { Skeleton } from "@/components/ui/skeleton"
import { Card, CardContent, CardHeader } from "@/components/ui/card"

export default function ResultsLoading() {
  return (
    <div className="min-h-screen py-8 bg-gradient-to-br from-black via-gray-900 to-black">
      <div className="container mx-auto px-4">
        {/* Header Skeleton */}
        <div className="mb-8">
          <Skeleton className="h-6 w-32 mb-4 bg-gray-800" />
          <Skeleton className="h-10 w-96 mb-2 bg-gray-800" />
          <Skeleton className="h-5 w-64 bg-gray-800" />
        </div>

        {/* Filters Skeleton */}
        <Card className="mb-8 border-gray-800 bg-gradient-to-br from-gray-900/80 to-black/80">
          <CardContent className="p-6">
            <div className="flex gap-4">
              <Skeleton className="h-10 w-48 bg-gray-800" />
              <Skeleton className="h-10 w-48 bg-gray-800" />
            </div>
          </CardContent>
        </Card>

        {/* Results Grid Skeleton */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 9 }).map((_, i) => (
            <Card key={i} className="border-gray-800 bg-gradient-to-br from-gray-900/80 to-black/80">
              <CardHeader className="pb-4">
                <Skeleton className="aspect-square w-full mb-4 bg-gray-800" />
                <Skeleton className="h-6 w-full mb-2 bg-gray-800" />
                <Skeleton className="h-4 w-3/4 bg-gray-800" />
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-2">
                  <Skeleton className="h-8 w-20 bg-gray-800" />
                  <Skeleton className="h-6 w-16 bg-gray-800" />
                </div>
                <Skeleton className="h-5 w-32 bg-gray-800" />
                <div className="flex gap-2">
                  <Skeleton className="h-6 w-16 bg-gray-800" />
                  <Skeleton className="h-6 w-20 bg-gray-800" />
                </div>
                <Skeleton className="h-10 w-full bg-gray-800" />
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
