class InventoryPage {
    constructor(page) {
    this.page = page;
    this.title = page.locator('.title');
    this.items = page.locator('.inventory_item');
    this.cartBadge = page.locator('.shopping_cart_badge');
    }

    async addFirstItemToCart() {
    await this.items.first().getByRole('button', { name: 'Add to cart' }).click();
    }
}

module.exports = { InventoryPage };