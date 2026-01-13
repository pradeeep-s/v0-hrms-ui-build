"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useState } from "react"
import { Plus, Wifi, WifiOff, ChevronDown } from "lucide-react"

export default function BiometricDevicesPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [filterStatus, setFilterStatus] = useState("all")

  const devices = [
    {
      id: "BIO-001",
      name: "Main Entrance - Ground Floor",
      location: "Building A, Entrance",
      model: "ZKTeco F22",
      status: "active",
      lastSync: "2024-01-13 14:32",
      capacity: "250,000 records",
      employees: "342",
    },
    {
      id: "BIO-002",
      name: "Back Entrance - Ground Floor",
      location: "Building A, Back Gate",
      model: "ZKTeco F22",
      status: "active",
      lastSync: "2024-01-13 14:31",
      capacity: "250,000 records",
      employees: "156",
    },
    {
      id: "BIO-003",
      name: "Parking Gate",
      location: "Parking Lot",
      model: "ZKTeco D5",
      status: "active",
      lastSync: "2024-01-13 14:28",
      capacity: "100,000 records",
      employees: "0",
    },
    {
      id: "BIO-004",
      name: "Floor 2 Checkpoint",
      location: "Building B, Floor 2",
      model: "ZKTeco F22",
      status: "inactive",
      lastSync: "2024-01-10 09:45",
      capacity: "250,000 records",
      employees: "0",
    },
    {
      id: "BIO-005",
      name: "Server Room Access",
      location: "Building C, Security",
      model: "ZKTeco F18",
      status: "active",
      lastSync: "2024-01-13 14:30",
      capacity: "50,000 records",
      employees: "24",
    },
  ]

  const filteredDevices = devices.filter((device) => {
    const matchesSearch =
      device.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      device.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      device.location.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesFilter = filterStatus === "all" || device.status === filterStatus

    return matchesSearch && matchesFilter
  })

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold text-foreground">Biometric Devices</h1>
          <p className="text-muted-foreground mt-2">Manage connected biometric attendance devices</p>
        </div>
        <Button className="bg-primary hover:bg-primary/90 text-primary-foreground gap-2">
          <Plus className="w-4 h-4" />
          Add Device
        </Button>
      </div>

      {/* Filters */}
      <Card className="bg-card border-border/50">
        <CardContent className="pt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Search</label>
              <Input
                placeholder="Search by device ID, name, or location..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="bg-input border-border/50"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Status Filter</label>
              <div className="relative">
                <select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  className="w-full px-4 py-2 rounded-lg bg-input border border-border/50 text-foreground appearance-none cursor-pointer"
                >
                  <option value="all">All Devices</option>
                  <option value="active">Active Only</option>
                  <option value="inactive">Inactive Only</option>
                </select>
                <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 pointer-events-none text-muted-foreground" />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Devices Table */}
      <Card className="bg-card border-border/50">
        <CardHeader>
          <CardTitle>Connected Devices ({filteredDevices.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border/30">
                  <th className="text-left py-3 px-4 text-sm font-semibold text-muted-foreground">Device ID</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-muted-foreground">Name</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-muted-foreground">Location</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-muted-foreground">Status</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-muted-foreground">Last Sync</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-muted-foreground">Employees</th>
                  <th className="text-right py-3 px-4 text-sm font-semibold text-muted-foreground">Action</th>
                </tr>
              </thead>
              <tbody>
                {filteredDevices.map((device) => (
                  <tr key={device.id} className="border-b border-border/20 hover:bg-secondary/30 transition-colors">
                    <td className="py-3 px-4 text-sm font-medium text-foreground">{device.id}</td>
                    <td className="py-3 px-4 text-sm text-foreground">{device.name}</td>
                    <td className="py-3 px-4 text-sm text-muted-foreground">{device.location}</td>
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-2">
                        {device.status === "active" ? (
                          <>
                            <Wifi className="w-4 h-4 text-green-400" />
                            <span className="px-2 py-1 rounded text-xs font-medium bg-green-400/10 text-green-400">
                              Active
                            </span>
                          </>
                        ) : (
                          <>
                            <WifiOff className="w-4 h-4 text-red-400" />
                            <span className="px-2 py-1 rounded text-xs font-medium bg-red-400/10 text-red-400">
                              Inactive
                            </span>
                          </>
                        )}
                      </div>
                    </td>
                    <td className="py-3 px-4 text-sm text-muted-foreground">{device.lastSync}</td>
                    <td className="py-3 px-4 text-sm font-medium text-foreground">{device.employees}</td>
                    <td className="py-3 px-4 text-right">
                      <Button variant="ghost" size="sm" className="text-primary hover:bg-primary/10">
                        Manage
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
