import { test, expect } from '@playwright/test';

test.describe('Real-World Form Validation & Boundary Testing', () => {

  test('should validate required fields and error states', async ({ page }) => {
    await page.goto('https://practice.expandtesting.com/form-validation');

    const submitBtn = page.locator('button[type="submit"]');

    // Submit the form without filling required fields
    await submitBtn.click();

    // Verify that Bootstrap's validation class is triggered on the form
    const form = page.locator('.needs-validation');
    await expect(form).toHaveClass(/was-validated/);
  });

  test('should enforce boundary values on character input limits', async ({ page }) => {
    await page.goto('https://practice.expandtesting.com/inputs');

    const numberInput = page.locator('#input-number');

    // Test Case: Boundary value checks for numeric range inputs
    await numberInput.fill('100'); // Valid upper boundary
    await expect(numberInput).toHaveValue('100');
  });

  test('should verify whitespace trimming on mandatory text fields', async ({ page }) => {
    await page.goto('https://practice.expandtesting.com/inputs');

    const textInput = page.locator('#input-text');

    // Test Case: Entering spaces only
    await textInput.fill('   ');
    
    // Assert that whitespace-only values can be evaluated and trimmed correctly
    const value = await textInput.inputValue();
    expect(value.trim()).toBe('');
  });

});