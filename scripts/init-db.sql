-- ============================================================
-- HRMS Multi-Tenant Database Schema
-- ============================================================

-- 1. COMPANIES TABLE
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
  status VARCHAR(20) DEFAULT 'ACTIVE',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 2. USERS TABLE
CREATE TABLE IF NOT EXISTS users (
  id SERIAL PRIMARY KEY,
  email VARCHAR(255) NOT NULL UNIQUE,
  name VARCHAR(255) NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  role VARCHAR(50) NOT NULL DEFAULT 'EMPLOYEE',
  employee_code VARCHAR(50),
  manager_id INTEGER REFERENCES users(id) ON DELETE SET NULL,
  company_id INTEGER REFERENCES companies(id) ON DELETE CASCADE,
  status VARCHAR(20) DEFAULT 'ACTIVE',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 3. EMPLOYEES TABLE
CREATE TABLE IF NOT EXISTS employees (
  id SERIAL PRIMARY KEY,
  code VARCHAR(50) NOT NULL UNIQUE,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255),
  phone VARCHAR(20),
  date_of_birth DATE,
  gender VARCHAR(10),
  marital_status VARCHAR(20),
  address TEXT,
  city VARCHAR(100),
  state VARCHAR(100),
  pincode VARCHAR(10),
  joining_date DATE NOT NULL,
  employee_role VARCHAR(100),
  department VARCHAR(100),
  manager_id INTEGER REFERENCES employees(id) ON DELETE SET NULL,
  user_id INTEGER REFERENCES users(id) ON DELETE SET NULL,
  status VARCHAR(20) DEFAULT 'ACTIVE',
  pf_eligible BOOLEAN DEFAULT TRUE,
  biometric_id VARCHAR(50),
  company_id INTEGER NOT NULL REFERENCES companies(id) ON DELETE CASCADE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 4. SALARY STRUCTURE TABLE
CREATE TABLE IF NOT EXISTS salary_structures (
  id SERIAL PRIMARY KEY,
  employee_id INTEGER NOT NULL REFERENCES employees(id) ON DELETE CASCADE,
  basic DECIMAL(10, 2) DEFAULT 0,
  da DECIMAL(10, 2) DEFAULT 0,
  hra DECIMAL(10, 2) DEFAULT 0,
  ta DECIMAL(10, 2) DEFAULT 0,
  other_allowance DECIMAL(10, 2) DEFAULT 0,
  pf_contribution DECIMAL(10, 2) DEFAULT 0,
  esi_contribution DECIMAL(10, 2) DEFAULT 0,
  professional_tax DECIMAL(10, 2) DEFAULT 0,
  other_deduction DECIMAL(10, 2) DEFAULT 0,
  effective_date DATE NOT NULL,
  company_id INTEGER NOT NULL REFERENCES companies(id) ON DELETE CASCADE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 5. ATTENDANCE TABLE
CREATE TABLE IF NOT EXISTS attendance (
  id SERIAL PRIMARY KEY,
  employee_id INTEGER NOT NULL REFERENCES employees(id) ON DELETE CASCADE,
  date DATE NOT NULL,
  check_in TIME,
  check_out TIME,
  status VARCHAR(20) DEFAULT 'ABSENT',
  remarks TEXT,
  company_id INTEGER NOT NULL REFERENCES companies(id) ON DELETE CASCADE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(employee_id, date)
);

-- 6. LEAVE REQUESTS TABLE
CREATE TABLE IF NOT EXISTS leave_requests (
  id SERIAL PRIMARY KEY,
  employee_id INTEGER NOT NULL REFERENCES employees(id) ON DELETE CASCADE,
  leave_type VARCHAR(50) NOT NULL,
  start_date DATE NOT NULL,
  end_date DATE NOT NULL,
  total_days INTEGER NOT NULL,
  reason TEXT,
  status VARCHAR(50) DEFAULT 'APPLIED',
  manager_id INTEGER REFERENCES employees(id) ON DELETE SET NULL,
  manager_approval_date TIMESTAMP,
  manager_remarks TEXT,
  hr_id INTEGER REFERENCES employees(id) ON DELETE SET NULL,
  hr_approval_date TIMESTAMP,
  hr_remarks TEXT,
  company_id INTEGER NOT NULL REFERENCES companies(id) ON DELETE CASCADE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 7. ADVANCES TABLE
CREATE TABLE IF NOT EXISTS advances (
  id SERIAL PRIMARY KEY,
  employee_id INTEGER NOT NULL REFERENCES employees(id) ON DELETE CASCADE,
  amount DECIMAL(10, 2) NOT NULL,
  reason TEXT,
  status VARCHAR(20) DEFAULT 'PENDING',
  approved_date TIMESTAMP,
  recovery_start_month VARCHAR(10),
  recovery_amount DECIMAL(10, 2) DEFAULT 0,
  balance_amount DECIMAL(10, 2) DEFAULT 0,
  company_id INTEGER NOT NULL REFERENCES companies(id) ON DELETE CASCADE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 8. LOANS TABLE
CREATE TABLE IF NOT EXISTS loans (
  id SERIAL PRIMARY KEY,
  employee_id INTEGER NOT NULL REFERENCES employees(id) ON DELETE CASCADE,
  principal_amount DECIMAL(10, 2) NOT NULL,
  emi DECIMAL(10, 2) NOT NULL,
  tenure INTEGER NOT NULL,
  emis_paid INTEGER DEFAULT 0,
  balance_amount DECIMAL(10, 2) NOT NULL,
  status VARCHAR(20) DEFAULT 'ACTIVE',
  interest_rate DECIMAL(5, 2) DEFAULT 0,
  company_id INTEGER NOT NULL REFERENCES companies(id) ON DELETE CASCADE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 9. PAYROLL TABLE
CREATE TABLE IF NOT EXISTS payroll (
  id SERIAL PRIMARY KEY,
  employee_id INTEGER NOT NULL REFERENCES employees(id) ON DELETE CASCADE,
  payroll_month VARCHAR(10) NOT NULL,
  basic DECIMAL(10, 2) DEFAULT 0,
  da DECIMAL(10, 2) DEFAULT 0,
  hra DECIMAL(10, 2) DEFAULT 0,
  ta DECIMAL(10, 2) DEFAULT 0,
  other_allowance DECIMAL(10, 2) DEFAULT 0,
  gross_salary DECIMAL(10, 2) DEFAULT 0,
  pf_contribution DECIMAL(10, 2) DEFAULT 0,
  esi_contribution DECIMAL(10, 2) DEFAULT 0,
  professional_tax DECIMAL(10, 2) DEFAULT 0,
  advance_recovery DECIMAL(10, 2) DEFAULT 0,
  loan_emi DECIMAL(10, 2) DEFAULT 0,
  other_deduction DECIMAL(10, 2) DEFAULT 0,
  total_deduction DECIMAL(10, 2) DEFAULT 0,
  net_pay DECIMAL(10, 2) DEFAULT 0,
  status VARCHAR(20) DEFAULT 'DRAFT',
  locked_by INTEGER REFERENCES users(id),
  locked_date TIMESTAMP,
  company_id INTEGER NOT NULL REFERENCES companies(id) ON DELETE CASCADE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(employee_id, payroll_month)
);

-- 10. BIOMETRIC DEVICES TABLE
CREATE TABLE IF NOT EXISTS biometric_devices (
  id SERIAL PRIMARY KEY,
  device_id VARCHAR(100) NOT NULL UNIQUE,
  device_name VARCHAR(255) NOT NULL,
  location VARCHAR(255),
  device_type VARCHAR(50),
  serial_number VARCHAR(100),
  status VARCHAR(20) DEFAULT 'ACTIVE',
  last_sync TIMESTAMP,
  company_id INTEGER NOT NULL REFERENCES companies(id) ON DELETE CASCADE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 11. SYSTEM SETTINGS TABLE
CREATE TABLE IF NOT EXISTS system_settings (
  id SERIAL PRIMARY KEY,
  setting_key VARCHAR(100) NOT NULL,
  setting_value TEXT,
  description TEXT,
  company_id INTEGER NOT NULL REFERENCES companies(id) ON DELETE CASCADE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(setting_key, company_id)
);

-- 12. AUDIT LOGS TABLE
CREATE TABLE IF NOT EXISTS audit_logs (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id) ON DELETE SET NULL,
  action VARCHAR(100) NOT NULL,
  entity_type VARCHAR(100),
  entity_id INTEGER,
  old_values JSONB,
  new_values JSONB,
  ip_address VARCHAR(45),
  user_agent TEXT,
  company_id INTEGER NOT NULL REFERENCES companies(id) ON DELETE CASCADE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ============================================================
-- INDEXES FOR PERFORMANCE
-- ============================================================

CREATE INDEX idx_users_company_id ON users(company_id);
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_employees_company_id ON employees(company_id);
CREATE INDEX idx_employees_manager_id ON employees(manager_id);
CREATE INDEX idx_salary_structures_employee_id ON salary_structures(employee_id);
CREATE INDEX idx_salary_structures_company_id ON salary_structures(company_id);
CREATE INDEX idx_attendance_employee_id ON attendance(employee_id);
CREATE INDEX idx_attendance_date ON attendance(date);
CREATE INDEX idx_attendance_company_id ON attendance(company_id);
CREATE INDEX idx_leave_requests_employee_id ON leave_requests(employee_id);
CREATE INDEX idx_leave_requests_status ON leave_requests(status);
CREATE INDEX idx_leave_requests_company_id ON leave_requests(company_id);
CREATE INDEX idx_advances_employee_id ON advances(employee_id);
CREATE INDEX idx_advances_company_id ON advances(company_id);
CREATE INDEX idx_loans_employee_id ON loans(employee_id);
CREATE INDEX idx_loans_company_id ON loans(company_id);
CREATE INDEX idx_payroll_employee_id ON payroll(employee_id);
CREATE INDEX idx_payroll_month ON payroll(payroll_month);
CREATE INDEX idx_payroll_company_id ON payroll(company_id);
CREATE INDEX idx_biometric_devices_company_id ON biometric_devices(company_id);
CREATE INDEX idx_system_settings_company_id ON system_settings(company_id);
CREATE INDEX idx_audit_logs_company_id ON audit_logs(company_id);
CREATE INDEX idx_audit_logs_user_id ON audit_logs(user_id);
