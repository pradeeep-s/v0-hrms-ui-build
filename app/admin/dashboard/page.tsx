"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Users, Clock, FileText, AlertCircle } from "lucide-react"

export default function AdminDashboard() {
  const kpis = [
    {
      label: "Total Employees",
      value: "1,248",
      icon: Users,
      change: "+8 this month",
      trend: "up",
    },
    {
      label: "Present Today",
      value: "1,156",
      icon: Clock,
      change: "92.6%",
      trend: "stable",
    },
    {
      label: "Pending Approvals",
      value: "24",
      icon: FileText,
      change: "+5 leave requests",
      trend: "up",
    },
    {
      label: "Attendance Issues",
      value: "12",
      icon: AlertCircle,
      change: "Late marks",
      trend: "neutral",
    },
  ]

  const recentLeaves = [
    { employee: "Rajesh Kumar", type: "Casual", days: 3, from: "2024-01-15", status: "Applied" },
    { employee: "Priya Singh", type: "Sick", days: 1, from: "2024-01-14", status: "Pending Manager Approval" },
    { employee: "Amit Sharma", type: "Earned", days: 5, from: "2024-01-20", status: "Applied" },
  ]

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-4xl font-bold text-foreground">HR Dashboard</h1>
        <p className="text-muted-foreground mt-2">Manage employees, attendance, and approvals</p>
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
                <p className="text-xs mt-2 text-muted-foreground">{kpi.change}</p>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Attendance Overview */}
      <Card className="bg-card border-border/50">
        <CardHeader>
          <CardTitle>Today's Attendance Summary</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center p-4 rounded-lg bg-green-400/10 border border-green-400/30">
              <p className="text-sm text-muted-foreground mb-1">Present</p>
              <p className="text-2xl font-bold text-green-400">1,156</p>
            </div>
            <div className="text-center p-4 rounded-lg bg-orange-400/10 border border-orange-400/30">
              <p className="text-sm text-muted-foreground mb-1">Half Day</p>
              <p className="text-2xl font-bold text-orange-400">32</p>
            </div>
            <div className="text-center p-4 rounded-lg bg-blue-400/10 border border-blue-400/30">
              <p className="text-sm text-muted-foreground mb-1">Leave</p>
              <p className="text-2xl font-bold text-blue-400">48</p>
            </div>
            <div className="text-center p-4 rounded-lg bg-red-400/10 border border-red-400/30">
              <p className="text-sm text-muted-foreground mb-1">Absent</p>
              <p className="text-2xl font-bold text-red-400">12</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Recent Approvals */}
      <Card className="bg-card border-border/50">
        <CardHeader>
          <CardTitle>Recent Leave Requests</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {recentLeaves.map((leave, idx) => (
              <div
                key={idx}
                className="flex items-center justify-between p-3 rounded-lg bg-secondary/20 border border-border/30"
              >
                <div className="flex-1">
                  <p className="text-sm font-medium text-foreground">{leave.employee}</p>
                  <p className="text-xs text-muted-foreground">
                    {leave.type} • {leave.days} days • From {leave.from}
                  </p>
                </div>
                <span className="px-2 py-1 rounded text-xs font-medium bg-blue-400/10 text-blue-400">
                  {leave.status}
                </span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
