# MVP Scope Boundary — Version 1

Project: Ben Digital Solutions — Digital Business Platform Development
Decision source: `project-management/01-initiation/decision-log.md` (Decision 1 and 2)
Decision status: **Approved by project owner (2026-10-31)**
Version: 1.0
Date: 2026-10-31

## Purpose

This document records the approved Version 1 boundary so that requirements, WBS, schedule,
API design and acceptance criteria can be reconciled against a single source of truth.

## Build in Version 1

| Module | Responsibility | Public UI | Admin UI |
| --- | --- | --- | --- |
| `accounts` | Authentication, user roles, permissions | Login (admin only) | User and role management |
| `customers` | Customer records and history | — | Create, view, update, archive |
| `crm` | Leads and enquiries from the public site | Enquiry form | Lead pipeline, status, assignment |
| `services` | Service catalogue | Services and service detail pages | Create and edit services |
| `portfolio` | Completed projects showcase | Portfolio listing and detail | Manage portfolio items |
| `projects` | Delivery tracking for client work | — | Project records and status |
| `notifications` | Internal notifications for new enquiries and status changes | — | Notification list and read state |
| `audit` | Audit trail for administrative and financial-relevant actions | — | Read-only audit log |

## Explicitly deferred

Proposals and quotations, invoicing, payments (including Paystack), digital products,
orders, subscriptions, learning management, advanced analytics.

Deferred modules remain on the long-term roadmap. No infrastructure, dependencies,
database tables or API surface may be introduced for them during Version 1.

## Reconciliation status

**Reconciled and approved.** WBS v1.1 (approved 2026-11-01) includes explicit tasks, estimates and acceptance criteria for:

1. portfolio (backend API/model/admin CRUD + publish/unpublish, public listing/detail)
2. 
otifications (model, triggers on enquiry/status change, API, in-app UI, read/unread)
3. udit logging (model/middleware/service, key events with actor/timestamp, read-only admin view, retention note)

Tracking: **OA-01 — Closed**.


## Out-of-scope guardrail

Any request to add a deferred feature must follow the change-control procedure in
`project-management/04-monitoring-control/change-log.md`. Unapproved additions are not
part of the baseline and must not be implemented.
