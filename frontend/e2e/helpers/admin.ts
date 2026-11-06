import { expect, type BrowserContext, type Page } from '@playwright/test';

export const adminCreds = {
  username: process.env.E2E_ADMIN_USERNAME,
  password: process.env.E2E_ADMIN_PASSWORD,
};

export function hasAdminCreds() {
  return !!(adminCreds.username && adminCreds.password);
}

export async function adminLogin(page: Page) {
  expect(hasAdminCreds(), 'E2E_ADMIN_USERNAME/E2E_ADMIN_PASSWORD required').toBeTruthy();
  await page.context().clearCookies();
  await page.goto('/admin/login', { waitUntil: 'domcontentloaded' });
  await expect(page.getByRole('heading', { name: /admin login/i })).toBeVisible({ timeout: 10_000 });
  await page.getByLabel(/username/i).fill(adminCreds.username!);
  await page.getByLabel(/password/i).fill(adminCreds.password!);
  await Promise.all([
    page.waitForResponse((r) => r.url().includes('/api/auth/login/') && r.request().method() === 'POST', { timeout: 15_000 }).catch(() => null),
    page.getByRole('button', { name: /sign in/i }).click(),
  ]);
  const loginError = page.getByRole('alert');
  if (/\/admin\/login/.test(page.url()) && (await loginError.isVisible().catch(() => false))) {
    await page.getByLabel(/username/i).fill(adminCreds.username!);
    await page.getByLabel(/password/i).fill(adminCreds.password!);
    await page.getByRole('button', { name: /sign in/i }).click();
  }
  await expect(page).not.toHaveURL(/\/admin\/login/, { timeout: 20_000 });
  await expect(page.locator('#admin-main, main, [role="main"]').first()).toBeVisible({ timeout: 15_000 });
}

export async function getCsrfToken(context: BrowserContext, baseURL = 'http://127.0.0.1:3000') {
  const cookies = await context.cookies(baseURL);
  return cookies.find((c) => c.name === 'csrftoken')?.value;
}

export async function apiFetch(context: BrowserContext, path: string, method = 'GET', data?: unknown, baseURL = 'http://127.0.0.1:3000') {
  const csrf = await getCsrfToken(context, baseURL);
  const headers: Record<string, string> = {};
  if (data) headers['Content-Type'] = 'application/json';
  if (csrf && !['GET', 'HEAD', 'OPTIONS'].includes(method)) headers['X-CSRFToken'] = csrf;
  return context.request.fetch(`${baseURL}/api${path}`, { method, data, headers, failOnStatusCode: false });
}
