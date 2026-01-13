import { query } from "@/lib/db"
import { type NextRequest, NextResponse } from "next/server"

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const { reason } = await request.json()

    await query(`UPDATE leave_requests SET status = $1, rejection_reason = $2, updated_at = NOW() WHERE id = $3`, [
      "REJECTED",
      reason,
      params.id,
    ])

    return NextResponse.json({ message: "Leave rejected" })
  } catch (error) {
    console.error("[v0] Reject leave error:", error)
    return NextResponse.json({ error: "Failed to reject leave" }, { status: 500 })
  }
}
