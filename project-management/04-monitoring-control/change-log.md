# Change Log and Change-Control Procedure

Project: Ben Digital Solutions
Version: 1.0
Date: 2026-10-31
Status: One approved change (CR-001)

## What counts as a change

A change is any request that affects the approved baseline: scope, deliverables,
acceptance criteria, schedule, budget, technology stack, or architecture.

Routine implementation detail inside an approved design is **not** a change and does not
require this process.

## Procedure

1. **Identify** the requested change and record it in the register below with status `Proposed`.
2. **Justify** the business reason.
3. **Assess impact** on scope, schedule, cost, quality, risk and security.
4. **Decide** — Approve, Defer or Reject. The Project Manager/Product Owner decides for
   routine changes; changes to baseline dates, budget or MVP scope require the project
   owner's explicit sign-off.
5. **Update** affected documents (scope, WBS, schedule, budget, risk register).
6. **Implement** only after approval is recorded.
7. **Verify** the outcome and record it.

Unapproved changes must not be implemented and are not part of the baseline.

## Register

| ID | Date | Change requested | Reason | Scope impact | Schedule impact | Cost impact | Risk impact | Decision | Decision date | Implemented | Verified |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| CR-001 | 2026-10-31 | Use Python 3.14.8 instead of the prompt's Python 3.12 | Match the installed, current runtime | None | None | None | Low — requires Django 5.2.8+, which officially supports Python 3.14 | Approved | 2026-10-31 | Documentation updated; pin in backend requirements | Not yet — verify at environment setup |

## Baseline record

| Baseline | Version | Date approved | Approved by |
| --- | --- | --- | --- |
| Initiation (charter, management plan, decisions) | 1.0 | 2026-10-31 | Benjamin Ikechukwu Nnabo |
| WBS | 1.0 | Not yet approved — pending reconciliation (OA-01) | — |
| Schedule | — | Not yet baselined | — |
| Budget | — | Not yet baselined | — |

## Rules

- The baseline is whatever was last approved and signed, not whatever is newest.
- Every approved change increments the affected document's MAJOR version.
