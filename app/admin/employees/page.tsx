"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useState, useEffect } from "react"
import { Plus, Search, ChevronDown, X } from "lucide-react"
import { api } from "@/lib/utils/api"

export default function EmployeesPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [showModal, setShowModal] = useState(false)
  const [editingId, setEditingId] = useState<number | null>(null)
  const [loading, setLoading] = useState(false)
  const [employees, setEmployees] = useState<any[]>([])

  const [formData, setFormData] = useState({
    code: "",
    name: "",
    email: "",
    role: "",
    manager: "",
    pfEligible: false,
    biometricId: "",
    status: "ACTIVE",
    salaryStructure: {
      basic: 0,
      da: 0,
      hra: 0,
      ta: 0,
      otherAllowance: 0,
    },
  })

  useEffect(() => {
    fetchEmployees()
  }, [])

  const fetchEmployees = async () => {
    try {
      setLoading(true)
      const data = await api.getEmployees()
      setEmployees(data)
    } catch (error) {
      console.error("[v0] Failed to fetch employees:", error)
    } finally {
      setLoading(false)
    }
  }

  const filteredEmployees = employees.filter((emp) => {
    const matchesSearch =
      emp.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
      emp.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      emp.email.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesStatus = statusFilter === "all" || emp.status === statusFilter

    return matchesSearch && matchesStatus
  })

  const calculateGrossSalary = (salaryStructure: typeof formData.salaryStructure) => {
    return (
      salaryStructure.basic +
      salaryStructure.da +
      salaryStructure.hra +
      salaryStructure.ta +
      salaryStructure.otherAllowance
    )
  }

  const handleOpenModal = (employee?: any) => {
    if (employee) {
      setFormData({
        code: employee.code,
        name: employee.name,
        email: employee.email,
        role: employee.role,
        manager: employee.manager,
        pfEligible: employee.pfEligible,
        biometricId: employee.biometricId,
        status: employee.status,
        salaryStructure: { ...employee.salaryStructure },
      })
      setEditingId(employee.id)
    } else {
      setFormData({
        code: "",
        name: "",
        email: "",
        role: "",
        manager: "",
        pfEligible: false,
        biometricId: "",
        status: "ACTIVE",
        salaryStructure: {
          basic: 0,
          da: 0,
          hra: 0,
          ta: 0,
          otherAllowance: 0,
        },
      })
      setEditingId(null)
    }
    setShowModal(true)
  }

  const handleSaveEmployee = async () => {
    try {
      if (editingId) {
        await api.updateEmployee(editingId.toString(), formData)
      } else {
        await api.createEmployee(formData)
      }
      setShowModal(false)
      await fetchEmployees()
    } catch (error) {
      console.error("[v0] Failed to save employee:", error)
    }
  }

  const handleInputChange = (field: string, value: any) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const handleSalaryStructureChange = (field: string, value: number) => {
    setFormData((prev) => ({
      ...prev,
      salaryStructure: {
        ...prev.salaryStructure,
        [field]: value,
      },
    }))
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold text-foreground">Employee Master</h1>
          <p className="text-muted-foreground mt-2">Manage employee records and information</p>
        </div>
        <Button
          onClick={() => handleOpenModal()}
          className="bg-primary hover:bg-primary/90 text-primary-foreground gap-2"
        >
          <Plus className="w-4 h-4" />
          Add Employee
        </Button>
      </div>

      {/* Filters */}
      <Card className="bg-card border-border/50">
        <CardContent className="pt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search by code, name, or email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 bg-input border-border/50"
              />
            </div>
            <div className="relative">
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="w-full px-4 py-2 rounded-lg bg-input border border-border/50 text-foreground appearance-none cursor-pointer"
              >
                <option value="all">All Employees</option>
                <option value="ACTIVE">Active Only</option>
                <option value="INACTIVE">Inactive Only</option>
              </select>
              <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 pointer-events-none text-muted-foreground" />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Employees Table */}
      <Card className="bg-card border-border/50">
        <CardHeader>
          <CardTitle>Employees ({filteredEmployees.length})</CardTitle>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="text-center py-8 text-muted-foreground">Loading...</div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border/30">
                    <th className="text-left py-3 px-4 text-sm font-semibold text-muted-foreground">Code</th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-muted-foreground">Name</th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-muted-foreground">Role</th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-muted-foreground">Manager</th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-muted-foreground">Gross Salary</th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-muted-foreground">PF</th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-muted-foreground">Status</th>
                    <th className="text-right py-3 px-4 text-sm font-semibold text-muted-foreground">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredEmployees.map((emp) => (
                    <tr key={emp.id} className="border-b border-border/20 hover:bg-secondary/30 transition-colors">
                      <td className="py-3 px-4 text-sm font-medium text-foreground">{emp.code}</td>
                      <td className="py-3 px-4">
                        <div>
                          <p className="text-sm font-medium text-foreground">{emp.name}</p>
                          <p className="text-xs text-muted-foreground">{emp.email}</p>
                        </div>
                      </td>
                      <td className="py-3 px-4 text-sm text-muted-foreground">{emp.role}</td>
                      <td className="py-3 px-4 text-sm text-muted-foreground">{emp.manager}</td>
                      <td className="py-3 px-4 text-sm font-medium text-foreground">
                        ₹{calculateGrossSalary(emp.salaryStructure).toLocaleString()}
                      </td>
                      <td className="py-3 px-4">
                        <span
                          className={`px-2 py-1 rounded text-xs font-medium ${emp.pfEligible ? "bg-green-400/10 text-green-400" : "bg-gray-400/10 text-gray-400"}`}
                        >
                          {emp.pfEligible ? "Yes" : "No"}
                        </span>
                      </td>
                      <td className="py-3 px-4">
                        <span
                          className={`px-2 py-1 rounded text-xs font-medium ${emp.status === "ACTIVE" ? "bg-green-400/10 text-green-400" : "bg-red-400/10 text-red-400"}`}
                        >
                          {emp.status}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-right">
                        <Button
                          onClick={() => handleOpenModal(emp)}
                          variant="ghost"
                          size="sm"
                          className="text-primary hover:bg-primary/10"
                        >
                          Edit
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Add/Edit Employee Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 overflow-y-auto">
          <Card className="bg-card border-border w-full max-w-4xl my-8">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>{editingId ? "Edit Employee" : "Add New Employee"}</CardTitle>
              <button onClick={() => setShowModal(false)} className="text-muted-foreground hover:text-foreground">
                <X className="w-5 h-5" />
              </button>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Basic Information Section */}
              <div className="space-y-4">
                <h3 className="text-sm font-semibold text-foreground">Basic Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Employee Code</label>
                    <Input
                      placeholder="EMP###"
                      value={formData.code}
                      onChange={(e) => handleInputChange("code", e.target.value)}
                      className="bg-input border-border/50"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Full Name</label>
                    <Input
                      placeholder="Enter full name"
                      value={formData.name}
                      onChange={(e) => handleInputChange("name", e.target.value)}
                      className="bg-input border-border/50"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Email</label>
                    <Input
                      type="email"
                      placeholder="email@company.com"
                      value={formData.email}
                      onChange={(e) => handleInputChange("email", e.target.value)}
                      className="bg-input border-border/50"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Role</label>
                    <Input
                      placeholder="Job Title"
                      value={formData.role}
                      onChange={(e) => handleInputChange("role", e.target.value)}
                      className="bg-input border-border/50"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Manager</label>
                    <Input
                      placeholder="Manager name"
                      value={formData.manager}
                      onChange={(e) => handleInputChange("manager", e.target.value)}
                      className="bg-input border-border/50"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Biometric ID</label>
                    <Input
                      placeholder="BIO-####"
                      value={formData.biometricId}
                      onChange={(e) => handleInputChange("biometricId", e.target.value)}
                      className="bg-input border-border/50"
                    />
                  </div>
                </div>
              </div>

              {/* Salary Structure Section */}
              <div className="space-y-4 pt-4 border-t border-border/30">
                <h3 className="text-sm font-semibold text-foreground">Salary Structure</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Basic Salary</label>
                    <Input
                      type="number"
                      placeholder="₹0"
                      value={formData.salaryStructure.basic || ""}
                      onChange={(e) => handleSalaryStructureChange("basic", Number.parseFloat(e.target.value) || 0)}
                      className="bg-input border-border/50"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">DA (Dearness Allowance)</label>
                    <Input
                      type="number"
                      placeholder="₹0"
                      value={formData.salaryStructure.da || ""}
                      onChange={(e) => handleSalaryStructureChange("da", Number.parseFloat(e.target.value) || 0)}
                      className="bg-input border-border/50"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">HRA (House Rent)</label>
                    <Input
                      type="number"
                      placeholder="₹0"
                      value={formData.salaryStructure.hra || ""}
                      onChange={(e) => handleSalaryStructureChange("hra", Number.parseFloat(e.target.value) || 0)}
                      className="bg-input border-border/50"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">TA (Travel Allowance)</label>
                    <Input
                      type="number"
                      placeholder="₹0"
                      value={formData.salaryStructure.ta || ""}
                      onChange={(e) => handleSalaryStructureChange("ta", Number.parseFloat(e.target.value) || 0)}
                      className="bg-input border-border/50"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Other Allowance</label>
                    <Input
                      type="number"
                      placeholder="₹0"
                      value={formData.salaryStructure.otherAllowance || ""}
                      onChange={(e) =>
                        handleSalaryStructureChange("otherAllowance", Number.parseFloat(e.target.value) || 0)
                      }
                      className="bg-input border-border/50"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Gross Salary</label>
                    <div className="px-4 py-2 rounded-lg bg-secondary/30 border border-border/50 text-sm font-semibold text-primary">
                      ₹{calculateGrossSalary(formData.salaryStructure).toLocaleString()}
                    </div>
                  </div>
                </div>
              </div>

              {/* Additional Details Section */}
              <div className="space-y-4 pt-4 border-t border-border/30">
                <h3 className="text-sm font-semibold text-foreground">Additional Details</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      id="pfEligible"
                      checked={formData.pfEligible}
                      onChange={(e) => handleInputChange("pfEligible", e.target.checked)}
                      className="w-4 h-4 rounded border-border/50 cursor-pointer"
                    />
                    <label htmlFor="pfEligible" className="text-sm font-medium text-foreground cursor-pointer">
                      PF Eligible
                    </label>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Status</label>
                    <select
                      value={formData.status}
                      onChange={(e) => handleInputChange("status", e.target.value)}
                      className="w-full px-3 py-2 rounded-lg bg-input border border-border/50 text-foreground appearance-none cursor-pointer"
                    >
                      <option value="ACTIVE">Active</option>
                      <option value="INACTIVE">Inactive</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3 pt-4 border-t border-border/30">
                <Button
                  onClick={() => setShowModal(false)}
                  variant="outline"
                  className="flex-1 border-border text-muted-foreground hover:bg-secondary/30"
                >
                  Cancel
                </Button>
                <Button
                  onClick={handleSaveEmployee}
                  className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground"
                >
                  Save
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}
