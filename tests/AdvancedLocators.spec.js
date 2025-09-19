import { test, expect } from '@playwright/test';

test('Locator Deep Dive ', async ({ page, context }) => {
  // 1. Go to demo site
  await page.goto('https://www.saucedemo.com/');
  // By Role
  await expect(page.getByRole('button', { name: 'Login' })).toBeVisible();

  // By Text
  await expect(page.getByText('Login')).toBeVisible();

  // By CSS - ID
  await expect(page.locator('#login-button')).toBeVisible();

  // By CSS - Class
  await expect(page.locator('.submit-button')).toBeVisible();

  // By Attribute
  await expect(page.locator('input[data-test="login-button"]')).toBeVisible();

  // nth() - First submit button
  await expect(page.locator('input[type="submit"]').nth(0)).toBeVisible();

  // filter() example
  await expect(
    page.getByRole('button').filter({ hasText: 'Login' })
  ).toBeVisible();

  // Chaining
  await expect(
    page.locator('form').locator('#login-button')
  ).toBeVisible();

  // Regex text
  await expect(page.getByText(/log\s*in/i)).toBeVisible();

  // ---------------------------
  // LOGIN FLOW (using locators)
  // ---------------------------
  await page.locator('#user-name').fill('standard_user');
  await page.locator('#password').fill('secret_sauce');
  await page.getByRole('button', { name: 'Login' }).click();

  await expect(page).toHaveURL(/inventory.html/);
})