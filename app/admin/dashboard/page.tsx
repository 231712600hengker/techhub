import Link from "next/link"
import { Suspense } from "react"
import { Package, Receipt, BarChart3 } from "lucide-react"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { formatCurrency } from "@/lib/utils"
import prisma from "@/lib/db"

export default function DashboardPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="mb-8 text-3xl font-bold">Admin Dashboard</h1>
      
      <div className="mb-8 grid gap-4 md:grid-cols-3">
        <Suspense fallback={<MetricCardSkeleton title="Total Products" />}>
          <TotalProductsCard />
        </Suspense>
        
        <Suspense fallback={<MetricCardSkeleton title="Total Revenue" />}>
          <TotalRevenueCard />
        </Suspense>
        
        <Suspense fallback={<MetricCardSkeleton title="Recent Transactions" />}>
          <RecentTransactionsCard />
        </Suspense>
      </div>
      
      <div className="grid gap-8 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Product Management</CardTitle>
            <CardDescription>Manage your product catalog</CardDescription>
          </CardHeader>
          <CardContent>
            <Link href="/admin/products" className="flex items-center">
              <div className="mr-4 rounded-lg bg-primary/10 p-2">
                <Package className="h-6 w-6 text-primary" />
              </div>
              <div className="flex-1">
                <h3 className="font-medium">Products Catalog</h3>
                <p className="text-sm text-muted-foreground">Add, edit, and remove products</p>
              </div>
              <Suspense fallback={<Skeleton className="h-6 w-10" />}>
                <ProductCountBadge />
              </Suspense>
            </Link>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Transaction Management</CardTitle>
            <CardDescription>View and manage orders</CardDescription>
          </CardHeader>
          <CardContent>
            <Link href="/admin/transactions" className="flex items-center">
              <div className="mr-4 rounded-lg bg-primary/10 p-2">
                <Receipt className="h-6 w-6 text-primary" />
              </div>
              <div className="flex-1">
                <h3 className="font-medium">Transactions</h3>
                <p className="text-sm text-muted-foreground">View transaction history</p>
              </div>
              <Suspense fallback={<Skeleton className="h-6 w-10" />}>
                <TransactionCountBadge />
              </Suspense>
            </Link>
          </CardContent>
        </Card>
        
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Analytics</CardTitle>
            <CardDescription>View detailed analytics about your store</CardDescription>
          </CardHeader>
          <CardContent>
            <Link href="/admin/analytics" className="flex items-center">
              <div className="mr-4 rounded-lg bg-primary/10 p-2">
                <BarChart3 className="h-6 w-6 text-primary" />
              </div>
              <div className="flex-1">
                <h3 className="font-medium">Analytics Dashboard</h3>
                <p className="text-sm text-muted-foreground">Track sales performance and trends</p>
              </div>
            </Link>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

async function TotalProductsCard() {
  const count = await prisma.product.count()
  
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">Total Products</CardTitle>
        <Package className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{count}</div>
      </CardContent>
    </Card>
  )
}

async function TotalRevenueCard() {
  const result = await prisma.transaction.aggregate({
    _sum: {
      totalPrice: true
    }
  })
  
  const totalRevenue = result._sum.totalPrice || 0
  
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
        <BarChart3 className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{formatCurrency(totalRevenue)}</div>
      </CardContent>
    </Card>
  )
}

async function RecentTransactionsCard() {
  const count = await prisma.transaction.count()
  
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">Recent Transactions</CardTitle>
        <Receipt className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{count}</div>
      </CardContent>
    </Card>
  )
}

function MetricCardSkeleton({ title }: { title: string }) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <Skeleton className="h-4 w-4" />
      </CardHeader>
      <CardContent>
        <Skeleton className="h-8 w-24" />
      </CardContent>
    </Card>
  )
}

async function ProductCountBadge() {
  const count = await prisma.product.count()
  
  return (
    <div className="rounded-full bg-primary/10 px-2 py-1 text-xs font-medium text-primary">
      {count}
    </div>
  )
}

async function TransactionCountBadge() {
  const count = await prisma.transaction.count()
  
  return (
    <div className="rounded-full bg-primary/10 px-2 py-1 text-xs font-medium text-primary">
      {count}
    </div>
  )
}