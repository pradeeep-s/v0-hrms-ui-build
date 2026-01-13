import { query } from "@/lib/db"
import { type NextRequest, NextResponse } from "next/server"

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const { approverRole } = await request.json()

    const statusMap = {
      manager: "MANAGER_APPROVED",
      hr: "HR_APPROVED",
    }

    const newStatus = statusMap[approverRole as keyof typeof statusMap]
    const dateField = approverRole === "manager" ? "manager_approval_date" : "hr_approval_date"

    await query(`UPDATE leave_requests SET status = $1, ${dateField} = NOW(), updated_at = NOW() WHERE id = $2`, [
      newStatus,
      params.id,
    ])

    return NextResponse.json({ message: "Leave approved" })
  } catch (error) {
    console.error("[v0] Approve leave error:", error)
    return NextResponse.json({ error: "Failed to approve leave" }, { status: 500 })
  }
}
