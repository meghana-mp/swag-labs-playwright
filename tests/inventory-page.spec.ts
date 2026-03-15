// import { test, expect } from '@playwright/test';
// import { LoginPage } from '../page-objects/LoginPage';
// import { InventoryPage } from '../page-objects/InventoryPage';


// test.describe('Inventory / Products Category', () => {
//   let loginPage: LoginPage;
//   let inventoryPage: InventoryPage;

//   test.beforeEach(async ({ page }) => {
//     loginPage = new LoginPage(page);
//     inventoryPage = new InventoryPage(page);

//     // Every inventory test requires being logged in first
//     await loginPage.goto();
//     await loginPage.login('standard_user', 'secret_sauce');
//     await expect(page).toHaveURL(/inventory/);
//   });

//   test('7. Verify all 6 products are displayed', async () => {
//     const count = await inventoryPage.inventoryItems.count();
//     expect(count).toBe(6);
//   });

//   test('8. Verify sorting Name (Z to A)', async () => {
//     await inventoryPage.selectSortOption('za');
//     const firstItem = await inventoryPage.itemNames.first().innerText();
//     expect(firstItem).toBe('Test.allTheThings() T-Shirt (Red)');
//   });

//  test('9. Verify sorting Price (Low to High)', async ({ page }) => {
//     await inventoryPage.selectSortOption('lohi');
//     // Using page here requires the { page } fixture above
//     const firstItemPrice = await page.locator('.inventory_item_price').first().innerText();
//     expect(firstItemPrice).toBe('$7.99');
//   });

//   test('10. Add a specific item to cart', async ({ page }) => {
//     await inventoryPage.addItemToCart('Sauce Labs Backpack');
//     // Checking the badge also needs the { page } fixture
//     await expect(page.locator('.shopping_cart_badge')).toHaveText('1');
//   });

//   test('11. Verify clicking item name opens detail page', async ({ page }) => {
//     await inventoryPage.itemNames.first().click();
//     // URL and visibility checks need the { page } fixture
//     await expect(page).toHaveURL(/inventory-item/);
//     await expect(page.locator('[data-test="back-to-products"]')).toBeVisible();
//   });

//   });