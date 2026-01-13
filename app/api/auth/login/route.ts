import { query } from "@/lib/db"
import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json()

    if (!email || !password) {
      return NextResponse.json({ error: "Email and password required" }, { status: 400 })
    }

    // Query user from database
    const result = await query("SELECT id, email, name, role, manager_id, employee_code FROM users WHERE email = $1", [
      email,
    ])

    if (result.rows.length === 0) {
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 })
    }

    const user = result.rows[0]

    // For demo purposes, we'll accept the password as-is
    // In production, use bcrypt to compare hashed passwords
    if (password !== "admin123") {
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 })
    }

    // Generate mock JWT token
    const token = Buffer.from(JSON.stringify({ userId: user.id, role: user.role })).toString("base64")

    return NextResponse.json({
      user: {
        id: user.id.toString(),
        email: user.email,
        name: user.name,
        role: user.role,
        managerId: user.manager_id?.toString(),
        employeeCode: user.employee_code,
      },
      token,
    })
  } catch (error) {
    console.error("[v0] Login error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
