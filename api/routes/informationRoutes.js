const express = require("express");
const router = express.Router(); 
const infovalidate = require('../validations/informationValidate')
const informationController = require("../controller/informationController");
const {validate} = require('express-validation')
router
.route('/')
.post(validate(infovalidate.createinformation),informationController.createinformation)
.get(validate(infovalidate.getAll),informationController.getAll)



router
.route('/:id')
.get(validate(infovalidate.getOne) ,informationController.getOne)
.patch(validate(infovalidate.update),informationController.updateinformation)
.delete(validate(infovalidate.deleteInfo),informationController.deleteinformation)


module.exports = router;
