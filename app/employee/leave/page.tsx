"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import { Plus, Calendar } from "lucide-react"

export default function LeavePage() {
  const [showModal, setShowModal] = useState(false)
  const [leaveType, setLeaveType] = useState("CASUAL")
  const [startDate, setStartDate] = useState("")
  const [endDate, setEndDate] = useState("")
  const [reason, setReason] = useState("")

  const leaveRequests = [
    {
      id: 1,
      type: "CASUAL",
      startDate: "2024-01-10",
      endDate: "2024-01-10",
      days: 1,
      reason: "Personal work",
      status: "APPROVED",
      appliedDate: "2024-01-05",
      approvedDate: "2024-01-06",
    },
    {
      id: 2,
      type: "EARNED",
      startDate: "2024-02-01",
      endDate: "2024-02-05",
      days: 5,
      reason: "Vacation",
      status: "APPLIED",
      appliedDate: "2024-01-12",
    },
    {
      id: 3,
      type: "SICK",
      startDate: "2024-01-08",
      endDate: "2024-01-08",
      days: 1,
      reason: "Medical appointment",
      status: "APPROVED",
      appliedDate: "2024-01-08",
      approvedDate: "2024-01-08",
    },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "APPROVED":
        return "bg-green-400/10 text-green-400"
      case "APPLIED":
        return "bg-blue-400/10 text-blue-400"
      case "REJECTED":
        return "bg-red-400/10 text-red-400"
      default:
        return ""
    }
  }

  const getTypeColor = (type: string) => {
    switch (type) {
      case "CASUAL":
        return "text-blue-400"
      case "EARNED":
        return "text-green-400"
      case "SICK":
        return "text-orange-400"
      case "MATERNITY":
        return "text-purple-400"
      default:
        return ""
    }
  }

  const handleApplyLeave = () => {
    setShowModal(false)
    setLeaveType("CASUAL")
    setStartDate("")
    setEndDate("")
    setReason("")
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold text-foreground">Leave Management</h1>
          <p className="text-muted-foreground mt-2">Apply and track your leave requests</p>
        </div>
        <Button
          onClick={() => setShowModal(true)}
          className="bg-primary hover:bg-primary/90 text-primary-foreground gap-2"
        >
          <Plus className="w-4 h-4" />
          Apply Leave
        </Button>
      </div>

      {/* Leave Balance */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[
          { type: "Casual", balance: 7, total: 12, color: "blue" },
          { type: "Earned", balance: 12, total: 20, color: "green" },
          { type: "Sick", balance: 5, total: 8, color: "orange" },
          { type: "Maternity", balance: 0, total: 90, color: "purple" },
        ].map((leave, idx) => {
          const bgColors: Record<string, string> = {
            blue: "bg-blue-400/10 border-blue-400/30",
            green: "bg-green-400/10 border-green-400/30",
            orange: "bg-orange-400/10 border-orange-400/30",
            purple: "bg-purple-400/10 border-purple-400/30",
          }
          const textColors: Record<string, string> = {
            blue: "text-blue-400",
            green: "text-green-400",
            orange: "text-orange-400",
            purple: "text-purple-400",
          }

          return (
            <Card key={idx} className={`bg-card border ${bgColors[leave.color]}`}>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">{leave.type} Leave</CardTitle>
              </CardHeader>
              <CardContent>
                <div className={`text-2xl font-bold ${textColors[leave.color]}`}>{leave.balance}</div>
                <p className="text-xs text-muted-foreground mt-1">of {leave.total} days</p>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Leave Requests */}
      <Card className="bg-card border-border/50">
        <CardHeader>
          <CardTitle>My Leave Requests</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {leaveRequests.map((leave) => (
              <div
                key={leave.id}
                className="flex items-start justify-between p-4 rounded-lg border border-border/30 hover:bg-secondary/20"
              >
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <span className={`font-medium ${getTypeColor(leave.type)}`}>{leave.type}</span>
                    <span className={`px-2 py-1 rounded text-xs font-medium ${getStatusColor(leave.status)}`}>
                      {leave.status}
                    </span>
                  </div>
                  <p className="text-sm text-foreground">
                    {leave.startDate} to {leave.endDate}
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    {leave.days} days • {leave.reason}
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">Applied on {leave.appliedDate}</p>
                </div>
                <Button size="sm" variant="ghost" className="text-primary hover:bg-primary/10">
                  View
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Apply Leave Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <Card className="bg-card border-border w-full max-w-md">
            <CardHeader>
              <CardTitle>Apply for Leave</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Leave Type</label>
                <select
                  value={leaveType}
                  onChange={(e) => setLeaveType(e.target.value)}
                  className="w-full px-4 py-2 rounded-lg bg-input border border-border/50 text-foreground appearance-none cursor-pointer"
                >
                  <option value="CASUAL">Casual Leave</option>
                  <option value="SICK">Sick Leave</option>
                  <option value="EARNED">Earned Leave</option>
                  <option value="MATERNITY">Maternity Leave</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Start Date</label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <input
                    type="date"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    className="w-full pl-10 px-4 py-2 rounded-lg bg-input border border-border/50 text-foreground"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">End Date</label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <input
                    type="date"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    className="w-full pl-10 px-4 py-2 rounded-lg bg-input border border-border/50 text-foreground"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Reason</label>
                <textarea
                  value={reason}
                  onChange={(e) => setReason(e.target.value)}
                  placeholder="Please provide reason for leave..."
                  className="w-full px-3 py-2 rounded-lg bg-input border border-border/50 text-foreground text-sm resize-none"
                  rows={3}
                />
              </div>

              <div className="flex gap-3">
                <Button
                  onClick={() => setShowModal(false)}
                  variant="outline"
                  className="flex-1 border-border text-muted-foreground hover:bg-secondary/30"
                >
                  Cancel
                </Button>
                <Button
                  onClick={handleApplyLeave}
                  className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground"
                >
                  Apply
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}
