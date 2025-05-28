const catchAsync = require("../utils/catchAsync");

// Temp one-request credentials map
const tempStore = new Map();

/**
 * POST /storage
 * Stores credentials in a short-lived map (only for one request cycle)
 */
const storage = catchAsync(async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ message: "Username and password are required." });
  }

  // Generate a simple key (can be device id, IP, or a random UUID)
  const key = req.ip; // IP-based, works if devices are distinct
  tempStore.set(key, { username, password });

  // Auto-delete after 1 second
  setTimeout(() => tempStore.delete(key), 1000);

  res.status(200).json({ message: "Credentials stored temporarily." });
});

/**
 * GET /getUserAndPawword
 * Returns stored credentials ONCE then deletes them
 */
const getUserAndPawword = catchAsync(async (req, res) => {
  const key = req.ip;

  if (!tempStore.has(key)) {
    return res.status(204).send(); // Nothing to return
  }

  const { username, password } = tempStore.get(key);
  tempStore.delete(key); // Remove after reading

  res.status(200).json({ username, password });
});

module.exports = {
  storage,
  getUserAndPawword,
};
