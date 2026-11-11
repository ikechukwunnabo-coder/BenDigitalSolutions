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
const python = process.platform === 'win32' ? 'py' : 'python';
const backendDir = path.join(__dirname, '../backend');

export default defineConfig({
  testDir: './e2e',
  fullyParallel: false,
  forbidOnly: isCI,
  retries: isCI ? 2 : 0,
  workers: 1,
  timeout: 30_000,
  expect: { timeout: 5_000 },
  reporter: isCI ? [['list'], ['html', { open: 'never' }]] : 'list',
  webServer: [
    {
      command: `${python} manage.py runserver 127.0.0.1:8081 --noreload`,
      cwd: backendDir,
      url: 'http://127.0.0.1:8081/api/health/',
      reuseExistingServer: !isCI,
      timeout: 120_000,
    },
    {
      command: 'npm run dev',
      cwd: __dirname,
      url: 'http://127.0.0.1:3000',
      reuseExistingServer: !isCI,
      timeout: 120_000,
    },
  ],
  use: {
    baseURL,
    trace: 'retain-on-failure',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
  },
  projects: [
    { name: 'setup', testMatch: /auth\.setup\.ts/ },
    ...(useStorageState
      ? [{ name: 'chromium', dependencies: ['setup'], use: { ...devices['Desktop Chrome'], storageState: authFile } }]
      : [{ name: 'chromium', use: { ...devices['Desktop Chrome'] }, testIgnore: /auth\.setup\.ts/ }]),
  ],
});
