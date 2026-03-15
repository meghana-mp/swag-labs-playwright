import { test, expect } from '@playwright/test';
import { LoginPage } from '../page-objects/LoginPage';
import { InventoryPage } from '../page-objects/InventoryPage';
import { CheckoutPage } from '../page-objects/CheckOutPage';

test.describe('Checkout Category', () => {
  let loginPage: LoginPage;
  let inventoryPage: InventoryPage;
  let checkoutPage: CheckoutPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    inventoryPage = new InventoryPage(page);
    checkoutPage = new CheckoutPage(page);

    await loginPage.goto();
    await loginPage.login('standard_user', 'secret_sauce');
    await inventoryPage.addItemToCart('Sauce Labs Backpack');
    await page.goto('https://www.saucedemo.com/checkout-step-one.html');
  });

  test('16. Verify error message when First Name is missing', async ({ page }) => {
    await checkoutPage.fillInformation('', 'User', '12345');
    await expect(page.locator('[data-test="error"]')).toContainText('First Name is required');
  });

  test('17. Verify error message when Last Name is missing', async ({ page }) => {
    await checkoutPage.fillInformation('Test', '', '12345');
    await expect(page.locator('[data-test="error"]')).toContainText('Last Name is required');
  });

  test('18. Verify error message when Zip Code is missing', async ({ page }) => {
    await checkoutPage.fillInformation('Test', 'User', '');
    await expect(page.locator('[data-test="error"]')).toContainText('Postal Code is required');
  });

  test('19. Verify navigation to Overview page with valid info', async ({ page }) => {
    await checkoutPage.fillInformation('Meghana', 'Engineer', '560001');
    await expect(page).toHaveURL(/checkout-step-two/);
  });

  test('20. Verify "Cancel" button takes user back to Cart', async ({ page }) => {
    await checkoutPage.cancelButton.click();
    await expect(page).toHaveURL(/cart/);
  });

  test('21. Complete Checkout and verify Success Message', async ({ page }) => {
    await checkoutPage.fillInformation('Meghana', 'Engineer', '560001');
    await checkoutPage.finishButton.click();
    await expect(page).toHaveURL(/checkout-complete/);
    await expect(checkoutPage.successHeader).toHaveText('Thank you for your order!');
  });
});