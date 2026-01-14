import path from "path"
import dotenv from "dotenv"

// 👇 FORCE root .env loading
dotenv.config({
  path: path.resolve(process.cwd(), ".env"),
})

import { query } from "@/lib/db"
import { hashPassword } from "@/lib/password"

const demoCompany = {
  name: "Default Company",
  status: "ACTIVE",
}

const demoUsers = [
  {
    email: "super@admin.com",
    name: "Super Admin",
    role: "SUPER_ADMIN",
    employee_code: "SA001",
    password: "admin123",
  },
  {
    email: "hr@company.com",
    name: "HR Manager",
    role: "ADMIN",
    employee_code: "HR001",
    password: "admin123",
  },
  {
    email: "manager@company.com",
    name: "Team Manager",
    role: "MANAGER",
    employee_code: "MGR001",
    password: "admin123",
  },
  {
    email: "emp@company.com",
    name: "Employee",
    role: "EMPLOYEE",
    employee_code: "EMP001",
    password: "admin123",
  },
]

async function seedDatabase() {
  try {
    console.log("[v0] Starting database seeding...")

    const companyResult = await query(
      `INSERT INTO companies (name, status)
       VALUES ($1, $2)
       ON CONFLICT (name) DO UPDATE SET status = $2
       RETURNING id`,
      [demoCompany.name, demoCompany.status],
    )

    const companyId = companyResult.rows[0].id
    console.log(`[v0] Company created/updated: ${companyId}`)

    for (const user of demoUsers) {
      const passwordHash = await hashPassword(user.password)

      await query(
        `INSERT INTO users (email, name, role, employee_code, password_hash, company_id)
         VALUES ($1, $2, $3, $4, $5, $6)
         ON CONFLICT (email) DO UPDATE
         SET password_hash = $5, name = $2, role = $3`,
        [user.email, user.name, user.role, user.employee_code, passwordHash, companyId],
      )

      console.log(`[v0] Created/updated user: ${user.email}`)
    }

    console.log("[v0] Database seeding completed successfully!")
    process.exit(0)
  } catch (error) {
    console.error("[v0] Error seeding database:", error)
    process.exit(1)
  }
}

seedDatabase()
