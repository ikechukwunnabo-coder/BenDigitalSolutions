---
title: "System Architecture - Ben Digital Solutions"
version: "1.0"
status: "Proposed"
date: "2026-11-02"
---

# System Architecture

## 1. Overview
Monolithic Django REST API backend with React TypeScript SPA frontend, PostgreSQL database.

## 2. Architecture Style
- Backend: Django 5.2.x (MVT + DRF for API)
- Frontend: React SPA with TypeScript, Vite, Tailwind CSS
- API: RESTful JSON APIs
- Auth: Django authentication with role-based permissions

## 3. System Components
### Backend (Django Apps)
- accounts: Authentication, users, roles, permissions
- customers: Customer management
- crm: Leads/enquiries
- services: Service catalogue
- portfolio: Portfolio items (CRUD + publish/unpublish)
- projects: Project tracking
- notifications: In-app notifications
- audit: Audit logging (read-only)

### Frontend (React)
- Public site: Home, About, Services, Portfolio, Contact
- Admin dashboard: Management interfaces for all modules

## 4. Data Flow
1. Public users submit enquiries via contact form ? CRM creates lead ? Notification created ? Audit logged
2. Admin manages content via dashboard ? API calls ? Database updates ? Audit logged
3. Public site fetches published content via API

## 5. Security Considerations
- Authentication required for admin routes
- Role-based permissions
- CSRF protection (Django)
- Input validation (DRF serializers)
- Audit logging for sensitive operations
- Secure headers

## 6. Deployment Architecture (Future)
- Backend: Gunicorn + Nginx
- Frontend: Static build served by Nginx
- Database: PostgreSQL
- Hosting deferred to Phase 7
