import { test, expect } from '@playwright/test';

test.describe('accessibility smoke (dependency-free)', () => {
  test('home has primary navigation landmarks/links', async ({ page }) => {
    await page.goto('/');
    await expect(page.getByRole('link', { name: /services/i }).first()).toBeVisible();
    await expect(page.locator('main, [role="main"]').first()).toBeVisible();
  });

  test('contact controls have accessible names and validation feedback', async ({ page }) => {
    await page.goto('/contact');
    await expect(page.getByLabel(/full name|name/i)).toBeVisible();
    await expect(page.getByLabel(/email/i)).toBeVisible();
    await expect(page.getByLabel(/phone/i)).toBeVisible();
    await expect(page.getByLabel(/message/i)).toBeVisible();
    await page.getByRole('button', { name: /submit enquiry/i }).click();
    await expect(page.getByRole('alert').first()).toBeVisible();
  });

  test('admin login exposes labeled credentials fields', async ({ page }) => {
    await page.goto('/admin/login');
    await expect(page.getByLabel(/username/i)).toBeVisible();
    await expect(page.getByLabel(/password/i)).toBeVisible();
    await expect(page.getByRole('button', { name: /sign in/i })).toBeVisible();
  });
});
