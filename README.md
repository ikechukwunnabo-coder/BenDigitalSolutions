# Ben Digital Solutions — Digital Business Platform

Digital solutions, business automation and data intelligence for small and medium-sized
businesses. Primary market: Nigeria. Timezone: Africa/Lagos. Currency: NGN.

This repository contains the project management record and the **approved 8-module MVP application** (Django/DRF backend + React/TypeScript/Vite frontend). The MVP is complete and closed; production deployment is intentionally deferred by owner decision, with templates retained for future use.

## Current status

| Item | State |
| --- | --- |
| Phases 0–4 | Complete for approved MVP scope (WBS v1.1) |
| Initiation / WBS baselines | **Approved** (2026-10-31 / v1.1 2026-11-01) |
| Application code | Implemented: `backend/` (Django 5.2/DRF) + `frontend/` (React/TS/Vite/Tailwind) |
| Backend tests | **21/21 passing** (`cd backend && py manage.py test`) |
| Frontend tests | Vitest smoke + Playwright E2E (smoke/a11y with axe-core/admin flows; auto-start `webServer`) |
| Manual UAT | Local UAT **PASS** 2026-11-05; **OA-07 formal sign-off closed** (owner-confirmed 2026-11-11) |
| Phase 6 closure | **Closed** — see `project-management/03-execution/closure-report.md` |
| Production deployment | **Deferred by owner** (2026-11-11) — templates in `deploy/` and `docs/deployment/` |
| CI | GitHub Actions — `.github/workflows/ci.yml` (backend tests, build, Vitest, Playwright) |

## Structure

```
archive/source-documents/     Original .docx files (read-only) + inventory
project-management/
  01-initiation/              Charter, decision log, phase 0 authorisation, approval record
  02-planning/                PM plan, WBS, MVP boundary, monitoring, requirements, schedule, budget
  03-execution/               Execution records / closure report
  04-monitoring-control/      Change log, issue log, risk register, open actions, status
  05-testing-acceptance/      UAT checklist, formal sign-off template
  06-closure/                 Closure records
docs/                         Engineering, testing, deployment, UI, UAT, progress docs
backend/                      Django 5.2 / DRF app (approved MVP modules + API/auth)
frontend/                     React + TypeScript + Vite + Tailwind SPA + Playwright/Vitest
deploy/                       Nginx/Gunicorn/deployment templates
.github/workflows/            CI pipeline (backend + frontend + E2E)
SESSION_STATE.md              Restart checkpoint — read this first after a reboot
PROJECT_CONTEXT.md            Living state of the project
CHANGELOG.md                  Notable project/application changes
```

## Read order

1. `SESSION_STATE.md` — resume point after a restart
2. `PROJECT_CONTEXT.md` — current phase, constraints, next task
3. `project-management/01-initiation/project-charter.md`
4. `project-management/01-initiation/decision-log.md`
5. `project-management/02-planning/project-management-plan.md`
6. `project-management/02-planning/work-breakdown-structure.md`
7. `project-management/02-planning/mvp-scope-boundary.md`
8. `docs/master-engineering-prompt.md` — governing engineering rules

## Approved MVP modules

`accounts`, `customers`, `crm`, `services`, `portfolio`, `projects`, `notifications`, `audit`

Deferred: proposals, invoicing, payments, digital products, orders, subscriptions,
learning, advanced analytics.

## Local development (Windows)

- Backend: `cd backend && py manage.py runserver 127.0.0.1:8081` (uses `backend/.env`, gitignored)
- Frontend: `cd frontend && npm install && npm run dev` (Vite `127.0.0.1:3000`, proxy `/api` → `127.0.0.1:8081`)
- Tests: `cd backend && py manage.py test`; `cd frontend && npm test`; `npm run test:e2e` (see `frontend/e2e/README.md`; authenticated runs prefer `auth.setup.ts` + `PLAYWRIGHT_USE_STORAGE_STATE=1`)

## Ground rules

- Keep scope to the approved 8-module MVP unless change control approves expansion.
- Do not fabricate approvals, test results or completed work.
- Never edit or delete files in `archive/source-documents/`. Keep `review.md` untracked unless explicitly requested.
- Keep secrets out of the repository; use `.env` locally and `.env.example` as the template.

## Technology stack (approved)

Python 3.14.8, Django 5.2.8+ (first 5.2 release with official Python 3.14 support),
Django REST Framework, PostgreSQL 17, React + TypeScript + Vite + Tailwind CSS.
Recorded as CR-001 in `project-management/04-monitoring-control/change-log.md`.

## Source documents

All original Word documents were archived unmodified on 2026-10-31 with SHA-256
verification. See `archive/source-documents/INVENTORY.md`.
