// src/services/marketDataGateway.js
// src/services/marketDataGateway.js
const redis = require('../config/redis');
const { fetchCryptoPrice } = require('./providers/coinGecko');
const { fetchStockPrice } = require('./providers/finnhub');

const getPrice = async (symbol, type = 'crypto') => {
  const cacheKey = `price:${type}:${symbol.toLowerCase()}`;

  try {
    // 1. Check Redis for existing data
    const cachedData = await redis.get(cacheKey);
    if (cachedData) {
      console.log(`Cache hit for ${symbol}`);
      return JSON.parse(cachedData);
    }

    // 2. Data not in cache, fetch from appropriate provider
    console.log(`Cache miss for ${symbol}. Fetching from API...`);
    let data;
    if (type === 'crypto') {
      data = await fetchCryptoPrice(symbol);
    } else if (type === 'stock') {
      data = await fetchStockPrice(symbol);
    } else {
      throw new Error('Unsupported asset type');
    }

    // 3. Save to Redis with an expiration time (e.g., 60 seconds)
    // This prevents hitting API rate limits
    if (data) {
      await redis.set(cacheKey, JSON.stringify(data), 'EX', 60);
    }

    return data;
  } catch (error) {
    console.error(`Gateway Error fetching ${symbol}:`, error.message);
    return null;
  }
};

module.exports = { getPrice };