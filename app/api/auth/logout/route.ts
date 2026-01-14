import { NextResponse } from "next/server"

export async function POST() {
  try {
    const response = NextResponse.json({ message: "Logged out successfully" })
    
    // Clear the auth cookie
    response.cookies.set("auth_token", "", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 0, // Expire immediately
    })

    return response
  } catch (error) {
    console.error("[LOGOUT ERROR]", error)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}
