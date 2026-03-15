import { test, expect } from '@playwright/test';
import { LoginPage } from '../page-objects/LoginPage';
import { InventoryPage } from '../page-objects/InventoryPage';
import { CartPage } from '../page-objects/CartPage';

test.describe('Cart Category', () => {
  let loginPage: LoginPage;
  let inventoryPage: InventoryPage;
  let cartPage: CartPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    inventoryPage = new InventoryPage(page);
    cartPage = new CartPage(page);

    // Setup: Login and go to cart with an item
    await loginPage.goto();
    await loginPage.login('standard_user', 'secret_sauce');
    await inventoryPage.addItemToCart('Sauce Labs Backpack');
    await page.locator('.shopping_cart_link').click();
  });

  test('12. Verify item is present in the cart', async ({ page }) => {
    const itemName = await page.locator('.inventory_item_name').innerText();
    expect(itemName).toBe('Sauce Labs Backpack');
  });

  test('13. Verify cart quantity is correct', async () => {
    await expect(cartPage.cartQuantity).toHaveText('1');
  });

  test('14. Verify "Continue Shopping" takes user back to inventory', async ({ page }) => {
    await cartPage.continueShoppingButton.click();
    await expect(page).toHaveURL(/inventory/);
  });

  test('15. Verify "Checkout" button leads to information page', async ({ page }) => {
    await cartPage.clickCheckout();
    await expect(page).toHaveURL(/checkout-step-one/);
  });
});