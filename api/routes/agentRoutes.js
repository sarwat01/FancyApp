const express = require("express");
const agentController = require("../controller/agentController");
const router = express.Router();

router
.route("/")
 .post(agentController.createAgent)
 .get(agentController.getAll);

router
  .route("/:id")
  .get(agentController.getOne)
  .patch(agentController.update)
  .delete(agentController.deleteAgent);

module.exports = router;
