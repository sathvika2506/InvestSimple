// src/sockets/socketHandler.js
const { getPrice } = require('../services/marketDataGateway');

const initSocket = (io) => {
  io.on('connection', (socket) => {
    console.log('Client connected:', socket.id);

    // Broadcast market data every 30 seconds
    const interval = setInterval(async () => {
      const btcPrice = await getPrice('bitcoin', 'crypto');
      socket.emit('marketUpdate', { symbol: 'BTC', data: btcPrice });
    }, 30000);

    socket.on('disconnect', () => clearInterval(interval));
  });
};

module.exports = { initSocket };