// src/services/providers/coinGecko.js
const axios = require('axios');

const fetchCryptoPrice = async (coinId) => {
  const url = `https://api.coingecko.com/api/v3/simple/price?ids=${coinId}&vs_currencies=usd`;
  
  try {
    const response = await axios.get(url, {
      headers: {
        'x-cg-demo-api-key': process.env.COINGECKO_API_KEY
      }
    });
    return response.data;
  } catch (error) {
    console.error("CoinGecko API Error:", error.message);
    throw error;
  }
};

module.exports = { fetchCryptoPrice };