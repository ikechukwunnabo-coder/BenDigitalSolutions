import { test as setup, expect } from '@playwright/test';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { adminLogin, hasAdminCreds } from './helpers/admin';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const authFile = path.join(__dirname, '../playwright/.auth/admin.json');

setup.skip(!hasAdminCreds(), 'Set E2E_ADMIN_USERNAME and E2E_ADMIN_PASSWORD to generate storageState.');

setup('authenticate admin and save storageState', async ({ page }) => {
  fs.mkdirSync(path.dirname(authFile), { recursive: true });
  await adminLogin(page);
  await expect(page.getByRole('heading', { name: /overview|dashboard/i }).first()).toBeVisible({ timeout: 10_000 });
  await page.context().storageState({ path: authFile });
});
