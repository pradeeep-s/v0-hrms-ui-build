# HRMS UI build

*Automatically synced with your [v0.app](https://v0.app) deployments*

[![Deployed on Vercel](https://img.shields.io/badge/Deployed%20on-Vercel-black?style=for-the-badge&logo=vercel)](https://vercel.com/pirathims-6409s-projects/v0-hrms-ui-build)
[![Built with v0](https://img.shields.io/badge/Built%20with-v0.app-black?style=for-the-badge)](https://v0.app/chat/olMaBZOKJhN)

## Overview

This repository will stay in sync with your deployed chats on [v0.app](https://v0.app).
Any changes you make to your deployed app will be automatically pushed to this repository from [v0.app](https://v0.app).

## Deployment

Your project is live at:

**[https://vercel.com/pirathims-6409s-projects/v0-hrms-ui-build](https://vercel.com/pirathims-6409s-projects/v0-hrms-ui-build)**

## Build your app

Continue building your app on:

**[https://v0.app/chat/olMaBZOKJhN](https://v0.app/chat/olMaBZOKJhN)**

## How It Works

1. Create and modify your project using [v0.app](https://v0.app)
2. Deploy your chats from the v0 interface
3. Changes are automatically pushed to this repository
4. Vercel deploys the latest version from this repository

## Local Setup & Database Configuration

### Prerequisites
- Node.js 18+ 
- PostgreSQL 13+
- npm or yarn

### Installation

1. Clone the repository:
\`\`\`bash
git clone https://github.com/your-org/v0-hrms-ui-build.git
cd v0-hrms-ui-build
\`\`\`

2. Install dependencies:
\`\`\`bash
npm install
\`\`\`

3. Create a `.env.local` file in the root directory with your database configuration:
\`\`\`env
DATABASE_URL=postgresql://user:password@localhost:5432/hrms_db
\`\`\`

Replace the following:
- `user` - Your PostgreSQL username
- `password` - Your PostgreSQL password
- `localhost` - Your database host (use `127.0.0.1` if needed)
- `5432` - Your PostgreSQL port (default is 5432)
- `hrms_db` - Your database name

4. Set up the database schema:
\`\`\`bash
# Connect to PostgreSQL and run the schema script
psql -U user -d hrms_db -f scripts/schema.sql
\`\`\`

5. Added secure password setup - seed demo users with encrypted passwords
Seed demo users with encrypted passwords:
\`\`\`bash
npm run seed-users
\`\`\`

6. Start the development server:
\`\`\`bash
npm run dev
\`\`\`

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Database Setup

The HRMS system uses PostgreSQL with the following tables:
- `users` - Employee user accounts with roles and encrypted passwords
- `employees` - Employee master data with salary structure
- `salary_structure` - Detailed salary components (Basic, DA, HRA, TA, Other Allowance)
- `attendance` - Daily attendance records
- `leave_requests` - Leave applications and approvals
- `advances` - Employee advances
- `loans` - Employee loans with EMI tracking
- `payroll` - Monthly payroll records
- `system_settings` - System configuration
- `biometric_devices` - Device management
- `audit_logs` - System audit trail

### Authentication & Security

Added secure password authentication section
This HRMS system uses secure password authentication with bcrypt encryption:

- All passwords are hashed using bcrypt (10 salt rounds) before storage
- Login credentials are verified against encrypted hashes in PostgreSQL
- JWT tokens are generated upon successful authentication
- Each role has specific access controls and routes

#### Demo Credentials

After running `npm run seed-users`, use these credentials to test:
- **Super Admin**: super@admin.com / admin123
- **HR Admin**: hr@company.com / admin123
- **Manager**: manager@company.com / admin123
- **Employee**: emp@company.com / admin123

### API Endpoints

All data is fetched through RESTful API endpoints with secure authentication:
- `POST /api/auth/login` - User authentication with password verification
- `GET/POST /api/employees` - Employee management
- `GET/POST /api/attendance` - Attendance tracking
- `GET/POST /api/leave-requests` - Leave management
- `GET/POST /api/advances` - Advance management
- `GET/POST /api/loans` - Loan management
- `GET/POST /api/payroll` - Payroll operations

### Troubleshooting

**Database connection error:**
- Verify PostgreSQL is running: `psql --version`
- Check DATABASE_URL in `.env.local` is correct
- Ensure database exists: `createdb hrms_db`

**Seed users script fails:**
- Make sure schema is created first: `psql -U user -d hrms_db -f scripts/schema.sql`
- Verify DATABASE_URL environment variable is set

**Port 3000 already in use:**
\`\`\`bash
npm run dev -- -p 3001
\`\`\`
