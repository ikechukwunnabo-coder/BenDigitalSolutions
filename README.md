# Ben Digital Solutions — Digital Business Platform

Digital solutions, business automation and data intelligence for small and medium-sized
businesses. Primary market: Nigeria. Timezone: Africa/Lagos. Currency: NGN.

This repository holds both the project management record and (later) the application code.
It is currently **between Phase 0 (approved) and Phase 1 (planning)**. No application code
exists yet.

## Current status

| Item | State |
| --- | --- |
| Phase | 0 complete — approved; Phase 1 planning next |
| Initiation baseline | **Approved 2026-10-31** (charter and management plan) |
| WBS baseline | **Approved v1.1 (2026-11-01)** |
| Delivery baseline (schedule, budget, reconciled WBS) | Not established |
| Application code | Not started (by instruction) |
| Next gate | Phase 1 planning baseline approval — target 6 November 2026 |

## Structure

```
archive/source-documents/     Original .docx files (read-only) + inventory
project-management/
  01-initiation/              Charter, decision log, phase 0 authorisation, approval record
  02-planning/                PM plan, WBS, MVP boundary, monitoring approach
  03-execution/               Sprint records (empty)
  04-monitoring-control/      Change log, issue log, open actions, weekly status
  05-testing-acceptance/      Test and UAT records (empty)
  06-closure/                 Closure report and lessons learned (empty)
docs/                         Engineering documentation set (master prompt available)
backend/                      Django 5.2 / DRF / Python (empty)
frontend/                     React + TypeScript + Vite + Tailwind (empty)
SESSION_STATE.md              Restart checkpoint — read this first after a reboot
PROJECT_CONTEXT.md            Living state of the project
initialFileAssessment.md      Assessment of the original source documents
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

## Ground rules

- Do not start application development before the architecture gate is approved.
- Do not fabricate approvals, test results or completed work.
- Never edit or delete files in `archive/source-documents/`.
- Keep secrets out of the repository; use `.env` locally and `.env.example` as the template.
- Proposed plans and approved baselines are different things. Label them correctly.

## Technology stack (approved)

Python 3.14.8, Django 5.2.8+ (first 5.2 release with official Python 3.14 support),
Django REST Framework, PostgreSQL 17, React + TypeScript + Vite + Tailwind CSS.
Recorded as CR-001 in `project-management/04-monitoring-control/change-log.md`.

## Source documents

All original Word documents were archived unmodified on 2026-10-31 with SHA-256
verification. See `archive/source-documents/INVENTORY.md`.
