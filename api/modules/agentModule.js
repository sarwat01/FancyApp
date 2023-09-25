 const mongoose = require('mongoose');

const agentSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
  },
  phone1: String,
  Phone2: String, 
  addressId: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: 'address',
   },
  note: String,
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});


const agent = mongoose.model("agent", agentSchema);

module.exports = agent;
