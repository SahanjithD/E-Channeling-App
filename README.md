# E-Channeling App

A simple multi-project workspace for channeling doctors and managing appointments.

- Backend: Node.js/Express + Prisma (SQLite)
- Frontend: React + Vite
- Desktop: WPF (.NET) client

## Prerequisites
- Node.js 18+ and npm
- Visual Studio 2022 (for WPF desktop app)
- Git (optional)

## Folder Structure
- MyDoc/Backend — Express API, Prisma schema and migrations
- MyDoc/Frontend — React + Vite web UI
- MyDoc/desktop — WPF (.NET) desktop client

## Environment Configuration (Backend)
Create `MyDoc/Backend/.env` (already added) and set the database URL:
```
DATABASE_URL="file:./dev.db"
# Optional: PORT=5000
```

## Quick Start (Windows)
Open two PowerShell terminals for backend and frontend.

### Backend (API)
```powershell
Push-Location "e:\Projects\E-Channeling-App\MyDoc\Backend"
# Install deps
npm install

# Initialize database (SQLite) and apply migrations
npx prisma migrate reset --force

# Seed sample data (doctors, users)
npm run seed

# Start the API (default: http://localhost:5000)
npm run dev
```

### Frontend (Web)
```powershell
Push-Location "e:\Projects\E-Channeling-App\MyDoc\Frontend"
# Install deps
npm install

# Start Vite dev server (http://localhost:5173)
npm run dev
```
The frontend calls the backend at `http://localhost:5000/...` (e.g., `/users/login`, `/doctors/search`, `/appointments`).

### Desktop (WPF)
- Open `MyDoc/desktop/desktop.sln` in Visual Studio 2022
- Set configuration to `Debug`
- Build and run the `desktop` project

## API Overview
Base URL: `http://localhost:5000`
- `POST /users/register` — user registration
- `POST /users/login` — user login (JWT)
- `GET /doctors/search?...` — search doctors by specialty/time
- `GET /appointments/:userId` — list user appointments
- `POST /appointments` — create appointment
- `PUT /appointments/:id` — update appointment
- `DELETE /appointments/:id` — delete appointment

## Notes
- CORS: Backend allows `origin: "*"` for local development.
- JWT: A default secret is used in code for development; consider moving secrets to environment variables for production.
- Prisma Client is generated automatically by commands above.

## Troubleshooting
- Port in use (`EADDRINUSE: :::5000`): Stop the process using port 5000 or set `PORT` in `.env` to another free port and restart.
- Seed unique constraint errors: Run `npx prisma migrate reset --force` to clear dev DB, then re-run `npm run seed`.
- Dependency vulnerabilities: Run `npm audit fix` (and `--force` if necessary) during development.

## Scripts
Backend (`MyDoc/Backend/package.json`):
- `dev` — start API with nodemon
- `seed` — populate sample data

Frontend (`MyDoc/Frontend/package.json`):
- `dev` — start Vite dev server
- `build` — production build
- `preview` — preview production build

## Git Hygiene
- `.gitignore` files are set up at repo root, backend, frontend, and desktop to ignore build artifacts, environment files, and OS/editor files.

