const { test, expect } = require('@playwright/test');
const RegisterPage = require('./POM/Pages/POMhomepage'); 

let homePage;

test.describe('Registration Form Test Suite', () => {
  test.beforeEach(async ({ page }) => {
    homePage = new RegisterPage(page); // 
    await homePage.goto();
  });

  test('Fill Registration Form', async ({ page }) => {
    await homePage.fillName("Shwetha", "Acharya");
    await homePage.fillAddress("123, Test Street, Bangalore");
    await homePage.fillEmailAndPhone("shwetha@test.com", "9876543210");
    await homePage.selectGender("FeMale");
    await homePage.selectHobbies(["checkbox1", "checkbox2"]);
    await homePage.selectLanguages(["English", "Hindi"]);
    await homePage.selectSkills("Java");
    await homePage.selectCountry("Australia");
    await homePage.selectDOB("20", "May", "1995");
    await homePage.setPassword("Test@1234");
    await homePage.submitForm();

    
    // Screenshot on demand
    await page.screenshot({ path: 'screenshots/registration-form.png', fullPage: true });

    await expect(page).toHaveTitle(/Register/);
  });

});
