"use client"

import { createContext, useContext, useState, type ReactNode } from "react"

interface Company {
  id: number
  name: string
  email: string
  phone?: string
  address?: string
  city?: string
  state?: string
  status: string
}

interface CompanyContextType {
  company: Company | null
  setCompany: (company: Company | null) => void
}

const CompanyContext = createContext<CompanyContextType | undefined>(undefined)

export function CompanyProvider({ children }: { children: ReactNode }) {
  const [company, setCompany] = useState<Company | null>(null)

  return <CompanyContext.Provider value={{ company, setCompany }}>{children}</CompanyContext.Provider>
}

export function useCompany() {
  const context = useContext(CompanyContext)
  if (context === undefined) {
    throw new Error("useCompany must be used within a CompanyProvider")
  }
  return context
}
