"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useState } from "react"
import { Plus } from "lucide-react"

export default function LoanPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [filterStatus, setFilterStatus] = useState("all")
  const [showModal, setShowModal] = useState(false)

  const loans = [
    {
      id: 1,
      employeeCode: "EMP001",
      employeeName: "Rajesh Kumar",
      loanAmount: 500000,
      emi: 12500,
      tenure: 40,
      emisPaid: 25,
      remainingEMIs: 15,
      status: "ACTIVE",
      startDate: "2022-09-15",
      nextEMIDate: "2024-02-15",
    },
    {
      id: 2,
      employeeCode: "EMP002",
      employeeName: "Priya Singh",
      loanAmount: 750000,
      emi: 15625,
      tenure: 48,
      emisPaid: 40,
      remainingEMIs: 8,
      status: "ACTIVE",
      startDate: "2021-04-20",
      nextEMIDate: "2024-02-20",
    },
    {
      id: 3,
      employeeCode: "EMP003",
      employeeName: "Amit Sharma",
      loanAmount: 400000,
      emi: 10000,
      tenure: 40,
      emisPaid: 40,
      remainingEMIs: 0,
      status: "CLOSED",
      startDate: "2021-10-10",
      closedDate: "2025-01-10",
    },
    {
      id: 4,
      employeeCode: "EMP004",
      employeeName: "Neha Gupta",
      loanAmount: 300000,
      emi: 8750,
      tenure: 36,
      emisPaid: 12,
      remainingEMIs: 24,
      status: "ACTIVE",
      startDate: "2023-02-01",
      nextEMIDate: "2024-02-01",
    },
  ]

  const filteredLoans = loans.filter((loan) => {
    const matchesSearch =
      loan.employeeCode.toLowerCase().includes(searchTerm.toLowerCase()) ||
      loan.employeeName.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesStatus = filterStatus === "all" || loan.status === filterStatus

    return matchesSearch && matchesStatus
  })

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold text-foreground">Loan Management</h1>
          <p className="text-muted-foreground mt-2">Manage employee loans and EMI tracking</p>
        </div>
        <Button
          onClick={() => setShowModal(true)}
          className="bg-primary hover:bg-primary/90 text-primary-foreground gap-2"
        >
          <Plus className="w-4 h-4" />
          New Loan
        </Button>
      </div>

      {/* Filters */}
      <Card className="bg-card border-border/50">
        <CardContent className="pt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              placeholder="Search by employee code or name..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="bg-input border-border/50"
            />
            <div className="relative">
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="w-full px-4 py-2 rounded-lg bg-input border border-border/50 text-foreground appearance-none cursor-pointer"
              >
                <option value="all">All Loans</option>
                <option value="ACTIVE">Active Only</option>
                <option value="CLOSED">Closed Only</option>
              </select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Loans Table */}
      <Card className="bg-card border-border/50">
        <CardHeader>
          <CardTitle>Employee Loans ({filteredLoans.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border/30">
                  <th className="text-left py-3 px-4 font-semibold text-muted-foreground">Employee</th>
                  <th className="text-left py-3 px-4 font-semibold text-muted-foreground">Loan Amount</th>
                  <th className="text-left py-3 px-4 font-semibold text-muted-foreground">EMI</th>
                  <th className="text-left py-3 px-4 font-semibold text-muted-foreground">Tenure</th>
                  <th className="text-left py-3 px-4 font-semibold text-muted-foreground">Paid/Total</th>
                  <th className="text-left py-3 px-4 font-semibold text-muted-foreground">Remaining</th>
                  <th className="text-left py-3 px-4 font-semibold text-muted-foreground">Status</th>
                  <th className="text-right py-3 px-4 font-semibold text-muted-foreground">Action</th>
                </tr>
              </thead>
              <tbody>
                {filteredLoans.map((loan) => (
                  <tr key={loan.id} className="border-b border-border/20 hover:bg-secondary/30 transition-colors">
                    <td className="py-3 px-4">
                      <div>
                        <p className="font-medium text-foreground">{loan.employeeName}</p>
                        <p className="text-xs text-muted-foreground">{loan.employeeCode}</p>
                      </div>
                    </td>
                    <td className="py-3 px-4 font-medium text-foreground">₹{loan.loanAmount.toLocaleString()}</td>
                    <td className="py-3 px-4 font-medium text-foreground">₹{loan.emi.toLocaleString()}</td>
                    <td className="py-3 px-4 text-muted-foreground">{loan.tenure} months</td>
                    <td className="py-3 px-4 text-muted-foreground">
                      {loan.emisPaid}/{loan.tenure}
                    </td>
                    <td className="py-3 px-4 text-muted-foreground">{loan.remainingEMIs} EMIs</td>
                    <td className="py-3 px-4">
                      <span
                        className={`px-2 py-1 rounded text-xs font-medium ${
                          loan.status === "ACTIVE" ? "bg-green-400/10 text-green-400" : "bg-gray-400/10 text-gray-400"
                        }`}
                      >
                        {loan.status}
                      </span>
                    </td>
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

      {/* New Loan Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <Card className="bg-card border-border w-full max-w-md">
            <CardHeader>
              <CardTitle>Create New Loan</CardTitle>
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
                <label className="block text-sm font-medium text-foreground mb-2">Loan Amount</label>
                <Input type="number" placeholder="₹0" className="bg-input border-border/50" />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Tenure (Months)</label>
                <Input type="number" placeholder="36" className="bg-input border-border/50" />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Monthly EMI</label>
                <Input type="number" placeholder="₹0" className="bg-input border-border/50" disabled />
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
                  Create Loan
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}
