import { Browser, chromium, expect, Page, test } from "@playwright/test";

test("Dependencies setup", async ({ }) => {
  console.log("Performing dependencies setup....");

  const browser: Browser = await chromium.launch({
    headless: true,
  });
  const context = await browser.newContext();
  const page: Page = await context.newPage();

  await page.goto("https://rahulshettyacademy.com/client");
  await page.locator("#userEmail").fill("demo.playwright@gmail.com");
  await page.locator("#userPassword").fill("Admin123");
  await page.locator("[value='Login']").click();

  await expect(page.getByRole('heading', { name: 'Automation' })).toBeVisible();

  await page.waitForLoadState('networkidle');
  await context.storageState({ path: './auth.json' });
  //Clear up
  await browser.close();
})