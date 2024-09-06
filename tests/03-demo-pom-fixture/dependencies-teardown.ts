import { test } from "@playwright/test";

test("Clean up", async ({ page, context }) => {
  console.log("Perform clear up steps......for test case")
  await context.clearCookies();
  // await context.clearPermissions();
  await context.storageState({path: './auth.json'});
});
 