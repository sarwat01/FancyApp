const CardStatusEnum = Object.freeze({
  UNPAID: 'UNPAID',
  PAID: 'PAID',
  REJECT: 'reject'
});

const PaymentStatusEnum = Object.freeze({
  PENDING: 'pending',
  SUCCESS: 'success'
});

const BankNameEnum = Object.freeze({
  FIB: 'FIB',
  FASTPAY: 'fastpay'
});

module.exports = {
  CardStatusEnum,
  PaymentStatusEnum,
  BankNameEnum
};
