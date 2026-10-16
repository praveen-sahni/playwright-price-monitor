const { test,expect } = require('@playwright/test');
const { chromium } = require('@playwright/test');

test('record demo 2',async () => {
    const browser = await chromium.launch({
    headless: false
    });
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto('https://www.google.com/search?q=saucedemo&oq=saucedemo&gs_lcrp=EgZjaHJvbWUyBggAEEUYOdIBCTI1MjMxajBqMqgCALACAA&sourceid=chrome&ie=UTF-8');
    await page.goto('https://www.google.com/sorry/index?continue=https://www.google.com/search%3Fq%3Dsaucedemo%26oq%3Dsaucedemo%26gs_lcrp%3DEgZjaHJvbWUyBggAEEUYOdIBCTI1MjMxajBqMqgCALACAA%26sourceid%3Dchrome%26ie%3DUTF-8%26sei%3Ddp7QaqSdIMCTseMPz5mn6As&q=EgSYNGFqGPa8wtYGIjBz38i4Tsn5wa_r6ZmRqcSUv-oLHowqPza1oTorany4-nW4xQ8myxtpEbOGCSk0bLsyAVJaAUNg-Kvtofe4p7wi');
    await page.goto('https://www.google.com/search?q=saucedemo&oq=saucedemo&gs_lcrp=EgZjaHJvbWUyBggAEEUYOdIBCDM4ODFqMGo0qAIAsAIB&sourceid=chrome&source=chrome.ob&ie=UTF-8');
    await page.goto('https://www.google.com/sorry/index?continue=https://www.google.com/search%3Fq%3Dsaucedemo%26oq%3Dsaucedemo%26gs_lcrp%3DEgZjaHJvbWUyBggAEEUYOdIBCDM4ODFqMGo0qAIAsAIB%26sourceid%3Dchrome%26source%3Dchrome.ob%26ie%3DUTF-8%26sei%3DgZ7QareHEcyhnesP572L6AQ&q=EgSYNGFqGIG9wtYGIjCfDks-TYYC8OPtH47fCQbob3IvZQhAAr0uS9zD69ONJyiLWYFV4n2JZSJxZEOeZpoyAVJaAUNgpaDTjfKEkuRY');
    await page.goto('https://www.saucedemo.com/');
    await page.locator('[data-test="username"]').click();
    await page.locator('[data-test="username"]').fill('standard_user');
    await page.locator('[data-test="password"]').click();
    await page.locator('[data-test="password"]').fill('security_user');
    await page.locator('[data-test="password"]').press('Enter');
    await page.locator('[data-test="password"]').fill('secret_sauce');
    await page.locator('[data-test="password"]').press('Enter');
    await page.getByRole('button', { name: 'Open Menu' }).click();
    await page.locator('[data-test="logout-sidebar-link"]').click();

    
    await context.close();
    await browser.close();
})
