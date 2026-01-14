# Local PostgreSQL HRMS Setup Guide

## Prerequisites
- PostgreSQL 12+ installed
- Node.js 18+ installed
- npm or yarn

## Step 1: Create PostgreSQL Database

```bash
# Connect to PostgreSQL
psql -U postgres

# Create database
CREATE DATABASE hrms_db;

# Exit psql
\q
```

## Step 2: Environment Configuration

```bash
# Copy .env.example to .env
cp .env.example .env

# Edit .env with your PostgreSQL credentials
DB_HOST=localhost
DB_PORT=5432
DB_USER=postgres
DB_PASSWORD=your_password
DB_NAME=hrms_db
JWT_SECRET=your-random-secret-key
```

## Step 3: Initialize Database Schema

```bash
# Run the SQL schema
psql -U postgres -d hrms_db -f scripts/init-db.sql
```

## Step 4: Seed Demo Users

```bash
# Install dependencies first
npm install

# Run seed script
npx ts-node scripts/seed-demo-users.ts
```

## Step 5: Start Development Server

```bash
npm run dev
```

Visit `http://localhost:3000` and login with demo credentials:

| Email | Password | Role |
|-------|----------|------|
| super@admin.com | admin123 | SUPER_ADMIN |
| hr@company.com | admin123 | ADMIN |
| manager@company.com | admin123 | MANAGER |
| emp@company.com | admin123 | EMPLOYEE |

## Troubleshooting

### "Can't connect to PostgreSQL"
- Verify PostgreSQL is running: `psql -U postgres -c "SELECT 1"`
- Check .env credentials match your PostgreSQL setup

### "Module not found" errors
- Run `npm install` to install all dependencies

### Database schema errors
- Ensure you ran `psql -U postgres -d hrms_db -f scripts/init-db.sql`

## Notes
- All passwords are hashed with bcrypt before storage
- JWT tokens expire in 7 days
- Database connections use connection pooling for performance
