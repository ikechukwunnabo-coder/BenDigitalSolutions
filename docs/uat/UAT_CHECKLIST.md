# UAT Checklist (MVP) - Ben Digital Solutions

## Scope
Approved 8 modules: accounts, customers, crm, services, portfolio, projects, notifications, audit.

## Automated/Dev Verification
- Backend checks: `py manage.py check` (pass)
- Backend tests: `py manage.py test -v 1` (21/21 pass)
- Frontend build: `npm run build` (pass)
- Frontend unit/smoke (Vitest): `cd frontend; npm run test` (pass; shared UI export smoke baseline)
- Frontend E2E (Playwright): smoke+a11y **6 passed** locally on 2026-11-05; axe-core scans added 2026-11-11. Admin storageState mode (`auth.setup` + `PLAYWRIGHT_USE_STORAGE_STATE=1`) **5 passed, 1 skipped** for `admin-crud.spec.ts`. Playwright `webServer` auto-starts `127.0.0.1:3000` and `127.0.0.1:8081`. Never commit credentials/state.

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

## Formal UAT (Closed)
- **OA-07:** Closed — **Accepted** (owner-confirmed 2026-11-11). Evidence record: `project-management/05-testing-acceptance/Ben_Digital_Solutions_Formal_UAT_Signoff.md`.
- Final decision recorded as Accepted; attach reviewer name/date, execution dates, build/commit ID, evidence (screenshots/logs) and defects (if any) as available.
- Recommended evidence bundle: Playwright HTML/trace, backend test output, `manage.py check`, build output, and screenshots for each MVP module flow.
