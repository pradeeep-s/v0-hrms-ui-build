-- Multi-Tenant HRMS Schema
-- This migration adds company support to existing HRMS

-- 1. CREATE COMPANIES TABLE
CREATE TABLE IF NOT EXISTS companies (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL UNIQUE,
  email VARCHAR(255) NOT NULL UNIQUE,
  phone VARCHAR(20),
  address TEXT,
  city VARCHAR(100),
  state VARCHAR(100),
  pincode VARCHAR(10),
  pan_number VARCHAR(20) UNIQUE,
  gst_number VARCHAR(20) UNIQUE,
  established_date DATE,
  logo_url TEXT,
  status VARCHAR(20) DEFAULT 'ACTIVE', -- ACTIVE, INACTIVE, SUSPENDED
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 2. ALTER USERS TABLE TO ADD COMPANY_ID
ALTER TABLE users ADD COLUMN IF NOT EXISTS company_id INTEGER REFERENCES companies(id) ON DELETE CASCADE;

-- 3. CREATE COMPANY ADMINS TABLE
CREATE TABLE IF NOT EXISTS company_admins (
  id SERIAL PRIMARY KEY,
  company_id INTEGER NOT NULL REFERENCES companies(id) ON DELETE CASCADE,
  user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(company_id, user_id)
);

-- 4. ALTER ALL DATA TABLES TO ADD COMPANY_ID
ALTER TABLE employees ADD COLUMN IF NOT EXISTS company_id INTEGER REFERENCES companies(id) ON DELETE CASCADE;
ALTER TABLE attendance ADD COLUMN IF NOT EXISTS company_id INTEGER REFERENCES companies(id) ON DELETE CASCADE;
ALTER TABLE leave_requests ADD COLUMN IF NOT EXISTS company_id INTEGER REFERENCES companies(id) ON DELETE CASCADE;
ALTER TABLE advances ADD COLUMN IF NOT EXISTS company_id INTEGER REFERENCES companies(id) ON DELETE CASCADE;
ALTER TABLE loans ADD COLUMN IF NOT EXISTS company_id INTEGER REFERENCES companies(id) ON DELETE CASCADE;
ALTER TABLE payroll ADD COLUMN IF NOT EXISTS company_id INTEGER REFERENCES companies(id) ON DELETE CASCADE;
ALTER TABLE salary_structures ADD COLUMN IF NOT EXISTS company_id INTEGER REFERENCES companies(id) ON DELETE CASCADE;
ALTER TABLE biometric_devices ADD COLUMN IF NOT EXISTS company_id INTEGER REFERENCES companies(id) ON DELETE CASCADE;
ALTER TABLE system_settings ADD COLUMN IF NOT EXISTS company_id INTEGER REFERENCES companies(id) ON DELETE CASCADE;
ALTER TABLE audit_logs ADD COLUMN IF NOT EXISTS company_id INTEGER REFERENCES companies(id) ON DELETE CASCADE;

-- 5. CREATE INDEXES FOR PERFORMANCE
CREATE INDEX IF NOT EXISTS idx_users_company_id ON users(company_id);
CREATE INDEX IF NOT EXISTS idx_employees_company_id ON employees(company_id);
CREATE INDEX IF NOT EXISTS idx_attendance_company_id ON attendance(company_id);
CREATE INDEX IF NOT EXISTS idx_leave_requests_company_id ON leave_requests(company_id);
CREATE INDEX IF NOT EXISTS idx_advances_company_id ON advances(company_id);
CREATE INDEX IF NOT EXISTS idx_loans_company_id ON loans(company_id);
CREATE INDEX IF NOT EXISTS idx_payroll_company_id ON payroll(company_id);
CREATE INDEX IF NOT EXISTS idx_biometric_devices_company_id ON biometric_devices(company_id);
CREATE INDEX IF NOT EXISTS idx_company_admins_company_id ON company_admins(company_id);

-- 6. UPDATE CONSTRAINTS - Add NOT NULL after data migration
-- ALTER TABLE employees ALTER COLUMN company_id SET NOT NULL;
-- ALTER TABLE attendance ALTER COLUMN company_id SET NOT NULL;
-- etc...
