const mongoose = require("mongoose");

const addressSchema = new mongoose.Schema({
  name: {
    type: String,
    unique: true,
    trim: true,
    require: true,
  },
  note: {
    type: String,
    trim: true,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

const address = mongoose.model("address", addressSchema);
module.exports = address;
