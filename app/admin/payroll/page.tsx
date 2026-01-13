"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import { Lock, Eye, AlertCircle } from "lucide-react"

export default function PayrollPage() {
  const [selectedMonth, setSelectedMonth] = useState("January-2024")
  const [showPreview, setShowPreview] = useState(false)
  const [showConfirmModal, setShowConfirmModal] = useState(false)

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

  const payrollSummary = {
    month: "January-2024",
    status: "DRAFT",
    totalEmployees: 1248,
    processedEmployees: 1248,
    totalGross: 156400000,
    totalPF: 15640000,
    totalAdvance: 2850000,
    totalLoanEMI: 4520000,
    totalDeduction: 23010000,
    totalNetPay: 133390000,
  }

  const samplePayroll = [
    {
      employeeCode: "EMP001",
      name: "Rajesh Kumar",
      gross: 125000,
      pf: 12500,
      advance: 10000,
      loanEmi: 12500,
      totalDeduction: 35000,
      netPay: 90000,
    },
    {
      employeeCode: "EMP002",
      name: "Priya Singh",
      gross: 152000,
      pf: 15200,
      advance: 15000,
      loanEmi: 15625,
      totalDeduction: 45825,
      netPay: 106175,
    },
    {
      employeeCode: "EMP003",
      name: "Amit Sharma",
      gross: 195000,
      pf: 19500,
      advance: 20000,
      loanEmi: 10000,
      totalDeduction: 49500,
      netPay: 145500,
    },
  ]

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-4xl font-bold text-foreground">Payroll Management</h1>
        <p className="text-muted-foreground mt-2">Process and lock payroll for monthly salary distribution</p>
      </div>

      {/* Month Selection */}
      <Card className="bg-card border-border/50">
        <CardContent className="pt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
            <div className="flex items-end gap-2">
              <Button
                variant="outline"
                className="flex-1 border-border text-muted-foreground hover:bg-secondary/30 bg-transparent gap-2"
              >
                <Eye className="w-4 h-4" />
                Refresh
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Payroll Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="bg-card border-border/50">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Gross</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold text-foreground">₹{(payrollSummary.totalGross / 100000).toFixed(2)}L</p>
          </CardContent>
        </Card>
        <Card className="bg-card border-border/50">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Deduction</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold text-destructive">
              ₹{(payrollSummary.totalDeduction / 100000).toFixed(2)}L
            </p>
          </CardContent>
        </Card>
        <Card className="bg-card border-border/50">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Net Payable</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold text-green-400">₹{(payrollSummary.totalNetPay / 100000).toFixed(2)}L</p>
          </CardContent>
        </Card>
      </div>

      {/* Payroll Breakdown */}
      <Card className="bg-card border-border/50">
        <CardHeader>
          <CardTitle>Payroll Components</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            <div className="p-3 rounded-lg bg-secondary/20 border border-border/30">
              <p className="text-xs text-muted-foreground mb-1">Gross</p>
              <p className="text-lg font-bold text-foreground">₹{(payrollSummary.totalGross / 100000).toFixed(2)}L</p>
            </div>
            <div className="p-3 rounded-lg bg-secondary/20 border border-border/30">
              <p className="text-xs text-muted-foreground mb-1">PF</p>
              <p className="text-lg font-bold text-foreground">₹{(payrollSummary.totalPF / 100000).toFixed(2)}L</p>
            </div>
            <div className="p-3 rounded-lg bg-secondary/20 border border-border/30">
              <p className="text-xs text-muted-foreground mb-1">Advance</p>
              <p className="text-lg font-bold text-foreground">₹{(payrollSummary.totalAdvance / 100000).toFixed(2)}L</p>
            </div>
            <div className="p-3 rounded-lg bg-secondary/20 border border-border/30">
              <p className="text-xs text-muted-foreground mb-1">Loan EMI</p>
              <p className="text-lg font-bold text-foreground">₹{(payrollSummary.totalLoanEMI / 100000).toFixed(2)}L</p>
            </div>
            <div className="p-3 rounded-lg bg-secondary/20 border border-border/30">
              <p className="text-xs text-muted-foreground mb-1">Total Deduction</p>
              <p className="text-lg font-bold text-destructive">
                ₹{(payrollSummary.totalDeduction / 100000).toFixed(2)}L
              </p>
            </div>
            <div className="p-3 rounded-lg bg-green-400/10 border border-green-400/30">
              <p className="text-xs text-muted-foreground mb-1">Net Pay</p>
              <p className="text-lg font-bold text-green-400">₹{(payrollSummary.totalNetPay / 100000).toFixed(2)}L</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Sample Payroll Details */}
      <Card className="bg-card border-border/50">
        <CardHeader>
          <CardTitle>Sample Payroll Details (Top 3)</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border/30">
                  <th className="text-left py-3 px-4 font-semibold text-muted-foreground">Code</th>
                  <th className="text-left py-3 px-4 font-semibold text-muted-foreground">Name</th>
                  <th className="text-right py-3 px-4 font-semibold text-muted-foreground">Gross</th>
                  <th className="text-right py-3 px-4 font-semibold text-muted-foreground">PF</th>
                  <th className="text-right py-3 px-4 font-semibold text-muted-foreground">Advance</th>
                  <th className="text-right py-3 px-4 font-semibold text-muted-foreground">Loan EMI</th>
                  <th className="text-right py-3 px-4 font-semibold text-muted-foreground">Deduction</th>
                  <th className="text-right py-3 px-4 font-semibold text-muted-foreground">Net Pay</th>
                </tr>
              </thead>
              <tbody>
                {samplePayroll.map((record) => (
                  <tr key={record.employeeCode} className="border-b border-border/20 hover:bg-secondary/30">
                    <td className="py-3 px-4 font-medium text-foreground">{record.employeeCode}</td>
                    <td className="py-3 px-4 text-foreground">{record.name}</td>
                    <td className="py-3 px-4 text-right text-foreground">₹{record.gross.toLocaleString()}</td>
                    <td className="py-3 px-4 text-right text-muted-foreground">₹{record.pf.toLocaleString()}</td>
                    <td className="py-3 px-4 text-right text-muted-foreground">₹{record.advance.toLocaleString()}</td>
                    <td className="py-3 px-4 text-right text-muted-foreground">₹{record.loanEmi.toLocaleString()}</td>
                    <td className="py-3 px-4 text-right text-destructive">₹{record.totalDeduction.toLocaleString()}</td>
                    <td className="py-3 px-4 text-right font-medium text-green-400">
                      ₹{record.netPay.toLocaleString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Actions */}
      <div className="flex gap-3">
        <Button
          onClick={() => setShowPreview(true)}
          variant="outline"
          className="border-border text-foreground hover:bg-secondary/30 gap-2"
        >
          <Eye className="w-4 h-4" />
          Preview PDF
        </Button>
        <Button
          onClick={() => setShowConfirmModal(true)}
          className="bg-primary hover:bg-primary/90 text-primary-foreground gap-2"
        >
          <Lock className="w-4 h-4" />
          Lock & Finalize
        </Button>
      </div>

      {/* Confirmation Modal */}
      {showConfirmModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <Card className="bg-card border-border w-full max-w-md">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertCircle className="w-5 h-5 text-destructive" />
                Lock Payroll Confirmation
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-foreground">
                You are about to lock the payroll for <span className="font-bold">{selectedMonth}</span>. This action is
                permanent and will prevent any further edits.
              </p>

              <div className="p-3 rounded-lg bg-destructive/10 border border-destructive/30">
                <p className="text-xs text-destructive">
                  Total Net Pay to be distributed: ₹{(payrollSummary.totalNetPay / 100000).toFixed(2)}L
                </p>
              </div>

              <div className="flex gap-3">
                <Button
                  onClick={() => setShowConfirmModal(false)}
                  variant="outline"
                  className="flex-1 border-border text-muted-foreground hover:bg-secondary/30"
                >
                  Cancel
                </Button>
                <Button
                  onClick={() => setShowConfirmModal(false)}
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
