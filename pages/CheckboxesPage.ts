import { Page, Locator } from '@playwright/test';

export class CheckboxesPage {
  readonly page: Page;
  readonly checkboxes: Locator;

  constructor(page: Page) {
    this.page = page;
    // انتخاب مستقیم تمام چک‌باکس‌ها
    this.checkboxes = page.locator('input[type="checkbox"]');
  }

  async goto() {
    await this.page.goto('https://the-internet.herokuapp.com/checkboxes', {
      waitUntil: 'domcontentloaded',
    });
  }

  async clickCheckbox(index: number) {
    // استفاده از کلیک ساده که در این صفحه بسیار مطمئن‌تر عمل می‌کند
    await this.checkboxes.nth(index).click();
  }
}