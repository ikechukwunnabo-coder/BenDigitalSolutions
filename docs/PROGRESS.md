# Progress Log

## 2026-11-05 (Workflow 8 UI foundation + docs)
- **Frontend UI foundation (review.md Workflow 8, partial):** added reusable UI components in `frontend/src/components/ui/*` (`Button`, `TextField`, `TextAreaField`, `SelectField`, `Alert`, `Badge`, `Card`, `PageHeader`, `LoadingState`, `EmptyState`) with a11y-focused props/states; added shared base styles/tokens in `frontend/src/index.css`.
- **Refactors applied:** `frontend/src/pages/Contact.tsx`, `frontend/src/pages/admin/AdminLayout.tsx`, `frontend/src/pages/admin/Leads.tsx` now use shared components (labels/errors, loading/disabled/success/error/empty states, skip link/nav focus).
- **Testing:** Vitest setup added; `npx vitest@2.1.8 run` **3/3 tests passed** (smoke/module baseline). Frontend build passes. (Note: DOM-heavy jsdom+CSS parser deps were unstable on this machine; baseline tests adjusted and environment noted in `docs/ui-components.md`.)
- **Docs updated:** `docs/ui-components.md` (architecture, props summary, usage, a11y verification, gaps), `SESSION_STATE.md`, and this progress log. `review.md` remains untracked.

## 2026-11-05 (Manual UAT)
- **Manual local UAT: PASS** (user-confirmed). Verified: dashboard summary, public pages (Home/About/Services+detail/Portfolio+detail), enquiry submission success ? lead + notification, lead status/CRUD basics, portfolio publish/unpublish affects public visibility, notifications read/unread, audit read-only visibility, staff-only admin access.
- **Note:** Formal independent UAT sign-off still requires OA-07 (Independent UAT Reviewer) per project controls.

## 2026-11-05 (Acceptance pass + hardening)
- **Acceptance fixes (pushed):** tightened admin-only permissions for `customers`/`projects` APIs; expanded audit logging to authenticated API mutations (read-only audit retained); SPA auth/login CSRF handling improved; public enquiry enforces `status=new` via separate public/admin serializers.
- **Hardening (current):** DRF pagination + normalized error handler; demo seed command (`seed_demo`, creates admin if missing + sample data); frontend handles paginated lists and improved Contact validation/errors.
- **Settings/config:** env-driven `SECRET_KEY/DEBUG/ALLOWED_HOSTS` support, basic production security flags when `DEBUG=False`, `.env.example` added.
- **Verification:** `py manage.py check` OK; backend tests **10/10 passing**; frontend production build present (`frontend/dist/index.html`).
- **Remaining (non-blocking for MVP scaffold):** consistent success envelope for all DRF responses, richer admin CRUD/edit forms, filtering/search UI, more permission edge-case tests, production DB/static/media/TLS deployment, UAT/reviewer actions (OA-07).

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
