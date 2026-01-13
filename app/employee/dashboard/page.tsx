"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Clock, FileText, CreditCard, Calendar } from "lucide-react"

export default function EmployeeDashboard() {
  const kpis = [
    {
      label: "Present This Month",
      value: "18",
      icon: Clock,
      subtitle: "Out of 21 working days",
      color: "green",
    },
    {
      label: "Casual Leave Balance",
      value: "7",
      icon: FileText,
      subtitle: "Days remaining",
      color: "blue",
    },
    {
      label: "Salary",
      value: "₹1,25,000",
      icon: CreditCard,
      subtitle: "January 2024",
      color: "purple",
    },
    {
      label: "Attendance %",
      value: "85.7%",
      icon: Calendar,
      subtitle: "Till date",
      color: "orange",
    },
  ]

  const recentActivity = [
    { date: "2024-01-13", activity: "Marked present", time: "09:00 AM" },
    { date: "2024-01-12", activity: "Marked present", time: "09:15 AM" },
    { date: "2024-01-11", activity: "Marked present", time: "09:00 AM" },
    { date: "2024-01-10", activity: "Leave - Casual Leave", details: "Full day" },
  ]

  const getColorBg = (color: string) => {
    const colors: Record<string, string> = {
      green: "bg-green-400/10",
      blue: "bg-blue-400/10",
      purple: "bg-purple-400/10",
      orange: "bg-orange-400/10",
    }
    return colors[color]
  }

  const getColorText = (color: string) => {
    const colors: Record<string, string> = {
      green: "text-green-400",
      blue: "text-blue-400",
      purple: "text-purple-400",
      orange: "text-orange-400",
    }
    return colors[color]
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-4xl font-bold text-foreground">Welcome, John Employee</h1>
        <p className="text-muted-foreground mt-2">Your HRMS self-service portal</p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {kpis.map((kpi, idx) => {
          const Icon = kpi.icon
          return (
            <Card key={idx} className={`bg-card border-border/50 ${getColorBg(kpi.color)}`}>
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <CardTitle className="text-sm font-medium text-muted-foreground">{kpi.label}</CardTitle>
                  <Icon className={`w-5 h-5 ${getColorText(kpi.color)}`} />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-foreground">{kpi.value}</div>
                <p className="text-xs mt-2 text-muted-foreground">{kpi.subtitle}</p>
              </CardContent>
            </Card>
          )
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Quick Actions */}
        <Card className="bg-card border-border/50 lg:col-span-1">
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button
              variant="outline"
              className="w-full justify-start border-border bg-transparent hover:bg-secondary/30"
            >
              <Clock className="w-4 h-4 mr-2" />
              Punch In/Out
            </Button>
            <Button
              variant="outline"
              className="w-full justify-start border-border bg-transparent hover:bg-secondary/30"
            >
              <FileText className="w-4 h-4 mr-2" />
              Apply Leave
            </Button>
            <Button
              variant="outline"
              className="w-full justify-start border-border bg-transparent hover:bg-secondary/30"
            >
              <CreditCard className="w-4 h-4 mr-2" />
              Download Payslip
            </Button>
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card className="bg-card border-border/50 lg:col-span-2">
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {recentActivity.map((activity, idx) => (
                <div
                  key={idx}
                  className="flex items-start justify-between pb-3 border-b border-border/30 last:border-0 last:pb-0"
                >
                  <div className="flex-1">
                    <p className="text-sm font-medium text-foreground">{activity.activity}</p>
                    <p className="text-xs text-muted-foreground">{activity.date}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs font-medium text-muted-foreground">{activity.time || activity.details}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Leave Balance Summary */}
      <Card className="bg-card border-border/50">
        <CardHeader>
          <CardTitle>Leave Balance</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { type: "Casual Leave", balance: 7, total: 12, color: "blue" },
              { type: "Sick Leave", balance: 5, total: 8, color: "orange" },
              { type: "Earned Leave", balance: 12, total: 20, color: "green" },
              { type: "Maternity Leave", balance: 0, total: 90, color: "purple" },
            ].map((leave, idx) => (
              <div key={idx} className={`p-4 rounded-lg ${getColorBg(leave.color)} border border-current`}>
                <p className="text-sm font-medium text-foreground mb-2">{leave.type}</p>
                <div className="flex items-baseline gap-1">
                  <span className={`text-2xl font-bold ${getColorText(leave.color)}`}>{leave.balance}</span>
                  <span className="text-xs text-muted-foreground">/ {leave.total}</span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
