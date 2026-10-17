import { test, expect } from '@playwright/test';

test.describe('Authenticated State Suite', () => {

  test('should be logged in automatically without entering credentials', async ({ page }) => {
    // invetry page is the default page after login, so we can directly navigate to it
    await page.goto('https://www.saucedemo.com/inventory.html');

    // ۲. check if the user is already logged in by verifying the presence of the products page title and the shopping cart link
    await expect(page.locator('.title')).toHaveText('Products');
    await expect(page.locator('.shopping_cart_link')).toBeVisible();
    
    console.log('Successfully bypassed login using storageState!');
  });

});