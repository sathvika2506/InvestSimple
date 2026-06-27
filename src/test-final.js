// src/test-final.js
require('dotenv').config();
const gateway = require('./services/marketDataGateway');
const { getHumanReadableInsight } = require('./services/aiTranslator');

async function testFinal() {
  console.log("Fetching and Translating...");
  const rawData = await gateway.getPrice('bitcoin', 'crypto');
  const insight = await getHumanReadableInsight(rawData, 'bitcoin');
  
  console.log('--- Final AI Output ---');
  console.log(insight);
}

testFinal();