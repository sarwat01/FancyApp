const catchAsync = require("../utils/catchAsync"); // Wrapper to handle async errors without try/catch

// Global variables to temporarily store credentials
let username = "";
let password = "";

/**
 * POST /storage
 * This route receives username and password in the request body,
 * stores them in memory (temporarily), and responds with success.
 */
const storage = catchAsync(async (req, res) => {
  // Get username and password from request body, trimming extra spaces
  username = req.body.username?.trim() || "";
  password = req.body.password?.trim() || "";

  // Basic validation to ensure both fields are provided
  if (!username || !password) {
    return res.status(400).json({ message: "Username and password are required." });
  }

  // Respond with a success message (you can also return the data if needed)
  res.status(200).json({ message: "Credentials stored successfully." });
});

/**
 * GET /getUserAndPawword
 * This route returns the stored credentials (username + password)
 * but only once — after responding, it clears the stored data.
 */
const getUserAndPawword = catchAsync(async (req, res) => {
  try {
    // Check if credentials are present; if not, return no content
    if (!username || !password) {
      return res.status(204).send(); // No Content — nothing to return
    }

    // Return stored username and password
    res.status(200).json({ username, password });
  } finally {
    // Reset credentials to ensure they are only used once
    username = "";
    password = "";
  }
});

module.exports = {
  storage,
  getUserAndPawword,
};


/* const catchAsync = require("../utils/catchAsync");

let username = "";
let password = "";

const storagee = catchAsync(async (req, res) => {
  username = " ";
  password = " ";
  username = req.body.username;
  password = req.body.password;
  res.send({ username, password });
});

const storage = catchAsync(async (req, res) => {
  username = req.body.username || "";
  password = req.body.password || "";
  res.send({ username, password });
});


const getUserAndPawword = catchAsync(async (req, res) => {
  try {
    // Send response
    res.status(200).json({
      username,
      password
    });
  } finally {
    // Reset values in the finally block to ensure they are cleared
    username = " ";
    password = " ";
  }
});
module.exports = {
  storage,
  getUserAndPawword,
};
 */