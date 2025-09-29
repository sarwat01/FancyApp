const https = require('https');
const http = require('http');
const { getPaymentsByDateRange, updatePaymentStatus } = require('../services/localPayment.service');
const { getLoginToken, startSecureLoginRefresh } = require('../jobs/getSasToken');
const { createFCM } = require('../services/fcmServices'); // import it


const CryptoJS = require('crypto-js');

const SECRET_KEY = 'abcdefghijuklmno0123456789012345'; // must match backend expectations

function encryptPayload(data) {
  const encrypted = CryptoJS.AES.encrypt(
    JSON.stringify(data),
    SECRET_KEY
  ).toString();

  return JSON.stringify({ payload: encrypted });
}

async function getSasUserByIdandUpdate(userId, username, paymentId) {
  const token = getLoginToken();

  const payload = {
    method: 'credit',
    pin: '',
    user_id: userId,
    money_collected: 1,
    comments: `Active By FIB - ${username}`,
    issue_invoice: 0,
    activation_units: 1
  };

  const encryptedBody = encryptPayload(payload);

  const options = {
    hostname: 'biling.fancynet.net',
    path: '/admin/api/index.php/api/user/activate',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Content-Length': Buffer.byteLength(encryptedBody),
      'Authorization': `Bearer ${token}`
    }
  };

  try {
    const response = await makeHttpRequest(options, encryptedBody);
    console.log('✅ Activation Response:', response);
    await updatePaymentStatusByPaymentId(paymentId);
  } catch (err) {
    console.error('❌ Request or parsing error:', err);
  }
}

function makeHttpRequest(options, body) {
  return new Promise((resolve, reject) => {
    const req = http.request(options, (res) => {
      let data = '';

      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try {
          const json = JSON.parse(data);
          resolve(json);
        } catch (err) {
          reject(new Error('Failed to parse response: ' + err.message));
        }
      });
    });

    req.on('error', reject);

    req.write(body);
    req.end();
  });
}

// Main polling function
async function pollPayments() {


  try {
    const now = new Date();
    const fiveHoursAgo = new Date(now.getTime() - 5 * 60 * 60 * 1000); // 5 hours ago

    const payments = await getPaymentsByDateRange(fiveHoursAgo, now, 'PAID', 'pending');

    for (const payment of payments) {
      try {
        await getSasUserByIdandUpdate(payment.userId, payment.username, payment.paymentId);
        await updatePaymentStatusByPaymentId(payment)
      } catch (apiErr) {
        console.error(`❌ Failed to activate user for paymentId ${payment.id}:`, apiErr.message);
      }
    }
  } catch (err) {
    console.error('❌ Local service error:', err.message);
  }
}


/**
 * Updates the local CardStatus for a payment based on external status data.
 * 
 * @param {Object} statusData - The object returned from the external API.
 * @param {string} statusData.paymentId - The ID of the payment.
 * @param {string} statusData.status - The new status to set.
 */
async function updatePaymentStatusByPaymentId(paymentId) {

  try {
    // 1. Get the local payment by paymentId
    await updatePaymentStatus(paymentId, 'success');
    const token = await getTokenFirebase();
    await sendNotification(token, paymentId)
  } catch (err) {
    console.error(`❌ Error updating Status for paymentId ${paymentId}:`, err.message);
  }
}


async function getTokenFirebase() {
  const token = await createFCM();
  return token;

}


async function sendNotification(token, payload) {
  const postData = JSON.stringify({
    message: {
      token: payload.fcm,
      notification: {
        title: `${payload.username} بەڕێز   `,
        body: " هێڵەکەت بە سەرکەوتوویی چالاک بووە \n لقد تم تفعيل خطك بنجاح \n 🎉"
      },
      apns: {
        headers: {
          "apns-priority": "10"
        },
        payload: {
          aps: {
            alert: {
              title: `${payload.username} بەڕێز   `,
              body: " هێڵەکەت بە سەرکەوتوویی چالاک بووە \n لقد تم تفعيل خطك بنجاح \n 🎉"
            },
            sound: "default",
            badge: 1
          }
        }
      }
    }
  });

  const options = {
    hostname: 'fcm.googleapis.com',
    path: '/v1/projects/fancynet-43f20/messages:send',
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
      'Content-Length': Buffer.byteLength(postData),
    },
  };

  return new Promise((resolve, reject) => {
    const req = https.request(options, (res) => {
      let data = '';

      res.on('data', (chunk) => {
        data += chunk;
      });

      res.on('end', () => {
        if (res.statusCode >= 200 && res.statusCode < 300) {
          try {
            const parsed = JSON.parse(data);
            resolve(parsed);
          } catch (e) {
            resolve(data);
          }
        } else {
          reject(new Error(`FCM API responded with status code ${res.statusCode}: ${data}`));
        }
      });
    });

    req.on('error', (e) => {
      reject(e);
    });

    // write data to request body
    req.write(postData);
    req.end();
  });
}

// Start polling job
function startPaymentPollingJob() {
  console.log('Starting payment polling job (every 10 seconds)...');

  setInterval(() => {
    pollPayments();

  }, 4000);
}

module.exports = { startPaymentPollingJob };
