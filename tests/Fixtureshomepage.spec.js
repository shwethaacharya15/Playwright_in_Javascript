const { test, expect } = require('./Fixtures/fixtures'); 

test.describe('Registration Form Test Suite', () => {

  test('Fill Registration Form', async ({ homePage, registrationData, page }) => {
    await homePage.fillName(registrationData.firstName, registrationData.lastName);
    await homePage.fillAddress(registrationData.address);
    await homePage.fillEmailAndPhone(registrationData.email, registrationData.phone);
    await homePage.selectGender(registrationData.gender);
    await homePage.selectHobbies(registrationData.hobbies);
    await homePage.selectLanguages(registrationData.languages);
    await homePage.selectSkills(registrationData.skills);
    await homePage.selectCountry(registrationData.country);
    await homePage.selectDOB(registrationData.dob.day, registrationData.dob.month, registrationData.dob.year);
    await homePage.setPassword(registrationData.password);
    await homePage.submitForm();

    await expect(page).toHaveTitle(/Register/);
  });

});
