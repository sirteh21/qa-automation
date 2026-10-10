import { Page, Locator } from '@playwright/test';

export class ProductsPage {
  readonly page: Page;
  readonly cartIcon: Locator;
  readonly sortDropdown: Locator;
  readonly inventoryItemNames: Locator;
  readonly inventoryItemPrices: Locator;

  constructor(page: Page) {
    this.page = page;
    this.cartIcon = page.locator('.shopping_cart_link');
    this.sortDropdown = page.locator('.product_sort_container');
    this.inventoryItemNames = page.locator('.inventory_item_name');
    this.inventoryItemPrices = page.locator('.inventory_item_price');
  }

  async addProductToCart(index: number = 0) {
    const addToCartButtons = this.page.locator('button[id^="add-to-cart"]');
    await addToCartButtons.nth(index).click();
  }

  async sortBy(optionValue: string) {
    // option values: 'az', 'za', 'lohi', 'hilo'
    await this.sortDropdown.selectOption(optionValue);
  }

  async getItemNames(): Promise<string[]> {
    return await this.inventoryItemNames.allTextContents();
  }

  async getItemPrices(): Promise<number[]> {
    const priceTexts = await this.inventoryItemPrices.allTextContents();
    return priceTexts.map(price => parseFloat(price.replace('$', '')));
  }
}