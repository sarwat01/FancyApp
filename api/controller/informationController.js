const catchAsync = require('../utils/catchAsync');
const service = require('../services/informationService');

const createinformation = catchAsync(async (req, res) => {
    const information = await service.create(req.body);
    res.send(information);
  });
  
  const getAll = catchAsync(async (req, res) => {
    const information = await service.getAll();
    const length = information.length;
    res.status(200).json({
      status: "sucess",
      length: information.length,
      data: {
        information
      },
    });
  });
  
  const getOne = catchAsync(async (req, res, next) => {
    const information = await service.getOne(req.params.id);
    if (!information) {
      return next(new AppError("No information found with that ID", 404));
    }
    res.send(information);
  });
  
  const updateinformation = catchAsync(async (req, res, next) => {
    const information = await service.updateinformation(req.params.id, req.body);
    if (!information) {
      return next(new AppError("No information found with that ID", 404));
    }
    res.send(information);
  });
  
  const deleteinformation = catchAsync(async (req, res, next) => {
    const information = await service.deleteinformation(req.params.id);
    if (!information) {
      return next(new AppError("No information found with that ID", 404));
    }
    res.send(information);
  });
  
  module.exports = {
    createinformation,
    getAll,
    getOne,
    updateinformation,
    deleteinformation,
  };
  