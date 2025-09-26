export class DashboardPage {
  constructor(page) {
    this.welcomeMsg = page.locator('h1');
  }

  async getWelcomeText() {
    return await this.welcomeMsg.textContent();
  }
}
