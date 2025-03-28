const express = require('express');
const router = express.Router();
const userController = require('../controller/localStorage')
 

router
.route('/')
.post(userController.storage)
router
.route('/')
.get(userController.getUserAndPawword)

 
 
  module.exports = router;