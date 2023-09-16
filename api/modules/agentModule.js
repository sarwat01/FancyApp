 const mongoose = require('mongoose');

const agentSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
    required: [true, "agent must have name"],
  },
  phone1: String,
  Phone2: String, 
  addressId: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: 'address',
    required: true,
  },
  note: String,
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});


const agent = mongoose.model("agent", agentSchema);

module.exports = agent;
