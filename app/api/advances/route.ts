import { query } from "@/lib/db"
import { type NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest) {
  try {
    const employeeId = request.nextUrl.searchParams.get("employeeId")

    let sql = "SELECT * FROM advances"
    const params: (string | undefined)[] = []

    if (employeeId) {
      sql += " WHERE employee_id = $1"
      params.push(employeeId)
    }

    sql += " ORDER BY applied_date DESC"

    const result = await query(sql, params)

    const advances = result.rows.map((row) => ({
      id: row.id,
      employeeId: row.employee_id,
      amount: Number(row.amount),
      remainingBalance: Number(row.remaining_balance),
      monthlyDeduction: Number(row.monthly_deduction),
      status: row.status,
      appliedDate: row.applied_date,
    }))

    return NextResponse.json(advances)
  } catch (error) {
    console.error("[v0] Get advances error:", error)
    return NextResponse.json({ error: "Failed to fetch advances" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const { employeeId, amount, monthlyDeduction } = await request.json()

    const result = await query(
      `INSERT INTO advances (employee_id, amount, remaining_balance, monthly_deduction, status)
       VALUES ($1, $2, $3, $4, 'ACTIVE')
       RETURNING id`,
      [employeeId, amount, amount, monthlyDeduction],
    )

    return NextResponse.json({ id: result.rows[0].id }, { status: 201 })
  } catch (error) {
    console.error("[v0] Create advance error:", error)
    return NextResponse.json({ error: "Failed to create advance" }, { status: 500 })
  }
}
