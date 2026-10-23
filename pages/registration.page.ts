import { Page, Locator, expect } from '@playwright/test';

export class RegistrationPage {
  readonly page: Page;
  readonly usernameInput: Locator;
  readonly emailInput: Locator;
  readonly passwordInput: Locator;
  readonly submitButton: Locator;
  readonly errorMessage: Locator;
  readonly passwordRequirements: Locator;

  constructor(page: Page) {
    this.page = page;
    this.usernameInput = page.locator('#username');
    this.emailInput = page.locator('#email');
    this.passwordInput = page.locator('#password');
    this.submitButton = page.locator('button[type="submit"]');
    this.errorMessage = page.locator('.error-message');
    this.passwordRequirements = page.locator('.password-hint');
  }

  async navigate() {
    // Navigating to the practice registration page
    await this.page.goto('https://demo.playwright.dev/todomvc/#/'); 
  }

  async fillForm(username: string, email: string, pass: string) {
    await this.usernameInput.fill(username);
    await this.emailInput.fill(email);
    await this.passwordInput.fill(pass);
  }
}