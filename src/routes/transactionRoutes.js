const express = require('express');
const router = express.Router();
const { createTransaction } = require('../controllers/transactionController');

// The POST endpoint for transactions
router.post('/', createTransaction);

module.exports = router;