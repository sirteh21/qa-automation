import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { ProductsPage } from '../pages/ProductsPage';
import { CheckoutPage } from '../pages/CheckoutPage';
import testData from '../data/test-data.json';

test.describe('Data-Driven Suite - SauceDemo', () => {

  test('should complete purchase successfully for standard user', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const productsPage = new ProductsPage(page);
    const checkoutPage = new CheckoutPage(page);

    await loginPage.goto();
    await loginPage.login(testData.standardUser.username, testData.standardUser.password);
    
    await productsPage.addProductToCart();
    await checkoutPage.proceedToCheckout();
    await checkoutPage.fillCustomerInfo(
      testData.standardUser.firstName, 
      testData.standardUser.lastName, 
      testData.standardUser.postalCode
    );
    await checkoutPage.finishOrder();
    await expect(checkoutPage.successHeader).toHaveText('Thank you for your order!');
  });

  test('should show error message for locked out user', async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.goto();
    await loginPage.login(testData.lockedOutUser.username, testData.lockedOutUser.password);
    
    // Assert that the error banner appears with the expected text
    const errorMessage = page.locator('[data-test="error"]');
    await expect(errorMessage).toBeVisible();
    await expect(errorMessage).toHaveText(testData.lockedOutUser.expectedError);
  });

});