# Formal UAT Sign-off (OA-07 Evidence) - Ben Digital Solutions MVP

**Project:** Ben Digital Solutions - Digital Business Platform  
**MVP scope:** `accounts`, `customers`, `crm`, `services`, `portfolio`, `projects`, `notifications`, `audit` (WBS v1.1)  
**OA-07:** Independent UAT Reviewer appointment required before Week 11.

## Reviewer details
| Field | Value |
|---|---|
| Independent UAT Reviewer (name) |  |
| Role / independence statement |  |
| Appointment date |  |
| UAT execution date(s) |  |
| Environment (local/staging/prod URL) |  |
| Build/commit under test |  |

## Evidence reviewed (attach paths/links)
- [ ] Backend checks: `py manage.py check`
- [ ] Backend tests: `py manage.py test -v 1` (result: ____)
- [ ] Frontend build: `npm run build`
- [ ] Frontend tests: `npm run test` / Playwright traces (`frontend/test-results` if run)
- [ ] `docs/uat/UAT_CHECKLIST.md`
- [ ] Screenshots/videos for each module flow
- [ ] Defect log / issue references (if any)

## Module acceptance
| Module / flow | Pass/Fail | Evidence / notes |
|---|---|---|
| Auth/dashboard (staff-only) |  |  |
| Public site + published portfolio visibility |  |  |
| Contact/enquiry -> lead (`new`) + notification |  |  |
| Leads CRM (status/CRUD as scoped) |  |  |
| Customers (admin CRUD, permissions) |  |  |
| Services (admin CRUD/active toggle, public read) |  |  |
| Portfolio (CRUD, publish/unpublish visibility) |  |  |
| Projects (CRUD/status) |  |  |
| Notifications (in-app, read/unread) |  |  |
| Audit (read-only, restricted, mutation/admin access logged) |  |  |

## Defects
| ID | Severity | Description | Status | Resolution / waiver |
|---|---|---|---|---|

## Final decision
- [ ] **Accepted** - MVP meets approved scope/acceptance criteria for formal UAT.
- [ ] **Accepted with conditions** - list conditions and target dates.
- [ ] **Not accepted** - list blocking defects.

**Reviewer signature/name:** ____________________  **Date:** ____________  
**Project Owner acknowledgement:** Benjamin Ikechukwu Nnabo  **Date:** ____________
