import { defineConfig, devices } from '@playwright/test';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const baseURL = process.env.PLAYWRIGHT_BASE_URL || 'http://127.0.0.1:3000';
const isCI = !!process.env.CI;
const authFile = path.join(__dirname, 'playwright/.auth/admin.json');
const useStorageState = process.env.PLAYWRIGHT_USE_STORAGE_STATE === '1' && fs.existsSync(authFile);

export default defineConfig({
  testDir: './e2e',
  fullyParallel: false,
  forbidOnly: isCI,
  retries: isCI ? 2 : 0,
  workers: isCI ? 1 : undefined,
  timeout: 30_000,
  expect: { timeout: 5_000 },
  reporter: isCI ? [['list'], ['html', { open: 'never' }]] : 'list',
  use: {
    baseURL,
    trace: 'retain-on-failure',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
  },
  projects: useStorageState
    ? [{ name: 'chromium', use: { ...devices['Desktop Chrome'], storageState: authFile } }]
    : [{ name: 'chromium', use: { ...devices['Desktop Chrome'] } }],
});
