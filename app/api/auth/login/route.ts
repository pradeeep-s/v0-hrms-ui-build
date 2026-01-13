import { NextRequest, NextResponse } from "next/server"
import { query } from "@/lib/db"
import { verifyPassword } from "@/lib/password"

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json()
     // 🔴 DEBUG: incoming request
    console.log("[LOGIN REQUEST]")
    console.log("Email:", email)
    console.log("Password (plain):", password)

    if (!email || !password) {
      return NextResponse.json(
        { error: "Email and password required" },
        { status: 400 }
      )
    }

    // 🔍 FETCH USER
    const result = await query(
      `
      SELECT id, email, name, role, password_hash
      FROM users
      WHERE email = $1
      `,
      [email]
    )
    console.log("[DB RESULT ROWS]", result.rows.length)
    if (result.rows.length === 0) {
      return NextResponse.json(
        { error: "Invalid credentials" },
        { status: 401 }
      )
    }

    const user = result.rows[0]
    // 🔴 DEBUG: DB user data
    console.log("[DB USER]")
    console.log("Name:", user.name)
    console.log("Role:", user.role)
    console.log("Password hash:", user.password_hash)
    // 🔐 VERIFY PASSWORD
    const valid = await verifyPassword(password, user.password_hash)
    if (!valid) {
      return NextResponse.json(
        { error: "Invalid credentials" },
        { status: 401 }
      )
    }
    console.log("[LOGIN SUCCESS]")
    console.log("Logged in user:", user.name, "| Role:", user.role)

    // 🎟️ CREATE TOKEN (base64 for now)
    const token = Buffer.from(
      JSON.stringify({ id: user.id, role: user.role })
    ).toString("base64")

    // 📤 CREATE RESPONSE
    const response = NextResponse.json({
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
      },
    })

    // 🍪 SET COOKIE (CORRECT WAY)
    response.cookies.set("auth_token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
    })

    return response
  } catch (error) {
    console.error("[LOGIN ERROR]", error)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}
