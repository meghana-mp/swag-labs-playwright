import { test, expect } from '@playwright/test';
import { LoginPage } from '../page-objects/LoginPage'; // Import the class
import * as testData from '../test-data/testData.json';

test.describe('Login Functional Category', () => {
  let loginPage: LoginPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    await loginPage.goto();
  });

  test('1. Verify Swag Labs website is reachable', async ({ page }) => {
    await expect(page).toHaveTitle(/Swag Labs/);
  });

  test('2. Success: Login with standard user', async ({ page }) => {
    const data = testData.loginScenarios.standard;
    await loginPage.login(data.user, data.pass);
    await expect(page).toHaveURL(/inventory/);
  });

  test('3. Failure: Login with locked out user', async () => {
    const data = testData.loginScenarios.locked;
    await loginPage.login(data.user, data.pass);
    await expect(loginPage.errorMessage).toBeVisible();
    await expect(loginPage.errorMessage).toContainText('Sorry, this user has been locked out');
  });

  test('4. Validation: Empty Username', async () => {
    const data = testData.loginScenarios.emptyUser;
    await loginPage.login(data.user, data.pass);
    await expect(loginPage.errorMessage).toBeVisible();
    await expect(loginPage.errorMessage).toContainText('Username is required');
  });

  test('5. Validation: Empty Password', async () => {
    const data = testData.loginScenarios.emptyPass;
    await loginPage.login(data.user, data.pass);
    await expect(loginPage.errorMessage).toBeVisible();
    await expect(loginPage.errorMessage).toContainText('Password is required');
  });
  
  test('6. Validation: Invalid Credentials', async () => {
    const data = testData.loginScenarios.invalid;
    await loginPage.login(data.user, data.pass);
    await expect(loginPage.errorMessage).toBeVisible();
    await expect(loginPage.errorMessage).toContainText('Username and password do not match');
  });
});