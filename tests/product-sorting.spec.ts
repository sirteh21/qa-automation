import { test, expect } from '../fixtures/base-test';
import testData from '../data/test-data.json';

test.describe('Product Sorting Suite - SauceDemo', () => {

  test.beforeEach(async ({ loginPage }) => {
    await loginPage.goto();
    await loginPage.login(testData.standardUser.username, testData.standardUser.password);
  });

  test('should sort products by Name (A to Z)', async ({ productsPage }) => {
    await productsPage.sortBy('az');
    
    const names = await productsPage.getItemNames();
    const sortedNames = [...names].sort();
    
    expect(names).toEqual(sortedNames);
  });

  test('should sort products by Price (Low to High)', async ({ productsPage }) => {
    await productsPage.sortBy('lohi');
    
    const prices = await productsPage.getItemPrices();
    const sortedPrices = [...prices].sort((a, b) => a - b);
    
    expect(prices).toEqual(sortedPrices);
  });

  test('should sort products by Price (High to Low)', async ({ productsPage }) => {
    await productsPage.sortBy('hilo');
    
    const prices = await productsPage.getItemPrices();
    const sortedPrices = [...prices].sort((a, b) => b - a);
    
    expect(prices).toEqual(sortedPrices);
  });

});