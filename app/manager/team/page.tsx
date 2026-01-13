"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { useState } from "react"
import { Calendar } from "lucide-react"

export default function TeamPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedDate, setSelectedDate] = useState("2024-01-13")

  const team = [
    {
      id: 1,
      code: "EMP101",
      name: "Vikram Patel",
      role: "Junior Developer",
      email: "vikram@company.com",
      joinDate: "2022-06-15",
      salary: 480000,
      checkIn: "09:00 AM",
      checkOut: "06:15 PM",
      status: "PRESENT",
    },
    {
      id: 2,
      code: "EMP102",
      name: "Priya Sharma",
      role: "QA Engineer",
      email: "priya.s@company.com",
      joinDate: "2021-09-20",
      salary: 520000,
      checkIn: "09:15 AM",
      checkOut: "06:00 PM",
      status: "PRESENT",
    },
    {
      id: 3,
      code: "EMP103",
      name: "Ananya Singh",
      role: "Frontend Developer",
      email: "ananya@company.com",
      joinDate: "2023-01-10",
      salary: 500000,
      checkIn: "-",
      checkOut: "-",
      status: "HALF",
    },
    {
      id: 4,
      code: "EMP104",
      name: "Deepak Roy",
      role: "Backend Developer",
      email: "deepak@company.com",
      joinDate: "2022-03-05",
      salary: 540000,
      checkIn: "-",
      checkOut: "-",
      status: "ABSENT",
    },
    {
      id: 5,
      code: "EMP105",
      name: "Neha Kapoor",
      role: "UI/UX Designer",
      email: "neha.k@company.com",
      joinDate: "2023-07-01",
      salary: 450000,
      checkIn: "09:30 AM",
      checkOut: "06:30 PM",
      status: "PRESENT",
    },
  ]

  const filteredTeam = team.filter(
    (member) =>
      member.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
      member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      member.email.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const getStatusColor = (status: string) => {
    switch (status) {
      case "PRESENT":
        return "bg-green-400/10 text-green-400"
      case "HALF":
        return "bg-orange-400/10 text-orange-400"
      case "LEAVE":
        return "bg-blue-400/10 text-blue-400"
      case "ABSENT":
        return "bg-red-400/10 text-red-400"
      default:
        return ""
    }
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-4xl font-bold text-foreground">Team Management</h1>
        <p className="text-muted-foreground mt-2">View and manage your team members</p>
      </div>

      {/* Filters */}
      <Card className="bg-card border-border/50">
        <CardContent className="pt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              placeholder="Search by code, name, or email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="bg-input border-border/50"
            />
            <div className="relative">
              <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                className="w-full pl-10 px-4 py-2 rounded-lg bg-input border border-border/50 text-foreground"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Team Table */}
      <Card className="bg-card border-border/50">
        <CardHeader>
          <CardTitle>Team Members ({filteredTeam.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border/30">
                  <th className="text-left py-3 px-4 text-sm font-semibold text-muted-foreground">Code</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-muted-foreground">Name</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-muted-foreground">Role</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-muted-foreground">Check In</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-muted-foreground">Check Out</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-muted-foreground">Status</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-muted-foreground">Salary</th>
                </tr>
              </thead>
              <tbody>
                {filteredTeam.map((member) => (
                  <tr key={member.id} className="border-b border-border/20 hover:bg-secondary/30 transition-colors">
                    <td className="py-3 px-4 text-sm font-medium text-foreground">{member.code}</td>
                    <td className="py-3 px-4">
                      <div>
                        <p className="text-sm font-medium text-foreground">{member.name}</p>
                        <p className="text-xs text-muted-foreground">{member.email}</p>
                      </div>
                    </td>
                    <td className="py-3 px-4 text-sm text-muted-foreground">{member.role}</td>
                    <td className="py-3 px-4 text-sm text-muted-foreground">{member.checkIn}</td>
                    <td className="py-3 px-4 text-sm text-muted-foreground">{member.checkOut}</td>
                    <td className="py-3 px-4">
                      <span className={`px-2 py-1 rounded text-xs font-medium ${getStatusColor(member.status)}`}>
                        {member.status}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-sm font-medium text-foreground">₹{member.salary.toLocaleString()}</td>
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
