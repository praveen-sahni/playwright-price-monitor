const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../pages/LoginPage');
const { InventoryPage } = require('../pages/InventoryPage');

test.describe('SauceDemo', () => {
    test('valid user can log in', async ({ page }) => {
    const login = new LoginPage(page);
    const inventory = new InventoryPage(page);

    await login.goto();
    await login.login('standard_user', 'secret_sauce');

    await expect(page).toHaveURL(/inventory/);
    await expect(inventory.title).toHaveText('Products');
    await expect(inventory.items).toHaveCount(6);
    });

    test('locked out user sees an error', async ({ page }) => {
    const login = new LoginPage(page);

    await login.goto();
    await login.login('locked_out_user', 'secret_sauce');

    await expect(login.error).toContainText('locked out');
    });

    test('wrong password shows an error', async ({ page }) => {
    const login = new LoginPage(page);

    await login.goto();
    await login.login('standard_user', 'wrong_password');

    await expect(login.error).toContainText('do not match');
    });

    test('user can add an item to the cart', async ({ page }) => {
    const login = new LoginPage(page);
    const inventory = new InventoryPage(page);

    await login.goto();
    await login.login('standard_user', 'secret_sauce');
    await inventory.addFirstItemToCart();

    await expect(inventory.cartBadge).toHaveText('1');
    });
});