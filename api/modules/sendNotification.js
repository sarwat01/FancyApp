const mongoose = require("mongoose");

const sendNotificationSchema = new mongoose.Schema({
  title: {
    type: String,
  },
  detail: {
    type: String, 
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  icon: String,
  fcmToken: String,
});

const sendNotification = mongoose.model("sendNotification", sendNotificationSchema);

module.exports = sendNotification;
