"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import { useRouter } from "next/navigation"

interface User {
  id: number
  email: string
  name: string
  role: string
  company_id: number
}

interface Company {
  id: number
  name: string
}

interface AuthContextType {
  user: User | null
  company: Company | null
  loading: boolean
  logout: () => void
  setUser: (user: User | null) => void
  setCompany: (company: Company | null) => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [company, setCompany] = useState<Company | null>(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await fetch("/api/auth/me", {
          credentials: "include",
        })

        if (res.ok) {
          const data = await res.json()
          setUser(data.user)
          setCompany(data.company)
        } else {
          setUser(null)
          setCompany(null)
        }
      } catch (error) {
        console.error("Auth check failed:", error)
        setUser(null)
        setCompany(null)
      } finally {
        setLoading(false)
      }
    }

    checkAuth()
  }, [])

  const logout = async () => {
    try {
      await fetch("/api/auth/logout", {
        method: "POST",
        credentials: "include",
      })
    } catch (error) {
      console.error("Logout failed:", error)
    }

    setUser(null)
    setCompany(null)
    router.push("/login")
  }

  return (
    <AuthContext.Provider value={{ user, company, loading, logout, setUser, setCompany }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}

export function useRequireAuth(requiredRole?: string) {
  const { user, loading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!loading && !user) {
      router.push("/login")
    } else if (!loading && user && requiredRole && user.role !== requiredRole) {
      router.push("/login")
    }
  }, [user, loading, requiredRole, router])

  return { user, loading }
}
