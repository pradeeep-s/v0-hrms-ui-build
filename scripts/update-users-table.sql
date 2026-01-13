-- Add password column to users table if it doesn't exist
ALTER TABLE users ADD COLUMN IF NOT EXISTS password_hash VARCHAR(255);

-- Add unique constraint to email
ALTER TABLE users ADD CONSTRAINT IF NOT EXISTS users_email_unique UNIQUE(email);

-- Create index on email for faster lookups
CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);
