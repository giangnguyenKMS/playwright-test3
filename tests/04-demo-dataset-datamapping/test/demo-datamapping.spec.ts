// import { test } from "../fixture/my-fixture";
// import { productNameMapping } from "../utils/data-mapping/map";
// const dataset = JSON.parse(JSON.stringify(require("../data/placeOrderTestDataMapping.json")));
// console.log(dataset);

// for (const data of dataset) {
//   test("abc", {
//     tag: [
//       '@demo_data_mapping',
//       '@smoke',
//     ]
//   }, async({
//     dashBoardPage, 
//     cartPage, 
//   }) => {
//     const email = data.username;
//     const productName = <string>productNameMapping.get(data.fieldName);
//     const dashBoardPageUrl = data.dashBoardPageUrl;
//     const countryName = data.countryName;
//     const orderSuccessfullyMessage = data.orderMessage;
    
//     await dashBoardPage.goToDashBoardPage(dashBoardPageUrl);
//     await dashBoardPage.searchProductAddCart(productName);
//     await dashBoardPage.navigateToCart();
  
//     await cartPage.VerifyProductIsDisplayed(productName);
//     await cartPage.Checkout();
//     await cartPage.selectCountry(countryName);
//     await cartPage.verifyEmailDisplayCorrectly(email);
//     await cartPage.clickPlaceOrderButton();
//     await cartPage.verifyOrderSuccessfully(orderSuccessfullyMessage);
//   });
// }
