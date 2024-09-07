//ApplyPOM_Fixtures_MappingData
import { test } from "../../03-demo-pom-fixture/fixture/my-fixture";
import { productNameMapping } from "../utils/data-mapping/map";
const dataset = JSON.parse(JSON.stringify(require("../data/placeOrderTestDataMapping.json")));

test.describe('@demo_data_mapping @smoke @regression', () => {
  for (const data of dataset) {
    test(`User login and order product ${data.fieldName}`, async ({
      loginPage, 
      dashBoardPage, 
      cartPage
    }) => {
      test.slow();
      let productName = <string>productNameMapping.get(data.fieldName);
      await loginPage.goToLoginPage(data.loginPageUrl);
      await dashBoardPage.searchProductAddCart(productName);
      await dashBoardPage.navigateToCart();
      await cartPage.VerifyProductIsDisplayed(productName);
      await cartPage.Checkout();
    });
  }
})
  