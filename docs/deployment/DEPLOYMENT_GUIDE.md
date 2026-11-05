# Deployment Guide (MVP)

## Target
- Backend: Django + DRF + Gunicorn (port 8081 locally; reverse proxy in prod)
- Frontend: Vite React build served as static files
- DB: SQLite for local/dev; PostgreSQL 17 recommended for production

## Backend (local)
```bash
cd backend
py -m pip install -r requirements.txt
py manage.py migrate
py manage.py seed_demo
py manage.py runserver 0.0.0.0:8081
```

## Frontend (local)
```bash
cd frontend
npm install
npm run dev
```
Set `VITE_API_BASE_URL=http://localhost:8081/api` if needed (default in code points to 8081).

## Backend (production prep)
1. Create `.env` from `backend/.env.example` and set strong `DJANGO_SECRET_KEY`, `DJANGO_DEBUG=False`, hosts/origins, and `DATABASE_URL`.
2. Install deps: `pip install -r requirements.txt` (optional: add `dj-database-url` for URL parsing).
3. Run: `python manage.py migrate && python manage.py collectstatic --noinput && python manage.py createsuperuser`.
4. Run app server: `gunicorn config.wsgi:application --bind 0.0.0.0:8000` (behind Nginx/HTTPS).
5. Configure Nginx to proxy `/api/` and `/admin/` to Gunicorn and serve frontend `dist/` + `/static/` + `/media/`.

## Frontend (production)
```bash
cd frontend
npm ci
npm run build
```
Serve `frontend/dist/` via Nginx/CDN. Set build-time `VITE_API_BASE_URL` to your production API base.

## MVP Smoke/UAT Checklist
- Public: Home/About/Services(+detail)/Portfolio(+detail) load; only published portfolio visible.
- Contact: submit enquiry ? returns success; lead created as `new`; admin notification created.
- Admin SPA (`/admin/login`, staff only): dashboard summary loads; lead status update works; portfolio publish/unpublish affects public site; notifications mark read; audit log is read-only and records admin/API mutations.
- Security sanity (prod): `DEBUG=False`, strong secret, HTTPS, secure cookies, restricted hosts/CORS/CSRF origins.
