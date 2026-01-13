"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { BarChart3, Users, Cpu, TrendingUp } from "lucide-react"

export default function SuperAdminDashboard() {
  const kpis = [
    {
      label: "Total Employees",
      value: "1,248",
      icon: Users,
      change: "+12%",
      trend: "up",
    },
    {
      label: "Active Biometric Devices",
      value: "48",
      icon: Cpu,
      change: "+3",
      trend: "up",
    },
    {
      label: "System Health",
      value: "99.8%",
      icon: BarChart3,
      change: "Excellent",
      trend: "stable",
    },
    {
      label: "Pending Audits",
      value: "12",
      icon: TrendingUp,
      change: "-5 this week",
      trend: "down",
    },
  ]

  const recentActivity = [
    {
      timestamp: "2024-01-13 14:32",
      action: "Payroll locked for December 2024",
      user: "HR Admin",
      status: "completed",
    },
    {
      timestamp: "2024-01-12 09:15",
      action: "Biometric device BIO-005 synchronized",
      user: "System",
      status: "completed",
    },
    {
      timestamp: "2024-01-11 16:45",
      action: "System settings updated - Employee approval flow",
      user: "Super Admin",
      status: "completed",
    },
    {
      timestamp: "2024-01-10 11:20",
      action: "Database backup completed",
      user: "System",
      status: "completed",
    },
    {
      timestamp: "2024-01-09 15:30",
      action: "Security audit initiated",
      user: "Super Admin",
      status: "in-progress",
    },
  ]

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-4xl font-bold text-foreground">Dashboard</h1>
        <p className="text-muted-foreground mt-2">System overview and key metrics</p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {kpis.map((kpi, idx) => {
          const Icon = kpi.icon
          return (
            <Card key={idx} className="bg-card border-border/50">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <CardTitle className="text-sm font-medium text-muted-foreground">{kpi.label}</CardTitle>
                  <div className="p-2 rounded-lg bg-primary/10">
                    <Icon className="w-4 h-4 text-primary" />
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-foreground">{kpi.value}</div>
                <p
                  className={`text-xs mt-2 ${kpi.trend === "up" ? "text-green-400" : kpi.trend === "down" ? "text-red-400" : "text-blue-400"}`}
                >
                  {kpi.change}
                </p>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* System Status */}
      <Card className="bg-card border-border/50">
        <CardHeader>
          <CardTitle>System Status</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <p className="text-sm text-muted-foreground mb-2">API Response Time</p>
              <div className="text-3xl font-bold text-green-400">45ms</div>
              <p className="text-xs text-muted-foreground mt-1">Average across all endpoints</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground mb-2">Database Status</p>
              <div className="text-3xl font-bold text-green-400">Healthy</div>
              <p className="text-xs text-muted-foreground mt-1">All replicas synchronized</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground mb-2">Uptime</p>
              <div className="text-3xl font-bold text-green-400">99.8%</div>
              <p className="text-xs text-muted-foreground mt-1">Last 30 days</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Recent Activity */}
      <Card className="bg-card border-border/50">
        <CardHeader>
          <CardTitle>Recent System Activity</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {recentActivity.map((activity, idx) => (
              <div key={idx} className="flex items-start gap-4 pb-3 border-b border-border/30 last:border-0 last:pb-0">
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <p className="text-sm font-medium text-foreground">{activity.action}</p>
                    <span
                      className={`px-2 py-1 rounded text-xs font-medium ${
                        activity.status === "completed"
                          ? "bg-green-400/10 text-green-400"
                          : "bg-blue-400/10 text-blue-400"
                      }`}
                    >
                      {activity.status === "completed" ? "Completed" : "In Progress"}
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    {activity.timestamp} • {activity.user}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
