const express = require('express');
const router = express.Router();
const paymentController = require('../controller/localPayment.controller');
const validatePayment = require('../validations/localPayment.validation'); 
// CREATE
router.post('/', validatePayment, paymentController.createPayment);

// GET all
router.get('/', paymentController.getAllPayments);

// GET by status
router.get('/status/:status', paymentController.getPaymentsByStatus);

// GET by date (yyyy-mm-dd)
router.get('/date/:date/', paymentController.getPaymentsByDate);

// GET by productId
router.get('/payment/:paymentId', paymentController.getPaymentsByProductId);

// UPDATE status
router.patch('/:paymentId/status', paymentController.updatePaymentStatus);


router.get('/bank/:bankName', paymentController.getPaymentsByBankName);
router.get('/daterange', paymentController.getPaymentsByDateRange);
router.patch('/:paymentId/card-status', paymentController.updateCardStatus);
router.get('/payment/:paymentId/pending-card', paymentController.getPendingCardPaymentById);
router.get('/card-status/:cardStatus', paymentController.getPaymentsByCardStatus);
router.get('/filter', paymentController.getPaymentsByFilters);

//get payments by CardStatus and status.
router.get('/filter-by-status', paymentController.getPaymentsByCardStatusAndStatus);
// GET latest payment by userId
router.get('/latest/:userId', paymentController.getLatestPaymentByUserId);

module.exports = router;
