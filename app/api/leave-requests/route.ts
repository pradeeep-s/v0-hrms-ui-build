import { query } from "@/lib/db"
import { type NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest) {
  try {
    const status = request.nextUrl.searchParams.get("status")

    let sql = `
      SELECT 
        lr.id, lr.employee_id, e.code, e.name, lr.leave_type, lr.start_date, lr.end_date,
        lr.days, lr.reason, lr.status, lr.applied_date, lr.manager_approval_date, lr.hr_approval_date
      FROM leave_requests lr
      JOIN employees e ON lr.employee_id = e.id
    `

    const params: (string | undefined)[] = []

    if (status) {
      sql += " WHERE lr.status = $1"
      params.push(status)
    }

    sql += " ORDER BY lr.applied_date DESC"

    const result = await query(sql, params)

    const leaves = result.rows.map((row) => ({
      id: row.id,
      employeeCode: row.code,
      employeeName: row.name,
      type: row.leave_type,
      startDate: row.start_date,
      endDate: row.end_date,
      days: row.days,
      reason: row.reason,
      status: row.status,
      appliedDate: row.applied_date,
      managerApprovedDate: row.manager_approval_date,
      hrApprovedDate: row.hr_approval_date,
    }))

    return NextResponse.json(leaves)
  } catch (error) {
    console.error("[v0] Get leave requests error:", error)
    return NextResponse.json({ error: "Failed to fetch leave requests" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const { employeeId, leaveType, startDate, endDate, days, reason } = await request.json()

    const result = await query(
      `INSERT INTO leave_requests (employee_id, leave_type, start_date, end_date, days, reason, status)
       VALUES ($1, $2, $3, $4, $5, $6, 'APPLIED')
       RETURNING id`,
      [employeeId, leaveType, startDate, endDate, days, reason],
    )

    return NextResponse.json({ id: result.rows[0].id }, { status: 201 })
  } catch (error) {
    console.error("[v0] Create leave request error:", error)
    return NextResponse.json({ error: "Failed to create leave request" }, { status: 500 })
  }
}
