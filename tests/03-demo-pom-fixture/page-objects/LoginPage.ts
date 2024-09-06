import { Page, Locator, expect, Browser } from '@playwright/test';
import { Context } from 'vm';

class LoginPage {
  private page: Page;
  private signInButton: Locator;
  private userName: Locator;
  private password: Locator;
  private pageHeading: Locator;

  constructor(page: Page) {
    this.page = page;
    this.signInButton = page.locator("[value='Login']");
    this.userName = page.locator("#userEmail");
    this.password = page.locator("#userPassword");
    this.pageHeading = page.getByRole('heading', { name: 'Automation' });
  }

  async goToLoginPage(loginPageUrl: string) {
    await this.page.goto(loginPageUrl);
  }

  async validLogin(username: string, password: string) {
    await this.userName.fill(username);
    await this.password.fill(password);
    await this.signInButton.click();
    await this.page.waitForLoadState('networkidle');
    await expect(this.pageHeading).toBeVisible();
  }

  async storageAuth(context: Context, pathString: string) {
    await this.page.waitForLoadState('networkidle');
    await context.storageState({ path: pathString });
  }

  async closeBrowser(browser: Browser) {
    await browser.close();
  }
}

export { LoginPage };
