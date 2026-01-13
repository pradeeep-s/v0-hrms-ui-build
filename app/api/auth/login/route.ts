import { query } from "@/lib/db"
import { type NextRequest, NextResponse } from "next/server"
import { verifyPassword } from "@/lib/password"

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json()

    if (!email || !password) {
      return NextResponse.json({ error: "Email and password required" }, { status: 400 })
    }

    const result = await query(
      "SELECT id, email, name, role, manager_id, employee_code, password_hash FROM users WHERE email = $1",
      [email],
    )

    if (result.rows.length === 0) {
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 })
    }

    const user = result.rows[0]

    if (!user.password_hash) {
      return NextResponse.json({ error: "User account not properly configured" }, { status: 401 })
    }

    const isPasswordValid = await verifyPassword(password, user.password_hash)

    if (!isPasswordValid) {
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
