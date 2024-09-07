//ApplyPOM_Fixtures_MultiDataSet
import { test } from "../../03-demo-pom-fixture/fixture/my-fixture";

const dataset = JSON.parse(JSON.stringify(require("../data/placeOrderTestDataSet.json")))

test.describe('@demo_data_set @smoke @regression', () => {
  for (const data of dataset) {
    test(`User login and order product ${data.productName}`, async ({
      loginPage, 
      dashBoardPage, 
      cartPage, 
    }) => {
      await loginPage.goToLoginPage("https://rahulshettyacademy.com/client");
      await dashBoardPage.searchProductAddCart(data.productName);
      await dashBoardPage.navigateToCart();
      await cartPage.VerifyProductIsDisplayed(data.productName);
      await cartPage.Checkout();
    });
  }
})
