import { test, expect } from '@playwright/test';


test.beforeAll(async () => {
  console.log("Starting Registration Form Test Suite...");
});

test.beforeEach(async ({ page }) => {
  console.log("➡ Opening Register Page...");
  await page.goto("https://demo.automationtesting.in/Register.html");
});

test('Fill Registration Form', async ({ page }) => {
  // Full Name
  await page.fill("input[placeholder='First Name']", "Shwetha");
  await page.fill("input[placeholder='Last Name']", "Acharya");

  // Address
  await page.fill("textarea[ng-model='Adress']", "123, Test Street, Bangalore");

  // Email & Phone
  await page.fill("input[type='email']", "shwetha@test.com");
  await page.fill("input[type='tel']", "9876543210");

  // Gender
  await page.check("input[value='FeMale']");

  // Hobbies
  await page.check("#checkbox1"); // Cricket
  await page.check("#checkbox2"); // Movies

  // Languages
  await page.click("#msdd"); 
  await page.click("//a[text()='English']"); // Pick English
  await page.click("//a[text()='Hindi']");   // Pick Hindi
  await page.click("body"); // close dropdown

  // Skills dropdown
  await page.selectOption("#Skills", { label: "Java" });

  // Country dropdown
// await page.selectOption("#countries", "Australia");



  // Select Country (search dropdown)
  await page.click(".select2-selection");
  await page.fill(".select2-search__field", "Australia");
  await page.keyboard.press("Enter");

  // DOB
  await page.selectOption("#yearbox", { label: "1995" });
  await page.selectOption("select[placeholder='Month']", { label: "May" });
  await page.selectOption("#daybox", { label: "20" });

  // Password
  await page.fill("#firstpassword", "Test@1234");
  await page.fill("#secondpassword", "Test@1234");

  // Submit
  await page.click("#submitbtn");

  // Assertion - just checking page did not crash
  await expect(page).toHaveTitle(/Register/);
});

test.afterEach(async () => {
  console.log("Test Finished");
});

test.afterAll(async () => {
  console.log("Completed Registration Form Test Suite.");
});
