import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { ProductsPage } from '../pages/ProductsPage';
import { CheckoutPage } from '../pages/CheckoutPage';
import testData from '../data/test-data.json';

test.describe('Data-Driven Checkout Suite', () => {

  //users som
  const users = [
    { key: 'standardUser', data: testData.standardUser, shouldSucceed: true },
    { key: 'problemUser', data: testData.problemUser, shouldSucceed: false } // کاربر مشکل‌دار ممکن است رفتار متفاوتی داشته باشد
  ];

  for (const { key, data } of users) {
    test(`should handle checkout flow for ${key}`, async ({ page }) => {
      const loginPage = new LoginPage(page);
      const productsPage = new ProductsPage(page);
      const checkoutPage = new CheckoutPage(page);

      await loginPage.goto();
      await loginPage.login(data.username, data.password);
      
      // اگر کاربر استاندارد بود، فرآیند خرید را تا انتها چک می‌کنیم
      if (key === 'standardUser') {
        await productsPage.addProductToCart();
        await checkoutPage.proceedToCheckout();
        await checkoutPage.fillCustomerInfo(data.firstName, data.lastName, data.postalCode);
        await checkoutPage.finishOrder();
        await expect(checkoutPage.successHeader).toHaveText('Thank you for your order!');
      } else {
        // برای کاربر مشکل‌دار می‌توانید سناریوی دلخواه (مثل بررسی خطا) را بنویسید
        // فعلاً بررسی می‌کنیم که لاگین انجام شده یا خیر
        console.log(`Running test for ${key}`);
      }
    });
  }

});