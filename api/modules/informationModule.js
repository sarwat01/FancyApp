const mongoose = require("mongoose");

const informationSchema = new mongoose.Schema({
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
});

const information = mongoose.model("information", informationSchema);

module.exports = information;
