# Progress Log

## 2026-11-05 (E2E/auth-a11y/CRUD smoke hardening)
- **Playwright best practices:** `frontend/vite.config.ts` binds Vite to `127.0.0.1:3000` (`strictPort`); `frontend/playwright.config.ts` defaults to `127.0.0.1:3000` with CI retries/workers/forbidOnly, explicit timeouts, failure artifacts, and optional `storageState` mode (`PLAYWRIGHT_USE_STORAGE_STATE=1`, `frontend/playwright/.auth/admin.json` gitignored). Playwright artifacts + `.opencode/` gitignored.
- **E2E suites:** `frontend/e2e/smoke.spec.ts`, `frontend/e2e/a11y.spec.ts` (dependency-free roles/labels/landmarks/alerts), `frontend/e2e/admin-auth.spec.ts` (optional), `frontend/e2e/admin-crud.spec.ts` (optional authenticated CRUD smoke: services/customers/portfolio/projects create-update-delete/toggles + read checks for leads/notifications/audit; uses UI login + Playwright request context/session+CSRF, cleans up created records), `frontend/e2e/auth.setup.ts` (optional storageState bootstrap). No credentials committed.
- **Fixes:** normalized `frontend/package.json` to valid UTF-8/no-BOM JSON after Vite PostCSS parse failure; fixed Playwright config ESM path handling.
- **Verification (local, 2026-11-05):** default suite **6 passed, 1 skipped**. With local env credentials set (`E2E_ADMIN_USERNAME`/`E2E_ADMIN_PASSWORD`), authenticated suites **6 passed**; full run **12 passed** (frontend `127.0.0.1:3000`, backend listening on `:8081`). Frontend build OK; Vitest smoke baseline retained.

## 2026-11-05 (Project controls + OA-07 prep)
- Open actions reconciled with evidence; remaining open **OA-07** (Independent UAT Reviewer) and **OA-11** (Word lock file if present). OA-07 template: `project-management/05-testing-acceptance/FORMAL_UAT_SIGNOFF_TEMPLATE.md`.
- Workflow 8/UI: shared components + Contact/all admin pages refactored with a11y baseline.

## 2026-11-05 (Manual UAT)
- **Manual local UAT: PASS** (user-confirmed). Formal independent UAT sign-off still requires OA-07.

## 2026-11-05 (Acceptance pass + hardening)
- Permissions/audit/auth/enquiry/pagination/errors/seed/env hardening. `manage.py check` OK; backend tests **10/10**.
