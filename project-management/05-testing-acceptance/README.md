# Testing and Acceptance Records

Records and evidence for testing/UAT.

## Current state
- **Manual local UAT:** PASS (2026-11-05, user-confirmed) — see `docs/uat/UAT_CHECKLIST.md`.
- **Automated/dev checks:** backend `manage.py check` + **10/10 tests** pass; frontend build OK; Vitest/Playwright scaffolding added (see `docs/ui-components.md`, `frontend/e2e/README.md`).
- **Formal UAT (OA-07):** **Pending** Independent UAT Reviewer appointment and sign-off evidence.

## Artifacts
- `docs/uat/UAT_CHECKLIST.md` — executed manual UAT + pending formal UAT
- `FORMAL_UAT_SIGNOFF_TEMPLATE.md` — OA-07 evidence/sign-off template
- `frontend/e2e/` and `frontend/playwright.config.ts` — Playwright smoke E2E scaffold
- Backend tests: `backend/*/tests.py` (run via `py manage.py test -v 1`)

Never record a test result that was not actually executed.
