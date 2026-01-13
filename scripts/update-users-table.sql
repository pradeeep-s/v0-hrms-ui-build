-- Add password column to users table if it doesn't exist
ALTER TABLE users ADD COLUMN IF NOT EXISTS password_hash VARCHAR(255);

-- Add unique constraint to email
ALTER TABLE users ADD CONSTRAINT IF NOT EXISTS users_email_unique UNIQUE(email);

-- Create index on email for faster lookups
CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);


-- =====================================================
-- USERS TABLE (HRMS – Production Ready)
-- =====================================================

DROP TABLE IF EXISTS public.users CASCADE;

CREATE TABLE public.users
(
    id              SERIAL PRIMARY KEY,

    email           VARCHAR(255) NOT NULL UNIQUE,
    password_hash   VARCHAR(255) NOT NULL,

    name            VARCHAR(255) NOT NULL,
    role            VARCHAR(50)  NOT NULL,

    employee_code   VARCHAR(50) UNIQUE,
    manager_id      INTEGER,

    created_at      TIMESTAMP WITHOUT TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at      TIMESTAMP WITHOUT TIME ZONE DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT users_role_check
        CHECK (role IN ('SUPER_ADMIN', 'ADMIN', 'MANAGER', 'EMPLOYEE')),

    CONSTRAINT users_manager_fk
        FOREIGN KEY (manager_id)
        REFERENCES public.users (id)
        ON DELETE SET NULL
        ON UPDATE CASCADE
);

-- =====================================================
-- INDEXES
-- =====================================================

CREATE INDEX idx_users_email
    ON public.users (email);

CREATE INDEX idx_users_manager_id
    ON public.users (manager_id);

-- =====================================================
-- AUTO UPDATE updated_at
-- =====================================================

CREATE OR REPLACE FUNCTION set_users_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_users_updated_at
BEFORE UPDATE ON public.users
FOR EACH ROW
EXECUTE FUNCTION set_users_updated_at();
