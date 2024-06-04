const mongoose = require("mongoose");

const fcmSchema = new mongoose.Schema({
  fcmToken: {
    type: String,
    required: true,
    unique: true,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

const fcmToken = mongoose.model("fcmToken", fcmSchema);

module.exports = fcmToken;
