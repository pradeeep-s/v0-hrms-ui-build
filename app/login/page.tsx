"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/lib/auth-context"
import { getRoleRedirectUrl } from "@/lib/mock-auth"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { AlertCircle } from "lucide-react"

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const { login } = useAuth()
  const router = useRouter()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setLoading(true)

    try {
      await login(email, password)

      // Get user role from localStorage to redirect appropriately
      const userData = localStorage.getItem("auth_user")
      if (userData) {
        const user = JSON.parse(userData)
        const redirectUrl = getRoleRedirectUrl(user.role)
        router.push(redirectUrl)
      }
    } catch {
      setError("Invalid email or password")
    } finally {
      setLoading(false)
    }
  }

  const demoAccounts = [
    { email: "super@admin.com", role: "Super Admin" },
    { email: "hr@company.com", role: "HR Manager" },
    { email: "manager@company.com", role: "Manager" },
    { email: "emp@company.com", role: "Employee" },
  ]

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background to-secondary p-4">
      <div className="w-full max-w-md">
        {/* Logo/Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-lg bg-primary/20 mb-4">
            <div className="w-6 h-6 bg-primary rounded-full" />
          </div>
          <h1 className="text-3xl font-bold text-foreground">HRMS Portal</h1>
          <p className="text-muted-foreground mt-2">Enterprise Human Resource Management</p>
        </div>

        {/* Login Form */}
        <Card className="border-border/50 shadow-lg">
          <CardHeader>
            <CardTitle>Login</CardTitle>
            <CardDescription>Sign in to your account</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              {error && (
                <div className="flex gap-2 p-3 rounded-lg bg-destructive/10 border border-destructive/20 text-destructive">
                  <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
                  <p className="text-sm">{error}</p>
                </div>
              )}

              <div className="space-y-2">
                <label className="block text-sm font-medium text-foreground">Email</label>
                <Input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={loading}
                  className="bg-input border-border/50"
                />
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium text-foreground">Password</label>
                <Input
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  disabled={loading}
                  className="bg-input border-border/50"
                />
              </div>

              <Button
                type="submit"
                className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
                disabled={loading}
              >
                {loading ? "Logging in..." : "Login"}
              </Button>
            </form>

            {/* Demo Credentials */}
            <div className="mt-6 pt-6 border-t border-border/50">
              <p className="text-xs text-muted-foreground mb-3 font-medium">Demo Accounts (Password: admin123)</p>
              <div className="space-y-2">
                {demoAccounts.map((account) => (
                  <button
                    key={account.email}
                    onClick={() => {
                      setEmail(account.email)
                      setPassword("admin123")
                    }}
                    className="w-full text-left px-3 py-2 rounded-lg text-sm hover:bg-muted/50 transition-colors text-muted-foreground hover:text-foreground"
                  >
                    <div className="font-medium">{account.role}</div>
                    <div className="text-xs text-muted-foreground">{account.email}</div>
                  </button>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        <p className="text-center text-xs text-muted-foreground mt-6">
          Secure HRMS system with encrypted password authentication. Demo accounts available.
        </p>
      </div>
    </div>
  )
}
