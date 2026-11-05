# Playwright E2E (local)

## Install browser (first time)
```powershell
cd frontend
npm run test:e2e:install
```

## Run (requires running app servers)
- Frontend: `npm run dev` (default http://localhost:3000)
- Backend API (for full flows): `py manage.py runserver 0.0.0.0:8081`

```powershell
npm run test:e2e
```

Optional base URL:
```powershell
$env:PLAYWRIGHT_BASE_URL='http://localhost:3000'; npm run test:e2e
```

Current smoke tests cover public home, contact validation accessibility feedback, and admin login form labels. Extend with authenticated CRUD flows once stable test credentials/seed data are available.
