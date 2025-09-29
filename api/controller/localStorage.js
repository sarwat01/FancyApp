const catchAsync = require("../utils/catchAsync");

// Temp one-request credentials map
const { v4: uuidv4 } = require('uuid');
const tempStore = new Map();
let tempCredential = null
 

const storage = catchAsync(async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ message: "Username and password are required." });
  }

  // Only allow new credentials if none currently exist
  if (tempCredential !== null) {
    return res.status(409).json({ message: "A credential is already waiting to be read." });
  }

  tempCredential = { username, password };

  // Optional: Auto-delete after 5 seconds if not read
  setTimeout(() => {
    tempCredential = null;
  }, 200);

  res.status(200).json({ message: "Credentials stored temporarily." });
});

const getUserAndPawword = catchAsync(async (req, res) => {
  if (!tempCredential) {
    return res.status(204).send(); // No credentials available
  }

  // Return credentials and clear them so others can't access
  const { username, password } = tempCredential;
  tempCredential = null;

  res.status(200).json({ username, password });
});

module.exports = {
  storage,
  getUserAndPawword,
};
