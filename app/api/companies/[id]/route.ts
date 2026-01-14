import { type NextRequest, NextResponse } from "next/server"
import { query } from "@/lib/db"

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const authToken = request.cookies.get("auth_token")?.value
    if (!authToken) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const decoded = JSON.parse(Buffer.from(authToken, "base64").toString())
    const result = await query("SELECT * FROM companies WHERE id = $1", [params.id])

    if (result.rows.length === 0) {
      return NextResponse.json({ error: "Company not found" }, { status: 404 })
    }

    if (decoded.role !== "SUPER_ADMIN") {
      const userCompanyResult = await query("SELECT company_id FROM users WHERE id = $1", [decoded.id])
      if (userCompanyResult.rows[0].company_id !== Number.parseInt(params.id)) {
        return NextResponse.json({ error: "Forbidden" }, { status: 403 })
      }
    }

    return NextResponse.json(result.rows[0])
  } catch (error) {
    console.error("[GET COMPANY ERROR]", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const authToken = request.cookies.get("auth_token")?.value
    if (!authToken) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const decoded = JSON.parse(Buffer.from(authToken, "base64").toString())

    // Only SUPER_ADMIN can update company
    const userResult = await query("SELECT role FROM users WHERE id = $1", [decoded.id])
    if (userResult.rows.length === 0 || userResult.rows[0].role !== "SUPER_ADMIN") {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 })
    }

    const { name, email, phone, address, city, state, pincode, status } = await request.json()

    const result = await query(
      `UPDATE companies 
       SET name = $1, email = $2, phone = $3, address = $4, city = $5, state = $6, pincode = $7, status = $8, updated_at = CURRENT_TIMESTAMP
       WHERE id = $9
       RETURNING *`,
      [name, email, phone, address, city, state, pincode, status, params.id],
    )

    return NextResponse.json(result.rows[0])
  } catch (error) {
    console.error("[UPDATE COMPANY ERROR]", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
