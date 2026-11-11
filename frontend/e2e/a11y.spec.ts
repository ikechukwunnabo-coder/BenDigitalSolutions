import { test, expect, type Page } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

const SEVERITIES = ['serious', 'critical'];

async function expectNoSeriousA11yViolations(page: Page) {
  const results = await new AxeBuilder({ page })
    .withTags(['wcag2a', 'wcag2aa'])
    .disableRules(['color-contrast'])
    .analyze();
  const violations = results.violations.filter((v) => SEVERITIES.includes(v.impact || ''));
  expect(violations, JSON.stringify(violations, null, 2)).toEqual([]);
}

test.describe('accessibility smoke', () => {
  test('home has landmarks, navigation and no serious axe violations', async ({ page }) => {
    await page.goto('/');
    await expect(page.getByRole('link', { name: /services/i }).first()).toBeVisible();
    await expect(page.locator('main, [role="main"]').first()).toBeVisible();
    await expectNoSeriousA11yViolations(page);
  });

  test('contact controls have accessible names and validation feedback', async ({ page }) => {
    await page.goto('/contact');
    await expect(page.getByLabel(/full name|name/i)).toBeVisible();
    await expect(page.getByLabel(/email/i)).toBeVisible();
    await expect(page.getByLabel(/phone/i)).toBeVisible();
    await expect(page.getByLabel(/message/i)).toBeVisible();
    await page.getByRole('button', { name: /submit enquiry/i }).click();
    await expect(page.getByRole('alert').first()).toBeVisible();
    await expectNoSeriousA11yViolations(page);
  });

  test('admin login exposes labeled credentials fields and no serious axe violations', async ({ page }) => {
    await page.goto('/admin/login');
    await expect(page.getByLabel(/username/i)).toBeVisible();
    await expect(page.getByLabel(/password/i)).toBeVisible();
    await expect(page.getByRole('button', { name: /sign in/i })).toBeVisible();
    await expectNoSeriousA11yViolations(page);
  });
});
