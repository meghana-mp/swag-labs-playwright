import { type Locator, type Page } from '@playwright/test';

export class InventoryPage {
  readonly page: Page;
  readonly inventoryItems: Locator;
  readonly sortContainer: Locator;
  readonly shoppingCartLink: Locator;
  readonly itemNames: Locator;

  constructor(page: Page) {
    this.page = page;
    this.inventoryItems = page.locator('.inventory_item');
    this.sortContainer = page.locator('[data-test="product_sort_container"]');
    this.shoppingCartLink = page.locator('.shopping_cart_link');
    this.itemNames = page.locator('.inventory_item_name');
  }

  async addItemToCart(itemName: string) {
    // Finds a specific item by name and clicks its "Add to cart" button
    const item = this.page.locator('.inventory_item').filter({ hasText: itemName });
    await item.locator('button').click();
  }

  async selectSortOption(option: string) {
    // Options: az, za, lohi, hilo
    await this.sortContainer.selectOption(option);
  }
}