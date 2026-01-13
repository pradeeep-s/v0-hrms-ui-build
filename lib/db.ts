// lib/db.ts
import path from "path"
import dotenv from "dotenv"
import { Pool, type QueryResult, type QueryResultRow } from "pg"

/**
 * ------------------------------------------------------------
 * Force-load .env from PROJECT ROOT (Windows-safe)
 * ------------------------------------------------------------
 */
dotenv.config({
  path: path.resolve(__dirname, "..", ".env"),
})


/**
 * ------------------------------------------------------------
 * Hard environment validation (fail fast, clear error)
 * ------------------------------------------------------------
 */
const requiredEnv = [
  "DB_HOST",
  "DB_PORT",
  "DB_USER",
  "DB_PASSWORD",
  "DB_NAME",
] as const

for (const key of requiredEnv) {
  if (!process.env[key]) {
    throw new Error(
      `[DB CONFIG ERROR] Missing environment variable: ${key}. Check your .env file.`,
    )
  }
}

/**
 * ------------------------------------------------------------
 * PostgreSQL connection pool
 * ------------------------------------------------------------
 */
const pool = new Pool({
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD, // must be string
  database: process.env.DB_NAME,

  // sensible defaults
  max: 10,                    // max connections
  idleTimeoutMillis: 30_000,  // close idle clients
  connectionTimeoutMillis: 10_000,
})

/**
 * ------------------------------------------------------------
 * Pool-level error handling
 * ------------------------------------------------------------
 */
pool.on("connect", () => {
  console.log("[DB] PostgreSQL connected")
})

pool.on("error", (err) => {
  console.error("[DB] Unexpected idle client error", err)
  process.exit(1)
})

/**
 * ------------------------------------------------------------
 * Typed query helper
 * ------------------------------------------------------------
 */
export async function query<T extends QueryResultRow>(
  text: string,
  params?: (string | number | boolean | null)[]
): Promise<QueryResult<T>> {
  const start = Date.now()

  try {
    const result = await pool.query<T>(text, params)
    const duration = Date.now() - start

    console.log("[DB] Query executed", {
      durationMs: duration,
      rows: result.rowCount,
    })

    return result
  } catch (error) {
    console.error("[DB] Query failed", { text, params, error })
    throw error
  }
}

/**
 * ------------------------------------------------------------
 * Graceful shutdown (important for scripts & prod)
 * ------------------------------------------------------------
 */
process.on("SIGINT", async () => {
  console.log("[DB] Closing PostgreSQL pool...")
  await pool.end()
  process.exit(0)
})

export default pool
