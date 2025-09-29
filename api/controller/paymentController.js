const paymentService = require('../services/paymentService');

 

exports.createPayment = async (req, res) => {
  const { amount } = req.body;

  if (!amount ) {
    return res.status(400).json({
      error: 'amount is required',
    });
  }

  try {
    // 🔁 Call the split service
    const { fibPayment, localPayment } = await paymentService.createNewPayment(req.body);

    res.status(201).json({
      message: 'Payment created successfully',
      data: {
        fibPayment,
        localPayment
      }
    });
  } catch (error) {
    console.error('❌ Payment error:', error.message);
    res.status(500).json({ error: 'Failed to create payment', details: error.message });
  }
};

 

exports.checkPaymentStatus = async (req, res) => {
  const { paymentId, token } = req.body;
   if (!paymentId || !token) {
    return res.status(400).json({ error: 'paymentId and token are required' });
  }
  try {
    const paymentResponse = await paymentService.checkPaymentStatus({ paymentId, token });
    res.status(200).json(paymentResponse);
  } catch (error) {
    console.error('Payment error:', error.message);
    res.status(500).json({ error: error.message });
  }
};