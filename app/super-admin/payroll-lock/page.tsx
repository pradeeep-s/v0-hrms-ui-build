"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import { AlertCircle, Lock } from "lucide-react"

export default function PayrollLockPage() {
  const [selectedMonth, setSelectedMonth] = useState("December-2024")
  const [showLockModal, setShowLockModal] = useState(false)
  const [lockReason, setLockReason] = useState("")

  const months = [
    "January-2024",
    "February-2024",
    "March-2024",
    "April-2024",
    "May-2024",
    "June-2024",
    "July-2024",
    "August-2024",
    "September-2024",
    "October-2024",
    "November-2024",
    "December-2024",
  ]

  const payrollData = [
    {
      month: "December-2024",
      status: "locked",
      processedEmployees: 1248,
      totalPayroll: 45875000,
      lockedDate: "2024-01-13 14:32",
      lockedBy: "HR Admin",
    },
    {
      month: "November-2024",
      status: "locked",
      processedEmployees: 1248,
      totalPayroll: 44250000,
      lockedDate: "2024-12-15 10:15",
      lockedBy: "HR Admin",
    },
    {
      month: "October-2024",
      status: "locked",
      processedEmployees: 1248,
      totalPayroll: 43980000,
      lockedDate: "2024-11-10 09:45",
      lockedBy: "HR Admin",
    },
    {
      month: "September-2024",
      status: "locked",
      processedEmployees: 1245,
      totalPayroll: 43120000,
      lockedDate: "2024-10-15 11:20",
      lockedBy: "Super Admin",
    },
  ]

  const currentPayroll = {
    month: "January-2025",
    status: "draft",
    processedEmployees: 1248,
    totalPayroll: 46125000,
    pendingApprovals: 12,
  }

  const handleLock = () => {
    setShowLockModal(false)
    setLockReason("")
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-4xl font-bold text-foreground">Payroll Lock Management</h1>
        <p className="text-muted-foreground mt-2">Lock/unlock payroll periods for compliance and audit trail</p>
      </div>

      {/* Current Payroll Status */}
      <Card className="bg-card border-border/50 border-l-4 border-l-blue-400">
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>Current Payroll Period</span>
            <span className="px-3 py-1 rounded-full bg-blue-400/10 text-blue-400 text-xs font-medium">Draft</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div>
              <p className="text-sm text-muted-foreground mb-1">Month</p>
              <p className="text-lg font-bold text-foreground">{currentPayroll.month}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground mb-1">Processed</p>
              <p className="text-lg font-bold text-foreground">{currentPayroll.processedEmployees}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground mb-1">Total Payroll</p>
              <p className="text-lg font-bold text-foreground">₹{(currentPayroll.totalPayroll / 100000).toFixed(2)}L</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground mb-1">Pending</p>
              <p className="text-lg font-bold text-orange-400">{currentPayroll.pendingApprovals} Approvals</p>
            </div>
          </div>

          <div className="mt-6 flex gap-3">
            <Button className="bg-primary hover:bg-primary/90 text-primary-foreground" disabled>
              Finalize Payroll
            </Button>
            <Button variant="outline" className="border-border text-muted-foreground bg-transparent" disabled>
              Preview Report
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Lock/Unlock Section */}
      <Card className="bg-card border-border/50">
        <CardHeader>
          <CardTitle>Lock Payroll Period</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Select Month</label>
              <div className="relative">
                <select
                  value={selectedMonth}
                  onChange={(e) => setSelectedMonth(e.target.value)}
                  className="w-full px-4 py-2 rounded-lg bg-input border border-border/50 text-foreground appearance-none cursor-pointer"
                >
                  {months.map((month) => (
                    <option key={month} value={month}>
                      {month}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Warning Box */}
            <div className="p-4 rounded-lg bg-destructive/10 border border-destructive/30 flex gap-3">
              <AlertCircle className="w-5 h-5 text-destructive flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-medium text-destructive">Warning</p>
                <p className="text-sm text-destructive/80 mt-1">
                  Locking payroll is permanent. Locked payrolls cannot be edited and provide an audit trail. All
                  approvals must be completed before locking.
                </p>
              </div>
            </div>

            <Button
              onClick={() => setShowLockModal(true)}
              className="w-full bg-destructive hover:bg-destructive/90 text-destructive-foreground gap-2"
            >
              <Lock className="w-4 h-4" />
              Lock {selectedMonth} Payroll
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Locked Payrolls History */}
      <Card className="bg-card border-border/50">
        <CardHeader>
          <CardTitle>Locked Payroll History</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border/30">
                  <th className="text-left py-3 px-4 text-sm font-semibold text-muted-foreground">Period</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-muted-foreground">Employees</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-muted-foreground">Payroll Amount</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-muted-foreground">Locked Date</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-muted-foreground">Locked By</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-muted-foreground">Status</th>
                </tr>
              </thead>
              <tbody>
                {payrollData.map((record, idx) => (
                  <tr key={idx} className="border-b border-border/20 hover:bg-secondary/30 transition-colors">
                    <td className="py-3 px-4 text-sm font-medium text-foreground">{record.month}</td>
                    <td className="py-3 px-4 text-sm text-muted-foreground">{record.processedEmployees}</td>
                    <td className="py-3 px-4 text-sm font-medium text-foreground">
                      ₹{(record.totalPayroll / 100000).toFixed(2)}L
                    </td>
                    <td className="py-3 px-4 text-sm text-muted-foreground">{record.lockedDate}</td>
                    <td className="py-3 px-4 text-sm text-muted-foreground">{record.lockedBy}</td>
                    <td className="py-3 px-4">
                      <span className="px-2 py-1 rounded text-xs font-medium bg-green-400/10 text-green-400">
                        Locked
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Lock Confirmation Modal */}
      {showLockModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <Card className="bg-card border-border w-full max-w-md">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertCircle className="w-5 h-5 text-destructive" />
                Confirm Payroll Lock
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-foreground">
                You are about to lock <span className="font-bold">{selectedMonth}</span> payroll. This action is
                permanent and cannot be reversed.
              </p>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Reason (Optional)</label>
                <textarea
                  value={lockReason}
                  onChange={(e) => setLockReason(e.target.value)}
                  placeholder="Document the reason for locking this payroll period..."
                  className="w-full px-3 py-2 rounded-lg bg-input border border-border/50 text-foreground text-sm resize-none"
                  rows={3}
                />
              </div>

              <div className="p-3 rounded-lg bg-destructive/10 border border-destructive/30">
                <p className="text-xs text-destructive/80">
                  All employee payments, deductions, and adjustments will be finalized and locked. Audit trail will be
                  maintained.
                </p>
              </div>

              <div className="flex gap-3">
                <Button
                  onClick={() => setShowLockModal(false)}
                  variant="outline"
                  className="flex-1 border-border text-muted-foreground hover:bg-secondary/30"
                >
                  Cancel
                </Button>
                <Button
                  onClick={handleLock}
                  className="flex-1 bg-destructive hover:bg-destructive/90 text-destructive-foreground"
                >
                  Lock Payroll
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}
