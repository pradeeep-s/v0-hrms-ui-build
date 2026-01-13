"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import { Download, FileText } from "lucide-react"

export default function ReportsPage() {
  const [selectedReport, setSelectedReport] = useState("attendance")
  const [selectedMonth, setSelectedMonth] = useState("January-2024")

  const reportTypes = [
    {
      id: "attendance",
      title: "Attendance Register",
      description: "Daily attendance summary with present, absent, and leave records",
      icon: "📋",
    },
    {
      id: "payroll",
      title: "Payroll Register",
      description: "Detailed payroll breakdown with gross, deductions, and net pay",
      icon: "💰",
    },
    {
      id: "pf",
      title: "PF Monthly Report",
      description: "Provident Fund contributions and employee details",
      icon: "🏦",
    },
    {
      id: "loan",
      title: "Loan Outstanding",
      description: "Outstanding loans with EMI details and payment status",
      icon: "📊",
    },
    {
      id: "advance",
      title: "Advance Recovery",
      description: "Salary advance records with recovery tracking",
      icon: "💳",
    },
    {
      id: "compliance",
      title: "Compliance Report",
      description: "Statutory compliance including PF, ESI, and tax details",
      icon: "✅",
    },
  ]

  const reportData = {
    attendance: [
      { date: "2024-01-01", present: 1156, absent: 32, leave: 48, halfDay: 12 },
      { date: "2024-01-02", present: 1178, absent: 24, leave: 36, halfDay: 10 },
      { date: "2024-01-03", present: 1165, absent: 28, leave: 42, halfDay: 13 },
      { date: "2024-01-04", present: 1182, absent: 20, leave: 32, halfDay: 14 },
      { date: "2024-01-05", present: 1156, absent: 35, leave: 45, halfDay: 12 },
    ],
    payroll: [
      { employeeCode: "EMP001", name: "Rajesh Kumar", gross: 125000, pf: 12500, advance: 10000, netPay: 90000 },
      { employeeCode: "EMP002", name: "Priya Singh", gross: 152000, pf: 15200, advance: 15000, netPay: 106175 },
      { employeeCode: "EMP003", name: "Amit Sharma", gross: 195000, pf: 19500, advance: 20000, netPay: 145500 },
    ],
    pf: [
      { employeeCode: "EMP001", name: "Rajesh Kumar", contribution: 12500, balance: 625000 },
      { employeeCode: "EMP002", name: "Priya Singh", contribution: 15200, balance: 760000 },
      { employeeCode: "EMP003", name: "Amit Sharma", contribution: 19500, balance: 975000 },
    ],
    loan: [
      { employeeCode: "EMP001", name: "Rajesh Kumar", amount: 500000, emi: 12500, balance: 187500, status: "Active" },
      { employeeCode: "EMP002", name: "Priya Singh", amount: 750000, emi: 15625, balance: 125000, status: "Active" },
      { employeeCode: "EMP003", name: "Amit Sharma", amount: 400000, emi: 10000, balance: 0, status: "Closed" },
    ],
  }

  const months = ["January-2024", "February-2024", "March-2024", "April-2024", "May-2024", "June-2024"]

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-4xl font-bold text-foreground">Reports</h1>
        <p className="text-muted-foreground mt-2">Generate and export HR reports</p>
      </div>

      {/* Report Selection */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {reportTypes.map((report) => (
          <button
            key={report.id}
            onClick={() => setSelectedReport(report.id)}
            className={`p-4 rounded-lg border-2 transition-all text-left ${
              selectedReport === report.id
                ? "border-primary bg-primary/10"
                : "border-border/50 bg-card hover:border-primary/50"
            }`}
          >
            <div className="text-2xl mb-2">{report.icon}</div>
            <p className="font-semibold text-foreground">{report.title}</p>
            <p className="text-xs text-muted-foreground mt-1">{report.description}</p>
          </button>
        ))}
      </div>

      {/* Month Selector */}
      <Card className="bg-card border-border/50">
        <CardContent className="pt-6">
          <div className="max-w-xs">
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
        </CardContent>
      </Card>

      {/* Report Preview */}
      <Card className="bg-card border-border/50">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>
            {reportTypes.find((r) => r.id === selectedReport)?.title} - {selectedMonth}
          </CardTitle>
          <div className="flex gap-2">
            <Button
              variant="outline"
              className="border-border text-muted-foreground hover:bg-secondary/30 gap-2 bg-transparent"
            >
              <Download className="w-4 h-4" />
              PDF
            </Button>
            <Button
              variant="outline"
              className="border-border text-muted-foreground hover:bg-secondary/30 gap-2 bg-transparent"
            >
              <Download className="w-4 h-4" />
              Excel
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          {selectedReport === "attendance" && (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border/30">
                    <th className="text-left py-3 px-4 font-semibold text-muted-foreground">Date</th>
                    <th className="text-right py-3 px-4 font-semibold text-muted-foreground">Present</th>
                    <th className="text-right py-3 px-4 font-semibold text-muted-foreground">Absent</th>
                    <th className="text-right py-3 px-4 font-semibold text-muted-foreground">Leave</th>
                    <th className="text-right py-3 px-4 font-semibold text-muted-foreground">Half Day</th>
                  </tr>
                </thead>
                <tbody>
                  {reportData.attendance.map((row) => (
                    <tr key={row.date} className="border-b border-border/20 hover:bg-secondary/30">
                      <td className="py-3 px-4 text-foreground">{row.date}</td>
                      <td className="py-3 px-4 text-right text-green-400">{row.present}</td>
                      <td className="py-3 px-4 text-right text-red-400">{row.absent}</td>
                      <td className="py-3 px-4 text-right text-blue-400">{row.leave}</td>
                      <td className="py-3 px-4 text-right text-orange-400">{row.halfDay}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {selectedReport === "payroll" && (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border/30">
                    <th className="text-left py-3 px-4 font-semibold text-muted-foreground">Code</th>
                    <th className="text-left py-3 px-4 font-semibold text-muted-foreground">Name</th>
                    <th className="text-right py-3 px-4 font-semibold text-muted-foreground">Gross</th>
                    <th className="text-right py-3 px-4 font-semibold text-muted-foreground">PF</th>
                    <th className="text-right py-3 px-4 font-semibold text-muted-foreground">Advance</th>
                    <th className="text-right py-3 px-4 font-semibold text-muted-foreground">Net Pay</th>
                  </tr>
                </thead>
                <tbody>
                  {reportData.payroll.map((row) => (
                    <tr key={row.employeeCode} className="border-b border-border/20 hover:bg-secondary/30">
                      <td className="py-3 px-4 font-medium text-foreground">{row.employeeCode}</td>
                      <td className="py-3 px-4 text-foreground">{row.name}</td>
                      <td className="py-3 px-4 text-right text-foreground">₹{row.gross.toLocaleString()}</td>
                      <td className="py-3 px-4 text-right text-muted-foreground">₹{row.pf.toLocaleString()}</td>
                      <td className="py-3 px-4 text-right text-muted-foreground">₹{row.advance.toLocaleString()}</td>
                      <td className="py-3 px-4 text-right font-medium text-green-400">
                        ₹{row.netPay.toLocaleString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {selectedReport === "pf" && (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border/30">
                    <th className="text-left py-3 px-4 font-semibold text-muted-foreground">Code</th>
                    <th className="text-left py-3 px-4 font-semibold text-muted-foreground">Name</th>
                    <th className="text-right py-3 px-4 font-semibold text-muted-foreground">Monthly Contribution</th>
                    <th className="text-right py-3 px-4 font-semibold text-muted-foreground">Total Balance</th>
                  </tr>
                </thead>
                <tbody>
                  {reportData.pf.map((row) => (
                    <tr key={row.employeeCode} className="border-b border-border/20 hover:bg-secondary/30">
                      <td className="py-3 px-4 font-medium text-foreground">{row.employeeCode}</td>
                      <td className="py-3 px-4 text-foreground">{row.name}</td>
                      <td className="py-3 px-4 text-right text-foreground">₹{row.contribution.toLocaleString()}</td>
                      <td className="py-3 px-4 text-right font-medium text-green-400">
                        ₹{row.balance.toLocaleString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {selectedReport === "loan" && (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border/30">
                    <th className="text-left py-3 px-4 font-semibold text-muted-foreground">Code</th>
                    <th className="text-left py-3 px-4 font-semibold text-muted-foreground">Name</th>
                    <th className="text-right py-3 px-4 font-semibold text-muted-foreground">Loan Amount</th>
                    <th className="text-right py-3 px-4 font-semibold text-muted-foreground">EMI</th>
                    <th className="text-right py-3 px-4 font-semibold text-muted-foreground">Outstanding</th>
                    <th className="text-left py-3 px-4 font-semibold text-muted-foreground">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {reportData.loan.map((row) => (
                    <tr key={row.employeeCode} className="border-b border-border/20 hover:bg-secondary/30">
                      <td className="py-3 px-4 font-medium text-foreground">{row.employeeCode}</td>
                      <td className="py-3 px-4 text-foreground">{row.name}</td>
                      <td className="py-3 px-4 text-right text-foreground">₹{row.amount.toLocaleString()}</td>
                      <td className="py-3 px-4 text-right text-muted-foreground">₹{row.emi.toLocaleString()}</td>
                      <td className="py-3 px-4 text-right font-medium">
                        {row.balance > 0 ? `₹${row.balance.toLocaleString()}` : "Closed"}
                      </td>
                      <td className="py-3 px-4">
                        <span
                          className={`px-2 py-1 rounded text-xs font-medium ${
                            row.status === "Active" ? "bg-green-400/10 text-green-400" : "bg-gray-400/10 text-gray-400"
                          }`}
                        >
                          {row.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {selectedReport !== "attendance" &&
            selectedReport !== "payroll" &&
            selectedReport !== "pf" &&
            selectedReport !== "loan" && (
              <div className="text-center py-8">
                <FileText className="w-12 h-12 text-muted-foreground mx-auto mb-4 opacity-50" />
                <p className="text-muted-foreground">Select a report type to view details</p>
              </div>
            )}
        </CardContent>
      </Card>
    </div>
  )
}
