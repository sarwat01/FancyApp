const { google } = require('google-auth-library');
const path = require('./fancynet-FirebaseNotification.json');

async function getAccessToken() {
  const client = new google.auth.GoogleAuth({
    keyFile: path.join(__dirname, 'firebase-service-account.json'),
    scopes: ['https://www.googleapis.com/auth/firebase.messaging'],
  });

  const accessToken = await client.getAccessToken();
  console.log('🔐 Access Token:\n', accessToken.token);
}

getAccessToken().catch(console.error);



module.exports = {
    getAccessToken
}