const mongoose = require("mongoose");
const fancyServiceSchema = new mongoose.Schema({
  title: {
    type: String,
    require: true,
    unique: true,
    trim: true,
  },
  date: {
    type: Date,
    default: Date.now(),
  },
  detailKurd: {
    type: String,
    require: true,
    trim: true,
  },
  detailArb: {
    type: String,
    trim: true,
  },
  detailEng: {
    type: String,
    trim: true,
  },
});

const fancyService = mongoose.model("fancyService", fancyServiceSchema);

module.exports = fancyService;
