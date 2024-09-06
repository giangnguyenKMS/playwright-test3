import { Page, Locator, expect } from '@playwright/test';

class CartPage {
  private page: Page;
  private cartProducts: Locator;
  private checkout: Locator;
  private countryTextBox: Locator;
  private emailTextBox: Locator;
  private placeOrderButton: Locator;
  private orderResultTitle: Locator;

  constructor(page: Page) {
    this.page = page;
    this.cartProducts = page.locator("div li").first();
    this.checkout = page.locator("text=Checkout");
    this.countryTextBox = page.locator("[placeholder*='Country']");
    this.emailTextBox = page.locator(".user__name [type='text']").first();
    this.placeOrderButton = page.locator(".action__submit");
    this.orderResultTitle = page.locator(".hero-primary");
  }

  async VerifyProductIsDisplayed(productName: string) {
    await this.cartProducts.waitFor();
    const bool = await this.getProductLocator(productName).isVisible();
    expect(bool).toBeTruthy();
  }

  async Checkout() {
    await this.checkout.click();
  }

  getProductLocator(productName: string) {
    return this.page.locator(`h3:has-text("${productName}")`);
  }

  async selectCountry(countryName: string) {
    await this.countryTextBox.pressSequentially(countryName,{delay:100});
    const dropdown = this.page.locator(".ta-results");
    await dropdown.waitFor();
    let optionsCount = await dropdown.locator("button").count();

    for(let i =0;i< optionsCount; ++i) {
      let text = await dropdown.locator("button").nth(i).textContent();
      if(text === " India") {
        await dropdown.locator("button").nth(i).click();
        break;
      }
    }
  }

  async verifyEmailDisplayCorrectly(email: string) {
    await expect(this.emailTextBox).toHaveText(email);
  }

  async clickPlaceOrderButton() {
    await this.placeOrderButton.click();
  }

  async verifyOrderSuccessfully(expectedText: string) {
    await expect(this.orderResultTitle).toHaveText(expectedText);
  }
}

export { CartPage };
