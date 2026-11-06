import { test, expect } from '@playwright/test';
import { adminLogin, hasAdminCreds } from './helpers/admin';

test.describe('admin authenticated smoke (local, optional)', () => {
  // Prefer storageState for stability: run e2e/auth.setup.ts then PLAYWRIGHT_USE_STORAGE_STATE=1.
  test.skip(!hasAdminCreds(), 'Set E2E_ADMIN_USERNAME and E2E_ADMIN_PASSWORD to run authenticated admin smoke tests.');

  test('staff can login and access key admin pages', async ({ page }) => {
    await adminLogin(page);
    await expect(page.getByRole('heading', { name: /overview|dashboard/i }).first()).toBeVisible({ timeout: 15_000 });

    for (const [name, path] of [
      ['Leads', '/admin/leads'],
      ['Customers', '/admin/customers'],
      ['Services', '/admin/services'],
      ['Portfolio', '/admin/portfolio'],
      ['Projects', '/admin/projects'],
      ['Notification', '/admin/notifications'],
      ['Audit', '/admin/audit'],
    ] as const) {
      await page.goto(path);
      await expect(page.getByRole('heading', { name: new RegExp(name, 'i') }).first()).toBeVisible({ timeout: 10_000 });
      await expect(page.locator('#admin-main')).toBeVisible();
    }
  });
});
