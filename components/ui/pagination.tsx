import Link from "next/link"
import { ChevronLeft, ChevronRight, MoreHorizontal } from "lucide-react"
import { Button } from "@/components/ui/button"

interface PaginationProps {
  totalPages: number
  currentPage: number
  baseUrl?: string
  onPageChange?: (page: number) => void
}

export function Pagination({ totalPages, currentPage, baseUrl, onPageChange }: PaginationProps) {
  const pages = getPaginationItems(currentPage, totalPages)

  if (totalPages <= 1) return null

  const handleClick = (page: number) => {
    if (onPageChange) {
      onPageChange(page)
    }
  }

  return (
    <div className="flex items-center gap-2">
      <PaginationButton
        disabled={currentPage === 1}
        onClick={() => handleClick(currentPage - 1)}
        href={baseUrl ? `${baseUrl}page=${currentPage - 1}` : undefined}
      >
        <ChevronLeft className="h-4 w-4" />
      </PaginationButton>

      {pages.map((page, i) => {
        if (page === "...") {
          return <Button key={`${page}-${i}`} variant="ghost" disabled><MoreHorizontal className="h-4 w-4" /></Button>
        }

        return (
          <PaginationButton
            key={`${page}-${i}`}
            active={page === currentPage}
            onClick={() => handleClick(page as number)}
            href={baseUrl ? `${baseUrl}page=${page}` : undefined}
          >
            {page}
          </PaginationButton>
        )
      })}

      <PaginationButton
        disabled={currentPage === totalPages}
        onClick={() => handleClick(currentPage + 1)}
        href={baseUrl ? `${baseUrl}page=${currentPage + 1}` : undefined}
      >
        <ChevronRight className="h-4 w-4" />
      </PaginationButton>
    </div>
  )
}

interface PaginationButtonProps {
  children: React.ReactNode
  active?: boolean
  disabled?: boolean
  href?: string
  onClick?: () => void
}

function PaginationButton({ children, active, disabled, href, onClick }: PaginationButtonProps) {
  if (href) {
    return (
      <Button
        asChild
        variant={active ? "default" : "ghost"}
        disabled={disabled}
      >
        <Link href={href}>{children}</Link>
      </Button>
    )
  }

  return (
    <Button
      variant={active ? "default" : "ghost"}
      disabled={disabled}
      onClick={onClick}
    >
      {children}
    </Button>
  )
}

function getPaginationItems(current: number, total: number) {
  if (total <= 7) {
    return Array.from({ length: total }, (_, i) => i + 1)
  }

  if (current <= 3) {
    return [1, 2, 3, 4, "...", total]
  }

  if (current >= total - 2) {
    return [1, "...", total - 3, total - 2, total - 1, total]
  }

  return [1, "...", current - 1, current, current + 1, "...", total]
}