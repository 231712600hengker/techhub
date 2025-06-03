import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { getUser } from './lib/auth'

export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname
  const user = getUser()
  
  // Public routes that don't require authentication
  const publicRoutes = ['/login', '/register', '/forgot-password']
  const isPublicRoute = publicRoutes.includes(path)
  
  // Admin routes
  const isAdminRoute = path.startsWith('/admin')

  // Public paths that should bypass middleware
  const publicPaths = [
    '/api',
    '/_next',
    '/favicon.ico',
    '/shop',
    '/about',
    '/contact',
    '/'
  ]

  // Check if the current path should bypass middleware
  if (publicPaths.some(publicPath => path.startsWith(publicPath))) {
    return NextResponse.next()
  }
  
  // If user is not logged in
  if (!user) {
    // Allow access to public routes
    if (isPublicRoute) {
      return NextResponse.next()
    }
    // Redirect to login for protected routes
    return NextResponse.redirect(new URL('/login', request.url))
  }

  // If user is logged in
  if (user) {
    // Prevent logged in users from accessing auth pages
    if (isPublicRoute) {
      // Redirect based on role
      return NextResponse.redirect(
        new URL(user.role === 'admin' ? '/admin/dashboard' : '/', request.url)
      )
    }

    // Handle admin routes
    if (isAdminRoute) {
      // If not admin, redirect to home
      if (user.role !== 'admin') {
        return NextResponse.redirect(new URL('/', request.url))
      }
    }
  }
  
  return NextResponse.next()
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)']
}