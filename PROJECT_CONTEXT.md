# PROJECT CONTEXT

Single source of truth for the current state of Ben Digital Solutions.
Update this file after every completed phase.

Last updated: 2026-11-01

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

**Phase 0 — Baseline and repository setup (COMPLETE, APPROVED 2026-10-31)**
**Next: Phase 1 — Planning (target completion 6 November 2026)**

Completed:
- Project approved by the owner; approval recorded in `approval-record.md` (v1.1)
- Python 3.14.8 approved as the runtime; Django must be 5.2.8 or newer (CR-001)
- Six source documents archived with SHA-256 verification
- Source inventory created
- Charter, PM plan, WBS, decision log, Phase 0 authorisation, monitoring guidance,
  master engineering prompt converted to Markdown
- Governance records created (approval record, change control, issue log, open actions,
  stakeholder register, MVP boundary)
- Repository structure and Git repository initialised

Not completed:
- Initial Git commit (explicit approval required — OA-12)
- Phase 1 planning set (requirements, reconciled WBS, schedule, budget, risk register,
  RACI, DoD)

## Decisions in force

| # | Decision | Status |
| --- | --- | --- |
| 1 | Lean 8-module MVP | Approved 2026-10-31 |
| 2 | Payments excluded from Version 1 | Approved 2026-10-31 |
| 3 | Independent UAT reviewer | Role defined; appointment pending (OA-07) |
| 4 | Hosting and domain procurement deferred to Phase 7 cost review | Approved 2026-10-31 |
| 5 | Staged Phase 0 then Phase 1 execution | Approved 2026-10-31 |
| 6 | Source documents archived unchanged; Markdown is the working copy | Approved 2026-10-31 |
| 7 | 2 November 2026 is a planning start, not a delivery baseline | Confirmed 2026-10-31 |
| 8 | Python 3.14.8 runtime, Django 5.2.8+ (supersedes prompt's Python 3.12) | Approved 2026-10-31 (CR-001) |
| 9 | Project initiation approved (charter and management plan) | Approved 2026-10-31 |

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

Begin Phase 1: requirements and user stories, task-level WBS reconciliation (OA-01),
dated schedule with holiday-aware capacity, itemised budget, risk register, communication
plan and RACI. Target completion: 6 November 2026.

## Standing rules

- No application development until the architecture gate is approved.
- No fabricated signatures, approvals, completed work or test results.
- Every claim of completion must cite evidence.
- Unapproved scope is excluded from the baseline.
- Review `open-actions.md` at every session.
