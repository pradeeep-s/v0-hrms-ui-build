import { query } from "@/lib/db"
import { type NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest) {
  try {
    const authToken = request.cookies.get("auth_token")?.value
    if (!authToken) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const decoded = JSON.parse(Buffer.from(authToken, "base64").toString())

    // Get user's company_id
    const userResult = await query("SELECT company_id FROM users WHERE id = $1", [decoded.id])
    if (userResult.rows.length === 0) {
      return NextResponse.json({ error: "User not found" }, { status: 404 })
    }

    const companyId = userResult.rows[0].company_id

    const result = await query(
      `
      SELECT 
        e.id, e.code, e.name, e.email, e.role, e.manager_id,
        m.name as manager_name, e.pf_eligible, e.biometric_id, e.status,
        ss.basic, ss.da, ss.hra, ss.ta, ss.other_allowance, ss.gross_salary
      FROM employees e
      LEFT JOIN employees m ON e.manager_id = m.id AND e.company_id = m.company_id
      LEFT JOIN salary_structures ss ON e.id = ss.employee_id
      WHERE e.company_id = $1
      ORDER BY e.code
    `,
      [companyId],
    )

    const employees = result.rows.map((row) => ({
      id: row.id,
      code: row.code,
      name: row.name,
      email: row.email,
      role: row.role,
      manager: row.manager_name || "HR Admin",
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
    }))

    return NextResponse.json(employees)
  } catch (error) {
    console.error("[v0] Get employees error:", error)
    return NextResponse.json({ error: "Failed to fetch employees" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const authToken = request.cookies.get("auth_token")?.value
    if (!authToken) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const decoded = JSON.parse(Buffer.from(authToken, "base64").toString())

    const userResult = await query("SELECT company_id FROM users WHERE id = $1", [decoded.id])
    if (userResult.rows.length === 0) {
      return NextResponse.json({ error: "User not found" }, { status: 404 })
    }

    const companyId = userResult.rows[0].company_id
    const { code, name, email, role, manager, pfEligible, biometricId, status, salaryStructure } = await request.json()

    // Insert employee with company_id
    const empResult = await query(
      `INSERT INTO employees (code, name, email, role, pf_eligible, biometric_id, status, company_id)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING id`,
      [code, name, email, role, pfEligible, biometricId, status, companyId],
    )

    const employeeId = empResult.rows[0].id

    // Insert salary structure
    await query(
      `INSERT INTO salary_structures (employee_id, basic, da, hra, ta, other_allowance, company_id)
       VALUES ($1, $2, $3, $4, $5, $6, $7)`,
      [
        employeeId,
        salaryStructure.basic,
        salaryStructure.da,
        salaryStructure.hra,
        salaryStructure.ta,
        salaryStructure.otherAllowance,
        companyId,
      ],
    )

    return NextResponse.json({ id: employeeId, code, name, email }, { status: 201 })
  } catch (error) {
    console.error("[v0] Create employee error:", error)
    return NextResponse.json({ error: "Failed to create employee" }, { status: 500 })
  }
}
