import { Page, Locator } from '@playwright/test';

export class ProductsPage {
  readonly page: Page;
  readonly addToCartButton: Locator;
  readonly cartIcon: Locator;

  constructor(page: Page) {
    this.page = page;
    this.addToCartButton = page.locator('#add-to-cart-sauce-labs-backpack');
    this.cartIcon = page.locator('.shopping_cart_link');
  }

  async addProductToCart() {
    await this.addToCartButton.click();
  }

  async goToCart() {
    await this.cartIcon.click();
  }
}