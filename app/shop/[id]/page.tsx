import Image from "next/image"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { notFound } from "next/navigation"
import { Suspense } from "react"

import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Skeleton } from "@/components/ui/skeleton"
import { formatCurrency } from "@/lib/utils"
import prisma from "@/lib/db"

interface ProductPageProps {
  params: {
    id: string
  }
}

export default function ProductPage({ params }: ProductPageProps) {
  return (
    <div className="container mx-auto px-4 py-12">
      <Link href="/shop" className="mb-8 inline-flex items-center text-sm font-medium hover:underline">
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to Shop
      </Link>
      
      <Suspense fallback={<ProductDetailSkeleton />}>
        <ProductDetail id={params.id} />
      </Suspense>
    </div>
  )
}

async function ProductDetail({ id }: { id: string }) {
  const product = await prisma.product.findUnique({
    where: { id: parseInt(id) }
  })
  
  if (!product) {
    notFound()
  }
  
  return (
    <div className="grid gap-8 md:grid-cols-2">
      <div className="aspect-square overflow-hidden rounded-lg border">
        <Image
          src={product.image}
          alt={product.name}
          className="h-full w-full object-cover"
          width={600}
          height={600}
        />
      </div>
      <div className="flex flex-col">
        <h1 className="text-3xl font-bold">{product.name}</h1>
        <p className="mt-4 text-2xl font-semibold">{formatCurrency(product.price)}</p>
        
        <Separator className="my-6" />
        
        <div className="mb-6">
          <h2 className="mb-2 text-lg font-semibold">Description</h2>
          <p className="text-muted-foreground">{product.description}</p>
        </div>
        
        <div className="mb-6">
          <h2 className="mb-2 text-lg font-semibold">Availability</h2>
          <p className={product.stock > 0 ? "text-green-600" : "text-red-600"}>
            {product.stock > 0 ? `${product.stock} in stock` : "Out of stock"}
          </p>
        </div>
        
        <Button className="mt-auto w-full" disabled={product.stock <= 0} size="lg">
          Add to Cart
        </Button>
      </div>
    </div>
  )
}

function ProductDetailSkeleton() {
  return (
    <div className="grid gap-8 md:grid-cols-2">
      <Skeleton className="aspect-square w-full rounded-lg" />
      <div className="flex flex-col">
        <Skeleton className="h-10 w-3/4" />
        <Skeleton className="mt-4 h-8 w-1/4" />
        
        <Skeleton className="my-6 h-px w-full" />
        
        <Skeleton className="mb-2 h-6 w-40" />
        <Skeleton className="mb-6 h-20 w-full" />
        
        <Skeleton className="mb-2 h-6 w-40" />
        <Skeleton className="mb-6 h-5 w-20" />
        
        <Skeleton className="mt-auto h-12 w-full" />
      </div>
    </div>
  )
}