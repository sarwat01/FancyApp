const catchAsync = require("../utils/catchAsync");
const AppError = require("./../utils/appError");
const userSerivce = require("../services/userServices");
const userModule = require("../modules/userModule")

const filterObj = (obj, ...allowedFields) => {
  const newObj = {};
  Object.keys(obj).forEach(el => {
    if (allowedFields.includes(el)) newObj[el] = obj[el];
  });
  return newObj;
};

const createUser = catchAsync(async (req, res) => {
  const newUser = await userSerivce.create(req.body);
  res.send(newUser);
});

const updateMe = catchAsync(async (req, res, next) => {
  // 1) Create error if user POSTs password data
  if (req.body.password || req.body.passwordConfirm) {
    return next(
      new AppError(
        'This route is not for password updates. Please use /updateMyPassword.',
        400
      )
    );
  }

  // 2) Filtered out unwanted fields names that are not allowed to be updated
  const filteredBody = filterObj(req.body, 'username', 'role');

  // 3) Update user document
  const updatedUser = await userModule.findByIdAndUpdate(req.user.id, filteredBody, {
    new: true,
    runValidators: true
  });

  res.status(200).json({
    status: 'success',
    data: {
      user: updatedUser
    }
  });
});

const getAll = catchAsync(async (req, res) => {
  const user = await userSerivce.getAll();
  res.status(200).json({
    status: "sucess",
    length: user.length,
    data: {
      user,
    },
  });
});

const getOne = catchAsync(async (req, res, next) => {
   
  const user = await userSerivce.getOne(req.params.id);
  if (!user) {
    return next(new AppError("No User found with that ID", 404));
  }
  res.send(user);
});

const updateUser = catchAsync(async (req, res, next) => {
/*   if (req.body.password) {
    return next(
      new AppError(
        "this route is not for password updates . please use /updateMyPassword.",
        400
      )
    );
  } */
  const User = await userSerivce.updateUser(req.params.id, req.body);
  if (!User) {
    return next(new AppError("No User found with that ID", 404));
  }
  res.send(User);
});

const deleteUser = catchAsync(async (req, res, next) => {
  const User = await userSerivce.deleteUser(req.params.id);
  if (!User) {
    return next(new AppError("No User found with that ID", 404));
  }
  res.send(User);
});

module.exports = {
  createUser,
  getAll,
  getOne,
  updateUser,
  deleteUser,
  updateMe
};
