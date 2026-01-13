"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useState } from "react"
import { Plus, AlertCircle } from "lucide-react"

export default function AdvancePage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [showModal, setShowModal] = useState(false)

  const advances = [
    {
      id: 1,
      employeeCode: "EMP001",
      employeeName: "Rajesh Kumar",
      appliedDate: "2024-01-05",
      amount: 50000,
      status: "APPROVED",
      recoveryStartMonth: "January 2024",
      recoveryAmount: 10000,
      balanceAmount: 0,
      emisPaid: 5,
    },
    {
      id: 2,
      employeeCode: "EMP002",
      employeeName: "Priya Singh",
      appliedDate: "2024-01-10",
      amount: 75000,
      status: "APPROVED",
      recoveryStartMonth: "January 2024",
      recoveryAmount: 15000,
      balanceAmount: 30000,
      emisPaid: 3,
    },
    {
      id: 3,
      employeeCode: "EMP003",
      employeeName: "Amit Sharma",
      appliedDate: "2024-01-08",
      amount: 100000,
      status: "PENDING",
      recoveryStartMonth: "February 2024",
      recoveryAmount: 20000,
      balanceAmount: 100000,
      emisPaid: 0,
    },
    {
      id: 4,
      employeeCode: "EMP004",
      employeeName: "Neha Gupta",
      appliedDate: "2024-01-12",
      amount: 25000,
      status: "APPROVED",
      recoveryStartMonth: "February 2024",
      recoveryAmount: 5000,
      balanceAmount: 20000,
      emisPaid: 1,
    },
  ]

  const filteredAdvances = advances.filter(
    (advance) =>
      advance.employeeCode.toLowerCase().includes(searchTerm.toLowerCase()) ||
      advance.employeeName.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold text-foreground">Advance Management</h1>
          <p className="text-muted-foreground mt-2">Manage salary advances and recovery</p>
        </div>
        <Button
          onClick={() => setShowModal(true)}
          className="bg-primary hover:bg-primary/90 text-primary-foreground gap-2"
        >
          <Plus className="w-4 h-4" />
          New Advance
        </Button>
      </div>

      {/* Important Notice */}
      <div className="p-4 rounded-lg bg-blue-400/10 border border-blue-400/30 flex gap-3">
        <AlertCircle className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" />
        <div>
          <p className="font-medium text-blue-400">Advance Policy</p>
          <p className="text-sm text-blue-400/80 mt-1">
            Each employee can have only ONE active advance. Once approved, recovery starts on the specified month.
          </p>
        </div>
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

      {/* Advances Table */}
      <Card className="bg-card border-border/50">
        <CardHeader>
          <CardTitle>Active Advances ({filteredAdvances.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border/30">
                  <th className="text-left py-3 px-4 font-semibold text-muted-foreground">Employee</th>
                  <th className="text-left py-3 px-4 font-semibold text-muted-foreground">Applied</th>
                  <th className="text-left py-3 px-4 font-semibold text-muted-foreground">Amount</th>
                  <th className="text-left py-3 px-4 font-semibold text-muted-foreground">Status</th>
                  <th className="text-left py-3 px-4 font-semibold text-muted-foreground">Recovery/Month</th>
                  <th className="text-left py-3 px-4 font-semibold text-muted-foreground">Balance</th>
                  <th className="text-left py-3 px-4 font-semibold text-muted-foreground">EMIs Paid</th>
                  <th className="text-right py-3 px-4 font-semibold text-muted-foreground">Action</th>
                </tr>
              </thead>
              <tbody>
                {filteredAdvances.map((advance) => (
                  <tr key={advance.id} className="border-b border-border/20 hover:bg-secondary/30 transition-colors">
                    <td className="py-3 px-4">
                      <div>
                        <p className="font-medium text-foreground">{advance.employeeName}</p>
                        <p className="text-xs text-muted-foreground">{advance.employeeCode}</p>
                      </div>
                    </td>
                    <td className="py-3 px-4 text-muted-foreground">{advance.appliedDate}</td>
                    <td className="py-3 px-4 font-medium text-foreground">₹{advance.amount.toLocaleString()}</td>
                    <td className="py-3 px-4">
                      <span
                        className={`px-2 py-1 rounded text-xs font-medium ${
                          advance.status === "APPROVED"
                            ? "bg-green-400/10 text-green-400"
                            : "bg-orange-400/10 text-orange-400"
                        }`}
                      >
                        {advance.status}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-muted-foreground">₹{advance.recoveryAmount.toLocaleString()}</td>
                    <td className="py-3 px-4 font-medium text-foreground">₹{advance.balanceAmount.toLocaleString()}</td>
                    <td className="py-3 px-4 text-muted-foreground">{advance.emisPaid}</td>
                    <td className="py-3 px-4 text-right">
                      <Button variant="ghost" size="sm" className="text-primary hover:bg-primary/10">
                        View
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* New Advance Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <Card className="bg-card border-border w-full max-w-md">
            <CardHeader>
              <CardTitle>Request New Advance</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Employee</label>
                <select className="w-full px-4 py-2 rounded-lg bg-input border border-border/50 text-foreground appearance-none cursor-pointer">
                  <option>Select Employee</option>
                  <option>Rajesh Kumar (EMP001)</option>
                  <option>Priya Singh (EMP002)</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Advance Amount</label>
                <Input type="number" placeholder="₹0" className="bg-input border-border/50" />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Recovery Start Month</label>
                <Input type="month" className="bg-input border-border/50" />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Monthly Recovery Amount</label>
                <Input type="number" placeholder="₹0" className="bg-input border-border/50" />
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
                  onClick={() => setShowModal(false)}
                  className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground"
                >
                  Create Advance
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}
