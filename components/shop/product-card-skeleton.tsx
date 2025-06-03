import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

export function ProductCardSkeleton() {
  return (
    <Card className="overflow-hidden">
      <Skeleton className="aspect-square" />
      <CardContent className="p-4">
        <Skeleton className="h-6 w-3/4" />
        <Skeleton className="mt-2 h-4 w-full" />
        <Skeleton className="mt-1 h-4 w-full" />
      </CardContent>
      <CardFooter className="flex items-center justify-between border-t p-4">
        <Skeleton className="h-5 w-20" />
        <Skeleton className="h-4 w-16" />
      </CardFooter>
    </Card>
  )
}