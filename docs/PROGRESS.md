# Progress Log

## 2026-11-05
- **Core MVP implementation aligned to approved docs (WBS v1.1, requirements, API/architecture):**
  - **Backend:** Added `/api/enquiries/` (public) creating leads + admin notifications; added `/api/dashboard/summary/` (admin); added session auth endpoints (`/api/auth/csrf|login|logout|me/`) for SPA admin; tightened permissions (admin-only management for core modules; public read for services/portfolio); portfolio model extended (`image_url`, `is_featured`, publish timestamp handling) with migration.
  - **Frontend (React SPA):** Replaced template with shared public layout and pages — Home, About, Services, Service Detail, Portfolio, Portfolio Detail, Contact (uses `/api/enquiries/`). Added React admin SPA with session login, dashboard, and management screens for Leads, Customers, Services, Portfolio (publish/unpublish), Projects, Notifications (read/unread), Audit (read-only).
  - **Quality/Dev:** API client supports CSRF+credentials; CORS/CSRF trusted origins configured for local dev (frontend `:3000`, backend `:8081`); `manage.py check` clean; frontend build passes; added and passed enquiry API test (`crm.tests.EnquiryApiTests`).
- **Status:** MVP is substantially more complete than the prior template, but still needs production hardening (pagination/filtering, richer validation/UX, more tests, seed data, deployment config review).

## 2026-11-02
- **Backend Foundation:** Django 5.2.18 configured, 8 apps scaffolded (`accounts`, `customers`, `crm`, `services`, `portfolio`, `projects`, `notifications`, `audit`), DRF and CORS installed, database migrations applied successfully.
- **Frontend Foundation:** Vite + React + TypeScript + Tailwind scaffolded in `frontend/`, public pages (Home, Services, Portfolio, Contact) and API integration created.
- **QA:** `py manage.py check` passes with no issues (0 silenced). Migrations applied.
- **Next:** Verify frontend build, add admin/API refinements and tests as needed, prepare deployment.
