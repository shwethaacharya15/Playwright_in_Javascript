const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ headless: false });
  const context = await browser.newContext();
  const page = await context.newPage();

  await page.goto('https://example.com');

  const title = await page.title();
  if (title === 'Example Domain') {
    console.log("✅ Test Passed: Title matched.");
  } else {
    console.log("❌ Test Failed: Title mismatch.");
  }

  await browser.close();
})();
