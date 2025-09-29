const http = require('http'); // ✅ Use http because the URL is http://
const CryptoJS = require('crypto-js');
  
let loginToken = null;

const payload = {
  username: 'sarwat',
  password: 'Sarwat@2023h@',
  language: 'en'
};

const SECRET_KEY = 'abcdefghijuklmno0123456789012345'; // must match backend expectations

function encryptPayload(data) {
  const encrypted = CryptoJS.AES.encrypt(
    JSON.stringify(data),
    SECRET_KEY
  ).toString();

  return JSON.stringify({ payload: encrypted });
}

function sendEncryptedLoginRequest() {
  return new Promise((resolve, reject) => {
    const encryptedBody = encryptPayload(payload);

    const options = {
      hostname: 'biling.fancynet.net', // ✅ Correct hostname (NO http://)
      path: '/admin/api/index.php/api/login', // ✅ Correct path
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(encryptedBody)
      }
    };

    const req = http.request(options, (res) => {
      let data = '';

      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try {
          const response = JSON.parse(data);
          if (response.token) {
            loginToken = response.token;
              
            console.log('✅ SAS Token refreshed at', new Date().toISOString());
           resolve(loginToken);
          } else {
            console.error('❌ No access_token in response:', response);
            reject(new Error('No access_token returned'));
          }
        } catch (err) {
          reject(err);
        }
      });
    }); 
    req.on('error', (err) => {
      console.error('❌ HTTP error:', err.message);
      reject(err);
    });

    req.write(encryptedBody);
    req.end();
  });
}

// Start auto-refresh every 5 minutes
function startSecureLoginRefresh() {
  return sendEncryptedLoginRequest().catch(err => {
    console.error('❌ Initial login failed:', err.message);
  }).then(() => {
    setInterval(() => {
      sendEncryptedLoginRequest().catch(err => {
        console.error('❌ Periodic secure login failed:', err.message);
      });
    }, 5*60 * 1000); // 5 minutes
  });
}

function getLoginToken() {
  return loginToken;
}

module.exports = {
  startSecureLoginRefresh,
  getLoginToken
};
