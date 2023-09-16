const mongoose = require("mongoose");

const sendNotificationSchema = new mongoose.Schema({
  title: {
    type: String, 
    min: [3, "title character must more than 3 character"],
    max: [20, "title character must less than 20 character"],
  },
  detail: {
    type: String,
    required: true,
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
