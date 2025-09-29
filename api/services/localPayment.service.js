const Payment = require('../modules/Payment');

// Create payment
async function createPayment(data) {
  const payment = new Payment(data);
  return await payment.save();
}

// Get all
async function getAllPayments({ search, limit, skip, sortBy, order }) {
  const query = {};

  if (search) {
    query.$or = [
      { username: new RegExp(search, 'i') },
      { paymentId: new RegExp(search, 'i') }
    ];
  }

  const sortOrder = order === 'asc' ? 1 : -1;

  const [data, total] = await Promise.all([
    Payment.find(query)
      .sort({ [sortBy]: sortOrder })
      .skip(skip)
      .limit(limit),
    Payment.countDocuments(query)
  ]);

  return { data, total };
}

// Get by status
async function getPaymentsByStatus(status) {
  return await Payment.find({ status });
}

// Get by date (match createdAt date only)
async function getPaymentsByDate(date) {
  const start = new Date(date);
  const end = new Date(date);
  end.setDate(end.getDate() + 1);
  return await Payment.find({
    createdAt: { $gte: start, $lt: end }
  });
}

// Get by productId
async function getPaymentsByProductId(productId) {
  return await Payment.find({ productId });
}

// Update status
async function updatePaymentStatus(paymentId, newStatus) {
  console.log(paymentId, newStatus);

  return await Payment.findOneAndUpdate(
    { paymentId },
    { status: newStatus, updatedAt: new Date() },
    { new: true }
  );
}


async function getPaymentsByBankName(bankName) {
  return await Payment.find({ bankName });
}

/* async function getPaymentsByDateRange(from, to) {
  const start = new Date(from);
  const end = new Date(to);
  end.setDate(end.getDate() + 1);
  return await Payment.find({
    createdAt: { $gte: start, $lt: end }
  });
} */

async function getPaymentsByDateRange(from, to, CardStatus, status) {

  const start = new Date(from);
  const end = new Date(to);
  end.setDate(end.getDate() + 1); // Make the 'to' date inclusive

  const query = {
    createdAt: { $gte: start, $lt: end }
  };

  // Add CardStatus filter if it's provided
  if (CardStatus) {
    query.CardStatus = CardStatus;
  }

  if (status) {
    query.status = status;
  }


  return await Payment.find(query);
}

async function updateCardStatus(paymentId, cardStatus, decliningReason) {

  return await Payment.findOneAndUpdate(
    { paymentId },
    { CardStatus: cardStatus, comment: decliningReason, updatedAt: new Date() },
    { new: true }
  );
}

async function getPendingCardPaymentById(paymentId) {
  return await Payment.findOne({
    paymentId,
    CardStatus: 'pending'
  });
}

async function getPaymentsByCardStatus(cardStatus) {
  return await Payment.find({ CardStatus: cardStatus });
}

async function getPaymentsByFilters({ paymentId, cardStatus, from, to }) {
  const query = {};

  if (paymentId) {
    query.paymentId = paymentId;
  }

  if (cardStatus) {
    query.CardStatus = cardStatus;
  }

  if (from && to) {
    const startDate = new Date(from);
    const endDate = new Date(to);
    endDate.setDate(endDate.getDate() + 1); // include full 'to' day
    query.createdAt = { $gte: startDate, $lt: endDate };
  }

  return await Payment.find(query);
}


async function getPaymentsByCardStatusAndStatus({ cardStatus, status }) {
  const query = {};

  if (cardStatus) {
    query.CardStatus = cardStatus;
  }

  if (status) {
    query.status = status;
  }

  return await Payment.find(query);
}


async function getLatestPaymentByUserId(userId) {
  return await Payment.findOne({ userId: Number(userId) })
    .sort({ createdAt: -1 }); // latest payment first
}
module.exports = {
  createPayment,
  getAllPayments,
  getPaymentsByStatus,
  getPaymentsByDate,
  getPaymentsByProductId,
  updatePaymentStatus,
  updateCardStatus,
  getPendingCardPaymentById,
  getPaymentsByDateRange,
  getPaymentsByBankName,
  getPaymentsByCardStatus,
  getPaymentsByFilters,
  getPaymentsByCardStatusAndStatus,
  getLatestPaymentByUserId
};
