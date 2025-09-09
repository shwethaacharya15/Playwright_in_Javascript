import { test, expect } from '@playwright/test';

test.describe("Core Actions - 1 (Text input, click, select, check/uncheck, radio buttons)", () => {

    test('Automate the login form - fill and type', async ({ page }) => {
        // Navigate to login page
        await page.goto("https://www.saucedemo.com/");

        // Fill username and password
        await page.fill('#user-name', 'standard_user');
        await page.fill('#password', 'secret_sauce');

        // Click login button
        await page.click('#login-button');

        // Optional: verify login success
       await expect(page.locator('text=Swag Labs')).toBeVisible();

    });

});
