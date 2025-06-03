import { Suspense } from "react"
import Link from "next/link"
import { PlusCircle } from "lucide-react"

import { Button } from "@/components/ui/button"
import { TransactionsTable } from "@/components/admin/transactions-table"
import { TransactionsTableSkeleton } from "@/components/admin/transactions-table-skeleton"

export default function TransactionsPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <h1 className="text-3xl font-bold">Transactions</h1>
        <Button asChild className="mt-4 sm:mt-0">
          <Link href="/admin/transactions/add">
            <PlusCircle className="mr-2 h-4 w-4" />
            Add New Transaction
          </Link>
        </Button>
      </div>

      <Suspense fallback={<TransactionsTableSkeleton />}>
        <TransactionsTable />
      </Suspense>
    </div>
  )
}