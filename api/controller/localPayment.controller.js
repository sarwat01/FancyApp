const paymentService = require('../services/localPayment.service');

const createPayment = async (req, res) => {
  try {
    const payment = await paymentService.createPayment(req.body);
    res.status(201).json({ success: true, data: payment });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

const getAllPayments = async (req, res) => {
  try {
    const {
      search = '',
      limit = 10,
      skip = 0,
      sortBy = 'createdAt',
      order = 'desc'
    } = req.query;

    const result = await paymentService.getAllPayments({
      search,
      limit: parseInt(limit),
      skip: parseInt(skip),
      sortBy,
      order
    });

    res.json({
      success: true,
      total: result.total,
      data: result.data
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};


const getPaymentsByStatus = async (req, res) => {
  const { status } = req.params;
  const payments = await paymentService.getPaymentsByStatus(status);
  res.json({ success: true, data: payments });
};

const getPaymentsByDate = async (req, res) => {
  const { date } = req.params; // expected format: yyyy-mm-dd
  const payments = await paymentService.getPaymentsByDate(date);
  res.json({ success: true, data: payments });
};

const getPaymentsByProductId = async (req, res) => {
  const { productId } = req.params;
  const payments = await paymentService.getPaymentsByProductId(productId);
  res.json({ success: true, data: payments });
};

const updatePaymentStatus = async (req, res) => {
  const { paymentId } = req.params;
  const { status } = req.body;
  try {
    const updated = await paymentService.updatePaymentStatus(paymentId, status);
    res.json({ success: true, data: updated });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

const getPaymentsByBankName = async (req, res) => {
  const { bankName } = req.params;
  const payments = await paymentService.getPaymentsByBankName(bankName);
  res.json({ success: true, data: payments });
};

/* const getPaymentsByDateRange = async (req, res) => {
  const { from, to } = req.query;
  const payments = await paymentService.getPaymentsByDateRange(from, to);
  res.json({ success: true, data: payments });
}; */
const getPaymentsByDateRange = async (req, res) => {
  const { from, to, CardStatus, status } = req.query;
  try {
    const payments = await paymentService.getPaymentsByDateRange(from, to, CardStatus, status);
    res.json({ success: true, data: payments });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Server Error' });
  }
};

const updateCardStatus = async (req, res) => {
  const { paymentId } = req.params;
  const { CardStatus } = req.body;
  try {
    const result = await paymentService.updateCardStatus(paymentId, CardStatus);
    res.json({ success: true, data: result });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

const getPendingCardPaymentById = async (req, res) => {
  const { paymentId } = req.params;
  const result = await paymentService.getPendingCardPaymentById(paymentId);
  res.json({ success: true, data: result });
};

const getPaymentsByCardStatus = async (req, res) => {
  const { cardStatus } = req.params;

  try {
    const payments = await paymentService.getPaymentsByCardStatus(cardStatus);
    res.json({ success: true, data: payments });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

const getPaymentsByFilters = async (req, res) => {
  try {
    const { paymentId, cardStatus, from, to } = req.query;

    const payments = await paymentService.getPaymentsByFilters({
      paymentId,
      cardStatus,
      from,
      to
    });

    res.json({ success: true, data: payments });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

const getPaymentsByCardStatusAndStatus = async (req, res) => {
  try {
    const { cardStatus, status } = req.query;

    const payments = await paymentService.getPaymentsByCardStatusAndStatus({ cardStatus, status });

    res.json({ success: true, data: payments });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};


const getLatestPaymentByUserId = async (req, res) => {
  console.log(req.params);
  
  const { userId } = req.params;

  try {
    const payment = await paymentService.getLatestPaymentByUserId(userId);
    
    if (!payment) {
      return res.status(404).json({ success: false, message: 'No payment found for this user.' });
    }

    res.json({ success: true, data: payment });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
module.exports = {
  createPayment,
  getAllPayments,
  getPaymentsByStatus,
  getPaymentsByDate,
  getPaymentsByProductId,
  updatePaymentStatus,
  getPaymentsByBankName,
  getPaymentsByDateRange,
  updateCardStatus,
  getPendingCardPaymentById,
  getPaymentsByCardStatus,
  getPaymentsByFilters,
  getPaymentsByCardStatusAndStatus,
  getLatestPaymentByUserId
};
