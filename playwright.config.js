// @ts-check
import { defineConfig, devices } from '@playwright/test';

/**
 * Playwright Test Configuration
 */
export default defineConfig({
  testDir: './tests',
  timeout: 60000,           // per-test timeout
  fullyParallel: true,      // run tests in parallel
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 1,  // retry once locally, twice on CI
  workers: process.env.CI ? 1 : undefined,
  reporter: [['html', { open: 'on-failure' }]],

  use: {
    headless: false,               // run headed
    ignoreHTTPSErrors: true,
    screenshot: 'only-on-failure', // screenshot on failure
    video: 'retain-on-failure',    // record video on failure
    trace: 'on-first-retry',       // generate trace on retry
  },

  projects: [
    {
      name: 'Desktop Chrome',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'Desktop Firefox',
      use: { ...devices['Desktop Firefox'] },
    },
    {
      name: 'Desktop Safari',
      use: { ...devices['Desktop Safari'] },
    },
    {
      name: 'Mobile Safari',
      use: { ...devices['iPhone 12 Pro'] },
    },
    {
      name: 'Mobile Chrome',
      use: { ...devices['Pixel 5'] },
    },
  ],

  /* Optional: start local server before tests */
  // webServer: {
  //   command: 'npm run start',
  //   url: 'http://localhost:3000',
  //   reuseExistingServer: !process.env.CI,
  // },
});
