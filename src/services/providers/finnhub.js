// src/services/providers/finnhub.js
const axios = require('axios');

const fetchStockPrice = async (symbol) => {
  const url = `https://finnhub.io/api/v1/quote?symbol=${symbol}&token=${process.env.FINNHUB_API_KEY}`;
  
  try {
    const response = await axios.get(url);
    // Finnhub returns 'c' for current price
    return { price: response.data.c };
  } catch (error) {
    console.error("Finnhub API Error:", error.message);
    throw error;
  }
};

module.exports = { fetchStockPrice };