import { test } from '../fixture/my-fixture';

const dataset = JSON.parse(JSON.stringify(require("../data/placeOrderTestDataSet.json")));

for (const data of dataset) {
  test(`Test case: Demo data set with product ${data.productName}`, {
    tag: [
      '@demo_data_set',
      '@smoke',
      '@regression',
    ]
  }, async({
    dashBoardPage, 
    cartPage, 
  }) => {
    const email = data.username;
    const productName = data.productName;
    const dashBoardPageUrl = data.dashBoardPageUrl;
    const countryName = data.countryName;
    const orderSuccessfullyMessage = data.orderMessage;
    
    await dashBoardPage.goToDashBoardPage(dashBoardPageUrl);
    await dashBoardPage.searchProductAddCart(productName);
    await dashBoardPage.navigateToCart();
  
    await cartPage.VerifyProductIsDisplayed(productName);
    await cartPage.Checkout();
    await cartPage.selectCountry(countryName);
    await cartPage.verifyEmailDisplayCorrectly(email);
    await cartPage.clickPlaceOrderButton();
    await cartPage.verifyOrderSuccessfully(orderSuccessfullyMessage);
  });
}
