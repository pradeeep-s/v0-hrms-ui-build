"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import { Clock, X } from "lucide-react"

export default function AttendancePage() {
  const [isPunchedIn, setIsPunchedIn] = useState(true)
  const [punchInTime] = useState("09:00 AM")
  const [punchOutTime] = useState(null)

  const monthlyAttendance = [
    { date: "1", status: "P", day: "Mon" },
    { date: "2", status: "P", day: "Tue" },
    { date: "3", status: "P", day: "Wed" },
    { date: "4", status: "P", day: "Thu" },
    { date: "5", status: "P", day: "Fri" },
    { date: "6", status: "WO", day: "Sat" },
    { date: "7", status: "WO", day: "Sun" },
    { date: "8", status: "P", day: "Mon" },
    { date: "9", status: "P", day: "Tue" },
    { date: "10", status: "L", day: "Wed" },
    { date: "11", status: "P", day: "Thu" },
    { date: "12", status: "P", day: "Fri" },
    { date: "13", status: "P", day: "Sat" },
    { date: "14", status: "WO", day: "Sun" },
    { date: "15", status: "H", day: "Mon" },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "P":
        return "bg-green-400/20 text-green-400 border-green-400/50"
      case "L":
        return "bg-blue-400/20 text-blue-400 border-blue-400/50"
      case "H":
        return "bg-orange-400/20 text-orange-400 border-orange-400/50"
      case "A":
        return "bg-red-400/20 text-red-400 border-red-400/50"
      case "WO":
        return "bg-gray-400/20 text-gray-400 border-gray-400/50"
      default:
        return ""
    }
  }

  const getStatusLabel = (status: string) => {
    const labels: Record<string, string> = {
      P: "Present",
      L: "Leave",
      H: "Half Day",
      A: "Absent",
      WO: "Off",
    }
    return labels[status]
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-4xl font-bold text-foreground">Attendance</h1>
        <p className="text-muted-foreground mt-2">View and manage your attendance</p>
      </div>

      {/* Punch In/Out Card */}
      <Card className="bg-card border-border/50 border-l-4 border-l-primary">
        <CardHeader>
          <CardTitle>Today's Attendance</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Punch In */}
            <div>
              <p className="text-sm text-muted-foreground mb-2">Punch In Time</p>
              <p className="text-3xl font-bold text-green-400 mb-4">{punchInTime}</p>
              {isPunchedIn && (
                <Button
                  onClick={() => setIsPunchedIn(false)}
                  className="w-full bg-red-400/20 text-red-400 hover:bg-red-400/30 border border-red-400/50"
                  variant="outline"
                >
                  <X className="w-4 h-4 mr-2" />
                  Punch Out
                </Button>
              )}
            </div>

            {/* Punch Out */}
            <div>
              <p className="text-sm text-muted-foreground mb-2">Punch Out Time</p>
              <p className={`text-3xl font-bold ${punchOutTime ? "text-green-400" : "text-muted-foreground"} mb-4`}>
                {punchOutTime || "Not yet"}
              </p>
              {!isPunchedIn && (
                <Button
                  onClick={() => setIsPunchedIn(true)}
                  className="w-full bg-green-400/20 text-green-400 hover:bg-green-400/30 border border-green-400/50"
                  variant="outline"
                >
                  <Clock className="w-4 h-4 mr-2" />
                  Punch In
                </Button>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Monthly Attendance Calendar */}
      <Card className="bg-card border-border/50">
        <CardHeader>
          <CardTitle>January 2024 - Attendance Calendar</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-7 gap-2">
            {monthlyAttendance.map((day) => (
              <div key={day.date} className={`p-3 rounded-lg border ${getStatusColor(day.status)} text-center text-sm`}>
                <p className="font-medium">{day.date}</p>
                <p className="text-xs opacity-80">{getStatusLabel(day.status)}</p>
              </div>
            ))}
          </div>

          {/* Legend */}
          <div className="mt-6 grid grid-cols-2 md:grid-cols-5 gap-3 pt-6 border-t border-border/30">
            {[
              { status: "P", label: "Present" },
              { status: "L", label: "Leave" },
              { status: "H", label: "Half Day" },
              { status: "A", label: "Absent" },
              { status: "WO", label: "Day Off" },
            ].map((legend) => (
              <div key={legend.status} className="flex items-center gap-2 text-xs">
                <div className={`w-4 h-4 rounded border ${getStatusColor(legend.status)}`} />
                <span className="text-muted-foreground">{legend.label}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Summary Statistics */}
      <Card className="bg-card border-border/50">
        <CardHeader>
          <CardTitle>Attendance Summary (January 2024)</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            <div className="p-4 rounded-lg bg-green-400/10 border border-green-400/30">
              <p className="text-sm text-muted-foreground mb-1">Present</p>
              <p className="text-2xl font-bold text-green-400">13</p>
            </div>
            <div className="p-4 rounded-lg bg-blue-400/10 border border-blue-400/30">
              <p className="text-sm text-muted-foreground mb-1">Leave</p>
              <p className="text-2xl font-bold text-blue-400">1</p>
            </div>
            <div className="p-4 rounded-lg bg-orange-400/10 border border-orange-400/30">
              <p className="text-sm text-muted-foreground mb-1">Half Day</p>
              <p className="text-2xl font-bold text-orange-400">1</p>
            </div>
            <div className="p-4 rounded-lg bg-red-400/10 border border-red-400/30">
              <p className="text-sm text-muted-foreground mb-1">Absent</p>
              <p className="text-2xl font-bold text-red-400">0</p>
            </div>
            <div className="p-4 rounded-lg bg-purple-400/10 border border-purple-400/30">
              <p className="text-sm text-muted-foreground mb-1">Attendance %</p>
              <p className="text-2xl font-bold text-purple-400">92.8%</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
