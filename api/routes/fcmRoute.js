const express = require('express');
const router = express.Router()
const fcmController = require('../controller/fcmController')


router.route('/fcm').post(fcmController.postToken)
router
.route('/')
.post(fcmController.create)
.get(fcmController.getAll)


router
.route('/:id')
.get(fcmController.getOne)
.delete(fcmController.getOne)
 

module.exports = router;