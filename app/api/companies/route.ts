import { type NextRequest, NextResponse } from "next/server"
import { query } from "@/lib/db"

// GET all companies (SUPER_ADMIN only)
export async function GET(request: NextRequest) {
  try {
    const authToken = request.cookies.get("auth_token")?.value
    if (!authToken) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const decoded = JSON.parse(Buffer.from(authToken, "base64").toString())

    // Verify SUPER_ADMIN role
    const userResult = await query("SELECT role FROM users WHERE id = $1", [decoded.id])
    if (userResult.rows.length === 0 || userResult.rows[0].role !== "SUPER_ADMIN") {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 })
    }

    const result = await query("SELECT * FROM companies ORDER BY created_at DESC")
    return NextResponse.json(result.rows)
  } catch (error) {
    console.error("[GET COMPANIES ERROR]", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

// POST - Create new company (SUPER_ADMIN only)
export async function POST(request: NextRequest) {
  try {
    const authToken = request.cookies.get("auth_token")?.value
    if (!authToken) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const decoded = JSON.parse(Buffer.from(authToken, "base64").toString())
    const userResult = await query("SELECT role FROM users WHERE id = $1", [decoded.id])
    if (userResult.rows.length === 0 || userResult.rows[0].role !== "SUPER_ADMIN") {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 })
    }

    const { name, email, phone, address, city, state, pincode, pan_number, gst_number, established_date } =
      await request.json()

    const result = await query(
      `INSERT INTO companies (name, email, phone, address, city, state, pincode, pan_number, gst_number, established_date, status)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, 'ACTIVE')
       RETURNING *`,
      [name, email, phone, address, city, state, pincode, pan_number, gst_number, established_date],
    )

    return NextResponse.json(result.rows[0], { status: 201 })
  } catch (error) {
    console.error("[CREATE COMPANY ERROR]", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
