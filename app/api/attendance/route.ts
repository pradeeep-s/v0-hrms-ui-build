import { query } from "@/lib/db"
import { type NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest) {
  try {
    const date = request.nextUrl.searchParams.get("date") || new Date().toISOString().split("T")[0]

    const result = await query(
      `SELECT 
        a.id, a.employee_id, e.code, e.name, a.check_in, a.check_out, a.duration_minutes, a.status
       FROM attendance a
       JOIN employees e ON a.employee_id = e.id
       WHERE a.attendance_date = $1
       ORDER BY e.code`,
      [date],
    )

    const records = result.rows.map((row) => ({
      id: row.id,
      code: row.code,
      name: row.name,
      checkIn: row.check_in ? row.check_in.substring(0, 5) + " AM" : null,
      checkOut: row.check_out ? row.check_out.substring(0, 5) + " PM" : null,
      duration: row.duration_minutes ? `${Math.floor(row.duration_minutes / 60)}h ${row.duration_minutes % 60}m` : "-",
      status: row.status,
    }))

    return NextResponse.json(records)
  } catch (error) {
    console.error("[v0] Get attendance error:", error)
    return NextResponse.json({ error: "Failed to fetch attendance" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const { employeeId, checkIn, checkOut, status } = await request.json()
    const date = new Date().toISOString().split("T")[0]

    await query(
      `INSERT INTO attendance (employee_id, attendance_date, check_in, check_out, status)
       VALUES ($1, $2, $3, $4, $5)
       ON CONFLICT (employee_id, attendance_date) 
       DO UPDATE SET check_in = $3, check_out = $4, status = $5, updated_at = NOW()`,
      [employeeId, date, checkIn, checkOut, status],
    )

    return NextResponse.json({ message: "Attendance recorded" }, { status: 201 })
  } catch (error) {
    console.error("[v0] Record attendance error:", error)
    return NextResponse.json({ error: "Failed to record attendance" }, { status: 500 })
  }
}
