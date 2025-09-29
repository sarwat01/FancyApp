// ✅ Export the array directly (NOT as an object)
const { body, validationResult } = require('express-validator');
const { CardStatusEnum,BankNameEnum, PaymentStatusEnum } = require('../enums/paymentEnums');
 
const validatePayment = [
  body('paymentId').isString().notEmpty(),
  body('readableCode').optional().isString(),
  body('CardStatus').isIn(Object.values(CardStatusEnum)),
  body('status').isIn(Object.values(PaymentStatusEnum)),
  body('comment').optional().isString(),
  body('fcm').optional().isString(),
  body('username').optional().isString(),
  body('userId').notEmpty(),
  body('productId').optional().isString(),
  body('bankName').isIn(Object.values(BankNameEnum)),
  
  // Final middleware to handle validation result
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, errors: errors.array() });
    }
    next();
  }
];

// ✅ Correct export
module.exports = validatePayment;
