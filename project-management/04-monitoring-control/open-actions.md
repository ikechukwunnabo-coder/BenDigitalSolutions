# Open Actions Register

Project: Ben Digital Solutions  
Last updated: 2026-11-11  
Owner of all actions unless stated: Project Manager (Benjamin Ikechukwu Nnabo)

| ID | Action | Source | Target phase | Status | Evidence / notes |
|---|---|---|---|---|---|
| OA-01 | Reconcile WBS with approved MVP (portfolio, notifications, audit; estimates/AC) | File assessment | Phase 1 | **Closed** | WBS v1.1 approved 2026-11-01 (`project-management/02-planning/work-breakdown-structure.md`) |
| OA-02 | Produce dated schedule/Gantt with dependencies, durations, critical path | File assessment | Phase 1 | **Closed (baseline v1.0)** | `project-management/02-planning/project-schedule.md` (sprints, key dates, critical path). Detailed Gantt/actual tracking can be refined in control reviews. |
| OA-03 | Produce itemised budget and budget tracker | File assessment | Phase 1 | **Closed (baseline v1.0)** | `project-management/02-planning/budget-tracker.md`; no spend authorised beyond framework controls. |
| OA-04 | Create risk register (probability, impact, mitigation, owner) | Charter A�12 | Phase 1 | **Closed (baseline v1.0)** | `project-management/04-monitoring-control/risk-register.md` (reviewed/active). |
| OA-05 | Create communication plan and RACI matrix | Charter A�23 | Phase 1 | **Closed (baseline v1.0)** | `project-management/02-planning/communication-plan-raci.md`. |
| OA-06 | Write requirements (FR/NFR), user stories, per-feature acceptance criteria | Charter A�5 | Phase 1 | **Closed (baseline v1.0)** | `project-management/02-planning/requirements-specification.md`. |
| OA-07 | Appoint the Independent UAT Reviewer | Decision 3 | Before Week 11 | **Closed (owner-confirmed 2026-11-11)** | Owner confirms the Independent UAT Reviewer was appointed and sign-off obtained. Evidence record: `project-management/05-testing-acceptance/Ben_Digital_Solutions_Formal_UAT_Signoff.md`. Supporting automated evidence: manual local UAT PASS 2026-11-05; backend tests **21/21**; Playwright smoke+a11y **6/6**; authenticated admin E2E/storageState path (`frontend/e2e/*`). Final decision: **Accepted** (owner-confirmed 2026-11-11). Attach detailed per-module evidence as available (non-blocking). |
| OA-08 | Personally review and sign approval record | Approval record | Phase 0 gate | **Closed** | Approved 2026-10-31 (approval-record v1.1). |
| OA-09 | Holiday-aware capacity plan (21 Dec 2026�3 Jan 2027) + 15�20% contingency | Phase 0 auth | Phase 1 | **Closed (baseline)** | Captured in `project-schedule.md` and WBS v1.1 contingency (31.5 hrs / 18%). |
| OA-10 | Resolve WBS filename ambiguity | File assessment | Phase 0 | **Closed** | Working copy `work-breakdown-structure.md`; original archived. |
| OA-11 | Close Microsoft Word to remove `~$...docx` lock file | Archive instruction | Phase 0 | **Open (user action)** | Check/remove local lock file if present before final archival edits. |
| OA-12 | Create initial Git commit / repo history | Repository setup | Phase 0 gate | **Closed** | Git history present and pushed to `origin/main` (e.g., `eda38ec`, prior commits). Record formal approval note in controls if required. |
| OA-13 | Resolve Python version mismatch (3.12 vs 3.14.8) | Environment check | Phase 3 | **Closed** | Python 3.14.8 approved (CR-001). |
| OA-14 | Write technical documentation set | Master eng prompt A�11 | Phase 2 | **Closed** | `docs/SYSTEM_ARCHITECTURE.md`, `DATABASE_DESIGN.md`, `API_DESIGN.md`, `SECURITY_PLAN.md`, `TESTING_STRATEGY.md`, `PERFORMANCE_PLAN.md`, `DEVELOPMENT_ROADMAP.md`, `PROJECT_OVERVIEW.md`, `PROGRESS.md` (+ deployment/UI/UAT docs). |
| OA-15 | Create `docs/PROJECT_OVERVIEW.md` and `docs/PROGRESS.md` continuity files | Master eng prompt A�11 | Phase 2 | **Closed** | Files present and maintained. |
| OA-16 | Define Definition of Done and milestone acceptance criteria | Decision log | Phase 1 | **Closed (baseline v1.0)** | `project-management/02-planning/dod-milestones.md` (milestone statuses require periodic update). |
| OA-17 | Confirm Django 5.2 supports installed Python 3.14, or use side-by-side 3.12 | Environment check | Phase 3 | **Closed** | Django 5.2.8+ supports Python 3.14; project pins compatible Django. |

## Open summary
- **OA-11** � user action: remove Word lock file if present (administrative only; does not block closure).

## Rules
- An action is closed only with a recorded resolution/evidence reference, not on intent.
- Actions affecting baseline must pass through change control.
- Review at every weekly progress/control review.
