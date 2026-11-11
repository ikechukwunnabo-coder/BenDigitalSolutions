import { test, expect } from '@playwright/test';
import { adminLogin, apiFetch, hasAdminCreds } from './helpers/admin';

async function ensureAuth(page: import('@playwright/test').Page) {
  const adminMain = page.locator('#admin-main');
  await page.goto('/admin');
  await Promise.race([
    adminMain.waitFor({ state: 'visible', timeout: 15_000 }).catch(() => {}),
    page.waitForURL(/\/admin\/login/, { timeout: 15_000 }).catch(() => {}),
  ]);
  if (page.url().includes('/admin/login')) {
    test.skip(!hasAdminCreds(), 'Set E2E_ADMIN_USERNAME/E2E_ADMIN_PASSWORD or generate playwright/.auth/admin.json via auth.setup.');
    await adminLogin(page);
  }
  await expect(adminMain).toBeVisible({ timeout: 15_000 });
}

test.describe('admin CRUD smoke (local, optional)', () => {
  test.describe.configure({ mode: 'serial' });
  test.skip(!hasAdminCreds(), 'Set E2E_ADMIN_USERNAME and E2E_ADMIN_PASSWORD to run authenticated admin CRUD smoke tests.');

  test('staff can access key admin routes', async ({ page }) => {
    await ensureAuth(page);
    await expect(page.getByRole('heading', { name: /overview|dashboard/i }).first()).toBeVisible({ timeout: 10_000 });
    for (const [name, path] of [
      ['Leads', '/admin/leads'], ['Customers', '/admin/customers'], ['Services', '/admin/services'],
      ['Portfolio', '/admin/portfolio'], ['Projects', '/admin/projects'], ['Notification', '/admin/notifications'], ['Audit', '/admin/audit'],
    ] as const) {
      await page.goto(path);
      await expect(page.getByRole('heading', { name: new RegExp(name, 'i') }).first()).toBeVisible({ timeout: 10_000 });
    }
  });

  test('services CRUD + active toggle', async ({ page }) => {
    await ensureAuth(page);
    const title = `PW Service ${Date.now()}`;
    let res = await apiFetch(page.context(), '/services/', 'POST', { title, description: 'Playwright smoke service', features: 'test', is_active: true });
    expect(res.status(), await res.text()).toBe(201);
    const created = await res.json();
    res = await apiFetch(page.context(), `/services/${created.slug}/`, 'PATCH', { is_active: false });
    expect(res.status(), await res.text()).toBe(200);
    expect((await res.json()).is_active).toBe(false);
    res = await apiFetch(page.context(), `/services/${created.slug}/`, 'DELETE');
    expect([204, 200]).toContain(res.status());
  });

  test('customers CRUD', async ({ page }) => {
    await ensureAuth(page);
    const email = `pw.customer.${Date.now()}@example.test`;
    let res = await apiFetch(page.context(), '/customers/', 'POST', { name: 'PW Customer', email, phone: '+2348000000000', company: 'PW Co' });
    expect(res.status(), await res.text()).toBe(201);
    const created = await res.json();
    res = await apiFetch(page.context(), `/customers/${created.id}/`, 'PATCH', { company: 'PW Co Updated' });
    expect(res.status(), await res.text()).toBe(200);
    res = await apiFetch(page.context(), `/customers/${created.id}/`, 'DELETE');
    expect([204, 200]).toContain(res.status());
  });

  test('portfolio CRUD + publish/unpublish', async ({ page }) => {
    await ensureAuth(page);
    const title = `PW Portfolio ${Date.now()}`;
    let res = await apiFetch(page.context(), '/portfolio/', 'POST', { title, client: 'PW Client', description: 'Playwright smoke portfolio item', project_date: '2026-11-01', image_url: 'https://example.test/image.jpg', is_published: false, is_featured: false });
    expect(res.status(), await res.text()).toBe(201);
    const created = await res.json();
    res = await apiFetch(page.context(), `/portfolio/${created.slug}/`, 'PATCH', { is_published: true });
    expect(res.status(), await res.text()).toBe(200);
    expect((await res.json()).is_published).toBe(true);
    res = await apiFetch(page.context(), `/portfolio/${created.slug}/`, 'DELETE');
    expect([204, 200]).toContain(res.status());
  });

  test('projects CRUD and read-only admin endpoints', async ({ page }) => {
    await ensureAuth(page);
    const cust = await apiFetch(page.context(), '/customers/', 'POST', { name: 'PW Project Customer', email: `pw.project.${Date.now()}@example.test`, phone: '+2348000000001' });
    expect(cust.status(), await cust.text()).toBe(201);
    const customer = await cust.json();
    let res = await apiFetch(page.context(), '/projects/', 'POST', { customer: customer.id, title: `PW Project ${Date.now()}`, description: 'Playwright smoke project', status: 'pending' });
    expect(res.status(), await res.text()).toBe(201);
    const created = await res.json();
    res = await apiFetch(page.context(), `/projects/${created.id}/`, 'PATCH', { status: 'in_progress' });
    expect(res.status(), await res.text()).toBe(200);
    await apiFetch(page.context(), `/projects/${created.id}/`, 'DELETE');
    await apiFetch(page.context(), `/customers/${customer.id}/`, 'DELETE');
    for (const path of ['/crm/', '/notifications/', '/audit/']) {
      res = await apiFetch(page.context(), path);
      expect(res.status(), `${path}: ${await res.text()}`).toBe(200);
    }
  });
});
