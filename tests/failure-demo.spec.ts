import { test, expect } from '@playwright/test';

test('should fail intentionally to capture screenshot and video', async ({ page }) => {
  // ۱. رفتن به سایت
  await page.goto('https://www.saucedemo.com/');

  // ۲. یک بررسی (Expect) غلط می‌نویسیم تا تست به عمد فیل شود
  // مثلاً عنوان صفحه را بررسی می‌کنیم ولی یک متن اشتباه می‌گذاریم
  await expect(page.locator('.login_logo')).toHaveText('Wrong Title Text');
});