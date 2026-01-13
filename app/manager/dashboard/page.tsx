"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Users, Clock, FileText, CheckCircle } from "lucide-react"

export default function ManagerDashboard() {
  const kpis = [
    {
      label: "Team Members",
      value: "12",
      icon: Users,
      change: "All active",
      trend: "stable",
    },
    {
      label: "Present Today",
      value: "11",
      icon: Clock,
      change: "91.7%",
      trend: "stable",
    },
    {
      label: "Pending Approvals",
      value: "3",
      icon: FileText,
      change: "2 leave requests",
      trend: "up",
    },
    {
      label: "Team Average",
      value: "96.2%",
      icon: CheckCircle,
      change: "Attendance",
      trend: "up",
    },
  ]

  const teamAttendance = [
    { name: "Rajesh Kumar", status: "PRESENT", time: "09:00 AM", remarks: "On time" },
    { name: "Vikram Patel", status: "PRESENT", time: "09:15 AM", remarks: "On time" },
    { name: "Priya Sharma", status: "LEAVE", time: "-", remarks: "Casual leave" },
    { name: "Ananya Singh", status: "HALF", time: "11:30 AM", remarks: "Half day" },
    { name: "Deepak Roy", status: "ABSENT", time: "-", remarks: "Not present" },
  ]

  const pendingApprovals = [
    { employee: "Vikram Patel", type: "Casual Leave", days: 2, from: "2024-01-15", status: "Awaiting Approval" },
    { employee: "Priya Sharma", type: "Sick Leave", days: 1, from: "2024-01-20", status: "Awaiting Approval" },
    { employee: "Ananya Singh", type: "Earned Leave", days: 5, from: "2024-01-25", status: "Awaiting Approval" },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "PRESENT":
        return "bg-green-400/10 text-green-400"
      case "HALF":
        return "bg-orange-400/10 text-orange-400"
      case "LEAVE":
        return "bg-blue-400/10 text-blue-400"
      case "ABSENT":
        return "bg-red-400/10 text-red-400"
      default:
        return ""
    }
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-4xl font-bold text-foreground">Manager Dashboard</h1>
        <p className="text-muted-foreground mt-2">Manage your team and approvals</p>
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

      {/* Team Attendance */}
      <Card className="bg-card border-border/50">
        <CardHeader>
          <CardTitle>Today's Team Attendance</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {teamAttendance.map((attendance, idx) => (
              <div key={idx} className="flex items-center justify-between p-3 rounded-lg hover:bg-secondary/30">
                <div className="flex-1">
                  <p className="text-sm font-medium text-foreground">{attendance.name}</p>
                  <p className="text-xs text-muted-foreground">{attendance.remarks}</p>
                </div>
                <div className="text-right">
                  <span className={`px-2 py-1 rounded text-xs font-medium ${getStatusColor(attendance.status)}`}>
                    {attendance.status}
                  </span>
                  {attendance.time !== "-" && <p className="text-xs text-muted-foreground mt-1">{attendance.time}</p>}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Pending Approvals */}
      <Card className="bg-card border-border/50">
        <CardHeader>
          <CardTitle>Pending Leave Approvals</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {pendingApprovals.map((approval, idx) => (
              <div
                key={idx}
                className="flex items-center justify-between p-3 rounded-lg bg-secondary/20 border border-border/30"
              >
                <div className="flex-1">
                  <p className="text-sm font-medium text-foreground">{approval.employee}</p>
                  <p className="text-xs text-muted-foreground">
                    {approval.type} • {approval.days} days • From {approval.from}
                  </p>
                </div>
                <span className="px-2 py-1 rounded text-xs font-medium bg-orange-400/10 text-orange-400">
                  {approval.status}
                </span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
