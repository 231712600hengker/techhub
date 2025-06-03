interface ProductsGridProps {
  children: React.ReactNode
}

export function ProductsGrid({ children }: ProductsGridProps) {
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {children}
    </div>
  )
}