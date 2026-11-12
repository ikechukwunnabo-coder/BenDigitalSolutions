# Progress Log

## 2026-11-11 (Post-restart verification + manual UAT re-run)
- **Local verification:** backend `check` clean; backend tests **21/21**; frontend build OK; Vitest **1/1**. Local Playwright E2E deferred (host RAM ~0.9 GB free); CI green.
- **OA-11 closed:** Word lock file `~$w to monitor your project in practice.docx` removed.
- **OA-18 closed:** removed accidental 18-file duplicate Vite template directory; commit `0a1b625` pushed; CI run `43090397597` green (backend + frontend/E2E).
- **Manual local UAT re-run: PASS** against `0a1b625` (owner-executed): public pages, enquiry validation/submission, admin auth, CRUD, portfolio publish/unpublish visibility, notifications, audit, access control. No defects reported. Recorded in `docs/uat/UAT_CHECKLIST.md`.

## 2026-11-11 (CI green + dependency security)
- **CI fixed and green:** run `43073393351` passes backend + frontend; runners pinned to `ubuntu-24.04` (Playwright 1.52 rejected Ubuntu 26.04).
- **Actions bumped:** `checkout@v7`, `setup-node@v7`, `setup-python@v7` (Node 20 deprecation warnings cleared).
- **Security:** `react-router-dom` 7.18.5, `@playwright/test` 1.65.0, `vitest` 4.1.12; `npm audit` **0 vulnerabilities** (was 10).
- **E2E:** optional admin suites skip without credentials; `auth.setup` skips before browser launch.
- **Local E2E note:** timeouts traced to host RAM exhaustion (1.2/5.8 GB free), not code; CI clean-runner green.

## 2026-11-11 (Closure + hardening)
- **OA-07 closed** (owner-confirmed): formal UAT **Accepted**; evidence file `project-management/05-testing-acceptance/Ben_Digital_Solutions_Formal_UAT_Signoff.md`.
- **Phase 6 closure completed:** `project-management/03-execution/closure-report.md` updated. Production deployment **deferred by owner decision**.
- **CI added:** `.github/workflows/ci.yml` runs backend check/tests, frontend build, Vitest and Playwright E2E.
- **E2E hardening:** Playwright `webServer` auto-starts backend + Vite; new `/api/health/` endpoint; `@axe-core/playwright` scans in `a11y.spec.ts`.
- **Doc/config drift fixed:** `PROJECT_CONTEXT.md`, `docs/DEVELOPMENT_ROADMAP.md`, root `.env.example`, `frontend/README.md`.
- **Verification:** backend **21/21**; frontend build OK; Vitest **1/1**.

## 2026-11-05 (E2E/auth-a11y/CRUD/storageState hardening)
- **Playwright best practices:** `frontend/vite.config.ts` binds Vite to `127.0.0.1:3000` (`strictPort`); `frontend/playwright.config.ts` defaults to `127.0.0.1:3000` with CI retries/workers/forbidOnly, explicit timeouts, failure artifacts, and optional `storageState` mode (`PLAYWRIGHT_USE_STORAGE_STATE=1`, `frontend/playwright/.auth/admin.json` gitignored). `frontend/src/services/api.ts` defaults API base to `http://127.0.0.1:8081/api` for deterministic local E2E.
- **E2E suites:** `frontend/e2e/smoke.spec.ts`, `frontend/e2e/a11y.spec.ts` (dependency-free), `frontend/e2e/admin-auth.spec.ts` (optional), `frontend/e2e/admin-crud.spec.ts` (authenticated admin routes + CRUD smoke for services/customers/portfolio/projects with cleanup; read checks for leads/notifications/audit; uses UI auth + Playwright request context/session+CSRF), `frontend/e2e/auth.setup.ts` (optional `storageState` bootstrap), helpers in `frontend/e2e/helpers/admin.ts`. No credentials committed.
- **Fixes:** normalized `frontend/package.json` to UTF-8/no-BOM JSON; fixed Playwright ESM path handling (`fileURLToPath`/`__dirname`); aligned frontend API base to `127.0.0.1` for local E2E.
- **Verification (local, 2026-11-05):** smoke+a11y **6 passed**. StorageState mode (`auth.setup` generated state; `PLAYWRIGHT_USE_STORAGE_STATE=1`) admin CRUD **5 passed, 1 skipped**. Credential-mode authenticated tests may be environment-sensitive (browser/session reuse) � storageState bootstrap is the preferred stable path for admin suites.

## 2026-11-05 (Project controls + OA-07 prep)
- Open actions reconciled with evidence; remaining open **OA-07** (Independent UAT Reviewer) and **OA-11** (Word lock file if present). OA-07 template: `project-management/05-testing-acceptance/FORMAL_UAT_SIGNOFF_TEMPLATE.md`.
- Workflow 8/UI: shared components + Contact/all admin pages refactored with a11y baseline.

## 2026-11-05 (Manual UAT)
- **Manual local UAT: PASS** (user-confirmed). Formal independent UAT sign-off still requires OA-07.

## 2026-11-05 (Acceptance pass + hardening)
- Permissions/audit/auth/enquiry/pagination/errors/seed/env hardening. `manage.py check` OK; backend tests **10/10**.
