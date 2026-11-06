# Playwright E2E (local)

## Install browser (first time)
```powershell
cd frontend
npm run test:e2e:install
```

## Best-practice local run
Vite is configured to bind `127.0.0.1:3000` (`strictPort`) for deterministic E2E; Playwright defaults to the same base URL.

1. Start backend API (for full/authenticated flows): `cd backend; py manage.py runserver 127.0.0.1:8081`
2. Start frontend: `cd frontend; npm run dev` (restart required if an old Vite process is still bound to `[::1]:3000`)
3. Run tests: `cd frontend; npm run test:e2e`

Useful variants:
```powershell
npm run test:e2e:headed
$env:PLAYWRIGHT_BASE_URL='http://127.0.0.1:3000'; npm run test:e2e
```

## Test suites
- `smoke.spec.ts` — public home, contact accessible validation feedback (`role="alert"`), admin login labels
- `a11y.spec.ts` — dependency-free accessibility smoke (roles/labels/landmarks/alerts) for key public/admin-entry pages
- `admin-auth.spec.ts` — **optional, skipped unless env vars set** authenticated admin smoke (never commit credentials):
  ```powershell
  $env:E2E_ADMIN_USERNAME='BDSAdmin'; $env:E2E_ADMIN_PASSWORD='...'; npm run test:e2e
  ```

## Artifacts / notes
- Traces/screenshots/videos are kept on failure (`frontend/test-results/`, `frontend/playwright-report/` are gitignored).
- If Playwright cannot reach `localhost` but Vite is bound to `[::1]:3000`, restart Vite (preferred) or temporarily set `$env:PLAYWRIGHT_BASE_URL='http://[::1]:3000'`.
- Future hardening: add `@axe-core/playwright` once dependency install is stable in CI/local, plus authenticated CRUD flows using `storageState` from env/CI secrets only.
