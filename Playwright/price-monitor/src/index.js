require('dotenv').config();
const cron = require('node-cron');
const products = require('../config/products');
const { getPrice } = require('./scraper');
const { notify } = require('./notifier');
const storage = require('./storage');

let running = false;

async function runChecks() {
  if (running) return;
  running = true;
  console.log(`\n[${new Date().toLocaleString()}] Checking ${products.length} product(s)...`);

  const state = storage.load();

  for (const product of products) {
    try {
      const { text, price } = await getPrice(product);
      console.log(`- ${product.name}: ${text} (parsed ${price}) | target ${product.targetPrice}`);

      const lastAlerted = state[product.name]?.lastAlertedPrice;

      if (price <= product.targetPrice) {
        // Alert only the first time, or if the price dropped further
        if (lastAlerted === undefined || price < lastAlerted) {
          const sent = await notify(
            `Price drop! ${product.name}\nNow: ${price} (target: ${product.targetPrice})\n${product.url}`
          );
          if (sent) state[product.name] = { lastAlertedPrice: price };
        } else {
          console.log('  Already alerted at this price, skipping.');
        }
      } else if (lastAlerted !== undefined) {
        delete state[product.name]; // price went back up, so reset
      }
    } catch (err) {
      console.error(`- ${product.name}: FAILED -> ${err.message}`);
    }
  }

  storage.save(state);
  running = false;
}

const once = process.argv.includes('--once');

if (once) {
  runChecks().then(() => process.exit(0));
} else {
  const schedule = process.env.CRON_SCHEDULE || '0 * * * *';
  if (!cron.validate(schedule)) {
    console.error(`Invalid CRON_SCHEDULE: "${schedule}"`);
    process.exit(1);
  }
  console.log(`Price monitor started. Schedule: "${schedule}". Press Ctrl+C to stop.`);
  runChecks(); // run once immediately
  cron.schedule(schedule, runChecks);
}