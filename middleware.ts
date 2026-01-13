// middleware.ts
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const token = request.cookies.get('auth_token')?.value
  
  // Define protected routes and their required roles
  const protectedRoutes = {
    '/admin': ['ADMIN', 'SUPER_ADMIN'],
    '/super-admin': ['SUPER_ADMIN'],
    '/manager': ['MANAGER', 'ADMIN', 'SUPER_ADMIN'],
    '/employee': ['EMPLOYEE', 'MANAGER', 'ADMIN', 'SUPER_ADMIN'],
  }
  
  const pathname = request.nextUrl.pathname
  
  // Check if the current path is protected
  for (const [path, allowedRoles] of Object.entries(protectedRoutes)) {
    if (pathname.startsWith(path)) {
      if (!token) {
        return NextResponse.redirect(new URL('/login', request.url))
      }
      
      try {
        const user = JSON.parse(Buffer.from(token, 'base64').toString())
        
        if (!allowedRoles.includes(user.role)) {
          return NextResponse.redirect(new URL('/unauthorized', request.url))
        }
      } catch {
        return NextResponse.redirect(new URL('/login', request.url))
      }
    }
  }
  
  return NextResponse.next()
}

export const config = {
  matcher: [
    '/admin/:path*',
    '/super-admin/:path*',
    '/manager/:path*',
    '/employee/:path*',
  ]
}