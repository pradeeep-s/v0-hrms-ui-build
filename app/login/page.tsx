"use client"

import type React from "react"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { AlertCircle } from "lucide-react"
import { useAuth } from "@/lib/auth-context" 

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const { setUser } = useAuth()

  const router = useRouter()

async function handleLogin(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError("")

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      })

      if (!res.ok) {
        throw new Error("Invalid credentials")
      }

      const data = await res.json()
      
      // Set user in context
      setUser(data.user)

      const roleRedirect: Record<string, string> = {
        SUPER_ADMIN: "/super-admin/dashboard",
        ADMIN: "/admin/dashboard",
        MANAGER: "/manager/dashboard",
        EMPLOYEE: "/employee/dashboard",
      }

      // Use router.push instead of window.location.href
      router.push(roleRedirect[data.user.role])
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
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-lg bg-primary/20 mb-4">
            <div className="w-6 h-6 bg-primary rounded-full" />
          </div>
          <h1 className="text-3xl font-bold">HRMS Portal</h1>
          <p className="text-muted-foreground mt-2">
            Enterprise Human Resource Management
          </p>
        </div>

        {/* Login Card */}
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle>Login</CardTitle>
            <CardDescription>Sign in to your account</CardDescription>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              {error && (
                <div className="flex gap-2 p-3 rounded-lg bg-destructive/10 border border-destructive/20 text-destructive">
                  <AlertCircle className="w-5 h-5 mt-0.5" />
                  <p className="text-sm">{error}</p>
                </div>
              )}

              <div className="space-y-2">
                <label className="text-sm font-medium">Email</label>
                <Input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={loading}
                  required
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Password</label>
                <Input
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  disabled={loading}
                  required
                />
              </div>

              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? "Logging in..." : "Login"}
              </Button>
            </form>

            {/* Demo Accounts */}
            <div className="mt-6 pt-6 border-t">
              <p className="text-xs text-muted-foreground mb-3 font-medium">
                Demo Accounts (Password: admin123)
              </p>

              <div className="space-y-2">
                {demoAccounts.map((account) => (
                  <button
                    key={account.email}
                    type="button"
                    onClick={() => {
                      setEmail(account.email)
                      setPassword("admin123")
                    }}
                    className="w-full text-left px-3 py-2 rounded-lg text-sm hover:bg-muted transition"
                  >
                    <div className="font-medium">{account.role}</div>
                    <div className="text-xs text-muted-foreground">
                      {account.email}
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        <p className="text-center text-xs text-muted-foreground mt-6">
          Secure HRMS system with encrypted password authentication.
        </p>
      </div>
    </div>
  )
}
