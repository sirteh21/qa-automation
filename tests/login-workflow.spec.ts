import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';

test.describe('The Internet - Form Authentication Suite (POM)', () => {

  test('should display error message on invalid credentials', async ({ page }) => {
    test.setTimeout(60000);
    const loginPage = new LoginPage(page);

    await loginPage.goto();
    await loginPage.login('wronguser', 'SuperSecretPassword!@#');

    await expect(loginPage.flashMessage).toContainText('Your username is invalid!');
  });

  test('should login successfully with valid credentials', async ({ page }) => {
    test.setTimeout(60000);
    const loginPage = new LoginPage(page);

    await loginPage.goto();
    await loginPage.login('tomsmith', 'SuperSecretPassword!');

    // اول منتظر می‌مانیم پیام موفقیت ظاهر شود، سپس URL را چک می‌کنیم
    await expect(loginPage.flashMessage).toContainText('You logged into a secure area!');
    await expect(page).toHaveURL('https://the-internet.herokuapp.com/secure');
  });

});