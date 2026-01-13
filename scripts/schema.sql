-- Users table
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  name VARCHAR(255) NOT NULL,
  role VARCHAR(50) NOT NULL CHECK (role IN ('SUPER_ADMIN', 'ADMIN', 'MANAGER', 'EMPLOYEE')),
  manager_id INTEGER REFERENCES users(id),
  employee_code VARCHAR(50),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Employees table
CREATE TABLE employees (
  id SERIAL PRIMARY KEY,
  user_id INTEGER UNIQUE REFERENCES users(id),
  code VARCHAR(50) UNIQUE NOT NULL,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  role VARCHAR(255) NOT NULL,
  manager_id INTEGER REFERENCES employees(id),
  pf_eligible BOOLEAN DEFAULT true,
  biometric_id VARCHAR(100),
  status VARCHAR(50) DEFAULT 'ACTIVE' CHECK (status IN ('ACTIVE', 'INACTIVE')),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Salary structures table
CREATE TABLE salary_structures (
  id SERIAL PRIMARY KEY,
  employee_id INTEGER UNIQUE REFERENCES employees(id),
  basic DECIMAL(10, 2) NOT NULL,
  da DECIMAL(10, 2) NOT NULL,
  hra DECIMAL(10, 2) NOT NULL,
  ta DECIMAL(10, 2) NOT NULL,
  other_allowance DECIMAL(10, 2) NOT NULL,
  gross_salary DECIMAL(10, 2) GENERATED ALWAYS AS (basic + da + hra + ta + other_allowance) STORED,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Attendance table
CREATE TABLE attendance (
  id SERIAL PRIMARY KEY,
  employee_id INTEGER REFERENCES employees(id),
  attendance_date DATE NOT NULL,
  check_in TIME,
  check_out TIME,
  status VARCHAR(50) CHECK (status IN ('PRESENT', 'ABSENT', 'HALF', 'LEAVE')),
  duration_minutes INTEGER,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(employee_id, attendance_date)
);

-- Leave requests table
CREATE TABLE leave_requests (
  id SERIAL PRIMARY KEY,
  employee_id INTEGER REFERENCES employees(id),
  leave_type VARCHAR(50) NOT NULL CHECK (leave_type IN ('CASUAL', 'SICK', 'EARNED', 'MATERNITY')),
  start_date DATE NOT NULL,
  end_date DATE NOT NULL,
  days INTEGER NOT NULL,
  reason TEXT,
  status VARCHAR(50) DEFAULT 'APPLIED' CHECK (status IN ('APPLIED', 'MANAGER_APPROVED', 'HR_APPROVED', 'REJECTED')),
  manager_approval_date TIMESTAMP,
  hr_approval_date TIMESTAMP,
  rejection_reason TEXT,
  applied_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Advances table
CREATE TABLE advances (
  id SERIAL PRIMARY KEY,
  employee_id INTEGER REFERENCES employees(id),
  amount DECIMAL(10, 2) NOT NULL,
  remaining_balance DECIMAL(10, 2) NOT NULL,
  monthly_deduction DECIMAL(10, 2) NOT NULL,
  status VARCHAR(50) DEFAULT 'ACTIVE' CHECK (status IN ('ACTIVE', 'CLOSED')),
  applied_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  closed_date TIMESTAMP,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Loans table
CREATE TABLE loans (
  id SERIAL PRIMARY KEY,
  employee_id INTEGER REFERENCES employees(id),
  principal DECIMAL(10, 2) NOT NULL,
  emi DECIMAL(10, 2) NOT NULL,
  tenure_months INTEGER NOT NULL,
  remaining_months INTEGER NOT NULL,
  status VARCHAR(50) DEFAULT 'ACTIVE' CHECK (status IN ('ACTIVE', 'CLOSED')),
  loan_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Payroll table
CREATE TABLE payroll (
  id SERIAL PRIMARY KEY,
  employee_id INTEGER REFERENCES employees(id),
  payroll_month DATE NOT NULL,
  gross_salary DECIMAL(10, 2) NOT NULL,
  pf_deduction DECIMAL(10, 2) DEFAULT 0,
  advance_deduction DECIMAL(10, 2) DEFAULT 0,
  loan_emi DECIMAL(10, 2) DEFAULT 0,
  total_deduction DECIMAL(10, 2) NOT NULL,
  net_pay DECIMAL(10, 2) NOT NULL,
  status VARCHAR(50) DEFAULT 'DRAFT' CHECK (status IN ('DRAFT', 'LOCKED')),
  locked_at TIMESTAMP,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(employee_id, payroll_month)
);

-- System settings table
CREATE TABLE system_settings (
  id SERIAL PRIMARY KEY,
  key VARCHAR(255) UNIQUE NOT NULL,
  value TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Biometric devices table
CREATE TABLE biometric_devices (
  id SERIAL PRIMARY KEY,
  device_id VARCHAR(100) UNIQUE NOT NULL,
  device_name VARCHAR(255) NOT NULL,
  location VARCHAR(255),
  status VARCHAR(50) DEFAULT 'ACTIVE',
  last_sync TIMESTAMP,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Audit logs table
CREATE TABLE audit_logs (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id),
  action VARCHAR(255) NOT NULL,
  entity_type VARCHAR(100),
  entity_id INTEGER,
  old_values JSONB,
  new_values JSONB,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create indexes for better query performance
CREATE INDEX idx_employees_status ON employees(status);
CREATE INDEX idx_employees_manager_id ON employees(manager_id);
CREATE INDEX idx_attendance_employee_date ON attendance(employee_id, attendance_date);
CREATE INDEX idx_leave_requests_employee_status ON leave_requests(employee_id, status);
CREATE INDEX idx_payroll_employee_month ON payroll(employee_id, payroll_month);
CREATE INDEX idx_audit_logs_user_id ON audit_logs(user_id);
