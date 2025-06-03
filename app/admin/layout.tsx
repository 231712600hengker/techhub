import { redirect } from "next/navigation"
import { isAdmin } from "@/lib/auth"

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  // Check if user is admin, redirect if not
  const admin = isAdmin()
  if (!admin) {
    redirect("/login")
  }
  
  return (
    <div>
      {children}
    </div>
  )
}