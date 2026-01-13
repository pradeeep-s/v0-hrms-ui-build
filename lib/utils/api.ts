async function apiCall<T>(url: string, method = "GET", body?: Record<string, any>): Promise<T> {
  const options: RequestInit = {
    method,
    headers: {
      "Content-Type": "application/json",
    },
  }

  if (body) {
    options.body = JSON.stringify(body)
  }

  const response = await fetch(url, options)

  if (!response.ok) {
    const error = await response.json()
    throw new Error(error.error || "API request failed")
  }

  return response.json()
}

export const api = {
  // Employees
  getEmployees: () => apiCall("/api/employees"),
  getEmployee: (id: string) => apiCall(`/api/employees/${id}`),
  createEmployee: (data: Record<string, any>) => apiCall("/api/employees", "POST", data),
  updateEmployee: (id: string, data: Record<string, any>) => apiCall(`/api/employees/${id}`, "PUT", data),

  // Attendance
  getAttendance: (date?: string) => apiCall(`/api/attendance${date ? `?date=${date}` : ""}`),
  recordAttendance: (data: Record<string, any>) => apiCall("/api/attendance", "POST", data),

  // Leave
  getLeaveRequests: (status?: string) => apiCall(`/api/leave-requests${status ? `?status=${status}` : ""}`),
  createLeaveRequest: (data: Record<string, any>) => apiCall("/api/leave-requests", "POST", data),
  approveLeave: (id: string, role: string) =>
    apiCall(`/api/leave-requests/${id}/approve`, "PUT", { approverRole: role }),
  rejectLeave: (id: string, reason: string) => apiCall(`/api/leave-requests/${id}/reject`, "PUT", { reason }),

  // Advances
  getAdvances: (employeeId?: string) => apiCall(`/api/advances${employeeId ? `?employeeId=${employeeId}` : ""}`),
  createAdvance: (data: Record<string, any>) => apiCall("/api/advances", "POST", data),

  // Loans
  getLoans: () => apiCall("/api/loans"),
  createLoan: (data: Record<string, any>) => apiCall("/api/loans", "POST", data),

  // Payroll
  getPayroll: (month: string) => apiCall(`/api/payroll?month=${month}`),
  lockPayroll: (id: string) => apiCall(`/api/payroll/${id}/lock`, "PUT"),

  // System Settings
  getSystemSettings: () => apiCall("/api/system-settings"),
  updateSystemSettings: (data: Record<string, any>) => apiCall("/api/system-settings", "POST", data),

  // Biometric Devices
  getBiometricDevices: () => apiCall("/api/biometric-devices"),
  createBiometricDevice: (data: Record<string, any>) => apiCall("/api/biometric-devices", "POST", data),
}
