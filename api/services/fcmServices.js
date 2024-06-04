const fcmModule = require("../modules/fcmModule");

const create = async (body) => {
  const fcm = await fcmModule.create(body);
  return fcm;
};

const getAll = async (req, res) => {
  const fcm = await fcmModule.find();
  return fcm;
};

const getOne = async (id) => {
  const fcm = await fcmModule.findById(id);
  return fcm;
};

const deleteFcm = async (id) => {
  const fcm = await fcmModule.findByIdAndDelete(id);
  return fcm;
};

module.exports = {
  create,
  getAll,
  getOne,
  deleteFcm,
};
