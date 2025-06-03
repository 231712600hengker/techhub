"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Edit, Trash2 } from "lucide-react"
import { toast } from "sonner"

import { Button } from "@/components/ui/button"
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
import { Input } from "@/components/ui/input"
import { DataTable } from "@/components/ui/data-table"
import { Pagination } from "@/components/ui/pagination"
import { formatCurrency } from "@/lib/utils"
import { Product } from "@prisma/client"
import { ColumnDef } from "@tanstack/react-table"

export async function ProductsTable() {
  const response = await fetch('/api/products?page=1&limit=10')
  const data = await response.json()

  return <ProductsDataTable initialData={data} />
}

interface ProductsDataTableProps {
  initialData: {
    items: Product[]
    total: number
    page: number
    totalPages: number
  }
}

function ProductsDataTable({ initialData }: ProductsDataTableProps) {
  const [data, setData] = useState(initialData.items)
  const [searchTerm, setSearchTerm] = useState("")
  const [currentPage, setCurrentPage] = useState(initialData.page)
  const [totalPages, setTotalPages] = useState(initialData.totalPages)

  const handleSearch = async () => {
    const response = await fetch(`/api/products?search=${searchTerm}&page=1&limit=10`)
    const data = await response.json()
    setData(data.items)
    setCurrentPage(1)
    setTotalPages(data.totalPages)
  }

  const handlePageChange = async (page: number) => {
    const response = await fetch(`/api/products?search=${searchTerm}&page=${page}&limit=10`)
    const data = await response.json()
    setData(data.items)
    setCurrentPage(page)
  }

  const handleDelete = async (id: number) => {
    try {
      const response = await fetch(`/api/products/${id}`, {
        method: 'DELETE',
      })

      if (response.ok) {
        // Refresh the current page
        const response = await fetch(`/api/products?search=${searchTerm}&page=${currentPage}&limit=10`)
        const data = await response.json()
        setData(data.items)
        setTotalPages(data.totalPages)
        
        toast.success("Product deleted successfully")
      } else {
        toast.error("Failed to delete product")
      }
    } catch (error) {
      toast.error("An error occurred while deleting the product")
    }
  }

  const columns: ColumnDef<Product>[] = [
    {
      accessorKey: "id",
      header: "ID",
    },
    {
      accessorKey: "name",
      header: "Name",
      cell: ({ row }) => (
        <div className="flex items-center gap-4">
          <div className="h-12 w-12 overflow-hidden rounded-md">
            <Image
              src={row.original.image}
              alt={row.original.name}
              width={48}
              height={48}
              className="h-full w-full object-cover"
            />
          </div>
          <span className="font-medium">{row.original.name}</span>
        </div>
      ),
    },
    {
      accessorKey: "price",
      header: "Price",
      cell: ({ row }) => formatCurrency(row.original.price),
    },
    {
      accessorKey: "stock",
      header: "Stock",
    },
    {
      id: "actions",
      cell: ({ row }) => (
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="sm" asChild>
            <Link href={`/admin/products/edit/${row.original.id}`}>
              <Edit className="h-4 w-4" />
            </Link>
          </Button>
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="ghost" size="sm">
                <Trash2 className="h-4 w-4 text-destructive" />
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Delete Product</AlertDialogTitle>
                <AlertDialogDescription>
                  Are you sure you want to delete this product? This action cannot be undone.
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
        </div>
      ),
    },
  ]

  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        <Input
          placeholder="Search products..."
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