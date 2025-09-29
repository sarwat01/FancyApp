const { getToken } = require('../services/tokenService');

function fetchDataUsingToken(req, res) {
  const token = getToken();

  if (!token) {
    return res.status(401).json({ error: 'No token available yet' });
  }

  // Example of making another API request using the token (also using http)
  // For demo purposes — you might replace this with actual business logic
  res.json({ message: 'Token is valid', token });
}

module.exports = { fetchDataUsingToken };
