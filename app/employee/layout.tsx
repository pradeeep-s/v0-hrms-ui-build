import type React from "react"
import { EmployeeLayout } from "@/components/employee-layout"

export default function Layout({ children }: { children: React.ReactNode }) {
  return <EmployeeLayout>{children}</EmployeeLayout>
}
