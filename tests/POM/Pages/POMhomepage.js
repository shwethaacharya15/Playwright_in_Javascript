class RegisterPage {
  constructor(page) {
    this.page = page;
  }

  async goto() {
    await this.page.goto('https://demo.automationtesting.in/Register.html');
  }

  async fillName(firstName, lastName) {
    await this.page.fill("input[placeholder='First Name']", firstName);
    await this.page.fill("input[placeholder='Last Name']", lastName);
  }

  async fillAddress(address) {
    await this.page.fill("textarea[ng-model='Adress']", address);
  }

  async fillEmailAndPhone(email, phone) {
    await this.page.fill("input[type='email']", email);
    await this.page.fill("input[type='tel']", phone);
  }

  async selectGender(gender) {
    await this.page.check(`input[value='${gender}']`);
  }

  async selectHobbies(hobbies) {
    for (const hobby of hobbies) {
      await this.page.check(`#${hobby}`);
    }
  }

  async selectLanguages(languages) {
    await this.page.click("#msdd");
    for (const lang of languages) {
      await this.page.click(`//a[text()='${lang}']`);
    }
    await this.page.click("body");
  }

  async selectSkills(skill) {
    await this.page.selectOption("#Skills", { label: skill });
  }

async selectCountry(country) {
  await this.page.click(".select2-selection"); // open dropdown
  await this.page.waitForSelector(".select2-search__field", { state: "visible" }); // wait for input
  await this.page.fill(".select2-search__field", country);
  await this.page.keyboard.press("Enter");
}


  async selectDOB(day, month, year) {
    await this.page.selectOption("#daybox", { label: day });
    await this.page.selectOption("select[placeholder='Month']", { label: month });
    await this.page.selectOption("#yearbox", { label: year });
  }

  async setPassword(password) {
    await this.page.fill("#firstpassword", password);
    await this.page.fill("#secondpassword", password);
  }

  async submitForm() {
    await this.page.click("#submitbtn");
  }
}


module.exports = RegisterPage; // <- export the class directly
