# Ben Digital Solutions - Deployment Guide

## Prerequisites
- Python 3.14+
- Node.js 20+
- PostgreSQL 17 (production)

## Backend Deployment
1. Set environment variables
2. Install dependencies: `pip install -r requirements.txt`
3. Run migrations: `python manage.py migrate`
4. Collect static: `python manage.py collectstatic --noinput`
5. Create superuser: `python manage.py createsuperuser`

## Frontend Deployment
1. Build: `npm run build`
2. Serve dist/ folder

## Environment Variables
- DEBUG=False
- SECRET_KEY
- DATABASE_URL
- ALLOWED_HOSTS
