# LMS Backend Setup Guide

## 1) Prerequisites

- Node.js 18+ (recommend Node.js 20 LTS)
- npm (comes with Node.js)
- MySQL 8.x (or compatible)

## 2) Install dependencies

From the backend folder:

```bash
npm install
```

## 3) Configure environment variables

Create `.env` from `.env.example` and update values:

### Windows (PowerShell)

```powershell
Copy-Item .env.example .env
```

### macOS/Linux

```bash
cp .env.example .env
```

Important variables:

- `PORT`: API port (default `5000`)
- `FRONTEND_URL`: frontend URL for CORS (default `http://localhost:3000`)
- `DB_HOST`, `DB_PORT`, `DB_USER`, `DB_PASSWORD`, `DB_NAME`: MySQL connection
- `MAIL_HOST`, `MAIL_PORT`, `MAIL_USER`, `MAIL_PASS`: mail server config
- `JWT_SECRET`: secret key for JWT signing

## 4) Setup database

This project includes SQL schema/data at `lms.sql`.

1. Create a MySQL database (example: `lms`)
2. Import `lms.sql` into that database
3. Ensure values in `.env` match your MySQL credentials

Example command:

```bash
mysql -u root -p lms < lms.sql
```

## 5) Run the server

Because `package.json` currently has no `start`/`dev` scripts, run directly:

```bash
node index.js
```

If you want auto-reload in development:

```bash
npx nodemon index.js
```

Expected log:

```text
Connected to the database
Server is running on port 5000
```

## 6) Static uploads

Uploaded files are served from `/uploads`:

- `uploads/avatars`
- `uploads/class-thumbnails`
- `uploads/documents`
- `uploads/thumbnails`

## 7) Common issues

### Database connection error

- Recheck `DB_HOST`, `DB_PORT`, `DB_USER`, `DB_PASSWORD`, `DB_NAME`
- Confirm MySQL service is running
- Confirm database exists and has imported schema

### CORS blocked from frontend

- Ensure frontend origin is added in `.env` as `FRONTEND_URL`
- Default allowed origins are localhost frontend and `FRONTEND_URL`

### Port already in use

- Change `PORT` in `.env` (for example `5001`) and restart backend

## 8) Recommended next improvement

Add scripts to `package.json` for easier startup:

```json
"scripts": {
  "start": "node index.js",
  "dev": "nodemon index.js"
}
```
