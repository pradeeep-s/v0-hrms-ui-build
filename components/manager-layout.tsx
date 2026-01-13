"use client"

import type React from "react"

import { useRequireAuth } from "@/lib/auth-context"
import { useRouter } from "next/navigation"
import { BarChart3, Users, FileText, LogOut } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useAuth } from "@/lib/auth-context"
import Link from "next/link"

interface ManagerLayoutProps {
  children: React.ReactNode
}

export function ManagerLayout({ children }: ManagerLayoutProps) {
  const { user, loading } = useRequireAuth("MANAGER")
  const { logout } = useAuth()
  const router = useRouter()

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <div className="inline-block w-8 h-8 border-4 border-primary/30 border-t-primary rounded-full animate-spin" />
          <p className="mt-4 text-muted-foreground">Loading...</p>
        </div>
      </div>
    )
  }

  if (!user || user.role !== "MANAGER") {
    return null
  }

  const handleLogout = () => {
    logout()
    router.push("/login")
  }

  const navItems = [
    {
      label: "Dashboard",
      href: "/manager/dashboard",
      icon: BarChart3,
    },
    {
      label: "Team",
      href: "/manager/team",
      icon: Users,
    },
    {
      label: "Leave Approvals",
      href: "/manager/leave-approvals",
      icon: FileText,
    },
  ]

  return (
    <div className="flex h-screen bg-background">
      {/* Sidebar */}
      <div className="w-64 border-r border-border/50 bg-sidebar flex flex-col">
        {/* Logo */}
        <div className="p-6 border-b border-border/50">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center">
              <div className="w-5 h-5 bg-primary rounded-full" />
            </div>
            <div>
              <h1 className="font-bold text-sidebar-foreground">HRMS</h1>
              <p className="text-xs text-sidebar-foreground/60">Manager</p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
          {navItems.map((item) => {
            const Icon = item.icon
            return (
              <Link
                key={item.href}
                href={item.href}
                className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-sidebar-accent/50 text-sidebar-foreground transition-colors"
              >
                <Icon className="w-5 h-5" />
                <span className="text-sm font-medium">{item.label}</span>
              </Link>
            )
          })}
        </nav>

        {/* User Section */}
        <div className="p-4 border-t border-border/50 space-y-3">
          <div className="px-4 py-3 rounded-lg bg-sidebar-accent/30">
            <p className="text-xs text-sidebar-foreground/60">Logged in as</p>
            <p className="text-sm font-medium text-sidebar-foreground truncate">{user.name}</p>
          </div>
          <Button
            onClick={handleLogout}
            variant="outline"
            className="w-full gap-2 border-sidebar-border text-sidebar-foreground hover:bg-sidebar-accent/50 bg-transparent"
          >
            <LogOut className="w-4 h-4" />
            Logout
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        <div className="p-8">{children}</div>
      </div>
    </div>
  )
}
