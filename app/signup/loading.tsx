import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

export default function SignUpLoading() {
  return (
    <div className="min-h-screen py-12 bg-gradient-to-br from-black via-gray-900 to-black flex items-center justify-center">
      <div className="container mx-auto px-4 max-w-md">
        <Card className="border-gray-800 bg-gradient-to-br from-gray-900/80 to-black/80">
          <CardHeader>
            <Skeleton className="h-8 w-32 bg-gray-700" />
            <Skeleton className="h-4 w-48 bg-gray-700 mt-2" />
          </CardHeader>
          <CardContent className="space-y-4">
            <Skeleton className="h-10 w-full bg-gray-700" />
            <Skeleton className="h-10 w-full bg-gray-700" />
            <Skeleton className="h-10 w-full bg-gray-700" />
            <Skeleton className="h-12 w-full bg-blue-600" />
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
