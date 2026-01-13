"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useState } from "react"
import { Check, X, Clock } from "lucide-react"

export default function LeaveApprovalsPage() {
  const [activeTab, setActiveTab] = useState("pending")
  const [searchTerm, setSearchTerm] = useState("")
  const [showRejectModal, setShowRejectModal] = useState(false)
  const [selectedLeave, setSelectedLeave] = useState<any>(null)
  const [rejectReason, setRejectReason] = useState("")

  const leaveRequests = [
    {
      id: 1,
      employeeCode: "EMP101",
      employeeName: "Vikram Patel",
      type: "CASUAL",
      startDate: "2024-01-15",
      endDate: "2024-01-16",
      days: 2,
      reason: "Personal work",
      status: "APPLIED",
      appliedDate: "2024-01-10",
    },
    {
      id: 2,
      employeeCode: "EMP102",
      employeeName: "Priya Sharma",
      type: "SICK",
      startDate: "2024-01-14",
      endDate: "2024-01-14",
      days: 1,
      reason: "Medical appointment",
      status: "APPLIED",
      appliedDate: "2024-01-13",
    },
    {
      id: 3,
      employeeCode: "EMP103",
      employeeName: "Ananya Singh",
      type: "EARNED",
      startDate: "2024-01-20",
      endDate: "2024-01-24",
      days: 5,
      reason: "Vacation",
      status: "MANAGER_APPROVED",
      appliedDate: "2024-01-05",
      managerApprovedDate: "2024-01-08 14:30",
    },
    {
      id: 4,
      employeeCode: "EMP104",
      employeeName: "Deepak Roy",
      type: "CASUAL",
      startDate: "2024-01-25",
      endDate: "2024-01-25",
      days: 1,
      reason: "Family event",
      status: "REJECTED",
      appliedDate: "2024-01-12",
      rejectionReason: "Project deadline conflict",
    },
  ]

  const filteredLeaves = leaveRequests.filter((leave) => {
    const matchesSearch =
      leave.employeeCode.toLowerCase().includes(searchTerm.toLowerCase()) ||
      leave.employeeName.toLowerCase().includes(searchTerm.toLowerCase())

    let matchesTab = true
    if (activeTab === "pending") {
      matchesTab = leave.status === "APPLIED"
    } else if (activeTab === "approved") {
      matchesTab = leave.status === "MANAGER_APPROVED"
    } else if (activeTab === "rejected") {
      matchesTab = leave.status === "REJECTED"
    }

    return matchesSearch && matchesTab
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case "APPLIED":
        return "bg-blue-400/10 text-blue-400"
      case "MANAGER_APPROVED":
        return "bg-green-400/10 text-green-400"
      case "REJECTED":
        return "bg-red-400/10 text-red-400"
      default:
        return ""
    }
  }

  const handleReject = () => {
    setShowRejectModal(false)
    setRejectReason("")
    setSelectedLeave(null)
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-4xl font-bold text-foreground">Leave Approvals</h1>
        <p className="text-muted-foreground mt-2">Review and approve team member leave requests</p>
      </div>

      {/* Tabs */}
      <div className="flex gap-4 border-b border-border/50 overflow-x-auto">
        <button
          onClick={() => setActiveTab("pending")}
          className={`px-4 py-3 font-medium transition-colors border-b-2 whitespace-nowrap ${
            activeTab === "pending"
              ? "border-primary text-foreground"
              : "border-transparent text-muted-foreground hover:text-foreground"
          }`}
        >
          <Clock className="w-4 h-4 inline mr-2" />
          Pending
        </button>
        <button
          onClick={() => setActiveTab("approved")}
          className={`px-4 py-3 font-medium transition-colors border-b-2 whitespace-nowrap ${
            activeTab === "approved"
              ? "border-primary text-foreground"
              : "border-transparent text-muted-foreground hover:text-foreground"
          }`}
        >
          <Check className="w-4 h-4 inline mr-2" />
          Approved
        </button>
        <button
          onClick={() => setActiveTab("rejected")}
          className={`px-4 py-3 font-medium transition-colors border-b-2 whitespace-nowrap ${
            activeTab === "rejected"
              ? "border-primary text-foreground"
              : "border-transparent text-muted-foreground hover:text-foreground"
          }`}
        >
          <X className="w-4 h-4 inline mr-2" />
          Rejected
        </button>
      </div>

      {/* Search */}
      <Card className="bg-card border-border/50">
        <CardContent className="pt-6">
          <Input
            placeholder="Search by employee code or name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="bg-input border-border/50"
          />
        </CardContent>
      </Card>

      {/* Requests Table */}
      <Card className="bg-card border-border/50">
        <CardHeader>
          <CardTitle>
            {activeTab === "pending"
              ? "Pending Requests"
              : activeTab === "approved"
                ? "Approved Requests"
                : "Rejected Requests"}{" "}
            ({filteredLeaves.length})
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border/30">
                  <th className="text-left py-3 px-4 font-semibold text-muted-foreground">Employee</th>
                  <th className="text-left py-3 px-4 font-semibold text-muted-foreground">Type</th>
                  <th className="text-left py-3 px-4 font-semibold text-muted-foreground">Dates</th>
                  <th className="text-left py-3 px-4 font-semibold text-muted-foreground">Days</th>
                  <th className="text-left py-3 px-4 font-semibold text-muted-foreground">Reason</th>
                  <th className="text-right py-3 px-4 font-semibold text-muted-foreground">Action</th>
                </tr>
              </thead>
              <tbody>
                {filteredLeaves.map((leave) => (
                  <tr key={leave.id} className="border-b border-border/20 hover:bg-secondary/30 transition-colors">
                    <td className="py-3 px-4">
                      <div>
                        <p className="font-medium text-foreground">{leave.employeeName}</p>
                        <p className="text-xs text-muted-foreground">{leave.employeeCode}</p>
                      </div>
                    </td>
                    <td className="py-3 px-4 text-sm font-medium text-primary">{leave.type}</td>
                    <td className="py-3 px-4 text-sm text-muted-foreground">
                      {leave.startDate} to {leave.endDate}
                    </td>
                    <td className="py-3 px-4 font-medium text-foreground">{leave.days} days</td>
                    <td className="py-3 px-4 text-sm text-muted-foreground truncate">{leave.reason}</td>
                    <td className="py-3 px-4 text-right">
                      {leave.status === "APPLIED" && (
                        <div className="flex gap-2 justify-end">
                          <Button
                            size="sm"
                            className="bg-green-400/20 text-green-400 hover:bg-green-400/30 border border-green-400/50"
                            variant="outline"
                          >
                            Approve
                          </Button>
                          <Button
                            size="sm"
                            onClick={() => {
                              setSelectedLeave(leave)
                              setShowRejectModal(true)
                            }}
                            className="bg-red-400/20 text-red-400 hover:bg-red-400/30 border border-red-400/50"
                            variant="outline"
                          >
                            Reject
                          </Button>
                        </div>
                      )}
                      {leave.status !== "APPLIED" && (
                        <Button size="sm" variant="ghost" className="text-primary">
                          View
                        </Button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Reject Modal */}
      {showRejectModal && selectedLeave && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <Card className="bg-card border-border w-full max-w-md">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <X className="w-5 h-5 text-destructive" />
                Reject Leave Request
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="p-3 rounded-lg bg-secondary/20 border border-border/30">
                <p className="text-sm text-foreground font-medium">{selectedLeave.employeeName}</p>
                <p className="text-xs text-muted-foreground mt-1">
                  {selectedLeave.type} • {selectedLeave.days} days • {selectedLeave.startDate}
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Reason for Rejection</label>
                <textarea
                  value={rejectReason}
                  onChange={(e) => setRejectReason(e.target.value)}
                  placeholder="Provide reason for rejection..."
                  className="w-full px-3 py-2 rounded-lg bg-input border border-border/50 text-foreground text-sm resize-none"
                  rows={3}
                />
              </div>

              <div className="flex gap-3">
                <Button
                  onClick={() => setShowRejectModal(false)}
                  variant="outline"
                  className="flex-1 border-border text-muted-foreground hover:bg-secondary/30"
                >
                  Cancel
                </Button>
                <Button
                  onClick={handleReject}
                  className="flex-1 bg-destructive hover:bg-destructive/90 text-destructive-foreground"
                >
                  Reject
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}
