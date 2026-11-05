# Deployment Templates (fill when details available)

These are production-ready templates. Update placeholders when domain/server details are confirmed.

## Files
- `nginx/bds.conf.example` - Nginx reverse proxy + SPA/static/media routing (set `YOUR_DOMAIN`, SSL paths, filesystem paths)
- `gunicorn/gunicorn.conf.py` - Gunicorn config (env-overridable)
- `gunicorn/bds-backend.service.example` - systemd unit (set paths/user, uses `backend/.env`)

## When details are available, set
- Domain(s) and TLS cert paths (Let's Encrypt recommended)
- Server paths/user and Python venv path
- `backend/.env`: `DJANGO_SECRET_KEY`, `DJANGO_DEBUG=False`, `DJANGO_ALLOWED_HOSTS`, `DATABASE_URL` (PostgreSQL), `CORS_ALLOWED_ORIGINS`, `CSRF_TRUSTED_ORIGINS`, `SECURE_COOKIES=True`
- Frontend build env: `VITE_API_BASE_URL=https://YOUR_DOMAIN/api` (same domain) or API domain as deployed

## Deploy sequence (typical)
1. Backend: install deps, apply env, `migrate`, `collectstatic`, run Gunicorn via systemd
2. Frontend: `npm ci && npm run build`, serve `frontend/dist` via Nginx
3. Nginx: enable site, obtain TLS, proxy `/api/` + `/admin/`, SPA fallback to `index.html`
4. Run smoke tests from `docs/deployment/DEPLOYMENT_GUIDE.md`
