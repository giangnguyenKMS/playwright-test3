import {test as base} from "@playwright/test";
import { LoginPage } from '../page-objects/LoginPage';
import { DashboardPage } from '../page-objects/DashBoardPage';
import { CartPage } from "../page-objects/CartPage";

export const test = base.extend<{
  loginPage: LoginPage; 
  dashBoardPage: DashboardPage; 
  cartPage: CartPage
}> ({
  // Define the Fixtures
  loginPage: async ({page}, use) => {
    await use(new LoginPage(page));
  },

  dashBoardPage: async ({page}, use) => {
    await use(new DashboardPage(page));
  },

  cartPage: async ({page}, use) => {
    await use(new CartPage(page));
  },
})
