const fcmModule = require("../modules/fcmModule");
const { google } = require('googleapis');
const privateKey = require('./fancyNetKey.json');

const createFCM = async () => {
    const jwtClient = new google.auth.JWT(privateKey.client_email, null, privateKey.private_key, [
      'https://www.googleapis.com/auth/firebase.messaging',
    ]);
    await jwtClient.authorize();
    return jwtClient.credentials.access_token;
  };


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
  createFCM
};
