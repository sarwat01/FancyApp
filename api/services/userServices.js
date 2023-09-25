const userModule = require("../modules/userModule");
const AppError = require("../utils/appError");

const create = async (body) => {
  const user = await userModule.create(body);
  return user;
};

const getAll = async (req, res) => {
  const user = await userModule.find();
  return user;
};

const getOne = async (id) => {
  const user = await user.findById(id);
  return user;
};

const updateUser = async (id, newBody) => { 
  const user = await user.findByIdAndUpdate(id, newBody, {
    new: true,
    runValidators: true,
  });
  return user;
};



const deleteAddress = async (id) => {
  const user = await userModule.findByIdAndDelete(id);
  return user;
};

module.exports = {
  create,
  getAll,
  getOne,
  updateUser,
  deleteAddress,
};
