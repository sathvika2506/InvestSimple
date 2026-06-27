const Redis = require('ioredis');

// Upstash requires TLS for security
const redis = new Redis(process.env.REDIS_URL, {
  tls: {}, 
});

redis.on('connect', () => console.log('Connected to Redis Cache!'));
redis.on('error', (err) => console.error('Redis Error:', err.message));

module.exports = redis;