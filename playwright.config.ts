import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  reporter: 'html',
  
  use: {
    trace: 'on-first-retry',
  },

  projects: [
    // ۱. setup project to authenticate and save cookies
    {
      name: 'setup',
      testMatch: /.*\.setup\.ts/,
    },

    // ۲. main project that uses the saved cookies for authenticated tests
    {
      name: 'chromium',
      use: { 
        ...devices['Desktop Chrome'],
        //cokies and local storage will be loaded from the specified file
        storageState: 'playwright/.auth/user.json',
      },
      dependencies: ['setup'], // important to ensure that the setup project runs before this one
    },
    
    // ۳. additional projects for other browsers if needed
  ],
});