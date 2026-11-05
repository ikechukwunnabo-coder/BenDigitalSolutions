# UI Components (Workflow 8 Foundation)

## Purpose
Reusable, accessible frontend building blocks for the Ben Digital Solutions MVP (React + TypeScript + Tailwind). This is a **foundation** aligned with `review.md` Workflow 8; not a full design system yet.

## Location
- `frontend/src/components/ui/*`
- Shared styles/tokens helpers: `frontend/src/index.css` (`.bds-*` utilities, focus-visible base)
- Tests: `frontend/src/components/ui/*.test.tsx`, `frontend/src/pages/*.test.tsx` (Vitest)

## Design tokens / conventions (current)
- **Typography/layout:** Tailwind utility scale, slate/sky palette.
- **Focus:** global `*:focus-visible` ring; components avoid removing outlines.
- **Feedback states:** `Alert` (`success/error/info/warning`, `role=alert/status`, `aria-live`), `LoadingState` (`role=status`), `EmptyState`.
- **Form accessibility:** `TextField`/`TextAreaField`/`SelectField` provide label association, required marker, `aria-invalid`, and `aria-describedby` to hint/error; errors render as `role="alert"`.
- **Actions:** `Button` supports `disabled` + `loading` (`aria-busy`) and visible loading label.
- **Containers:** `Card`, `PageHeader`, `Badge`.

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
- `frontend/src/pages/Contact.tsx` (validation + a11y + success/error/disabled/loading)
- `frontend/src/pages/admin/AdminLayout.tsx` (skip link, nav labels, focus-visible)
- `frontend/src/pages/admin/Leads.tsx` (loading/empty/error, status badge/select labels)

## Accessibility verification (current pass)
- **Labels & descriptions:** form controls use explicit `<label htmlFor>` and error/hint `aria-describedby`.
- **Keyboard/focus:** global focus-visible ring preserved; skip link added in admin layout; native controls used.
- **Assistive feedback:** alerts/loading use appropriate roles/live regions.
- **Responsive:** components use fluid widths and Tailwind responsive layouts; verified via existing responsive pages/build.
- **Manual checks still recommended:** screen reader pass (NVDA/VoiceOver), color-contrast audit, full keyboard-only walkthrough on all admin CRUD screens.

## Known gaps (next iteration)
- Full refactor of all admin CRUD pages to shared components.
- Stronger design tokens/theme file and Storybook-style examples.
- DOM interaction tests in browser-like env (current CI/local test baseline uses smoke/module tests due to jsdom+css parser/tooling constraints on this machine) + E2E (Playwright).
- Formal a11y automation (axe) once test env is stabilized.
