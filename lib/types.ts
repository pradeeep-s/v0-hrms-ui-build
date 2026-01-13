// User roles and types
export type UserRole = "SUPER_ADMIN" | "ADMIN" | "MANAGER" | "EMPLOYEE"

export interface User {
  id: string
  email: string
  name: string
  role: UserRole
  managerId?: string
  departmentId?: string
  employeeCode?: string
}

export interface AuthContext {
  user: User | null
  token: string | null
  loading: boolean
  login: (email: string, password: string) => Promise<void>
  logout: () => void
}

export interface Employee {
  id: string
  code: string
  name: string
  email: string
  role: string
  managerId: string
  managerName: string
  salary: number
  pfEligible: boolean
  biometricId: string
  status: "ACTIVE" | "INACTIVE" | "RESIGNED"
  department: string
  joinDate: string
}

export interface AttendanceRecord {
  id: string
  employeeId: string
  date: string
  checkIn: string | null
  checkOut: string | null
  status: "PRESENT" | "HALF" | "ABSENT" | "LEAVE"
  remarks?: string
}

export interface LeaveRequest {
  id: string
  employeeId: string
  employeeName: string
  type: "CASUAL" | "SICK" | "EARNED" | "MATERNITY"
  startDate: string
  endDate: string
  days: number
  reason: string
  status: "APPLIED" | "MANAGER_APPROVED" | "HR_APPROVED" | "REJECTED"
  appliedDate: string
  managerApprovedDate?: string
  hrApprovedDate?: string
}

export interface Advance {
  id: string
  employeeId: string
  amount: number
  appliedDate: string
  approvedDate?: string
  status: "PENDING" | "APPROVED" | "CLOSED"
  recoveryStartMonth: string
  recoveryAmount: number
  balanceAmount: number
}

export interface Loan {
  id: string
  employeeId: string
  amount: number
  emi: number
  tenure: number
  emisPaid: number
  status: "ACTIVE" | "CLOSED"
  startDate: string
}

export interface Payroll {
  id: string
  employeeId: string
  month: string
  gross: number
  pf: number
  advance: number
  loanEmi: number
  totalDeduction: number
  netPay: number
  status: "DRAFT" | "LOCKED"
  lockDate?: string
}
