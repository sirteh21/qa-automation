import { test as setup, expect } from '@playwright/test';

//
const authFile = 'playwright/.auth/user.json';

setup('authenticate standard user', async ({ page }) => {
  // ۱.enter the login page
  await page.goto('https://www.saucedemo.com/');

  // ۲.data insert

  await page.locator('[data-test="username"]').fill('standard_user');
  await page.locator('[data-test="password"]').fill('secret_sauce');
  await page.locator('[data-test="login-button"]').click();

  // ۳.  successful login verification)
  await expect(page.locator('.title')).toHaveText('Products');

  // ۴. save the authentication state (Cookies + LocalStorage) to a JSON file
  await page.context().storageState({ path: authFile });
});