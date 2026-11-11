# Testing and Acceptance Records

Records and evidence for testing/UAT.

## Current state
- **Manual local UAT:** PASS (2026-11-05, user-confirmed) � see `docs/uat/UAT_CHECKLIST.md`.
- **Automated/dev checks:** backend `manage.py check` + **21/21 tests** pass; frontend build OK; Vitest smoke passing; Playwright smoke/a11y (axe-core) with auto-start servers (see `docs/ui-components.md`, `frontend/e2e/README.md`).
- **Formal UAT (OA-07):** **Closed (owner-confirmed 2026-11-11)** — evidence record `Ben_Digital_Solutions_Formal_UAT_Signoff.md`.

## Artifacts
- `docs/uat/UAT_CHECKLIST.md` � executed manual UAT + Confirmed formal UAT
- `FORMAL_UAT_SIGNOFF_TEMPLATE.md` � OA-07 evidence/sign-off template
- `frontend/e2e/` and `frontend/playwright.config.ts` � Playwright smoke E2E scaffold
- Backend tests: `backend/*/tests.py` (run via `py manage.py test -v 1`)

Never record a test result that was not actually executed.
