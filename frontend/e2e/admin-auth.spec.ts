import { test, expect } from '@playwright/test';

const username = process.env.E2E_ADMIN_USERNAME;
const password = process.env.E2E_ADMIN_PASSWORD;

test.describe('admin authenticated smoke (local, optional)', () => {
  test.skip(!username || !password, 'Set E2E_ADMIN_USERNAME and E2E_ADMIN_PASSWORD to run authenticated admin smoke tests.');

  test('staff can login and access key admin pages', async ({ page }) => {
    await page.goto('/admin/login');
    await page.getByLabel(/username/i).fill(username!);
    await page.getByLabel(/password/i).fill(password!);
    await page.getByRole('button', { name: /sign in/i }).click();

    await expect(page).toHaveURL(/\/admin\/?$/);
    await expect(page.getByRole('heading', { name: /overview|dashboard/i }).first()).toBeVisible({ timeout: 10_000 });

    for (const [name, path] of [
      ['Leads', '/admin/leads'],
      ['Customers', '/admin/customers'],
      ['Portfolio', '/admin/portfolio'],
      ['Audit', '/admin/audit'],
    ] as const) {
      await page.goto(path);
      await expect(page.getByRole('heading', { name: new RegExp(name, 'i') }).first()).toBeVisible({ timeout: 10_000 });
      await expect(page.getByRole('alert')).toHaveCount(0);
    }
  });
});
