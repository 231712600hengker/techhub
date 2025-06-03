import { Suspense } from "react"
import { SearchProducts } from "@/components/shop/search-products"
import ProductCard from "@/components/shop/product-card"
import { ProductCardSkeleton } from "@/components/shop/product-card-skeleton"
import { ProductsGrid } from "@/components/shop/products-grid"
import { Pagination } from "@/components/ui/pagination"
import prisma from "@/lib/db"

interface SearchParams {
  search?: string
  page?: string
}

interface PageProps {
  searchParams: SearchParams
}

export default function ShopPage({ searchParams }: PageProps) {
  const search = searchParams.search || ""
  const currentPage = Number(searchParams.page) || 1

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="mb-8 text-3xl font-bold">Shop Our Products</h1>
      
      <div className="mb-8">
        <SearchProducts />
      </div>
      
      <Suspense fallback={<ProductsSkeleton />}>
        <ProductsList search={search} page={currentPage} />
      </Suspense>
    </div>
  )
}

async function ProductsList({ search, page }: { search: string; page: number }) {
  const limit = 12
  const skip = (page - 1) * limit

  const [products, total] = await Promise.all([
    prisma.product.findMany({
      where: {
        name: {
          contains: search,
          mode: 'insensitive'
        }
      },
      orderBy: {
        id: 'asc'
      },
      skip,
      take: limit,
    }),
    prisma.product.count({
      where: {
        name: {
          contains: search,
          mode: 'insensitive'
        }
      }
    })
  ])

  const totalPages = Math.ceil(total / limit)
  
  return (
    <div className="space-y-8">
      <ProductsGrid>
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </ProductsGrid>
      
      <div className="flex justify-center">
        <Pagination 
          totalPages={totalPages} 
          currentPage={page} 
          baseUrl={`/shop${search ? `?search=${search}&` : '?'}`} 
        />
      </div>
    </div>
  )
}

function ProductsSkeleton() {
  return (
    <div className="space-y-8">
      <ProductsGrid>
        {Array.from({ length: 12 }).map((_, i) => (
          <ProductCardSkeleton key={i} />
        ))}
      </ProductsGrid>
      
      <div className="flex justify-center">
        <div className="flex gap-2">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="h-10 w-10 animate-pulse rounded-md bg-muted" />
          ))}
        </div>
      </div>
    </div>
  )
}