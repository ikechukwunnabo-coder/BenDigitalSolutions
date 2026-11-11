# Ben Digital Solutions — Frontend

React + TypeScript + Vite + Tailwind CSS single-page app for the approved MVP,
including the public website and the authenticated admin SPA.

## Stack

- React 18, TypeScript, Vite 6, Tailwind CSS 3
- React Router 6
- Vitest + Testing Library (unit smoke)
- Playwright (E2E smoke, a11y, authenticated admin CRUD)

## Local development

Prerequisite: backend API running on `http://127.0.0.1:8081`.

```powershell
npm install
npm run dev        # Vite on http://127.0.0.1:3000, proxies /api -> :8081
```

Optional: set `VITE_API_BASE_URL` to point at a different API (defaults to `/api`,
which uses the Vite proxy in development).

## Scripts

| Command | Purpose |
| --- | --- |
| `npm run dev` | Start Vite dev server (127.0.0.1:3000) |
| `npm run build` | Type-check (`tsc -b`) and build production assets |
| `npm run preview` | Preview the production build |
| `npm test` | Run Vitest unit smoke tests |
| `npm run test:e2e` | Run Playwright E2E (auto-starts servers) |
| `npm run test:e2e:headed` | Playwright in headed mode |
| `npm run test:e2e:install` | Install the Chromium browser for Playwright |

## Structure

```
src/
  components/ui/     Shared design-system components (buttons, fields, states)
  layouts/           Public layout shell
  pages/             Public pages (Home, About, Services, Portfolio, Contact)
  pages/admin/       Admin SPA (login, dashboard, CRUD, notifications, audit)
  services/api.ts    Centralised, typed API client
  test/              Vitest setup
e2e/                 Playwright suites + helpers
```

## Testing notes

See `e2e/README.md` for authenticated/storageState runs. E2E suites are also wired
through Playwright `webServer`, so `npm run test:e2e` starts the backend and frontend
automatically when they are not already running.

## Documentation

- Project overview and status: repository root `README.md`, `SESSION_STATE.md`
- UI component reference: `../docs/ui-components.md`
- Deployment templates: `../deploy/` and `../docs/deployment/`
