# Session State - Ben Digital Solutions

**Last updated:** 2026-11-11 (pre-restart checkpoint)  
**Purpose:** Restart checkpoint for the solo PM+PO. Read this first, then `PROJECT_CONTEXT.md`, then `project-management/04-monitoring-control/open-actions.md`.

## Current position
| Item | Status |
|------|--------|
| **Phases 0-5** | Complete / approved MVP (8 modules, WBS v1.1) |
| **Workflow 8 UI** | Implemented for MVP pages - shared UI/a11y; build OK; Vitest smoke |
| **Playwright E2E** | Auto-start `webServer`, deterministic `127.0.0.1:3000/8081`, axe-core scans. Public smoke+a11y **6/6**; optional admin suites skip without credentials |
| **Phase 5 QA** | Manual local UAT **PASS (2026-11-05)**; **OA-07 closed (owner-confirmed 2026-11-11)** |
| **Phase 6 Closure** | **Closed** - closure report updated; production deployment **deferred by owner (2026-11-11)** |
| **CI** | GitHub Actions **green** on `main` (run `43073393351`, 2026-11-11); `ubuntu-24.04`, Actions v7, `npm audit` 0 |

## Latest changes (committed)
- `f5cd20f` - MVP closure, OA-07 accepted, CI + hardening, axe E2E.
- `bbc72b4` - pin runners to `ubuntu-24.04` (Playwright vs Ubuntu 26.04).
- `e9e868f` - optional admin CRUD E2E skips cleanly without credentials; `ensureAuth` redirect race fixed.
- `7dbaa63` - Actions bumped (`checkout@v7`, `setup-node@v7`, `setup-python@v7`); frontend deps upgraded (`react-router-dom` 7.18.5, `@playwright/test` 1.65.0, `vitest` 4.1.12); `auth.setup` skips at file scope; `npm audit` 0.

## Resume after restart
1. Confirm working tree: `git status` (only `review.md` should be untracked).
2. Local verification (run after RAM is free):
   - Backend: `py manage.py check`; `py manage.py test --noinput` -> expect **21/21**.
   - Frontend: `npm run build`; `npm test` -> expect **1/1**.
   - Frontend: `npm run test:e2e` -> expect **6 passed, 7 skipped** (13 total; optional auth suites skip).
3. Optional: run authenticated admin E2E by setting `E2E_ADMIN_USERNAME`/`E2E_ADMIN_PASSWORD` (never commit) or `PLAYWRIGHT_USE_STORAGE_STATE=1` after `npx playwright test e2e/auth.setup.ts`.
4. Confirm CI remains green: `gh run list --branch main --limit 1`.

## Notes from 2026-11-11
- Local E2E was timing out only due to host RAM exhaustion (**1.2 GB free / 5.8 GB**) after unrelated `TASCL_REPORT-APP` dev servers were stopped; CI passes on a clean runner. Re-run locally only after reboot/freeing memory.
- Playwright 1.65 uses Chrome for Testing 158; browser installed. Vitest 4 + Vite 6 retained (no Vite major bump).

## Open actions
- **OA-11 (user, non-blocking):** remove Word lock file `~$...docx` if present.

## Constraints / guardrails
- Approved 8-module MVP only; deferred vision roadmap-only. Audit read-only/restricted; notifications in-app only. No secrets in git.
- `review.md` remains untracked by owner request (Workflow 8 source prompt).

## Verification quirks
- Backend tests need `--noinput` (leftover `test_bds` Postgres DB).
- Vitest is flaky if run concurrently with build - run sequentially.
- Playwright config hardcodes `workers: 1`.
- Each shell starts fresh: prepend `$env:Path += ';C:\Program Files\GitHub CLI'` for `gh`.
