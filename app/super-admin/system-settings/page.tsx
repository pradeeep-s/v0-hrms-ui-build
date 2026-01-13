"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useState } from "react"

export default function SystemSettingsPage() {
  const [settings, setSettings] = useState({
    companyName: "Acme Corporation",
    companyEmail: "admin@acmecorp.com",
    timezone: "Asia/Kolkata",
    attendanceThreshold: "9:00 AM",
    overtimeMultiplier: "1.5x",
    punchBufferMinutes: "5",
  })

  const [saved, setSaved] = useState(false)

  const handleSave = () => {
    setSaved(true)
    setTimeout(() => setSaved(false), 3000)
  }

  const sections = [
    {
      title: "Company Information",
      fields: [
        { label: "Company Name", key: "companyName" },
        { label: "Company Email", key: "companyEmail" },
      ],
    },
    {
      title: "Attendance Configuration",
      fields: [
        { label: "Default Timezone", key: "timezone" },
        { label: "Office Start Time", key: "attendanceThreshold" },
        { label: "Punch Buffer (Minutes)", key: "punchBufferMinutes" },
      ],
    },
    {
      title: "Payroll Configuration",
      fields: [{ label: "Overtime Multiplier", key: "overtimeMultiplier" }],
    },
  ]

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-4xl font-bold text-foreground">System Settings</h1>
        <p className="text-muted-foreground mt-2">Configure company-wide HRMS settings</p>
      </div>

      {/* Success Message */}
      {saved && (
        <div className="p-4 rounded-lg bg-green-400/10 border border-green-400/30 text-green-400 text-sm">
          Settings saved successfully!
        </div>
      )}

      {/* Settings Sections */}
      <div className="space-y-6">
        {sections.map((section, idx) => (
          <Card key={idx} className="bg-card border-border/50">
            <CardHeader>
              <CardTitle className="text-lg">{section.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {section.fields.map((field) => (
                  <div key={field.key} className="space-y-2">
                    <label className="block text-sm font-medium text-foreground">{field.label}</label>
                    <Input
                      value={settings[field.key as keyof typeof settings]}
                      onChange={(e) => setSettings({ ...settings, [field.key]: e.target.value })}
                      className="bg-input border-border/50"
                    />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Audit & Security */}
      <Card className="bg-card border-border/50">
        <CardHeader>
          <CardTitle className="text-lg">Audit & Security</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between p-4 rounded-lg bg-secondary/20 border border-border/30">
            <div>
              <p className="font-medium text-foreground">Two-Factor Authentication</p>
              <p className="text-sm text-muted-foreground">Enforce 2FA for all admin users</p>
            </div>
            <Button variant="outline" className="border-border bg-transparent">
              Enable
            </Button>
          </div>
          <div className="flex items-center justify-between p-4 rounded-lg bg-secondary/20 border border-border/30">
            <div>
              <p className="font-medium text-foreground">Audit Logging</p>
              <p className="text-sm text-muted-foreground">All changes are logged and timestamped</p>
            </div>
            <div className="px-3 py-1 rounded-full bg-green-400/10 text-green-400 text-xs font-medium">Active</div>
          </div>
          <div className="flex items-center justify-between p-4 rounded-lg bg-secondary/20 border border-border/30">
            <div>
              <p className="font-medium text-foreground">API Key Rotation</p>
              <p className="text-sm text-muted-foreground">Last rotated 30 days ago</p>
            </div>
            <Button variant="outline" className="border-border bg-transparent">
              Rotate Now
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Save Button */}
      <div className="flex justify-end">
        <Button onClick={handleSave} className="bg-primary hover:bg-primary/90 text-primary-foreground">
          Save Settings
        </Button>
      </div>
    </div>
  )
}
