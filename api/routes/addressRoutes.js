const express = require('express');
 const addressController = require('../controller/addressController') 
const router = express.Router();



router
  .route('/')
  .post(addressController.createAddress)
   .get(addressController.getAll)
 
 
  router
  .route('/:id')
  .get(addressController.getOne)
  .patch(addressController.updateAddress)
  .delete(addressController.deleteAddress) 





  module.exports = router;