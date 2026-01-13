import { query } from "@/lib/db"
import { type NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest) {
  try {
    const result = await query("SELECT * FROM system_settings ORDER BY key")

    const settings = result.rows.reduce(
      (acc, row) => {
        acc[row.key] = row.value
        return acc
      },
      {} as Record<string, string>,
    )

    return NextResponse.json(settings)
  } catch (error) {
    console.error("[v0] Get settings error:", error)
    return NextResponse.json({ error: "Failed to fetch settings" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const settings = await request.json()

    for (const [key, value] of Object.entries(settings)) {
      await query(
        `INSERT INTO system_settings (key, value) VALUES ($1, $2)
         ON CONFLICT (key) DO UPDATE SET value = $2, updated_at = NOW()`,
        [key, value],
      )
    }

    return NextResponse.json({ message: "Settings updated" })
  } catch (error) {
    console.error("[v0] Update settings error:", error)
    return NextResponse.json({ error: "Failed to update settings" }, { status: 500 })
  }
}
