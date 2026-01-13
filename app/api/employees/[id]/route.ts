import { query } from "@/lib/db"
import { type NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const result = await query(
      `SELECT e.*, m.name as manager_name, ss.basic, ss.da, ss.hra, ss.ta, ss.other_allowance
       FROM employees e
       LEFT JOIN employees m ON e.manager_id = m.id
       LEFT JOIN salary_structures ss ON e.id = ss.employee_id
       WHERE e.id = $1`,
      [params.id],
    )

    if (result.rows.length === 0) {
      return NextResponse.json({ error: "Employee not found" }, { status: 404 })
    }

    const row = result.rows[0]
    return NextResponse.json({
      id: row.id,
      code: row.code,
      name: row.name,
      email: row.email,
      role: row.role,
      manager: row.manager_name,
      pfEligible: row.pf_eligible,
      biometricId: row.biometric_id,
      status: row.status,
      salaryStructure: {
        basic: Number(row.basic) || 0,
        da: Number(row.da) || 0,
        hra: Number(row.hra) || 0,
        ta: Number(row.ta) || 0,
        otherAllowance: Number(row.other_allowance) || 0,
      },
    })
  } catch (error) {
    console.error("[v0] Get employee error:", error)
    return NextResponse.json({ error: "Failed to fetch employee" }, { status: 500 })
  }
}

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const { code, name, email, role, manager, pfEligible, biometricId, status, salaryStructure } = await request.json()

    // Update employee
    await query(
      `UPDATE employees SET code = $1, name = $2, email = $3, role = $4, pf_eligible = $5, biometric_id = $6, status = $7, updated_at = NOW()
       WHERE id = $8`,
      [code, name, email, role, pfEligible, biometricId, status, params.id],
    )

    // Update salary structure
    await query(
      `UPDATE salary_structures SET basic = $1, da = $2, hra = $3, ta = $4, other_allowance = $5, updated_at = NOW()
       WHERE employee_id = $6`,
      [
        salaryStructure.basic,
        salaryStructure.da,
        salaryStructure.hra,
        salaryStructure.ta,
        salaryStructure.otherAllowance,
        params.id,
      ],
    )

    return NextResponse.json({ message: "Employee updated" })
  } catch (error) {
    console.error("[v0] Update employee error:", error)
    return NextResponse.json({ error: "Failed to update employee" }, { status: 500 })
  }
}
