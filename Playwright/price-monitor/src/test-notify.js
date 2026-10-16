require('dotenv').config();
const { notify } = require('./notifier');

notify('Test message from your price monitor bot').then((sent) => {
  console.log(sent ? 'Test message sent.' : 'Nothing was sent. Check .env');
});