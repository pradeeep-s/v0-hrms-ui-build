"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { useState } from "react"
import { Calendar } from "lucide-react"

export default function AttendancePage() {
  const [activeTab, setActiveTab] = useState("raw")
  const [selectedDate, setSelectedDate] = useState("2024-01-13")
  const [searchTerm, setSearchTerm] = useState("")

  const rawAttendance = [
    {
      id: 1,
      code: "EMP001",
      name: "Rajesh Kumar",
      checkIn: "09:00 AM",
      checkOut: "06:15 PM",
      duration: "9h 15m",
      status: "PRESENT",
    },
    {
      id: 2,
      code: "EMP002",
      name: "Priya Singh",
      checkIn: "09:30 AM",
      checkOut: "06:00 PM",
      duration: "8h 30m",
      status: "PRESENT",
    },
    {
      id: 3,
      code: "EMP003",
      name: "Amit Sharma",
      checkIn: "08:45 AM",
      checkOut: "05:45 PM",
      duration: "9h 00m",
      status: "PRESENT",
    },
    {
      id: 4,
      code: "EMP004",
      name: "Neha Gupta",
      checkIn: "09:15 AM",
      checkOut: null,
      duration: "-",
      status: "PRESENT",
    },
    {
      id: 5,
      code: "EMP005",
      name: "Vikram Patel",
      checkIn: null,
      checkOut: null,
      duration: "-",
      status: "ABSENT",
    },
  ]

  const dailySummary = [
    { status: "PRESENT", count: 1156, percentage: 92.6 },
    { status: "HALF", count: 32, percentage: 2.6 },
    { status: "LEAVE", count: 48, percentage: 3.8 },
    { status: "ABSENT", count: 12, percentage: 1.0 },
  ]

  const filteredAttendance = rawAttendance.filter(
    (record) =>
      record.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
      record.name.toLowerCase().includes(searchTerm.toLowerCase()),
  )

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
        <h1 className="text-4xl font-bold text-foreground">Attendance Management</h1>
        <p className="text-muted-foreground mt-2">View and manage employee attendance records</p>
      </div>

      {/* Tabs */}
      <div className="flex gap-4 border-b border-border/50">
        <button
          onClick={() => setActiveTab("raw")}
          className={`px-4 py-3 font-medium transition-colors border-b-2 ${
            activeTab === "raw"
              ? "border-primary text-foreground"
              : "border-transparent text-muted-foreground hover:text-foreground"
          }`}
        >
          Raw Attendance
        </button>
        <button
          onClick={() => setActiveTab("summary")}
          className={`px-4 py-3 font-medium transition-colors border-b-2 ${
            activeTab === "summary"
              ? "border-primary text-foreground"
              : "border-transparent text-muted-foreground hover:text-foreground"
          }`}
        >
          Daily Summary
        </button>
      </div>

      {/* Tab Content */}
      {activeTab === "raw" && (
        <div className="space-y-4">
          {/* Date & Search */}
          <Card className="bg-card border-border/50">
            <CardContent className="pt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Select Date</label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <input
                      type="date"
                      value={selectedDate}
                      onChange={(e) => setSelectedDate(e.target.value)}
                      className="w-full pl-10 px-4 py-2 rounded-lg bg-input border border-border/50 text-foreground"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Search</label>
                  <Input
                    placeholder="Search by code or name..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="bg-input border-border/50"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Raw Attendance Table */}
          <Card className="bg-card border-border/50">
            <CardHeader>
              <CardTitle>Attendance Records - {selectedDate}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-border/30">
                      <th className="text-left py-3 px-4 text-sm font-semibold text-muted-foreground">Code</th>
                      <th className="text-left py-3 px-4 text-sm font-semibold text-muted-foreground">Employee</th>
                      <th className="text-left py-3 px-4 text-sm font-semibold text-muted-foreground">Check In</th>
                      <th className="text-left py-3 px-4 text-sm font-semibold text-muted-foreground">Check Out</th>
                      <th className="text-left py-3 px-4 text-sm font-semibold text-muted-foreground">Duration</th>
                      <th className="text-left py-3 px-4 text-sm font-semibold text-muted-foreground">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredAttendance.map((record) => (
                      <tr key={record.id} className="border-b border-border/20 hover:bg-secondary/30 transition-colors">
                        <td className="py-3 px-4 text-sm font-medium text-foreground">{record.code}</td>
                        <td className="py-3 px-4 text-sm text-foreground">{record.name}</td>
                        <td className="py-3 px-4 text-sm text-muted-foreground">{record.checkIn || "-"}</td>
                        <td className="py-3 px-4 text-sm text-muted-foreground">{record.checkOut || "-"}</td>
                        <td className="py-3 px-4 text-sm text-muted-foreground">{record.duration}</td>
                        <td className="py-3 px-4">
                          <span className={`px-2 py-1 rounded text-xs font-medium ${getStatusColor(record.status)}`}>
                            {record.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {activeTab === "summary" && (
        <div className="space-y-4">
          <Card className="bg-card border-border/50">
            <CardHeader>
              <CardTitle>Daily Attendance Summary</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                {dailySummary.map((item, idx) => {
                  const colors: Record<string, { bg: string; text: string }> = {
                    PRESENT: { bg: "bg-green-400/10", text: "text-green-400" },
                    HALF: { bg: "bg-orange-400/10", text: "text-orange-400" },
                    LEAVE: { bg: "bg-blue-400/10", text: "text-blue-400" },
                    ABSENT: { bg: "bg-red-400/10", text: "text-red-400" },
                  }

                  const color = colors[item.status]

                  return (
                    <div key={idx} className={`p-4 rounded-lg ${color.bg} border border-current`}>
                      <p className={`text-sm font-medium ${color.text} mb-1`}>{item.status}</p>
                      <p className="text-2xl font-bold text-foreground">{item.count}</p>
                      <p className={`text-xs ${color.text} mt-1`}>{item.percentage}%</p>
                    </div>
                  )
                })}
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}
