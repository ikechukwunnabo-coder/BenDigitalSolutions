# UI Components (Workflow 8)

## Purpose
Reusable, accessible frontend building blocks for the Ben Digital Solutions MVP (React + TypeScript + Tailwind), aligned with `review.md` Workflow 8 guidance (without committing `review.md`).

## Location
- `frontend/src/components/ui/*` (`index.ts` barrel export)
- Shared styles/tokens helpers: `frontend/src/index.css` (`.bds-*` utilities, focus-visible base)
- Unit/smoke tests: `frontend/src/tests/ui.smoke.test.ts` (Vitest)
- E2E: `frontend/e2e/smoke.spec.ts`, config `frontend/playwright.config.ts`, notes `frontend/e2e/README.md`

## Design tokens / conventions
- **Typography/layout:** Tailwind utility scale, slate/sky palette, `.bds-container/.bds-card/.bds-label/.bds-error/.bds-hint`.
- **Focus/keyboard:** global `*:focus-visible` ring preserved; native controls/buttons/links used; admin layout includes skip link.
- **Feedback states:** `Alert` (`success/error/info/warning`, `role=alert/status`, `aria-live`), `LoadingState` (`role=status`), `EmptyState`.
- **Form accessibility:** `TextField`/`TextAreaField`/`SelectField` provide label association, required marker, `aria-invalid`, and `aria-describedby` to hint/error; errors render as `role="alert"`.
- **Actions:** `Button` supports `disabled` + `loading` (`aria-busy`) and visible loading label.
- **Containers/data display:** `Card`, `PageHeader`, `Badge`.

## Component API (summary)
- `Button`: `variant?: primary|secondary|danger|ghost`, `loading?: boolean`, native button props.
- `TextField`: `label`, `error?`, `hint?`, native input props.
- `TextAreaField`: `label`, `error?`, `hint?`, native textarea props.
- `SelectField`: `label`, `options: {value,label}[]`, `error?`, `hint?`, native select props.
- `Alert`: `variant?`, `title?`
- `Badge`: `tone?: default|success|warning|danger|info`
- `PageHeader`: `title`, `description?`, `actions?`
- `LoadingState`: `label?`
- `EmptyState`: `title`, `description?`, `action?`

## Usage example
```tsx
import { Alert, Button, Card, PageHeader, TextField } from '../components/ui';

<Card>
  <PageHeader title="Contact" description="Send an enquiry" />
  <form>
    <TextField label="Email" name="email" type="email" error={errors.email} required />
    <Button type="submit" loading={submitting}>Submit</Button>
    {status && <Alert variant="success">{status}</Alert>}
  </form>
</Card>
```

## Applied in MVP (refactored)
- Public: `frontend/src/pages/Contact.tsx`
- Admin: `frontend/src/pages/admin/AdminLayout.tsx`, `AdminLogin.tsx`, `Dashboard.tsx`, `Leads.tsx`, `Customers.tsx`, `ServicesAdmin.tsx`, `PortfolioAdmin.tsx`, `ProjectsAdmin.tsx`, `NotificationsAdmin.tsx`, `AuditAdmin.tsx`

## Verification
- **Unit/smoke:** `cd frontend; npm run test` (Vitest) — shared UI export smoke baseline.
- **Build:** `cd frontend; npm run build` — OK.
- **E2E (configured):** `cd frontend; npm run test:e2e:install` (once), run app servers, then `npm run test:e2e`. Playwright browser binaries were **not downloaded** in this session; smoke specs are committed and ready.
- **Manual local UAT:** PASS 2026-11-05 (see `docs/uat/UAT_CHECKLIST.md`).
- **Recommended follow-up:** authenticated CRUD E2E, axe accessibility automation, NVDA/VoiceOver pass, color-contrast audit, keyboard-only walkthrough.

## Known gaps
- Richer design tokens/theme file and visual examples/Storybook.
- Stable browser-like interaction tests for forms/state beyond smoke exports.
- E2E execution evidence/CI integration and axe checks.
