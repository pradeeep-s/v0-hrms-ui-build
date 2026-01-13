import path from "path"
import dotenv from "dotenv"

// 👇 FORCE root .env loading
dotenv.config({
  path: path.resolve(process.cwd(), ".env"),
})


import { query } from "@/lib/db"
import { hashPassword } from "@/lib/password"


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
    manager_id: null,
    password: "admin123",
  },
  {
    email: "emp@company.com",
    name: "Employee",
    role: "EMPLOYEE",
    employee_code: "EMP001",
    manager_id: 3,
    password: "admin123",
  },
]

async function seedUsers() {
  try {
    console.log("[v0] Seeding demo users...")

    for (const user of demoUsers) {
      const passwordHash = await hashPassword(user.password)

      await query(
        `INSERT INTO users (email, name, role, employee_code, manager_id, password_hash)
         VALUES ($1, $2, $3, $4, $5, $6)
         ON CONFLICT (email) DO UPDATE
         SET password_hash = $6, name = $2, role = $3`,
        [user.email, user.name, user.role, user.employee_code, user.manager_id || null, passwordHash],
      )

      console.log(`[v0] Created/updated user: ${user.email}`)
    }

    console.log("[v0] Demo users seeded successfully!")
  } catch (error) {
    console.error("[v0] Error seeding users:", error)
    throw error
  }
}

seedUsers()
