const express = require("express");
const router = express.Router();
const informationController = require("../controller/informationController");

router
.route('/')
.post(informationController.createinformation)
.get(informationController.getAll)



router
.route('/:id')
.get(informationController.getOne)
.patch(informationController.updateinformation)
.delete(informationController.deleteinformation)


module.exports = router;
