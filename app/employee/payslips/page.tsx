"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Download, Eye } from "lucide-react"

export default function PayslipsPage() {
  const payslips = [
    {
      id: 1,
      month: "January 2024",
      gross: 125000,
      pf: 12500,
      advance: 10000,
      loanEmi: 12500,
      totalDeduction: 35000,
      netPay: 90000,
      date: "2024-01-31",
    },
    {
      id: 2,
      month: "December 2023",
      gross: 125000,
      pf: 12500,
      advance: 0,
      loanEmi: 12500,
      totalDeduction: 25000,
      netPay: 100000,
      date: "2023-12-31",
    },
    {
      id: 3,
      month: "November 2023",
      gross: 125000,
      pf: 12500,
      advance: 0,
      loanEmi: 12500,
      totalDeduction: 25000,
      netPay: 100000,
      date: "2023-11-30",
    },
  ]

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-4xl font-bold text-foreground">Payslips</h1>
        <p className="text-muted-foreground mt-2">Download and view your salary slips</p>
      </div>

      {/* Payslips Cards */}
      <div className="space-y-4">
        {payslips.map((payslip) => (
          <Card key={payslip.id} className="bg-card border-border/50">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>{payslip.month}</CardTitle>
                  <p className="text-xs text-muted-foreground mt-1">Generated on {payslip.date}</p>
                </div>
                <div className="flex gap-2">
                  <Button
                    size="sm"
                    variant="outline"
                    className="border-border text-muted-foreground hover:bg-secondary/30 gap-2 bg-transparent"
                  >
                    <Eye className="w-4 h-4" />
                    View
                  </Button>
                  <Button size="sm" className="bg-primary hover:bg-primary/90 text-primary-foreground gap-2">
                    <Download className="w-4 h-4" />
                    PDF
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div>
                  <p className="text-xs text-muted-foreground mb-1">Gross Salary</p>
                  <p className="text-lg font-bold text-foreground">₹{payslip.gross.toLocaleString()}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground mb-1">Total Deductions</p>
                  <p className="text-lg font-bold text-destructive">₹{payslip.totalDeduction.toLocaleString()}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground mb-1">Net Pay</p>
                  <p className="text-lg font-bold text-green-400">₹{payslip.netPay.toLocaleString()}</p>
                </div>
                <div className="hidden md:block">
                  <p className="text-xs text-muted-foreground mb-1">Breakdown</p>
                  <ul className="text-xs space-y-0.5 text-muted-foreground">
                    <li>PF: ₹{payslip.pf.toLocaleString()}</li>
                    {payslip.advance > 0 && <li>Advance: ₹{payslip.advance.toLocaleString()}</li>}
                    <li>Loan EMI: ₹{payslip.loanEmi.toLocaleString()}</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Summary Card */}
      <Card className="bg-card border-border/50">
        <CardHeader>
          <CardTitle>Earnings & Deductions Summary (YTD)</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <p className="text-sm font-semibold text-foreground mb-4">Earnings</p>
              <div className="space-y-3">
                {[
                  { label: "Basic Salary", value: 375000 },
                  { label: "House Rent Allowance", value: 37500 },
                  { label: "Dearness Allowance", value: 12500 },
                ].map((item, idx) => (
                  <div key={idx} className="flex justify-between text-sm">
                    <span className="text-muted-foreground">{item.label}</span>
                    <span className="text-foreground font-medium">₹{item.value.toLocaleString()}</span>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <p className="text-sm font-semibold text-foreground mb-4">Deductions</p>
              <div className="space-y-3">
                {[
                  { label: "Provident Fund", value: 37500 },
                  { label: "Salary Advance", value: 10000 },
                  { label: "Loan EMI", value: 37500 },
                ].map((item, idx) => (
                  <div key={idx} className="flex justify-between text-sm">
                    <span className="text-muted-foreground">{item.label}</span>
                    <span className="text-foreground font-medium">₹{item.value.toLocaleString()}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
