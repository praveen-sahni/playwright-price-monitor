// Add as many products as you like.
// selector = CSS selector of the element that contains the price.
module.exports = [
    {
    name: 'Test book (practice site)',
    url: 'https://books.toscrape.com/catalogue/a-light-in-the-attic_1000/index.html',
    selector: '.product_main .price_color',
    targetPrice: 60, // currently £51.77, so this triggers an alert right away for testing
    },

  // Real-world examples (selectors can change, so verify them in DevTools):
  // {
  //   name: 'eBay item',
  //   url: 'https://www.ebay.com/itm/XXXXXXXX',
  //   selector: '.x-price-primary span',
  //   targetPrice: 100,
  // },
  // {
  //   name: 'Amazon item',
  //   url: 'https://www.amazon.com/dp/XXXXXXXXXX',
  //   selector: '.a-price .a-offscreen',
  //   targetPrice: 100,
  // },
];