const mongoose = require('mongoose');
const { Schema } = mongoose;
const { CardStatusEnum, PaymentStatusEnum, BankNameEnum } = require('../enums/paymentEnums');

const PaymentSchema = new Schema(
  {
    paymentId: {
      type: String,
      required: true,
      trim: true
    },
    readableCode: {
      type: String,
      required: false,
      trim: true
    },
    CardStatus: {
      type: String,
      enum: Object.values(CardStatusEnum),
      default: CardStatusEnum.PENDING
    },
    status: {
      type: String,
      enum: Object.values(PaymentStatusEnum),
      default: PaymentStatusEnum.PENDING
    },
    comment: {
      type: String,
      default: ''
    },
    fcm: {
      type: String,
      default: ''
    },
    username: {
      type: String,
      required: false
    },
    bankName: {
      type: String,
      enum: Object.values(BankNameEnum),
      required: true
    },
    userId: {
      type: Number,
      required: true // optional: based on your needs
    },
    amount: {
      type: Number,
      required: true // optional: based on your needs
    }
  },
  {
    timestamps: true // adds createdAt and updatedAt
  }
);

module.exports = mongoose.model('Payment', PaymentSchema);
