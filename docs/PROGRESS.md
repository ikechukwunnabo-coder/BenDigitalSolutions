# Progress Log

## 2026-11-05 (E2E/auth-a11y smoke hardening)
- **Playwright best practices applied:** `frontend/vite.config.ts` binds Vite to `127.0.0.1:3000` (`strictPort`); `frontend/playwright.config.ts` defaults to `127.0.0.1:3000` with CI retries/workers/forbidOnly, explicit timeouts, and failure artifacts (trace/screenshot/video). Playwright artifacts + `.opencode/` gitignored.
- **E2E suites added:** `frontend/e2e/smoke.spec.ts`, `frontend/e2e/a11y.spec.ts` (dependency-free roles/labels/landmarks/alert checks), `frontend/e2e/admin-auth.spec.ts` (optional; skipped unless `E2E_ADMIN_USERNAME`/`E2E_ADMIN_PASSWORD` env vars set; no credentials committed). Docs: `frontend/e2e/README.md`.
- **Verification (local, this session):** `npx playwright test e2e/smoke.spec.ts e2e/a11y.spec.ts e2e/admin-auth.spec.ts --reporter=line` => **6 passed, 1 skipped** (frontend `127.0.0.1:3000`, backend listening on `:8081`). Frontend build OK; Vitest smoke baseline retained.

## 2026-11-05 (Project controls + OA-07 prep)
- Open actions reconciled with evidence; remaining open **OA-07** (Independent UAT Reviewer) and **OA-11** (Word lock file if present). OA-07 template: `project-management/05-testing-acceptance/FORMAL_UAT_SIGNOFF_TEMPLATE.md`.
- Workflow 8/UI: shared components + Contact/all admin pages refactored with a11y baseline.

## 2026-11-05 (Manual UAT)
- **Manual local UAT: PASS** (user-confirmed). Formal independent UAT sign-off still requires OA-07.

## 2026-11-05 (Acceptance pass + hardening)
- Permissions/audit/auth/enquiry/pagination/errors/seed/env hardening. `manage.py check` OK; backend tests **10/10**.
