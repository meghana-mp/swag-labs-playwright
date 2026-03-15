import { test, expect } from '@playwright/test';
import { LoginPage } from '../page-objects/LoginPage';
import testData from '../test-data/testData.json';

test.describe('Visual Bug Detection', () => {
  let loginPage: LoginPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
  });

  test('Verify inventory page layout for visual_user', async ({ page }) => {
    await loginPage.goto();
    
    // Login as the visual user to see the glitches
    const user = testData.loginScenarios.visual;
    await loginPage.login(user.user, user.pass);

    // This will capture the misaligned cart icon
    // The first time you run this, it creates the "Baseline"
    // The second time, it will compare and fail if the layout changes
    await expect(page).toHaveScreenshot('visual-user-inventory.png', {
        fullPage: true,
        animations: 'disabled' // Prevents flakes from moving elements
    });
  });
  
  test('Verify cart icon position specifically', async ({ page }) => {
  await loginPage.goto();
  await loginPage.login(testData.loginScenarios.visual.user, testData.loginScenarios.visual.pass);

  // Focus only on the header container
  const header = page.locator('.primary_header'); 
  
  await expect(header).toHaveScreenshot('header-reference.png', {
    maxDiffPixels: 200, // Allows for tiny font/rendering differences
    threshold: 0.2      // Sensitivity: 0 is strict, 1 is loose
  });
});
});

