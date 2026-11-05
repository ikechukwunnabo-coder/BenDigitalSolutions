import { test, expect } from '@playwright/test';

test('public home renders core navigation/content', async ({ page }) => {
  await page.goto('/');
  await expect(page.getByRole('link', { name: /services/i }).first()).toBeVisible();
  await expect(page.getByText(/ben digital solutions/i).first()).toBeVisible();
});

test('contact form shows accessible validation feedback', async ({ page }) => {
  await page.goto('/contact');
  await page.getByRole('button', { name: /submit enquiry/i }).click();
  await expect(page.getByRole('alert').first()).toBeVisible();
});

test('admin login page renders labeled form', async ({ page }) => {
  await page.goto('/admin/login');
  await expect(page.getByLabel(/username/i)).toBeVisible();
  await expect(page.getByLabel(/password/i)).toBeVisible();
  await expect(page.getByRole('button', { name: /sign in/i })).toBeVisible();
});
