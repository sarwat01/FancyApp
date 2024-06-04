const express = require('express');
 const addressController = require('../controller/addressController') 
const router = express.Router();
const addressValidation = require('../validations/addressValidation')
const {validate} = require('express-validation')
const auth = require('../controller/authController')
router
  .route('/')
  .post(validate(addressValidation.create), addressController.createAddress)
   .get(validate(addressValidation.getAll),addressController.getAll)
 
 
  router
  .route('/:id')
  .get(validate(addressValidation.getOne),addressController.getOne)
  .patch(validate(addressValidation.update),addressController.updateAddress)
  .delete(validate(addressValidation.deleteInfo),addressController.deleteAddress) 





  module.exports = router;