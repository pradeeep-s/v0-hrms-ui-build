import { type NextRequest, NextResponse } from "next/server"
import { query } from "@/lib/db"
import { verifyPassword } from "@/lib/password"
import { sign } from "jwt-simple"

const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key"

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json()

    if (!email || !password) {
      return NextResponse.json({ error: "Email and password required" }, { status: 400 })
    }

    const result = await query(
      `
      SELECT id, email, name, role, password_hash, company_id
      FROM users
      WHERE email = $1
      `,
      [email],
    )

    if (result.rows.length === 0) {
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 })
    }

    const user = result.rows[0]

    const companyResult = await query(`SELECT id, name, status FROM companies WHERE id = $1`, [user.company_id])

    if (companyResult.rows.length === 0 || companyResult.rows[0].status !== "ACTIVE") {
      return NextResponse.json({ error: "Company is not active" }, { status: 403 })
    }

    const company = companyResult.rows[0]

    // Verify password
    const valid = await verifyPassword(password, user.password_hash)
    if (!valid) {
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 })
    }

    const token = sign(
      {
        id: user.id,
        email: user.email,
        role: user.role,
        company_id: user.company_id,
      },
      JWT_SECRET,
    )

    const response = NextResponse.json({
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
        company_id: user.company_id,
      },
      company: {
        id: company.id,
        name: company.name,
      },
    })

    // Set secure HTTP-only cookie
    response.cookies.set("auth_token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 7 * 24 * 60 * 60, // 7 days
    })

    return response
  } catch (error) {
    console.error("[LOGIN ERROR]", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
