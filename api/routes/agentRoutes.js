const express = require("express");
const agentController = require("../controller/agentController");
const agentValidation = require('../validations/agentValidation')
const {validate} = require('express-validation')
const router = express.Router();

router
.route("/")
 .post(validate(agentValidation.create) ,agentController.createAgent)
 .get(validate(agentValidation.getAll),agentController.getAll);

router
  .route("/:id")
  .get(validate(agentValidation.getOne),agentController.getOne)
  .patch(validate(agentValidation.update),agentController.update)
  .delete(validate(agentValidation.deleteInfo),agentController.deleteAgent);

module.exports = router;
