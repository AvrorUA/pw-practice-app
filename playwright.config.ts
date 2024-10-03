import { chromium, defineConfig, devices } from '@playwright/test';
import type { Testoptions } from './test-options';


// import dotenv from 'dotenv';
// dotenv.config({ path: path.resolve(__dirname, '.env') });
require('dotenv').config();


export default defineConfig<Testoptions>({
  timeout: 40000,
  // globalTimeout: 60000,
  expect:{
    timeout: 2000,
    // toMatchSnapshot: {maxDiffPixels: 50}
  },
  
  retries: 1,
  reporter: 'html',
  // reporter: [
  //   ['json', {outputFile: 'test-results/jsonReport.json'}],
  //   ['junit', {outputFile: 'test-results/junitReport.xml'}],
  //   ['allure-playwright']
  // ],

  use: {
    globalsQaUrl: 'https://www.globalsqa.com/demo-site/draganddrop/',
    // DEV=1 npx playwright test usePageObjects.spec.ts --project=chromium
    baseURL: process.env.URL === '1' ? 'http://localhost:4200/'
        : process.env.STAGING == '1' ? 'http://localhost:4202/'
        : 'http://localhost:4200/',

    trace: 'on-first-retry',
    actionTimeout: 5000,
    navigationTimeout: 5000,
    video: {
      mode: 'off',
      size: {width: 1920, height: 1080}
    }
  },

  projects: [
    {
      name: 'dev',
      use: { 
        ...devices['Desktop Chrome'],
        baseURL: 'http://localhost:4200/',
       },
    },
    {
      name: 'chromium',
    },

    {
      name: 'firefox',
      use: { 
        browserName: 'firefox'
      },
    },

    {
      name: 'mobile',
      testMatch: 'testMobile.spec.ts',
      use: {
        // ...devices['iPhone 15 Pro Max'],
        ...devices['Desktop Chrome'],
        viewport: { width: 393, height: 852 },
        isMobile: true,
      }
    }
  ],

  webServer: {
    command: 'npm run start',
    url: 'http://localhost:4200/',
    timeout: 120 * 1000,
  }
});
