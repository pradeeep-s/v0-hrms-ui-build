"use client"

import type React from "react"

import { createContext, useContext, useCallback, useState, useEffect } from "react"
import type { User, AuthContext as IAuthContext } from "./types"

const AuthContext = createContext<IAuthContext | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [token, setToken] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)

  // Initialize auth state from localStorage
  useEffect(() => {
    const storedToken = localStorage.getItem("auth_token")
    const storedUser = localStorage.getItem("auth_user")

    if (storedToken && storedUser) {
      setToken(storedToken)
      setUser(JSON.parse(storedUser))
    }

    setLoading(false)
  }, [])

  const login = useCallback(async (email: string, password: string) => {
    setLoading(true)
    try {
      // Call mock authentication
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      })

      if (!response.ok) {
        throw new Error("Login failed")
      }

      const { user: newUser, token: newToken } = await response.json()

      setUser(newUser)
      setToken(newToken)
      localStorage.setItem("auth_token", newToken)
      localStorage.setItem("auth_user", JSON.stringify(newUser))
    } finally {
      setLoading(false)
    }
  }, [])

  const logout = useCallback(() => {
    setUser(null)
    setToken(null)
    localStorage.removeItem("auth_token")
    localStorage.removeItem("auth_user")
  }, [])

  return <AuthContext.Provider value={{ user, token, loading, login, logout }}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider")
  }
  return context
}

export function useRequireAuth(requiredRole?: string) {
  const { user, loading } = useAuth()

  useEffect(() => {
    if (!loading && !user) {
      window.location.href = "/login"
    }

    if (!loading && user && requiredRole && user.role !== requiredRole) {
      window.location.href = "/login"
    }
  }, [user, loading, requiredRole])

  return { user, loading }
}
