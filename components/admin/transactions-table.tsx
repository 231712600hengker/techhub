"use client"

import { useState } from "react"
import { format } from "date-fns"
import { Trash2 } from "lucide-react"
import { toast } from "sonner"

import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { DataTable } from "@/components/ui/data-table"
import { Pagination } from "@/components/ui/pagination"
import { formatCurrency } from "@/lib/utils"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

export async function TransactionsTable() {
  const response = await fetch('/api/transactions?page=1&limit=10')
  const data = await response.json()

  return <TransactionsDataTable initialData={data} />
}

interface TransactionsDataTableProps {
  initialData: {
    items: any[]
    total: number
    page: number
    totalPages: number
  }
}

function TransactionsDataTable({ initialData }: TransactionsDataTableProps) {
  const [data, setData] = useState(initialData.items)
  const [searchTerm, setSearchTerm] = useState("")
  const [currentPage, setCurrentPage] = useState(initialData.page)
  const [totalPages, setTotalPages] = useState(initialData.totalPages)

  const handleSearch = async () => {
    const response = await fetch(`/api/transactions?search=${searchTerm}&page=1&limit=10`)
    const data = await response.json()
    setData(data.items)
    setCurrentPage(1)
    setTotalPages(data.totalPages)
  }

  const handlePageChange = async (page: number) => {
    const response = await fetch(`/api/transactions?search=${searchTerm}&page=${page}&limit=10`)
    const data = await response.json()
    setData(data.items)
    setCurrentPage(page)
  }

  const handleDelete = async (id: number) => {
    try {
      const response = await fetch(`/api/transactions/${id}`, {
        method: 'DELETE',
      })

      if (response.ok) {
        // Refresh the current page
        const response = await fetch(`/api/transactions?search=${searchTerm}&page=${currentPage}&limit=10`)
        const data = await response.json()
        setData(data.items)
        setTotalPages(data.totalPages)
        
        toast.success("Transaction deleted successfully")
      } else {
        toast.error("Failed to delete transaction")
      }
    } catch (error) {
      toast.error("An error occurred while deleting the transaction")
    }
  }

  const columns = [
    {
      accessorKey: "id",
      header: "ID",
    },
    {
      accessorKey: "product.name",
      header: "Product",
    },
    {
      accessorKey: "buyerName",
      header: "Buyer",
    },
    {
      accessorKey: "date",
      header: "Date",
      cell: ({ row }: any) => format(new Date(row.original.date), "MMM d, yyyy"),
    },
    {
      accessorKey: "totalPrice",
      header: "Amount",
      cell: ({ row }: any) => formatCurrency(row.original.totalPrice),
    },
    {
      id: "actions",
      header: "Actions",
      cell: ({ row }: any) => (
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button variant="ghost" size="sm">
              <Trash2 className="h-4 w-4 text-destructive" />
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Delete Transaction</AlertDialogTitle>
              <AlertDialogDescription>
                Are you sure you want to delete this transaction? This action cannot be undone.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction
                onClick={() => handleDelete(row.original.id)}
                className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
              >
                Delete
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      ),
    },
  ]

  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        <Input
          placeholder="Search by product or buyer name..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="max-w-sm"
        />
        <Button onClick={handleSearch}>Search</Button>
      </div>
      <DataTable columns={columns} data={data} />
      <div className="flex justify-center">
        <Pagination
          totalPages={totalPages}
          currentPage={currentPage}
          onPageChange={handlePageChange}
        />
      </div>
    </div>
  )
}