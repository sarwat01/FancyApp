const express = require('express');
const router = express.Router()
const sendNotification = require('../controller/sendNotificationController')
const notificationValidation = require('../validations/sendNotificationValidation')
const {validate} = require('express-validation')

router
.route('/')
.post(validate(notificationValidation.create),sendNotification.create)
.get(validate(notificationValidation.getAll),sendNotification.getAll)


router
.route('/:id')
.get(validate(notificationValidation.getOne),sendNotification.getOne)
.patch(validate(notificationValidation.update),sendNotification.update)
.delete(validate(notificationValidation.deleteInfo),sendNotification.deleteinfo)
 
 
 

module.exports = router;