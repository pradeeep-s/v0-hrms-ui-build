import type { User, UserRole } from "./types"

// Mock user database
const mockUsers: Record<string, { password: string; user: User }> = {
  "super@admin.com": {
    password: "admin123",
    user: {
      id: "u1",
      email: "super@admin.com",
      name: "Super Admin",
      role: "SUPER_ADMIN",
    },
  },
  "hr@company.com": {
    password: "admin123",
    user: {
      id: "u2",
      email: "hr@company.com",
      name: "HR Manager",
      role: "ADMIN",
    },
  },
  "manager@company.com": {
    password: "admin123",
    user: {
      id: "u3",
      email: "manager@company.com",
      name: "Team Manager",
      role: "MANAGER",
      managerId: "u2",
    },
  },
  "emp@company.com": {
    password: "admin123",
    user: {
      id: "u4",
      email: "emp@company.com",
      name: "John Employee",
      role: "EMPLOYEE",
      managerId: "u3",
      employeeCode: "EMP001",
    },
  },
}

export function validateCredentials(
  email: string,
  password: string,
): { success: boolean; user?: User; token?: string } {
  const userRecord = mockUsers[email]

  if (!userRecord) {
    return { success: false }
  }

  if (userRecord.password !== password) {
    return { success: false }
  }

  // Mock JWT token
  const token = Buffer.from(JSON.stringify({ userId: userRecord.user.id, role: userRecord.user.role })).toString(
    "base64",
  )

  return {
    success: true,
    user: userRecord.user,
    token,
  }
}

export function decodeToken(token: string): { userId: string; role: UserRole } | null {
  try {
    const decoded = JSON.parse(Buffer.from(token, "base64").toString())
    return decoded
  } catch {
    return null
  }
}

export function getRoleRedirectUrl(role: UserRole): string {
  const redirects: Record<UserRole, string> = {
    SUPER_ADMIN: "/super-admin/dashboard",
    ADMIN: "/admin/dashboard",
    MANAGER: "/manager/dashboard",
    EMPLOYEE: "/employee/dashboard",
  }
  return redirects[role]
}
