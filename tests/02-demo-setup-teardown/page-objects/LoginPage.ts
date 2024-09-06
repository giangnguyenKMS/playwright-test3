import { Page, Locator } from '@playwright/test';

class LoginPage {
  private page: Page;
  private signInButton: Locator;
  private userName: Locator;
  private password: Locator;

  constructor(page: Page) {
    this.page = page;
    this.signInButton = page.locator("[value='Login']");
    this.userName = page.locator("#userEmail");
    this.password = page.locator("#userPassword");
  }

  async goToLoginPage() {
    await this.page.goto("https://rahulshettyacademy.com/client");
  }

  async validLogin(username: string, password: string) {
    await this.userName.type(username);
    await this.password.type(password);
    await this.signInButton.click();
    await this.page.waitForLoadState('networkidle');
  }
}

export { LoginPage };
