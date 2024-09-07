//serial
import { test, type Page } from '@playwright/test';

// Annotate entire file as serial.
test.describe.configure({ mode: 'serial' });

let page: Page;

test.beforeAll(async ({ browser }) => {
  page = await browser.newPage();
});

test.afterAll(async () => {
  await page.close();
});

test.describe('@demo_serial ', () => {
  test('runs first', async () => {
    await page.goto('https://playwright.dev/');
    await page.waitForTimeout(5000);
  });
  
  test('runs second', async () => {
    await page.getByText('Get Started').click();
    await page.waitForTimeout(5000);
  });
})