import { query } from "@/lib/db"
import { type NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest) {
  try {
    const result = await query(
      `SELECT l.*, e.code, e.name FROM loans l
       JOIN employees e ON l.employee_id = e.id
       ORDER BY l.loan_date DESC`,
    )

    const loans = result.rows.map((row) => ({
      id: row.id,
      employeeCode: row.code,
      employeeName: row.name,
      principal: Number(row.principal),
      emi: Number(row.emi),
      tenure: row.tenure_months,
      remaining: row.remaining_months,
      status: row.status,
    }))

    return NextResponse.json(loans)
  } catch (error) {
    console.error("[v0] Get loans error:", error)
    return NextResponse.json({ error: "Failed to fetch loans" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const { employeeId, principal, emi, tenureMonths } = await request.json()

    const result = await query(
      `INSERT INTO loans (employee_id, principal, emi, tenure_months, remaining_months, status)
       VALUES ($1, $2, $3, $4, $5, 'ACTIVE')
       RETURNING id`,
      [employeeId, principal, emi, tenureMonths, tenureMonths],
    )

    return NextResponse.json({ id: result.rows[0].id }, { status: 201 })
  } catch (error) {
    console.error("[v0] Create loan error:", error)
    return NextResponse.json({ error: "Failed to create loan" }, { status: 500 })
  }
}
