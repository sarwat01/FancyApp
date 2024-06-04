const catchAsync = require("../utils/catchAsync");
const AppError = require("./../utils/appError");
const addressSerivce = require("../services/addressService");

const createAddress = catchAsync(async (req, res) => {
  const newAddress = await addressSerivce.create(req.body);
  res.send(newAddress);
});

const getAll = catchAsync(async (req, res) => {
  const address = await addressSerivce.getAll();
  const length = address.length;
  res.status(200).json({
    status: "sucess",
    length: address.length,
    data: {
      address,
    },
  });
});

const getOne = catchAsync(async (req, res, next) => {
  const address = await addressSerivce.getOne(req.params.id);
  if (!address) {
    return next(new AppError("No Address found with that ID", 404));
  }
  res.send(address);
});

const updateAddress = catchAsync(async (req, res, next) => {
  const Address = await addressSerivce.updateAddress(req.params.id, req.body);
  if (!Address) {
    return next(new AppError("No Address found with that ID", 404));
  }
  res.send(Address);
});

const deleteAddress = catchAsync(async (req, res, next) => {
  const Address = await addressSerivce.deleteAddress(req.params.id);
  if (!Address) {
    return next(new AppError("No Address found with that ID", 404));
  }
  res.send(Address);
});

module.exports = {
  createAddress,
  getAll,
  getOne,
  updateAddress,
  deleteAddress,
};
