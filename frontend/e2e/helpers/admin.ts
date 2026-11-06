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
  await page.goto('/admin/login');
  await page.getByLabel(/username/i).fill(adminCreds.username!);
  await page.getByLabel(/password/i).fill(adminCreds.password!);
  await page.getByRole('button', { name: /sign in/i }).click();
  await expect(page).toHaveURL(/\/admin\/?$/, { timeout: 15_000 });
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
