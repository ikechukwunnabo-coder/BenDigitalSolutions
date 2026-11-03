# Open Actions Register

Project: Ben Digital Solutions
Last updated: 2026-10-31
Owner of all actions unless stated: Project Manager (Benjamin Ikechukwu Nnabo)

| ID | Action | Source | Target phase | Status |
| --- | --- | --- | --- | --- |
| OA-01 | Reconcile WBS with the approved MVP: add tasks, estimates and acceptance criteria for portfolio API, notifications and audit logging | File assessment | Phase 1 | **Closed** — WBS v1.1 approved 2026-11-01 (portfolio, notifications, audit added; 175h + 31.5h contingency) |
| OA-02 | Produce a dated schedule/Gantt with dependencies, durations and critical path | File assessment | Phase 1 | Open |
| OA-03 | Produce itemised budget and budget tracker | File assessment | Phase 1 | Open |
| OA-04 | Create risk register with probability, impact, mitigation and owner | Charter §12 | Phase 1 | Open |
| OA-05 | Create communication plan and RACI matrix | Charter §23 | Phase 1 | Open |
| OA-06 | Write requirements (functional and non-functional), user stories and per-feature acceptance criteria | Charter §5 | Phase 1 | Open |
| OA-07 | Appoint the Independent UAT Reviewer | Decision 3 | Before UAT (Week 11) | Open |
| OA-08 | Personally review and sign the approval record; charter remains pending until then | Approval record | Phase 0 gate | **Closed** — project approved 2026-10-31 (approval-record v1.1) |
| OA-09 | Build holiday-aware capacity plan (21 Dec 2026 – 3 Jan 2027) and apply 15–20% contingency | Phase 0 authorisation | Phase 1 | Open |
| OA-10 | Resolve WBS filename ambiguity (`BEN DIGITAL SOLUTIONS.docx`) | File assessment | Phase 0 | **Closed** — original retained in archive; working copy renamed `work-breakdown-structure.md` |
| OA-11 | Close Microsoft Word to remove the `~$w to monitor your project in practice.docx` lock file | Archive instruction | Phase 0 | Open — user action |
| OA-12 | Create the initial Git commit | Repository setup | Phase 0 gate | Pending explicit approval — repository initialised only |
| OA-13 | Resolve Python version mismatch: charter specifies Python 3.12, installed interpreter is 3.14.8 | Environment check | Phase 3 (before Django setup) | **Closed** — Python 3.14.8 approved (CR-001) |
| OA-14 | Write technical documentation set (`SYSTEM_ARCHITECTURE`, `DATABASE_DESIGN`, `API_DESIGN`, `SECURITY_PLAN`, `TESTING_STRATEGY`, `PERFORMANCE_PLAN`, `DEVELOPMENT_ROADMAP`, `PROJECT_OVERVIEW`, `PROGRESS`) | Master engineering prompt §11 | Phase 2 | Open |
| OA-15 | Create `docs/PROJECT_OVERVIEW.md` and `docs/PROGRESS.md` continuity files | Master engineering prompt §11 | Phase 2 | Open |
| OA-16 | Define Definition of Done and milestone acceptance criteria | Decision log (Phase 1) | Phase 1 | Open |
| OA-17 | Confirm whether Django 5.2 supports the installed Python 3.14 runtime, or install Python 3.12 in a side-by-side environment | Environment check | Phase 3 | **Closed** — Django 5.2.8+ officially supports Python 3.14; pin `Django>=5.2.8,<6.0` |

## Closed actions

| ID | Resolution | Date |
| --- | --- | --- |
| OA-08 | Project owner approved the project; charter and management plan set to Approved; WBS approval conditioned on OA-01 | 2026-10-31 |
| OA-10 | WBS archived as `BEN DIGITAL SOLUTIONS.docx`; active copy is `project-management/02-planning/work-breakdown-structure.md` | 2026-10-31 |
| OA-13 | Python 3.14.8 approved as the runtime; change recorded as CR-001 | 2026-10-31 |
| OA-17 | Django 5.2.8 is the first 5.2 release with official Python 3.14 support; project will pin Django 5.2.8+ | 2026-10-31 |

## Rules

- An action is closed only with a recorded resolution, not on intent.
- Actions that affect the baseline must pass through change control.
- This register is reviewed at every weekly progress review.
