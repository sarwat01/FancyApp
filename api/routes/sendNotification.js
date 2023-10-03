const express = require('express');
const router = express.Router()
const sendNotification = require('../controller/sendNotificationController')
const notificationValidation = require('../validations/sendNotificationValidation')
const {validate} = require('express-validation')
const auth = require('../controller/authController')
router
.route('/')
.post(auth.protect,validate(notificationValidation.create),sendNotification.create)
.get(validate(notificationValidation.getAll),sendNotification.getAll)


router
.route('/:id')
.get(validate(notificationValidation.getOne),sendNotification.getOne)
.patch(validate(notificationValidation.update),sendNotification.update)
.delete(validate(notificationValidation.deleteInfo),sendNotification.deleteinfo)
 
 
 

module.exports = router;