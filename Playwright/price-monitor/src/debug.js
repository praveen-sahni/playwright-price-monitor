const { chromium } = require('@playwright/test');

(async () => {
  const url = process.argv[2] || 'https://example.com';
  const browser = await chromium.launch({ headless: false });
  const page = await browser.newPage();

  page.on('requestfailed', (r) =>
    console.log('REQUEST FAILED:', r.url(), r.failure()?.errorText)
  );

  try {
    const res = await page.goto(url, { waitUntil: 'commit', timeout: 60000 });
    console.log('Status:', res?.status());
    await page.waitForTimeout(5000);
    console.log('URL now:', page.url());
    console.log('Title:', await page.title());
    const text = await page.locator('body').innerText().catch(() => '');
    console.log('Body (first 300 chars):', text.slice(0, 300));
    await page.screenshot({ path: 'debug.png' });
    console.log('Screenshot saved as debug.png in the folder you ran this from');
  } catch (err) {
    console.error('FAILED:', err.message);
  }

  await browser.close();
})();