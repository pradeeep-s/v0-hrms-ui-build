import bcrypt from "bcryptjs"

const SALT_ROUNDS = 10

export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, SALT_ROUNDS)
}

export async function verifyPassword(password: string, hash: string): Promise<boolean> {
  return bcrypt.compare(password, hash)
}

// Utility to hash demo passwords (run this once to seed the database)
export async function generateDemoPasswordHashes() {
  const demoPasswords: Record<string, string> = {
    "super@admin.com": "admin123",
    "hr@company.com": "admin123",
    "manager@company.com": "admin123",
    "emp@company.com": "admin123",
  }

  const hashes: Record<string, string> = {}
  for (const [email, password] of Object.entries(demoPasswords)) {
    hashes[email] = await hashPassword(password)
  }

  return hashes
}
