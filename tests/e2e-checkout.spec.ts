import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { ProductsPage } from '../pages/ProductsPage';
import { CheckoutPage } from '../pages/CheckoutPage';

test.describe('SauceDemo - E2E POM Purchase Journey', () => {

  test('should complete end-to-end purchase successfully', async ({ page }) => {
    test.setTimeout(60000);

    const loginPage = new LoginPage(page);
    const productsPage = new ProductsPage(page);
    const checkoutPage = new CheckoutPage(page);

    // ۱. ورود به سایت و لاگین
    await loginPage.goto();
    await loginPage.login('standard_user', 'secret_sauce');
    await expect(page).toHaveURL(/.*inventory.html/);

    // ۲. افزودن محصول به سبد خرید
    await productsPage.addProductToCart();

    // ۳. رفتن به بخش تسویه حساب
    await checkoutPage.proceedToCheckout();

    // ۴. پر کردن فرم اطلاعات کاربر
    await checkoutPage.fillCustomerInfo('Farhad', 'Baghery', '55318');

    // ۵. تایید نهایی سفارش
    await checkoutPage.finishOrder();

    // ۶. بررسی موفقیت‌آمیز بودن خرید
    await expect(checkoutPage.successHeader).toHaveText('Thank you for your order!');
  });

});