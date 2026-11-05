# UI Components (Workflow 8)

## Purpose
Reusable, accessible frontend building blocks for the Ben Digital Solutions MVP (React + TypeScript + Tailwind), aligned with `review.md` Workflow 8 guidance (without committing `review.md`).

## Location
- `frontend/src/components/ui/*` (`index.ts` barrel export)
- Shared styles/tokens helpers: `frontend/src/index.css` (`.bds-*` utilities, focus-visible base)
- Tests: `frontend/src/components/ui/*.test.tsx`, `frontend/src/pages/*.test.tsx` (Vitest baseline)

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

## Accessibility verification (current pass)
- **Labels & descriptions:** form controls use explicit `<label htmlFor>` and error/hint `aria-describedby`.
- **Keyboard/focus:** global focus-visible ring preserved; skip link in admin layout; native controls used.
- **Assistive feedback:** alerts/loading use appropriate roles/live regions; read-only audit table uses headers/scope.
- **Responsive:** fluid widths/Tailwind responsive grids; build verified.
- **Recommended follow-up:** NVDA/VoiceOver pass, color-contrast audit, keyboard-only walkthrough on all CRUD flows, axe automation, Playwright E2E.

## Known gaps
- Richer design tokens/theme file and visual examples/Storybook.
- Deeper DOM interaction tests in stable browser-like env + E2E/axe automation.
- Further extraction for complex table/form patterns as admin CRUD grows.
