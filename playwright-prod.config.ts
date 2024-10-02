import { defineConfig, devices } from '@playwright/test';
import type { Testoptions } from './test-options';


// import dotenv from 'dotenv';
// dotenv.config({ path: path.resolve(__dirname, '.env') });
require('dotenv').config();


export default defineConfig<Testoptions>({

  use: {
    globalsQaUrl: 'https://www.globalsqa.com/demo-site/draganddrop/',
    baseURL: 'http://localhost:4200/',
  },

  projects: [
    {
      name: 'chromium',
    }
  ]
});
