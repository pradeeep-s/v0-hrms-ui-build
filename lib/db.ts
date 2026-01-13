import { Pool, type QueryResult } from "pg"

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
})

pool.on("error", (err) => {
  console.error("Unexpected error on idle client", err)
})

export async function query<T>(text: string, params?: (string | number | boolean | null)[]): Promise<QueryResult<T>> {
  const start = Date.now()
  try {
    const result = await pool.query<T>(text, params)
    const duration = Date.now() - start
    console.log("[v0] Executed query", { text, duration, rows: result.rowCount })
    return result
  } catch (error) {
    console.error("[v0] Database error:", error)
    throw error
  }
}

export default pool
