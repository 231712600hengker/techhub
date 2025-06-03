"use client"

import { useState } from "react"
import { format } from "date-fns"

import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { DataTable } from "@/components/ui/data-table"
import { Pagination } from "@/components/ui/pagination"
import { formatCurrency } from "@/lib/utils"

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