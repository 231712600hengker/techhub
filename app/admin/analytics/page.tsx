import { Suspense } from "react"
import { 
  Package, 
  CreditCard, 
  TrendingUp,
  DollarSign,
  ShoppingCart
} from "lucide-react"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Skeleton } from "@/components/ui/skeleton"
import { formatCurrency } from "@/lib/utils"
import AnalyticsChart from "@/components/admin/analytics-chart"
import prisma from "@/lib/db"

export default function AnalyticsPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="mb-8 text-3xl font-bold">Analytics</h1>
      
      <Tabs defaultValue="overview">
        <TabsList className="mb-8">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="sales">Sales</TabsTrigger>
          <TabsTrigger value="inventory">Inventory</TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview" className="space-y-8">
          <div className="grid gap-4 md:grid-cols-3">
            <Suspense fallback={<AnalyticCardSkeleton title="Total Products\" icon={<Package className="h-4 w-4" />} />}>
              <TotalProductsCard />
            </Suspense>
            
            <Suspense fallback={<AnalyticCardSkeleton title="Total Revenue\" icon={<DollarSign className="h-4 w-4" />} />}>
              <TotalRevenueCard />
            </Suspense>
            
            <Suspense fallback={<AnalyticCardSkeleton title="Best Selling Product\" icon={<TrendingUp className="h-4 w-4" />} />}>
              <BestSellingProductCard />
            </Suspense>
          </div>
          
          <Card>
            <CardHeader>
              <CardTitle>Sales Overview</CardTitle>
              <CardDescription>
                Visual representation of your store performance
              </CardDescription>
            </CardHeader>
            <CardContent className="h-96">
              <Suspense fallback={<Skeleton className="h-full w-full" />}>
                <AnalyticsChart />
              </Suspense>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="sales" className="space-y-8">
          <Card className="h-[400px]">
            <CardHeader>
              <CardTitle>Sales Analysis</CardTitle>
              <CardDescription>
                Detailed breakdown of sales performance over time
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                This section will contain detailed sales analytics in future updates.
              </p>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="inventory" className="space-y-8">
          <Card className="h-[400px]">
            <CardHeader>
              <CardTitle>Inventory Management</CardTitle>
              <CardDescription>
                Track stock levels and manage your inventory
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                This section will contain detailed inventory analytics in future updates.
              </p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
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
        <p className="text-xs text-muted-foreground">
          Products in your catalog
        </p>
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
        <DollarSign className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{formatCurrency(totalRevenue)}</div>
        <p className="text-xs text-muted-foreground">
          Lifetime revenue
        </p>
      </CardContent>
    </Card>
  )
}

async function BestSellingProductCard() {
  const transactions = await prisma.transaction.groupBy({
    by: ['productId'],
    _count: {
      productId: true
    },
    orderBy: {
      _count: {
        productId: 'desc'
      }
    },
    take: 1
  })
  
  let productName = "No sales yet"
  let count = 0
  
  if (transactions.length > 0) {
    const productId = transactions[0].productId
    const product = await prisma.product.findUnique({
      where: { id: productId }
    })
    
    if (product) {
      productName = product.name
      count = transactions[0]._count.productId
    }
  }
  
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">Best Selling Product</CardTitle>
        <ShoppingCart className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{productName}</div>
        <p className="text-xs text-muted-foreground">
          {count} units sold
        </p>
      </CardContent>
    </Card>
  )
}

function AnalyticCardSkeleton({ title, icon }: { title: string, icon: React.ReactNode }) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        {icon}
      </CardHeader>
      <CardContent>
        <Skeleton className="mb-1 h-8 w-24" />
        <Skeleton className="h-4 w-32" />
      </CardContent>
    </Card>
  )
}