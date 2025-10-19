const { getPaymentsByDateRange, updateCardStatus } = require('../services/localPayment.service')
const { getCurrentToken } = require('./getFIBToken');


// ✅ Main job function
async function checkPaymentsStatusBetweenDates() {
  const token = getCurrentToken();
  if (!token) throw new Error('Token not available yet.');
 
  try {
    const now = new Date();
    const fiveHoursAgo = new Date(now.getTime() - 5 * 60 * 60 * 1000); // 5 hours ago

    // 1. Get list of payments from local service within that range
    const payments = await getPaymentsByDateRange(fiveHoursAgo, now, 'UNPAID');
    // 2. Loop through each payment
    for (const payment of payments) {
      const { paymentId } = payment;
      try {
        // 3. Call the external API to get payment status by paymentId
        const response = await fetch(`https://fib.prod.fib.iq/protected/v1/payments/${paymentId}/status`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}` // replace with actual token or method to get it
          }
        });

        if (!response.ok) {
          throw new Error(`API call failed with status ${response.status}`);
        }
        const statusData = await response.json();
        if (statusData.status != 'UNPAID') {
          await updatePaymentStatusByPaymentId(statusData)
        }
        // ✅ Do something with the response
        //  console.log(`Payment ${paymentId} - Local CardStatus: ${CardStatus}, Remote Status:`, statusData);

      } catch (apiErr) {
        console.error(`❌ Failed to fetch status for paymentId ${paymentId}:`, apiErr.message);
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
async function updatePaymentStatusByPaymentId(statusData) {
  const { paymentId, status, decliningReason } = statusData;
  try {
    // 1. Get the local payment by paymentId
      await updateCardStatus(paymentId, status, decliningReason);
   } catch (err) {
    console.error(`❌ Error updating CardStatus for paymentId ${paymentId}:`, err.message);
  }
}

// 🔁 Start polling every 15 seconds
function startPaymentStatusMonitor() {
  // console.log('⏱️ Payment status monitor started (every 15s)');
  setInterval(checkPaymentsStatusBetweenDates, 3 * 1000);
}

module.exports = {
  startPaymentStatusMonitor,
  updatePaymentStatusByPaymentId
};
