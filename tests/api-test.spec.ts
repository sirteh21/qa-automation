import { test, expect } from '@playwright/test';

test.describe('API Testing Suite', () => {

  test('should fetch user details successfully', async ({ request }) => {
    const response = await request.get('https://jsonplaceholder.typicode.com/users/1');
    expect(response.status()).toBe(200);

    const responseBody = await response.json();
    expect(responseBody.name).toBe('Leanne Graham');
    expect(responseBody.email).toBe('Sincere@april.biz');
  });

  test('should create a new post successfully via POST request', async ({ request }) => {
    const response = await request.post('https://jsonplaceholder.typicode.com/posts', {
      data: {
        title: 'Playwright API Testing',
        body: 'Learning how to automate POST requests easily.',
        userId: 1,
      },
    });

    expect(response.status()).toBe(201);

    const responseBody = await response.json();
    expect(responseBody.title).toBe('Playwright API Testing');
    expect(responseBody.userId).toBe(1);
    
    console.log('Created Post ID:', responseBody.id);
  });

});