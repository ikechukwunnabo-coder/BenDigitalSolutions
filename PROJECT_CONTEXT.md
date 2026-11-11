# PROJECT CONTEXT

Single source of truth for the current state of Ben Digital Solutions.
Update this file after every completed phase.

Last updated: 2026-11-11

> Restarting a session? Read `SESSION_STATE.md` first, then this file.

## Project identity

- Project: Ben Digital Solutions — digital business platform
- Role: Project Manager and Product Owner (same person: Benjamin Ikechukwu Nnabo)
- Delivery model: solo development with AI assistance; AI has no approval authority
- Methodology: hybrid — formal PM controls plus two-week Agile iterations
- Planning commencement: 2 November 2026
- Provisional completion: 22 January 2027 (**not an approved baseline**)
- Capacity: 12–14 productive hours per week; 15–20% effort contingency required
- Location and timezone: Port Harcourt, Nigeria; Africa/Lagos
- Currency: NGN

## Current phase

**Phases 0–5 — COMPLETE. Phase 6 — Closure (records updated; production deployment deferred by owner).**

Completed:
- Phase 0 baseline: project approved, runtime decided (CR-001), sources archived and verified,
  governance records and repository created
- Phase 1 planning baseline: requirements, WBS v1.1, dated schedule, budget, risk register,
  RACI/communication plan, DoD and milestones
- Phases 2–4: system architecture and approved 8-module MVP implemented
  (`accounts`, `customers`, `crm`, `services`, `portfolio`, `projects`, `notifications`, `audit`)
  across Django/DRF backend and React/TypeScript/Vite frontend (public site + admin SPA)
- Workflow 8 shared UI component system and accessibility baseline
- Phase 5 QA: backend tests **21/21**; Vitest smoke passing; Playwright smoke+a11y **6/6**;
  manual local UAT **PASS 2026-11-05**; OA-07 formal UAT sign-off **owner-confirmed 2026-11-11**
- Quality hardening: GitHub Actions CI, Playwright `webServer` auto-start, `@axe-core/playwright`

Deferred / not actioned:
- Production deployment — explicitly deferred by owner decision (2026-11-11); deployment
  templates remain available in `deploy/` and `docs/deployment/`
- OA-11 administrative Word lock-file cleanup (user action, non-blocking)

## Decisions in force

| # | Decision | Status |
| --- | --- | --- |
| 1 | Lean 8-module MVP | Approved 2026-10-31 |
| 2 | Payments excluded from Version 1 | Approved 2026-10-31 |
| 3 | Independent UAT reviewer | Role defined; appointed and sign-off obtained (OA-07 closed 2026-11-11) |
| 4 | Hosting and domain procurement deferred to Phase 7 cost review | Approved 2026-10-31 |
| 5 | Staged Phase 0 then Phase 1 execution | Approved 2026-10-31 |
| 6 | Source documents archived unchanged; Markdown is the working copy | Approved 2026-10-31 |
| 7 | 2 November 2026 is a planning start, not a delivery baseline | Confirmed 2026-10-31 |
| 8 | Python 3.14.8 runtime, Django 5.2.8+ (supersedes prompt's Python 3.12) | Approved 2026-10-31 (CR-001) |
| 9 | Project initiation approved (charter and management plan) | Approved 2026-10-31 |
| 10 | OA-07 formal UAT sign-off obtained | Owner-confirmed 2026-11-11 |
| 11 | Production deployment deferred (Phase 6 closes without it) | Deferred 2026-11-11 |

## Constraints

- Budget framework ₦50,000–₦150,000; no procurement authorised yet
- 8 GB RAM laptop, Windows 11, solo capacity, ~10–15 h/week
- Dependence on internet connectivity and power
- Python 3.14.8 is the approved runtime; Django must be 5.2.8+ (OA-13 and OA-17 closed)
- PostgreSQL 17 and Node 20.18 are installed; `pandoc` is not installed

## Environment facts (verified 2026-10-31)

| Tool | Version |
| --- | --- |
| Git | 2.46.0.windows.1 |
| Python | 3.14.8 (approved; Django 5.2.8+ required) |
| Node.js | 20.18.0 |
| PostgreSQL client | 17.0 |

## Next task

Maintain Phase 6 closure records and keep CI green. Production deployment is intentionally
deferred; reopen only if the owner authorises it. Complete OA-11 administrative cleanup when
convenient.

## Standing rules

- No application development until the architecture gate is approved.
- No fabricated signatures, approvals, completed work or test results.
- Every claim of completion must cite evidence.
- Unapproved scope is excluded from the baseline.
- Review `open-actions.md` at every session.
