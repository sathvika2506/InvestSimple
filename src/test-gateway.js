// src/test-gateway.js
require('dotenv').config();
const gateway = require('./services/marketDataGateway');

async function test() {
  const price = await gateway.getPrice('bitcoin', 'crypto');
  console.log('Gateway result:', price);
}

test();