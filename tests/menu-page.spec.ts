import { test, expect } from '@playwright/test';
import { LoginPage } from '../page-objects/LoginPage';
import { MenuPage } from '../page-objects/MenuPage';

test.describe('Sidebar Menu Category', () => {
  let loginPage: LoginPage;
  let menuPage: MenuPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    menuPage = new MenuPage(page);

    await loginPage.goto();
    await loginPage.login('standard_user', 'secret_sauce');
    await menuPage.openMenu();
  });

  test('22. Verify "About" link leads to Sauce Labs website', async ({ page }) => {
    await menuPage.aboutLink.click();
    // This usually redirects to saucelabs.com
    await expect(page).toHaveURL(/saucelabs.com/);
  });

  test('23. Verify "All Items" navigates back to products', async ({ page }) => {
    // Navigate elsewhere first
    await page.goto('https://www.saucedemo.com/cart.html');
    await menuPage.openMenu();
    await menuPage.allItemsLink.click();
    await expect(page).toHaveURL(/inventory/);
  });

  test('24. Verify "Reset App State" clears the cart', async ({ page }) => {
    // This is a powerful test for data integrity
    await menuPage.resetLink.click();
    const badge = page.locator('.shopping_cart_badge');
    await expect(badge).not.toBeVisible();
  });

  test('25. Verify "Logout" destroys session and redirects', async ({ page }) => {
    await menuPage.logoutLink.click();
    await expect(page).toHaveURL('https://www.saucedemo.com/');
    
    // Architect Check: Try to go back to inventory manually to ensure session is dead
    await page.goto('https://www.saucedemo.com/inventory.html');
    await expect(page.locator('[data-test="error"]')).toBeVisible();
  });
});