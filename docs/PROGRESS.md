# Progress Log

## 2026-11-05 (E2E best-practice hardening)
- **Playwright best practices applied (local):** `frontend/vite.config.ts` now binds dev server to `127.0.0.1:3000` (`strictPort`); `frontend/playwright.config.ts` defaults to `http://127.0.0.1:3000`, adds CI retries/workers/forbidOnly/reporting, explicit timeouts, and failure artifacts (trace/screenshot/video). `frontend/e2e/README.md` updated.
- **Git hygiene:** ignored Playwright artifacts and `.opencode/` in `.gitignore` and `frontend/.gitignore`; removed temporary local e2e log/results.
- **Verification (this session):** Playwright smoke E2E **3/3 passed** against the running local frontend (note: existing dev server was bound to `[::1]:3000`; best-practice config targets `127.0.0.1:3000`—restart Vite to apply). Backend 10/10 and manual UAT PASS remain previously recorded.

## 2026-11-05 (Project controls + OA-07 prep)
- **Open actions reconciled:** `project-management/04-monitoring-control/open-actions.md` evidence-closed completed baselines; open **OA-07** (Independent UAT Reviewer) and **OA-11** (Word lock file if present).
- **Testing/closure records:** added `project-management/05-testing-acceptance/FORMAL_UAT_SIGNOFF_TEMPLATE.md`; updated testing/closure READMEs and milestone/status docs.
- **Workflow 8/UI QA:** shared UI components + all admin/public key pages refactored; frontend build OK; Vitest smoke; Playwright E2E scaffold configured.

## 2026-11-05 (Manual UAT)
- **Manual local UAT: PASS** (user-confirmed). Formal independent UAT sign-off still requires OA-07.

## 2026-11-05 (Acceptance pass + hardening)
- Permissions/audit/auth/enquiry/pagination/errors/seed/env hardening. `manage.py check` OK; backend tests **10/10**.
