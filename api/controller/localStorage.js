const catchAsync = require("../utils/catchAsync");

let username = "";
let password = "";

const storage = catchAsync(async (req, res) => {
   
  username = req.body.username;
  password = req.body.password;
  res.send({ username, password });
});

/* const getUserAndPawword = catchAsync(async (req, res) => {
  res.status(200).json({
    username: username,
    password: password,
  });
  username = "";
  password = "";
}); */

const getUserAndPawword = catchAsync(async (req, res) => {
  try {
  
    // Send response
    res.status(200).json({
      username ,
      password 
    });
  } finally {
    // Reset values in the finally block to ensure they are cleared
    username = "";
    password = "";
  }
});
module.exports = {
  storage,
  getUserAndPawword,
};
