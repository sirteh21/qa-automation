import { test, expect } from '@playwright/test';
import { CheckboxesPage } from '../pages/CheckboxesPage';

test.describe('The Internet - Checkboxes Suite', () => {

  test('should toggle checkboxes successfully', async ({ page }) => {
    test.setTimeout(60000);
    const checkboxesPage = new CheckboxesPage(page);

    await checkboxesPage.goto();

    // چک‌باکس اول پیش‌فرض خالی است، با کلیک باید تیک بخورد
    await checkboxesPage.clickCheckbox(0);
    await expect(checkboxesPage.checkboxes.nth(0)).toBeChecked();

    // چک‌باکس دوم پیش‌فرض تیک دارد، با کلیک باید تیکش برداشته شود
    await checkboxesPage.clickCheckbox(1);
    await expect(checkboxesPage.checkboxes.nth(1)).not.toBeChecked();
  });

});