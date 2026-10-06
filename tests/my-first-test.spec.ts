import { test, expect } from '@playwright/test';

test('should successfully log into a demo app', async ({ page }) => {
  // 1. Open the practice login page
  await page.goto('https://opensource-demo.orangehrmlive.com/');

  // 2. Type username and password into the input fields
  await page.locator('input[name="username"]').fill('Admin');
  await page.locator('input[name="password"]').fill('admin123');

  // 3. Click the login submit button
  await page.locator('button[type="submit"]').click();

  // 4. Verify that we successfully logged in by checking the dashboard header
  await expect(page.locator('.oxd-topbar-header-breadcrumb')).toBeVisible();
});