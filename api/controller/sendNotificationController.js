const catchAsync = require('../utils/catchAsync');
const service = require('../services/sendNotifiaction');



const create = catchAsync(async(req, res)=> {
     const notification = await service.create(req.body);
    res.send(notification)
}) 

const getAll = catchAsync(async(req, res,)=> {
    const notification = await service.getAll()
     res.status(200).json({
      status: "sucess",
      length: notification.length,
      data: {
        notification
      },
    });
})

const getOne = catchAsync(async (req, res, next) => {
     const notification = await service.getOne(req.params.id);
    if (!notification) {
      return next(new AppError("No notification found with that ID", 404));
    }
    res.send(notification);
  });

 
  const update = catchAsync(async (req, res, next) => {
    console.log(req.params.id);
    const notification = await service.update(req.params.id, req.body);
    if (!notification) {
      return next(new AppError("No notification found with that ID", 404));
    }
    res.send(notification);
  });
  
  const deleteinfo = catchAsync(async (req, res, next) => {
    const notification = await service.deleteinfo(req.params.id);
    if (!notification) {
      return next(new AppError("No notification found with that ID", 404));
    }
    res.send(notification);
  });



module.exports = {
    create,
    getAll,
    getOne,
    update,
    deleteinfo
}