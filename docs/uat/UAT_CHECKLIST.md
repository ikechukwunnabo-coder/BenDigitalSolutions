# UAT Checklist (MVP) - Ben Digital Solutions

## Scope
Approved 8 modules: accounts, customers, crm, services, portfolio, projects, notifications, audit.

## Automated/Dev Verification
- Backend checks: `py manage.py check` (pass)
- Backend tests: `py manage.py test -v 1` (10/10 pass)
- Frontend build: `npm run build` (pass)
- Frontend unit/smoke (Vitest): `cd frontend; npm run test` (pass; shared UI export smoke baseline)
- Frontend E2E (Playwright): `cd frontend; npm run test:e2e` — **12 passed** locally on 2026-11-05 when authenticated env vars provided (`6 passed, 1 skipped` without). Suites: `smoke.spec.ts`, `a11y.spec.ts`, `admin-auth.spec.ts` (optional), `admin-crud.spec.ts` (optional authenticated CRUD smoke; cleans up created records), `auth.setup.ts` (optional `storageState`). Setup: `npm run test:e2e:install`. Requires frontend `127.0.0.1:3000` + backend `127.0.0.1:8081` for full flows. Never commit credentials.

## Manual Local UAT (Executed 2026-11-05) - PASS
| Area | Result | Notes |
|---|---|---|
| Dashboard/API auth | Pass | CSRF/login/session + summary endpoints OK; PostgreSQL `bds` connected |
| Public site | Pass | Home/About/Services(+detail)/Portfolio(+detail) load; only published portfolio visible |
| Contact/enquiry | Pass | Enquiry submits; lead created (`new`); admin notification created |
| Leads/Customers/Projects/Services admin | Pass | CRUD/status flows functional for MVP |
| Portfolio publish flow | Pass | Publish/unpublish affects public visibility |
| Notifications | Pass | List/read/unread behavior OK |
| Audit | Pass | Read-only, restricted visibility; admin/API mutations logged |
| Access control | Pass | Staff/admin-only areas protected |

## Formal UAT (Pending)
- **OA-07:** Appoint Independent UAT Reviewer before Week 11 for formal sign-off evidence.
- Capture reviewer name/date, evidence (screenshots/logs), defects (if any), and final acceptance decision.
- Recommended evidence bundle: Playwright HTML/trace (if run), backend test output, `manage.py check`, build output, and screenshots for each MVP module flow.
