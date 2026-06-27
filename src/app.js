require('dotenv').config();
const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const helmet = require('helmet');
const cors = require('cors');

// Import your route files
const transactionRoutes = require('./routes/transactionRoutes');
const authRoutes = require('./routes/authRoutes'); // 1. Import your auth routes

// Import your finalized AI service
const { getHumanReadableInsight } = require('./services/aiTranslator');

const app = express();
const server = http.createServer(app);
const io = new Server(server, { cors: { origin: "*" } });

// Middleware
app.use(helmet());
app.use(cors());
app.use(express.json()); // Required to parse JSON from Postman

// Routes
app.get('/', (req, res) => res.send('InvestSimple API is running...'));
app.use('/api/transactions', transactionRoutes);
app.use('/api', authRoutes); // 2. Link auth routes to the /api prefix

// Socket.io: The "Confidence Nudge" pipeline
io.on('connection', (socket) => {
  console.log('Client connected for real-time nudges:', socket.id);

  socket.on('request_insight', async ({ marketData, assetName }) => {
    try {
      const insight = await getHumanReadableInsight(marketData, assetName);
      socket.emit('financial_nudge', insight);
    } catch (error) {
      socket.emit('error', { message: 'Could not generate insight' });
    }
  });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});