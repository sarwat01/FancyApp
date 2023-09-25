const express = require('express');
 const authController = require('../controller/authController') 
const router = express.Router();
const userValidation = require('../validations/userValidation')
const {validate} = require('express-validation')
const userController = require('../controller/userController')


router.post('/signup',validate(userValidation.create) ,authController.signup)
router.post('/login',authController.login) 
router.patch('/updateMyPassowrd',authController.protect,authController.updatePassword )
router.patch('/updateMe',authController.protect,userController.updateMe )
 

router
.route('/')
.get(userController.getAll)


router
.route('/:id')
.patch(userController.updateUser)
  module.exports = router;