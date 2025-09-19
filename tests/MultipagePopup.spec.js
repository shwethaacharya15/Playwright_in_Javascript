// MultipagePopup.spec.js
import { test, expect } from '@playwright/test';

test('Multipage and Popup with real website', async ({ page, context }) => {

  // Navigate to Playwright official site
  await page.goto('https://playwright.dev/');

  // Wait for Twitter link to appear and be visible
  const twitterLink = page.locator('a[href*="twitter"]');
  await twitterLink.waitFor({ state: 'visible', timeout: 15000 });

  // Click Twitter link and wait for popup page
  const [popup] = await Promise.all([
    context.waitForEvent('page'),
    twitterLink.click({ button: 'left' })
  ]);

  // Wait for popup to load completely
  await popup.waitForLoadState('domcontentloaded');
  await expect(popup).toHaveTitle(/X|Twitter/i);

  // Close the popup
  await popup.close();

  // Go back to main page and check content
  await expect(page.locator('header')).toBeVisible(); // check main page header
});
