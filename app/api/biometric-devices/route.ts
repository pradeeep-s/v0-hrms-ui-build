import { query } from "@/lib/db"
import { type NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest) {
  try {
    const result = await query("SELECT * FROM biometric_devices ORDER BY device_name")

    const devices = result.rows.map((row) => ({
      id: row.id,
      deviceId: row.device_id,
      deviceName: row.device_name,
      location: row.location,
      status: row.status,
      lastSync: row.last_sync,
    }))

    return NextResponse.json(devices)
  } catch (error) {
    console.error("[v0] Get biometric devices error:", error)
    return NextResponse.json({ error: "Failed to fetch devices" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const { deviceId, deviceName, location } = await request.json()

    const result = await query(
      `INSERT INTO biometric_devices (device_id, device_name, location, status)
       VALUES ($1, $2, $3, 'ACTIVE')
       RETURNING id`,
      [deviceId, deviceName, location],
    )

    return NextResponse.json({ id: result.rows[0].id }, { status: 201 })
  } catch (error) {
    console.error("[v0] Create biometric device error:", error)
    return NextResponse.json({ error: "Failed to create device" }, { status: 500 })
  }
}
