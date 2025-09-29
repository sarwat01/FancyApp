const https = require('https'); 
const { getCurrentToken } = require('../jobs/getFIBToken');
const { createPayment } = require('./localPayment.service');
  
// ✅ 1. Create FIB Payment
const createFIBPayment = async (params) => {
  
  const token = getCurrentToken();
 

  if (!token) throw new Error('Token not available yet.');
  const requestBody = JSON.stringify({
    monetaryValue: {
       client_id: "fancynet-testing-payment",
      client_secret: "a0418a28-e8bf-4d3c-a3fb-dee4ac4a51fd",
      amount: params.amount.toString(),
      currency: 'IQD',
    },
    statusCallbackUrl: 'https://fib.stage.fib.iq/api/payments/initiate',
    description: `FancyNet Card ${params.amount}, Code: ${params.username}`,
    redirectUri: 'fancynet://profile',
    category: 'ECOMMERCE',
  });

  const options = {
    hostname: 'fib.stage.fib.iq',
    path: '/protected/v1/payments',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Content-Length': Buffer.byteLength(requestBody),
      Authorization: `Bearer ${token}`,
    },
  };

  return new Promise((resolve, reject) => {
    const req = https.request(options, (res) => {
      let data = '';
      res.on('data', (chunk) => (data += chunk));
      res.on('end', () => {
        try {
          const json = JSON.parse(data);
          const paymentId = json.paymentId || json.id;
          if (!paymentId) return reject(new Error('Missing paymentId in FIB response'));
          resolve(json);
        } catch (e) {
          reject(new Error('Invalid JSON from FIB: ' + e.message));
        }
      });
    });

    req.on('error', reject);
    req.write(requestBody);
    req.end();
  });
};

// ✅ 2. Create Local Payment
const createLocalPayment = async (paymentResponse, originalParams) => {
  try {
    const data = {
      paymentId: paymentResponse.paymentId || paymentResponse.id,
      amount: originalParams.amount,
      fcm: originalParams.fcm,
      username: originalParams.username,
      userId: originalParams.userId,
      readableCode: originalParams.readableCode,
      comment: originalParams.comment || '',
      CardStatus: 'UNPAID',
      status: 'pending',
      bankName: 'FIB',
    };

    const saved = await createPayment(data);

    return {
      status: true,
      localPaymentId: saved._id
    };
  } catch (err) {
    return {
      status: false,
      message: err.message
    };
  }
};
 
// ✅ 3. Main Function to Orchestrate
const createNewPayment = async (params) => {
  try {
    console.log(params);
    
    const fibPayment = await createFIBPayment(params);
    const localPayment = await createLocalPayment(fibPayment, params);
 
   const {
      businessAppLink,
      corporateAppLink,
      personalAppLink
    } = fibPayment;

   const response = {
  fibPayment: {
    businessAppLink,
    corporateAppLink,
    personalAppLink
  },
  localPayment: localPayment.status === false
    ? { status: false, message: localPayment.message }
    : { status: true }
};

return response;
  } catch (err) {
    console.error('❌ createPayment error:', err.message);
    throw err;
  }
};




module.exports = {
  createNewPayment,
  createFIBPayment,
  createLocalPayment
};