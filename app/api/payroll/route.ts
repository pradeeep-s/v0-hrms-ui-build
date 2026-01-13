import { query } from "@/lib/db"
import { type NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest) {
  try {
    const month = request.nextUrl.searchParams.get("month")

    if (!month) {
      return NextResponse.json({ error: "Month parameter required" }, { status: 400 })
    }

    const result = await query(
      `SELECT p.*, e.code, e.name FROM payroll p
       JOIN employees e ON p.employee_id = e.id
       WHERE TO_CHAR(p.payroll_month, 'YYYY-MM') = $1
       ORDER BY e.code`,
      [month],
    )

    const payrolls = result.rows.map((row) => ({
      id: row.id,
      code: row.code,
      name: row.name,
      gross: Number(row.gross_salary),
      pf: Number(row.pf_deduction),
      advance: Number(row.advance_deduction),
      loanEmi: Number(row.loan_emi),
      totalDeduction: Number(row.total_deduction),
      netPay: Number(row.net_pay),
      status: row.status,
    }))

    return NextResponse.json(payrolls)
  } catch (error) {
    console.error("[v0] Get payroll error:", error)
    return NextResponse.json({ error: "Failed to fetch payroll" }, { status: 500 })
  }
}
