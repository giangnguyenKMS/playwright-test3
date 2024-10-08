import { test, expect} from '@playwright/test';
let webContext;

test.beforeAll(async({browser}) => {
  const context = await browser.newContext();
  const page = await context.newPage();
  await page.goto("https://rahulshettyacademy.com/client");
  await page.locator("#userEmail").fill("demo.playwright@gmail.com");
  await page.locator("#userPassword").fill("Admin123");
  await page.locator("[value='Login']").click();
  await page.waitForLoadState('networkidle');
  await context.storageState({path: './auth.json'});
  webContext= await browser.newContext({storageState:'./auth.json'});
})
  
test('Test case 1: Add a product to cart', {
  tag: [
    '@basic_test_case',
  ]
}, async() => {
  const email = "demo.playwright@gmail.com";
  const productName = 'IPHONE 13 PRO';
  
  const page = await webContext.newPage();
  
  // Go to DashBoard Page
  await page.goto("https://rahulshettyacademy.com/client");
  const products = page.locator(".card-body");

  // Search product and add a product to cart
  const titles= await page.locator(".card-body b").allTextContents();
  console.log("Test case 1 gets all product names: ");
  console.log(titles);
  const count = await products.count();
  for(let i =0; i < count; ++i){
    if(await products.nth(i).locator("b").textContent() === productName) {
      //add to cart
      await products.nth(i).locator("text= Add To Cart").click();
      break;
    }
  }

  // Go to Cart page
  await page.locator("[routerlink*='cart']").click();

  // Verify product is displayed on Cart page
  await page.locator("div li").first().waitFor();
  const bool =await page.locator("h3:has-text('iphone 13 pro')").isVisible();
  expect(bool).toBeTruthy();

  // Checkout order
  await page.locator("text=Checkout").click();

  // Select country name
  await page.locator("[placeholder*='Country']").pressSequentially("ind",{delay:100});
  const dropdown = page.locator(".ta-results");
  await dropdown.waitFor();
  let optionsCount = await dropdown.locator("button").count();
  for(let i =0;i< optionsCount; ++i) {
    let text = await dropdown.locator("button").nth(i).textContent();
    if(text === " India") {
      await dropdown.locator("button").nth(i).click();
      break;
    }
  }

  // Verify email is displayed correctly
  await expect(page.locator(".user__name [type='text']").first()).toHaveText(email);
  
  // Click place order button
  await page.locator(".action__submit").click();

  // Verify order successfully
  await expect(page.locator(".hero-primary")).toHaveText(" Thankyou for the order. ");
})

test('Test case 2: Get all product names', {
  tag: [
    '@basic_test_case',
  ]
}, async() => {
  const page = await webContext.newPage();
  await page.goto("https://rahulshettyacademy.com/client");
  await page.waitForSelector(".card-body");
  const titles= await page.locator(".card-body b").allTextContents();
  console.log("Test case 2 gets all product names: ");
  console.log(titles);
})
