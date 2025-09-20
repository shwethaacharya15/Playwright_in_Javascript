const { test: base, expect } = require('@playwright/test'); // import both
const RegisterPage = require('../POM/Pages/POMhomepage');
const { registrationData } = require('./testData');

const test = base.extend({
  homePage: async ({ page }, use) => {
    const registerPage = new RegisterPage(page);
    await registerPage.goto();
    await use(registerPage);
  },
  registrationData: async ({}, use) => {
    await use(registrationData);
  }
});

// export both test and expect properly
module.exports = { test, expect };
