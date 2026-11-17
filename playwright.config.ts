import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests', // Folder tempat file tes disimpan
  timeout: 30 * 1000,
  expect: {
    timeout: 5000
  },
  use: {
    // Memaksa Playwright menggunakan Google Chrome asli di PC kamu
    channel: 'chrome',
    headless: false,   // false supaya jendela Chrome-nya kelihatan
    trace: 'on-first-retry',
  },

  projects: [
    {
      name: 'google-chrome',
      use: { ...devices['Desktop Chrome'], channel: 'chrome' },
    },
  ],
});