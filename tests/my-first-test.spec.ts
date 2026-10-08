import { test, expect } from '@playwright/test';

test('verify input field on the-internet', async ({ page }) => {
  // 1. Go to the inputs page and wait for DOM content to be loaded
  await page.goto('https://the-internet.herokuapp.com/inputs', { 
    waitUntil: 'domcontentloaded' 
  });

  // 2. Target the number input directly using CSS selector
  const inputField = page.locator('input[type="number"]');

  // 3. Fill and verify
  await inputField.fill('876');
  await expect(inputField).toHaveValue('876');
});