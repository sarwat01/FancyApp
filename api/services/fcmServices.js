const fcmModule = require("../modules/fcmModule");
const { google } = require('googleapis');
const privateKey = require('../bacnkService/service_account.json');

const createFCM = async () => {
  const jwtClient = new google.auth.JWT(
    privateKey.client_email,
    null,
    privateKey.private_key.replace(/\\n/g, '\n'), // ensure valid key
    ['https://www.googleapis.com/auth/firebase.messaging']
  );

  try {
    await jwtClient.authorize();
    console.log('✅ Authorized with Firebase');
    return jwtClient.credentials.access_token;
  } catch (error) {
    console.error('❌ Failed to authorize JWT client:', error.message);
    throw error;
  }
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
