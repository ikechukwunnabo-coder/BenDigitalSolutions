# Progress Log

## 2026-11-05 (Workflow 8 UI rollout + test scaffolding)
- **Reusable UI components:** `frontend/src/components/ui/*` with a11y-focused states/props; shared base styles in `frontend/src/index.css`.
- **Pages refactored:** public `Contact`; admin `AdminLayout`, `AdminLogin`, `Dashboard`, `Leads`, `Customers`, `ServicesAdmin`, `PortfolioAdmin`, `ProjectsAdmin`, `NotificationsAdmin`, `AuditAdmin`.
- **Verification:** frontend build OK (`npm run build`). Playwright E2E configured (`frontend/playwright.config.ts`, `frontend/e2e/smoke.spec.ts`, scripts `test:e2e*`) — **browser binaries not installed/run here** (`npm run test:e2e:install` + running `:3000/:8081` required). Vitest setup present but local execution was unreliable due Vite/Vitest config resolution on this machine; E2E + manual UAT used as UI verification baseline.
- **Docs:** `docs/ui-components.md`, `docs/PROGRESS.md`, `SESSION_STATE.md`, `docs/uat/UAT_CHECKLIST.md`, `frontend/e2e/README.md` updated. `review.md` intentionally left untracked.

## 2026-11-05 (Manual UAT)
- **Manual local UAT: PASS** (user-confirmed). Verified: dashboard summary, public pages, enquiry?lead+notification, admin CRUD/status, portfolio publish/unpublish visibility, notifications read/unread, audit read-only, staff-only access.
- **Note:** Formal independent UAT sign-off still requires OA-07 (Independent UAT Reviewer).

## 2026-11-05 (Acceptance pass + hardening)
- Tightened permissions/audit/auth; public enquiry enforces `status=new`; pagination + normalized errors; `seed_demo`; env-driven settings + `.env.example`.
- Verification: `py manage.py check` OK; backend tests **10/10 passing**.

## 2026-11-05
- Core MVP implemented per approved docs: backend APIs/auth/dashboard/enquiry/permissions + React SPA public/admin pages.

## 2026-11-02
- Backend + frontend foundations scaffolded; migrations applied; `manage.py check` clean.
