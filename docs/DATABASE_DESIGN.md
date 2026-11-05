---
title: "Database Design - Ben Digital Solutions"
version: "1.0"
status: "Proposed"
date: "2026-11-02"
---

# Database Design

## 1. Database
PostgreSQL 17

## 2. Core Entities

### accounts.User (extends AbstractUser)
- id, username, email, first_name, last_name, role, is_active, created_at

### customers.Customer
- id, name, email, phone, company, address, notes, created_at, updated_at

### crm.Lead
- id, name, email, phone, service, message, status, assigned_to, source, created_at, updated_at

### services.Service
- id, title, slug, description, features, price, is_active, created_at, updated_at

### portfolio.PortfolioItem
- id, title, slug, client, description, images, project_date, is_published, published_at, created_at, updated_at

### projects.Project
- id, customer, title, description, status, start_date, end_date, created_at, updated_at

### notifications.Notification
- id, recipient, title, message, link, notification_type, is_read, read_at, created_at

### audit.AuditLog
- id, actor, action, content_type, object_id, changes, ip_address, user_agent, timestamp (read-only)

## 3. Relationships
- Lead.assigned_to ? User
- Project.customer ? Customer
- Notification.recipient ? User
- AuditLog.actor ? User (nullable)

## 4. Constraints
- Unique constraints on slugs where applicable
- Foreign key constraints
- AuditLog: no updates/deletes (enforced at app level)
