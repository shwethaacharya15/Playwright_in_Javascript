import { test, expect } from '@playwright/test';

test('Assertions + Soft Assertions + iFrame handling', async ({ page }) => {
  await page.goto('https://letcode.in/frame');

  // Hard assertion - check heading
  await expect(page.locator('h1')).toHaveText('Frame');

  // Soft assertion - check subtitle (pick the right <p>)
  await expect.soft(page.locator('p.subtitle')).toContainText('Empowering Test Automation');

  // iFrame handling - interact inside the frame
  const frame = page.frameLocator('#firstFr');
  const firstName = frame.locator('input[name="fname"]');
  const lastName = frame.locator('input[name="lname"]');

  await firstName.fill('Shwetha');
  await lastName.fill('QA Engineer');

  // Assertions inside iframe
  await expect(firstName).toHaveValue('Shwetha');
  await expect(lastName).toHaveValue('QA Engineer');
});
