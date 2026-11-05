---
title: "API Design - Ben Digital Solutions"
version: "1.0"
status: "Proposed"
date: "2026-11-02"
---

# API Design

## 1. API Style
RESTful API using Django REST Framework, JSON responses

## 2. Authentication
- Session auth for admin interface
- Token/Session auth for API calls from SPA

## 3. API Endpoints

### Public Endpoints
- GET /api/services/ - List services
- GET /api/services/{slug}/ - Service detail
- GET /api/portfolio/ - List published portfolio items
- GET /api/portfolio/{slug}/ - Portfolio detail
- POST /api/enquiries/ - Submit enquiry (creates lead + notification)

### Admin Endpoints (Authenticated)
- /api/admin/customers/ - CRUD
- /api/admin/leads/ - CRUD, status updates, assignment
- /api/admin/services/ - CRUD
- /api/admin/portfolio/ - CRUD, publish/unpublish
- /api/admin/projects/ - CRUD
- /api/admin/notifications/ - List, mark read
- /api/admin/audit/ - List only (read-only)

## 4. Response Format
```json
{
  "data": {...},
  "message": "...",
  "status": "success|error"
}
```

## 5. Permissions
- Public: Read published content, submit enquiries
- Authenticated Admin: Full access to assigned modules based on role
- Audit: Read-only, restricted access
