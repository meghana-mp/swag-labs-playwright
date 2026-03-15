import { type Locator, type Page } from '@playwright/test';

export class MenuPage {
  readonly page: Page;
  readonly menuButton: Locator;
  readonly logoutLink: Locator;
  readonly allItemsLink: Locator;
  readonly aboutLink: Locator;
  readonly resetLink: Locator;
  readonly closeMenuButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.menuButton = page.locator('#react-burger-menu-btn');
    this.logoutLink = page.locator('[data-test="logout-sidebar-link"]');
    this.allItemsLink = page.locator('[data-test="inventory-sidebar-link"]');
    this.aboutLink = page.locator('[data-test="about-sidebar-link"]');
    this.resetLink = page.locator('[data-test="reset-sidebar-link"]');
    this.closeMenuButton = page.locator('#react-burger-cross-btn');
  }

  async openMenu() {
    await this.menuButton.click();
    // The menu has a sliding animation, so we wait for the link to be visible
    await this.logoutLink.waitFor({ state: 'visible' });
  }
}