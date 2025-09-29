const express = require('express');
const router = express.Router();
const paymentController = require('../controller/paymentController');

router.post('/create', paymentController.createPayment);
 router.post('/checkPaymentStatus', paymentController.checkPaymentStatus);
module.exports = router;
