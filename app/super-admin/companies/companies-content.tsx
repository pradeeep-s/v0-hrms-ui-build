"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useState, useEffect } from "react"
import { Plus, Search, ChevronDown, X, Building2, Mail, Phone } from "lucide-react"

interface Company {
  id: number
  name: string
  email: string
  phone?: string
  address?: string
  city?: string
  state?: string
  pan_number?: string
  gst_number?: string
  status: string
  created_at: string
}

export default function CompaniesContent() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [showModal, setShowModal] = useState(false)
  const [editingId, setEditingId] = useState<number | null>(null)
  const [loading, setLoading] = useState(false)
  const [companies, setCompanies] = useState<Company[]>([])

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
    pan_number: "",
    gst_number: "",
    established_date: "",
    status: "ACTIVE",
  })

  useEffect(() => {
    fetchCompanies()
  }, [])

  const fetchCompanies = async () => {
    try {
      setLoading(true)
      const res = await fetch("/api/companies", {
        credentials: "include",
      })
      if (res.ok) {
        const data = await res.json()
        setCompanies(data)
      }
    } catch (error) {
      console.error("[v0] Failed to fetch companies:", error)
    } finally {
      setLoading(false)
    }
  }

  const filteredCompanies = companies.filter((company) => {
    const matchesSearch =
      company.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      company.email.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesStatus = statusFilter === "all" || company.status === statusFilter

    return matchesSearch && matchesStatus
  })

  const handleOpenModal = (company?: Company) => {
    if (company) {
      setFormData({
        name: company.name,
        email: company.email,
        phone: company.phone || "",
        address: company.address || "",
        city: company.city || "",
        state: company.state || "",
        pincode: "",
        pan_number: company.pan_number || "",
        gst_number: company.gst_number || "",
        established_date: "",
        status: company.status,
      })
      setEditingId(company.id)
    } else {
      setFormData({
        name: "",
        email: "",
        phone: "",
        address: "",
        city: "",
        state: "",
        pincode: "",
        pan_number: "",
        gst_number: "",
        established_date: "",
        status: "ACTIVE",
      })
      setEditingId(null)
    }
    setShowModal(true)
  }

  const handleSaveCompany = async () => {
    try {
      const url = editingId ? `/api/companies/${editingId}` : "/api/companies"
      const method = editingId ? "PUT" : "POST"

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
        credentials: "include",
      })

      if (res.ok) {
        setShowModal(false)
        await fetchCompanies()
      } else {
        console.error("[v0] Failed to save company")
      }
    } catch (error) {
      console.error("[v0] Error saving company:", error)
    }
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold text-foreground flex items-center gap-3">
            <Building2 className="w-10 h-10 text-primary" />
            Companies Management
          </h1>
          <p className="text-muted-foreground mt-2">Manage all companies in the system</p>
        </div>
        <Button
          onClick={() => handleOpenModal()}
          className="bg-primary hover:bg-primary/90 text-primary-foreground gap-2"
        >
          <Plus className="w-4 h-4" />
          Add Company
        </Button>
      </div>

      {/* Filters */}
      <Card className="bg-card border-border/50">
        <CardContent className="pt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search by company name or email..."
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
                <option value="all">All Companies</option>
                <option value="ACTIVE">Active Only</option>
                <option value="INACTIVE">Inactive Only</option>
                <option value="SUSPENDED">Suspended</option>
              </select>
              <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 pointer-events-none text-muted-foreground" />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Companies Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {loading ? (
          <div className="col-span-full text-center py-8 text-muted-foreground">Loading...</div>
        ) : filteredCompanies.length > 0 ? (
          filteredCompanies.map((company) => (
            <Card key={company.id} className="bg-card border-border/50 hover:border-primary/30 transition-colors">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <CardTitle className="text-lg">{company.name}</CardTitle>
                    <p className="text-xs text-muted-foreground mt-1">
                      {new Date(company.created_at).toLocaleDateString()}
                    </p>
                  </div>
                  <span
                    className={`px-2 py-1 rounded text-xs font-medium ${
                      company.status === "ACTIVE"
                        ? "bg-green-400/10 text-green-400"
                        : company.status === "INACTIVE"
                          ? "bg-gray-400/10 text-gray-400"
                          : "bg-red-400/10 text-red-400"
                    }`}
                  >
                    {company.status}
                  </span>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center gap-2 text-sm">
                  <Mail className="w-4 h-4 text-muted-foreground" />
                  <span className="text-muted-foreground">{company.email}</span>
                </div>
                {company.phone && (
                  <div className="flex items-center gap-2 text-sm">
                    <Phone className="w-4 h-4 text-muted-foreground" />
                    <span className="text-muted-foreground">{company.phone}</span>
                  </div>
                )}
                {company.city && (
                  <p className="text-sm text-muted-foreground">
                    {company.city}
                    {company.state && `, ${company.state}`}
                  </p>
                )}
                {(company.pan_number || company.gst_number) && (
                  <div className="text-xs text-muted-foreground space-y-1 pt-2 border-t border-border/30">
                    {company.pan_number && <p>PAN: {company.pan_number}</p>}
                    {company.gst_number && <p>GST: {company.gst_number}</p>}
                  </div>
                )}
                <Button
                  onClick={() => handleOpenModal(company)}
                  variant="ghost"
                  size="sm"
                  className="w-full mt-4 text-primary hover:bg-primary/10"
                >
                  Edit
                </Button>
              </CardContent>
            </Card>
          ))
        ) : (
          <div className="col-span-full text-center py-8 text-muted-foreground">No companies found</div>
        )}
      </div>

      {/* Add/Edit Company Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 overflow-y-auto">
          <Card className="bg-card border-border w-full max-w-2xl my-8">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>{editingId ? "Edit Company" : "Add New Company"}</CardTitle>
              <button onClick={() => setShowModal(false)} className="text-muted-foreground hover:text-foreground">
                <X className="w-5 h-5" />
              </button>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Company Name *</label>
                  <Input
                    placeholder="Enter company name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="bg-input border-border/50"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Email *</label>
                  <Input
                    type="email"
                    placeholder="company@email.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="bg-input border-border/50"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Phone</label>
                  <Input
                    placeholder="+91-XXXXXXXXXX"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="bg-input border-border/50"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">City</label>
                  <Input
                    placeholder="City"
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    className="bg-input border-border/50"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">State</label>
                  <Input
                    placeholder="State"
                    value={formData.state}
                    onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                    className="bg-input border-border/50"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Pincode</label>
                  <Input
                    placeholder="XXXXXX"
                    value={formData.pincode}
                    onChange={(e) => setFormData({ ...formData, pincode: e.target.value })}
                    className="bg-input border-border/50"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">PAN Number</label>
                  <Input
                    placeholder="XXXXXXXXXX"
                    value={formData.pan_number}
                    onChange={(e) => setFormData({ ...formData, pan_number: e.target.value })}
                    className="bg-input border-border/50"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">GST Number</label>
                  <Input
                    placeholder="XXXXXXXXXXXXXXXXXXXX"
                    value={formData.gst_number}
                    onChange={(e) => setFormData({ ...formData, gst_number: e.target.value })}
                    className="bg-input border-border/50"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-foreground mb-2">Address</label>
                  <Input
                    placeholder="Full address"
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    className="bg-input border-border/50"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Status</label>
                  <select
                    value={formData.status}
                    onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg bg-input border border-border/50 text-foreground appearance-none cursor-pointer"
                  >
                    <option value="ACTIVE">Active</option>
                    <option value="INACTIVE">Inactive</option>
                    <option value="SUSPENDED">Suspended</option>
                  </select>
                </div>
              </div>

              <div className="flex gap-3 pt-4 border-t border-border/30">
                <Button
                  onClick={() => setShowModal(false)}
                  variant="outline"
                  className="flex-1 border-border text-muted-foreground hover:bg-secondary/30"
                >
                  Cancel
                </Button>
                <Button
                  onClick={handleSaveCompany}
                  className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground"
                >
                  Save Company
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}
