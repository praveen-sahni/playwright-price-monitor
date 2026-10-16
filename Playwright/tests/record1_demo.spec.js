import { test, expect } from '@playwright/test';

test('record demo test', async ({ page }) => {
    await page.goto('https://www.saucedemo.com/');
    await page.locator('[data-test="username"]').click();
    await page.locator('[data-test="username"]').fill('standard_user');
    await page.locator('[data-test="password"]').click();
    await page.locator('[data-test="password"]').fill('secret_');
    await page.locator('[data-test="password"]').press('Shift+Enter');
    await page.locator('[data-test="password"]').fill('secret_sauce');
    await page.locator('[data-test="password"]').click();
    await page.locator('[data-test="password"]').fill('');
    await page.getByText('Swag Labs').click();
    await page.locator('[data-test="password"]').click();
    await page.locator('[data-test="password"]').fill('secret_sauce');
    await page.locator('[data-test="login-button"]').click();
});