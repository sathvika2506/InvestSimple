// src/test-stock.js
require('dotenv').config();
const gateway = require('./services/marketDataGateway');

async function test() {
  const data = await gateway.getPrice('AAPL', 'stock'); // Testing Apple
  console.log('Stock Price:', data);
}
test();