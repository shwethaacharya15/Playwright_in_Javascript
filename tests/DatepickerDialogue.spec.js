import { test, expect } from '@playwright/test';

test('DatePickers + Dialogs Demo', async ({ page }) => {
  // ---------------------------
  // 1. Native Date Picker (DemoQA)
  // ---------------------------
  await page.goto('https://demoqa.com/date-picker');
  const nativeDateInput = page.locator('#datePickerMonthYearInput');

  await nativeDateInput.fill('09/15/2025');
  await expect(nativeDateInput).toHaveValue('09/15/2025');

  // ---------------------------
  // 2. Custom Date Picker (jQueryUI)
  // ---------------------------
  await page.goto('https://jqueryui.com/datepicker/');

  // Switch into iframe
  const frame = page.frameLocator('.demo-frame');
  const customDateInput = frame.locator('#datepicker');

  // Click to open datepicker
  await customDateInput.click();

  // Select date "15"
  await frame.locator('//a[text()="15"]').click();
  await expect(customDateInput).toHaveValue(/15/);

  // ---------------------------
  // 3. Dialogs (Alerts, Confirm, Prompt)
  // ---------------------------
  await page.goto('https://the-internet.herokuapp.com/javascript_alerts');

  // Alert
  page.once('dialog', async dialog => {
    console.log('Alert message:', dialog.message());
    await dialog.accept();
  });
  await page.click('text=Click for JS Alert');

  // Confirm
  page.once('dialog', async dialog => {
    console.log('Confirm message:', dialog.message());
    await dialog.dismiss();
  });
  await page.click('text=Click for JS Confirm');

  // Prompt
  page.once('dialog', async dialog => {
    console.log('Prompt message:', dialog.message());
    await dialog.accept('Shwetha QA');
  });
  await page.click('text=Click for JS Prompt');

  await expect(page.locator('#result')).toContainText('Shwetha QA');
});
