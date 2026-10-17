import { test, expect } from '../fixtures/base-test';
import testData from '../data/test-data.json';

test.describe('Data-Driven Suite - SauceDemo', () => {

  test('should complete purchase successfully for standard user', async ({ loginPage, productsPage, checkoutPage }) => {
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

  // حلقه پویای Data-Driven برای تست کاربران نامعتبر/خطاها
  for (const user of testData.invalidUsers) {
    test(`should show error message for user: ${user.username || 'empty username'}`, async ({ page, loginPage }) => {
      await loginPage.goto();
      await loginPage.login(user.username, user.password);

      const errorMessage = page.locator('[data-test="error"]');
      await expect(errorMessage).toBeVisible();
      await expect(errorMessage).toHaveText(user.expectedError);
    });
  }

});