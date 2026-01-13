import { query } from "@/lib/db"
import { type NextRequest, NextResponse } from "next/server"

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    await query(`UPDATE payroll SET status = $1, locked_at = NOW() WHERE id = $2`, ["LOCKED", params.id])

    return NextResponse.json({ message: "Payroll locked" })
  } catch (error) {
    console.error("[v0] Lock payroll error:", error)
    return NextResponse.json({ error: "Failed to lock payroll" }, { status: 500 })
  }
}
