import type { NextRequest } from "next/server"
import { query } from "@/lib/db"
import { jwtDecode } from "jwt-simple"

const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key"

export async function validateCompanyAccess(request: NextRequest, requiredRole?: string) {
  try {
    const authHeader = request.headers.get("authorization")
    if (!authHeader?.startsWith("Bearer ")) {
      return { error: "Unauthorized", status: 401 }
    }

    const token = authHeader.substring(7)
    const decoded = jwtDecode(token, JWT_SECRET, true)

    // Fetch user with company_id
    const result = await query(`SELECT id, role, company_id FROM users WHERE id = $1`, [decoded.id])

    if (result.rows.length === 0) {
      return { error: "User not found", status: 401 }
    }

    const user = result.rows[0]

    if (requiredRole && user.role !== requiredRole) {
      return { error: "Insufficient permissions", status: 403 }
    }

    return { user, company_id: user.company_id }
  } catch (error) {
    console.error("[MIDDLEWARE ERROR]", error)
    return { error: "Invalid token", status: 401 }
  }
}

// Helper to ensure company_id in query params matches user's company
export async function checkCompanyMatch(userCompanyId: number, requestedCompanyId: number) {
  if (userCompanyId !== requestedCompanyId) {
    return { error: "Access denied to this company", status: 403 }
  }
  return { valid: true }
}
