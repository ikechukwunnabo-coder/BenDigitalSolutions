# Playwright E2E (local)

## Install browser (first time)
```powershell
cd frontend
npm run test:e2e:install
```

## Best-practice local run
Vite is configured to bind `127.0.0.1:3000` (`strictPort`) for deterministic E2E; Playwright defaults to the same base URL.

1. Start backend API (for full/authenticated flows): `cd backend; py manage.py runserver 127.0.0.1:8081`
2. Start frontend: `cd frontend; npm run dev`
3. Run tests: `cd frontend; npm run test:e2e`

Override base URL only when needed:
```powershell
$env:PLAYWRIGHT_BASE_URL='http://127.0.0.1:3000'; npm run test:e2e
```

## Current smoke coverage
- Public home navigation/content renders
- Contact form accessible validation feedback (`role="alert"`)
- Admin login labeled form controls

## Artifacts / notes
- Traces/screenshots/videos are kept on failure (`frontend/test-results/`, `frontend/playwright-report/` are gitignored).
- Extend with authenticated CRUD flows using seeded staff credentials and `storageState` only when secrets are handled safely (never commit credentials).
