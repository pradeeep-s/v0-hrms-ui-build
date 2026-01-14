import { type NextRequest, NextResponse } from "next/server"
import { query } from "@/lib/db"
import { decode } from "jwt-simple"

const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key"

export async function GET(request: NextRequest) {
  try {
    const token = request.cookies.get("auth_token")?.value

    if (!token) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 })
    }

    let decoded
    try {
      decoded = decode(token, JWT_SECRET)
    } catch (error) {
      return NextResponse.json({ error: "Invalid token" }, { status: 401 })
    }

    // Get user with company info
    const result = await query("SELECT id, email, name, role, company_id FROM users WHERE id = $1", [decoded.id])

    if (result.rows.length === 0) {
      return NextResponse.json({ error: "User not found" }, { status: 404 })
    }

    const user = result.rows[0]

    const companyResult = await query("SELECT id, name FROM companies WHERE id = $1", [user.company_id])

    const company = companyResult.rows[0] || null

    return NextResponse.json({
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
        company_id: user.company_id,
      },
      company: {
        id: company?.id,
        name: company?.name,
      },
    })
  } catch (error) {
    console.error("[AUTH ME ERROR]", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
