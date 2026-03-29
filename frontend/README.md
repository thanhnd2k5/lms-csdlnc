# LMS Frontend Setup Guide

## 1) Overview

This is the React frontend for the LMS project.

Tech stack:

- React 18 (Create React App)
- React Router
- Axios
- MUI + Ant Design

## 2) Prerequisites

- Node.js 18+ (Node.js 20 LTS recommended)
- npm 9+
- Backend API running (default: http://localhost:5000)

## 3) Install dependencies

From the frontend folder:

```bash
npm install
```

## 4) Environment configuration

This project uses:

- REACT_APP_API_URL

Create local env file from example:

### Windows (PowerShell)

```powershell
Copy-Item .env.example .env.development
```

### macOS/Linux

```bash
cp .env.example .env.development
```

Default local value:

```env
REACT_APP_API_URL=http://localhost:5000
```

For production build, set the same key in `.env.production`.

## 5) Run in development

```bash
npm start
```

The app runs at:

- http://localhost:3000

## 6) Build for production

```bash
npm run build
```

Output folder:

- build/

## 7) API integration notes

Frontend API base URL is read from environment in:

- src/services/apiService.js
- src/services/authService.js

If login or data loading fails, verify:

- Backend is running
- REACT_APP_API_URL points to correct backend URL
- Backend CORS allows frontend URL

## 8) Branding and static assets

Main public assets used by sidebar/logo:

- public/logo1.png
- public/image5.png
- public/logo.jpg
- public/logo512.png

Related UI reference:

- src/components/common/sidebar/sidebar.js

## 9) Common issues

### npm start fails on Windows

- Delete node_modules and package-lock.json
- Run npm install again

### Cannot call API from frontend

- Check browser console/network for CORS errors
- Confirm backend URL and port in env files

### Changes in env do not apply

- Restart npm start after editing env files

## 10) Quick start checklist

1. Start backend first
2. Set REACT_APP_API_URL in frontend env
3. Run npm install
4. Run npm start
