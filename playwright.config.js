// @ts-check
import { defineConfig, devices } from '@playwright/test';

/**
 * Playwright Test Configuration
 */
export default defineConfig({
  testDir: './tests',
  timeout: 60 * 1000, // 1 minute per test
  expect: {
    timeout: 5000, // assertion timeout
  },
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 1,
  workers: process.env.CI ? 1 : undefined,

  // Reporters
  reporter: [
    ['list'],                                // console
    ['html', { open: 'on-failure' }],        // default html
    ['allure-playwright'],                   // allure (run: npx allure generate allure-results)
  ],

  use: {
    headless: true,                   // headless by default
    actionTimeout: 15 * 1000,         // step timeout
    navigationTimeout: 30 * 1000,
    ignoreHTTPSErrors: true,
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    trace: 'on-first-retry',          // trace only when retried
    baseURL: 'https://restful-booker.herokuapp.com', // 👈 API baseURL
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
    {
      name: 'API Tests',             // separate API project
      testDir: './tests/api',        // API folder
      use: { baseURL: 'https://restful-booker.herokuapp.com' },
    },
    {
      name: 'UI Tests',              //  separate UI project
      testDir: './tests/ui',         // UI folder (POM)
      use: { ...devices['Desktop Chrome'] },
    },
  ],

  // Optional: local server setup for UI apps
  // webServer: {
  //   command: 'npm run start',
  //   url: 'http://localhost:3000',
  //   reuseExistingServer: !process.env.CI,
  // },
});
