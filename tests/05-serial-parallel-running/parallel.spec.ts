import { test, expect } from "@playwright/test";

test('test 3', async ({ page }) => {
  await page.goto('https://demo.playwright.dev/todomvc/#/');
  await page.waitForTimeout(10000);
  await page.getByPlaceholder('What needs to be done?').fill('task01');
  await page.getByPlaceholder('What needs to be done?').press('Enter');
  await page.getByLabel('Toggle Todo').check();
  await page.getByRole('link', { name: 'Completed' }).click();
  await expect(page.getByTestId('todo-title')).toContainText('task01');
});

test.describe.configure({ mode: 'parallel' });

test('test 1', async ({ page }) => {
  await page.goto('https://demo.playwright.dev/todomvc/#/');
  await page.waitForTimeout(10000);
  await page.getByPlaceholder('What needs to be done?').fill('task01');
  await page.getByPlaceholder('What needs to be done?').press('Enter');
  await page.getByLabel('Toggle Todo').check();
  await page.getByRole('link', { name: 'Completed' }).click();
  await expect(page.getByTestId('todo-title')).toContainText('task01');
});
test('test 2', async ({ page }) => {
  await page.goto('https://demo.playwright.dev/todomvc/#/');
  await page.waitForTimeout(10000);
  await page.getByPlaceholder('What needs to be done?').fill('task01');
  await page.getByPlaceholder('What needs to be done?').press('Enter');
  await page.getByLabel('Toggle Todo').check();
  await page.getByRole('link', { name: 'Completed' }).click();
  await expect(page.getByTestId('todo-title')).toContainText('task01');
});
