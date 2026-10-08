import { test, expect } from '@playwright/test';

test('verify checkboxes functionality', async ({ page }) => {
  await page.goto('https://the-internet.herokuapp.com/checkboxes', { 
    waitUntil: 'domcontentloaded' 
  });

  const checkboxes = page.locator('input[type="checkbox"]');
  await checkboxes.nth(0).check();
  await expect(checkboxes.nth(0)).toBeChecked();
});

test('verify dropdown selection', async ({ page }) => {
  await page.goto('https://the-internet.herokuapp.com/dropdown', { 
    waitUntil: 'domcontentloaded' 
  });

  const dropdown = page.locator('#dropdown');
  await dropdown.selectOption('Option 1');
  await expect(dropdown).toHaveValue('1');
});
