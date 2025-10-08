const https = require('https');
const querystring = require('querystring');
const FIB = require('../bacnkService/banckServices.json')

let currentToken = null;



async function fetchToken() {
  return new Promise((resolve, reject) => { 
    const postData = querystring.stringify({
      grant_type: 'client_credentials',
      client_id: FIB.client_id ,
      client_secret: FIB.client_secret
    });

    const options = {
      hostname: 'fib.stage.fib.iq',
      path: '/auth/realms/fib-online-shop/protocol/openid-connect/token',
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Content-Length': Buffer.byteLength(postData)
      }
    };

    const req = https.request(options, (res) => {
      let data = '';

      res.on('data', (chunk) => {
        data += chunk;
      });

      res.on('end', () => {
        try {
          const json = JSON.parse(data);
          if (json.access_token) {
            currentToken = json.access_token;

            console.log('✅ FIB Token refreshed at', new Date().toISOString());
            resolve(currentToken);
          } else {
            console.error('❌ Failed to get token:', json);
            reject(new Error('No access token in response'));
          }
        } catch (err) {
          reject(err);
        }
      });
    });

    req.on('error', (err) => {
      console.error('❌ Request error:', err.message);
      reject(err);
    });

    req.write(postData);
    req.end();
  });
}

// Automatically refresh token every 50 seconds
function startAutoRefresh() {
  // Immediately fetch on startup
  fetchToken().catch(err => console.error('Initial token fetch failed:', err.message));

  setInterval(() => {
    fetchToken().catch(err => console.error('Recurring token fetch failed:', err.message));
  }, 50000); // 50 seconds
}

// Expose the token getter
function getCurrentToken() {
  return currentToken;
}

module.exports = {
  startAutoRefresh,
  getCurrentToken
};
