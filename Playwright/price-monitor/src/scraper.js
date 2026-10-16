const { chromium } = require('@playwright/test');
const { parsePrice } = require('./parsePrice');

async function getPrice(product) {
  const browser = await chromium.launch({ headless: true });
  try {
    const context = await browser.newContext({
      userAgent:
        'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 ' +
        '(KHTML, like Gecko) Chrome/124.0 Safari/537.36',
      locale: 'en-US',
    });
    const page = await context.newPage();

   await page.goto(product.url, { waitUntil: 'commit', timeout: 60000 });

const el = page.locator(product.selector).first();
await el.waitFor({ state: 'attached', timeout: 30000 });

    const text = ((await el.textContent()) || '').trim();
    const price = parsePrice(text);
    if (price === null) {
      throw new Error(`Could not parse a price from text: "${text}"`);
    }
    return { text, price };
  } finally {
    await browser.close();
  }
}

module.exports = { getPrice };