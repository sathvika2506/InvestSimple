// src/controllers/transactionController.js
const db = require('../config/db');

const createTransaction = async (req, res) => {
  const { user_id, amount, action_type } = req.body;
  
  // This JSON object acts as our immutable audit trail
  const auditTrail = {
    timestamp: new Date().toISOString(),
    event: 'TRANSACTION_CREATED',
    status: 'success'
  };

  try {
    const query = `
      INSERT INTO transactions (user_id, amount, action_type, audit_trail)
      VALUES ($1, $2, $3, $4)
      RETURNING *
    `;
    const values = [user_id, amount, action_type, JSON.stringify(auditTrail)];
    
    const result = await db.query(query, values);

    res.status(201).json({
      success: true,
      message: 'Transaction recorded with audit trail',
      data: result.rows[0]
    });
  } catch (error) {
    console.error('Transaction creation failed:', error);
    res.status(500).json({ success: false, message: 'Server Error' });
  }
};

module.exports = { createTransaction };