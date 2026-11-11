# Changelog

All notable project and document changes are recorded here.
Format follows Keep a Changelog conventions; dates are ISO 8601.

## [Unreleased]

_No unreleased changes recorded yet._

## [0.4.0] - 2026-11-11 — MVP closure, CI, and quality hardening

### Added
- GitHub Actions CI (`.github/workflows/ci.yml`): backend system check/tests, frontend build, Vitest, and Playwright E2E.
- Playwright `webServer` auto-start for backend + Vite, and backend health endpoint `GET /api/health/`.
- `@axe-core/playwright` accessibility scans for serious/critical WCAG 2 A/AA violations in `frontend/e2e/a11y.spec.ts`.
- Project-specific `frontend/README.md` replacing the Vite template boilerplate.

### Changed
- **OA-07 closed — formal UAT Accepted** (owner-confirmed 2026-11-11); UAT evidence record at `project-management/05-testing-acceptance/Ben_Digital_Solutions_Formal_UAT_Signoff.md`.
- **Phase 6 closure completed** (`project-management/03-execution/closure-report.md`); production deployment deferred by owner decision.
- `PROJECT_CONTEXT.md`, `docs/DEVELOPMENT_ROADMAP.md`, `docs/PROGRESS.md`, `SESSION_STATE.md`, `README.md` updated to current state.
- Root `.env.example` corrected to match `config.settings` (`DATABASE_URL`, `:8081` API base, no non-existent `config.settings.dev`).

### Notes
- OA-11 remains the only open action (administrative Word lock-file cleanup).
- `review.md` remains untracked by owner request.
- Production deployment templates are retained but not executed.

## [0.3.0] - 2026-11-06 — MVP implementation, testing hardening, and dev-stage readiness

### Added
- Approved 8-module MVP backend/frontend implementation (accounts/customers/crm/services/portfolio/projects/notifications/audit), SPA auth, admin CRUD, dashboard, public pages, deployment templates (`deploy/`), and engineering/PM documentation updates.
- Workflow 8 shared UI components (`frontend/src/components/ui/*`), a11y-focused page refactors, and `docs/ui-components.md`.
- Playwright E2E suites/helpers (`frontend/e2e/*`): smoke, dependency-free a11y, optional authenticated admin smoke/CRUD, `auth.setup` + `storageState` path; Vitest smoke stabilized.
- Real backend tests for previously stubbed apps: `audit`, `notifications`, `projects`, `services` (backend suite **21/21 passing**).
- OA-07 formal UAT sign-off template and readiness notes in testing/control docs.

### Changed
- Local dev config hardened: Vite binds `127.0.0.1:3000` with proxy `/api` → `127.0.0.1:8081`, HMR host/port aligned, frontend API base defaults to `/api`.
- `README.md` updated from pre-implementation status to current MVP/testing/deployment-pending state.
- Playwright credential-mode login helper stabilized (clear cookies, explicit waits, retry on login alert); `storageState` remains preferred for authenticated runs.

### Fixed
- Duplicate local backend listener on `:8081` (stale process) stopped during dev verification.
- Frontend local CORS/proxy/HMR and package encoding issues addressed in prior commits; HMR WebSocket host/port mismatch fixed (`77afa6d`).

### Notes
- `review.md` remains **untracked** by user request.
- **OA-07** (external Independent UAT Reviewer sign-off) and **OA-11** (Word lock file, if present) remain open. Production deployment remains pending dev-stage testing completion and production credentials/details.

## [0.2.2] - 2026-11-02 — WBS v1.1 reconciliation

### Changed
- project-management/02-planning/work-breakdown-structure.md reconciled to v1.1 (approved 2026-11-01): added portfolio, notifications, and audit tasks with estimates and acceptance criteria.
- Effort updated: 175 hours work + 31.5 hours contingency (18%) = 206.5 hours planning envelope (supersedes 140 hours).
- Confirmed assumptions: notifications basic in-app only; audit logs basic read-only; portfolio full CRUD with publish/unpublish.
- project-management/02-planning/mvp-scope-boundary.md updated to reflect reconciliation complete.
- project-management/04-monitoring-control/open-actions.md: OA-01 closed.
- README.md, PROJECT_CONTEXT.md, SESSION_STATE.md updated to reflect WBS v1.1 approval.

## [0.2.1] - 2026-11-01 — Session checkpoint

### Added
- `SESSION_STATE.md` — restart checkpoint with phase, decisions, open actions, next steps.
- `PROJECT_CONTEXT.md` and `README.md` now point to the checkpoint as the first read.

### Changed
- README status refreshed to "between Phase 0 and Phase 1"; next gate set to Phase 1
  planning baseline approval (target 6 November 2026).

## [0.2.0] - 2026-10-31 — Project approval and runtime decision

### Changed
- Project charter and management plan status changed from `Proposed - Pending Approval` to `Approved - 2026-10-31`.
- `approval-record.md` raised to version 1.1 with the approval recorded and conditions stated.
- Python runtime changed from 3.12 (in the master prompt) to 3.14.8, recorded as CR-001.
- Django requirement set to `>=5.2.8,<6.0` because 5.2.8 is the first 5.2 release with official Python 3.14 support.
- `docs/master-engineering-prompt.md` carries a local amendment note; the converted body is unchanged.
- `README.md` and `PROJECT_CONTEXT.md` updated to the approved state and new runtime.
- `change-log.md` records CR-001 and the approved initiation baseline.
- `open-actions.md`: OA-08, OA-13 and OA-17 closed. OA-01 and OA-02 remain the top planning gaps.
- `initialFileAssessment.md` addendum records the approval and runtime decisions.

## [0.1.0] - 2026-10-31 — Phase 0 baseline setup

### Added
- `archive/source-documents/` containing the six original Word documents, unmodified.
- `archive/source-documents/INVENTORY.md` with sizes, dates, versions and SHA-256 hashes.
- `project-management/01-initiation/project-charter.md` (charter Part A, converted).
- `project-management/02-planning/project-management-plan.md` (charter Part B, converted).
- `project-management/02-planning/work-breakdown-structure.md` (converted; renamed from `BEN DIGITAL SOLUTIONS.docx`).
- `project-management/01-initiation/decision-log.md` (converted).
- `project-management/01-initiation/phase0-authorisation.md` (converted).
- `project-management/02-planning/monitoring-approach.md` (converted).
- `docs/master-engineering-prompt.md` (converted).
- `project-management/01-initiation/approval-record.md` — unsigned, awaiting owner.
- `project-management/01-initiation/stakeholder-register.md` — draft.
- `project-management/02-planning/mvp-scope-boundary.md` — approved boundary.
- `project-management/04-monitoring-control/change-log.md` — change-control procedure.
- `project-management/04-monitoring-control/issue-log.md` — empty register.
- `project-management/04-monitoring-control/open-actions.md` — 17 actions tracked.
- `docs/README.md` — documentation index with honest status.
- `README.md`, `PROJECT_CONTEXT.md`, `.gitignore`, `.env.example`.
- `initialFileAssessment.md` — assessment of all source documents.

### Changed
- Source `.docx` files moved out of the repository root into the archive.
- Work Breakdown Structure renamed to `work-breakdown-structure.md` for clarity.

### Notes
- No approval has been granted. Charter, plan and WBS remain proposed.
- No application code created, by instruction.
- Python version mismatch recorded as OA-13.
- WBS reconciliation gap recorded as OA-01.
